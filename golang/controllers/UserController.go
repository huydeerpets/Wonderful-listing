package controllers

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego/orm"
	"io/ioutil"
	"time"
	"todolist/models"
)

type UserController struct {
	PublicController
}
type RepData struct {
	Message string `json:"message"`
}
type ab struct {
	models.User
	Token string `json:"token"`
}

//login
func (this *UserController) Login() {
	var user models.User
	var err error
	o := orm.NewOrm()
	qs := o.QueryTable("user")
	if err = json.Unmarshal(this.Ctx.Input.RequestBody, &user); err == nil {
		a := qs.Filter("email", user.Email).Filter("password", this.md5Pass(user.Password)).One(&user)
		if a == nil {
			//如果登录成功,生成token,绑定用户
			userMsg := createTokenBingUser(user)
			this.Return(userMsg)
		} else {
			this.ReturnErr(RepData{Message: "找不到您的账户"})
		}
	}
	//this.Abort("403")
	//this.Ctx.WriteString("123")
}

//logout
func logout() {

}

//registered
func (c *UserController) Registered() {
	var user models.User
	var err error
	o := orm.NewOrm()
	if err = json.Unmarshal(c.Ctx.Input.RequestBody, &user);
		err == nil {
		user.CreateTime = time.Now()
		user.Password = c.md5Pass(user.Password)
		if user.Avatar != "" {
			ddd, _ := base64.StdEncoding.DecodeString(user.Avatar)
			err2 := ioutil.WriteFile(`./static/`+user.Email+`.jpg`, ddd, 0666)
			user.Avatar = `./static/` + user.Email + `.jpg`
			if err2 != nil {
				fmt.Println("err2", err2)
			}
		}
		//创建用户之前先查询email,如果存在结束请求
		qs := o.QueryTable("user")
		var oldUser models.User
		oldErr := qs.Filter("email", user.Email).One(&oldUser)
		if oldErr == nil {
			c.ReturnErr(RepData{"email已经存在"})
			return
		}
		//如果不存在email,创建新的用户
		_, err_ := o.Insert(&user)
		if err_ == nil {
			userMsg := createTokenBingUser(user)
			c.Return(userMsg)
			return
		} else {
			fmt.Println("err:", err_)
		}
	} else {
		fmt.Println("err:", err)
	}
}

func createTokenBingUser(user models.User) ab {
	o := orm.NewOrm()
	var token models.Token
	token.UserId = user.Id
	tokenController := new(TokenController)
	token.Token = tokenController.CreateToken()
	token.CreateTime = time.Now()
	_, err_ := o.Insert(&token)
	if err_ == nil {
		return ab{user, token.Token}
	}
	return ab{}
}

func (this *UserController) Errlogin() {
	this.ReturnErr(struct{}{})
}

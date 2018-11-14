package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego/orm"
	"time"
	"todolist/models"
)

type CatController struct {
	PublicController
}

//添加一个分类
func (this *CatController) Addcat() {
	var cat models.Cat
	var err error
	o := orm.NewOrm()
	a := make([]string, 10)
	if err = json.Unmarshal(this.Ctx.Input.RequestBody, &cat); err == nil {
		//取到过滤器所赋值的数据
		b := this.Ctx.Input.Data()["userId"].(int)
		err := json.Unmarshal([]byte(cat.Title), &a)

		if err == nil {
			for _, item := range a {
				fmt.Println("item:", item)

				var queryData models.Cat
				queryErr := o.QueryTable("cat").Filter("user_id", b).Filter("title", item).One(&queryData)
				fmt.Println("queryErr", queryErr)
				if queryErr != nil {
					var instData models.Cat
					instData.UserId = b
					instData.Title = item
					instData.CreateTime = time.Now()
					instData.Data = ""
					_, err_ := o.Insert(&instData)
					if err_ != nil {
						//	数据插入成功
					} else {
						fmt.Println("")
					}
				} else {
					this.ReturnErr("已经有重复的数据")
				}
			}
			this.Return(struct{}{})
		}
	}
}

//获取用户的所有分类
func (this *CatController) GetCatAll() {
	o := orm.NewOrm()
	qs := o.QueryTable("cat")
	userId := this.Ctx.Input.Data()["userId"].(int)
	var cat []*models.Cat
	item, err := qs.Filter("user_id", userId).All(&cat)
	for _, m := range cat {
		fmt.Println("m:", m)
	}
	fmt.Println("err", err)
	fmt.Println("item", item)
	this.Return(cat)
}

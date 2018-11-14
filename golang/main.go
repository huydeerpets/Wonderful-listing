package main

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/plugins/cors"
	"todolist/models"
	_ "todolist/routers"
)

func FilterUser(ctx *context.Context) {
	token := ctx.Request.Header.Get("token")
	var o = orm.NewOrm()
	var tokenSelf models.Token
	qs := o.QueryTable("token")
	if token != "" {
		b := qs.Filter("token", token).One(&tokenSelf)
		if b == nil {
			//将数据赋值,以提供给Controller使用
			ctx.Input.Data()["userId"] = tokenSelf.UserId
		} else {
			ctx.Redirect(302, "/errlogin")
		}
	}
}
func main() {
	models.InitSql()
	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{AllowAllOrigins: true, AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}, AllowHeaders: []string{"Origin", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Content-Type"}, ExposeHeaders: []string{"Content-Length", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Content-Type"}, AllowCredentials: true,}))
	beego.InsertFilter("/api/*", beego.BeforeRouter, FilterUser)
	beego.Run()

}

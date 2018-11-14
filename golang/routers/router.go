package routers

import (
	"github.com/astaxie/beego"
	"todolist/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/registered", &controllers.UserController{}, "*:Registered")
	beego.Router("/errlogin", &controllers.UserController{}, "*:Errlogin")
	beego.Router("/login", &controllers.UserController{}, "*:Login")
	beego.Router("/api/cat/addcat", &controllers.CatController{}, "*:Addcat")
	beego.Router("/api/cat/getcatall", &controllers.CatController{}, "*:GetCatAll")
	beego.Router("/api/list/addlist", &controllers.ListController{}, "*:AddList")
	beego.Router("/api/list/get_cat_list/:id", &controllers.ListController{}, "*:GetUserAll")
	beego.Router("/api/list/update_item_start", &controllers.ListController{}, "*:UpdateItemStart")
}
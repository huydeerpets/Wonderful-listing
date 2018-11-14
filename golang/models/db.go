package models

import (
	"fmt"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)

func InitSql() {
	fmt.Println("设置数据库")
	orm.RegisterDriver("mysql", orm.DRMySQL)
	orm.RegisterDataBase("default", "mysql", "root:@tcp(127.0.0.1:3306)/todo?charset=utf8")
	orm.RegisterModel(new(User))
	orm.RegisterModel(new(Token))
	orm.RegisterModel(new(Cat))
	orm.RegisterModel(new(TodoList))
	orm.RunSyncdb("default", false, true)
}

package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego/orm"
	"strconv"
	"time"
	"todolist/models"
)

type ListController struct {
	PublicController
}
type rspDataList struct {
	TrueData  []models.TodoList `json:"true_data"`
	FalseData []models.TodoList `json:"false_data"`
}

//add cat
func (this *ListController) AddList() {
	var list models.TodoList
	userId := this.Ctx.Input.Data()["userId"].(int)
	o := orm.NewOrm()
	if err := json.Unmarshal(this.Ctx.Input.RequestBody, &list); err == nil {
		list.UserId = userId
		list.CreateTime = time.Now()
		if _, err_ := o.Insert(&list); err_ == nil {
			this.Return(struct{}{})
		} else {
			fmt.Println("err_:", err_)
			this.ReturnErr(struct{}{})
		}
	}
}

//get all todo for user's cat

func (this *ListController) GetUserAll() {
	userId := this.Ctx.Input.Data()["userId"].(int)
	catIdStr := this.Ctx.Input.Param(":id")
	catId, _ := strconv.Atoi(catIdStr)
	list := this.queryCat(userId, catId)
	this.Return(list)
}

//help func query
func (this *ListController) queryCat(userId int, catId int) rspDataList {
	var trueList []models.TodoList
	var falseList []models.TodoList
	fmt.Println("falseList", falseList)
	o := orm.NewOrm()
	fmt.Println("userId", userId)
	fmt.Println("catId", catId)
	item_, err := o.QueryTable("todo_list").Filter("user_id", userId).Filter("cat_id", catId).Filter("state", true).All(&trueList)
	item, err_ := o.QueryTable("todo_list").Filter("user_id", userId).Filter("cat_id", catId).Filter("state", false).All(&falseList)
	if err == nil && err_ == nil {
	} else {
		fmt.Println("查询错误", err)
		fmt.Println("查询错误", err_)
	}

	fmt.Println("item_", item_)
	fmt.Println("item", item)
	return rspDataList{
		TrueData:  trueList,
		FalseData: falseList,
	}
	//return rspDataList{[]models.TodoList{}, []models.TodoList{}}
}

//change todo state
func (this *ListController) UpdateItemStart() {
	o := orm.NewOrm()
	var newList models.TodoList
	if err := json.Unmarshal(this.Ctx.Input.RequestBody, &newList); err == nil {
		list := models.TodoList{Id: newList.Id}
		if o.Read(&list) == nil {
			list.State = ! newList.State
			if _, err := o.Update(&list); err == nil {
				this.Return(list.State)
			} else {
				this.ReturnErr(struct{}{})
			}
		}
	}
}

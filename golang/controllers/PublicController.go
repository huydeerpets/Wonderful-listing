package controllers

import (
	"crypto/md5"
	"encoding/hex"
	"github.com/astaxie/beego"
	"todolist/models"
)

type PublicController struct {
	beego.Controller
}

//md5加密
func (this *PublicController) md5Pass(data string) string {
	h := md5.New()
	h.Write([]byte(data + "wanghuahua"))
	return hex.EncodeToString(h.Sum(nil))
}

func (c *PublicController) Return(data interface{}) {
	returnData := &models.ReturnData{Code: 200, Message: "请求成功", State: true, Data: data}
	c.Data["json"] = returnData
	c.ServeJSON()
}
func (c *PublicController) ReturnErr(data interface{}) {
	returnData := &models.ReturnData{Code: 403, Message: "请求失败", State: false, Data: data}
	c.Data["json"] = returnData
	c.ServeJSON()
}

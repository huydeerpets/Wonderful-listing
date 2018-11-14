package controllers

import (
	"math/rand"
	"strconv"
	"time"
)

type TokenController struct {
	//beego.Controller
	PublicController
}

func (this *TokenController) CreateToken() string {
	b := strconv.FormatInt(time.Now().Unix(), 10)
	a := this.md5Pass(strconv.Itoa(rand.Intn(10000)))
	return "WHH" + b + a
}

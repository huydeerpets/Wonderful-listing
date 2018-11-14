package models

import "time"

type PublicModel struct {
	CreateTime time.Time `json:"create_time"`
	UpdateTime time.Time `json:"update_time" orm:"null"`
}

type ReturnData struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	State   bool        `json:"state"`
	Data    interface{} `json:"data"`
}


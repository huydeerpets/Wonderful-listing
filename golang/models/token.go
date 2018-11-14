package models

type Token struct {
	PublicModel
	Id     int    `json:"id"`
	UserId int  `json:"user_id"`
	Token  string `json:"token" orm:"unique"`
	Data   string `json:"data" orm:"null;type(text)"`
}

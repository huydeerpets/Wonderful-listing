package models

type User struct {
	Id       int    `json:"id"`
	Name     string `json:"name" orm:"null"`
	Avatar   string `json:"avatar" orm:"null"`
	Email    string `json:"email" orm:"unique"`
	Password string `json:"-"`
	Data     string `json:"data_val" orm:"null;type(text)"`
	PublicModel
}

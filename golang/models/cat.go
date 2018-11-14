package models

type Cat struct {
	PublicModel
	Id     int    `json:"id"`
	UserId int    `json:"user_id"`
	Title  string `json:"title"`
	Data   string `json:"data"`
}

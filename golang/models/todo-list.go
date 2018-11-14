package models

import "time"

type TodoList struct {
	PublicModel
	Id     int       `json:"id"`
	UserId int       `json:"user_id"`
	CatId  int       `json:"cat_id"`
	Title  string    `json:"title"`
	State  bool      `json:"state"`
	Start  bool      `json:"start"`
	Remind time.Time `json:"remind" orm:"null"`
	Note   string    `json:"note" orm:"null"`
	DueTo  time.Time `json:"due_to" orm:"null"`
	Data   string    `json:"data" orm:"null"`
}

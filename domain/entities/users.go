package entities

type UserDataFormat struct {
	UserID   string `json:"user_id" bson:"user_id,omitempty"`
	Username string `json:"username" bson:"username,omitempty"`
	Email    string `json:"email" bson:"email,omitempty"`
	Address  string `json:"address" bson:"address,omitempty"`
	Tel      string `json:"tel" bson:"tel,omitempty"`
	Role     string `json:"role" bson:"role,omitempty"`
}

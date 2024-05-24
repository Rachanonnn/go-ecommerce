package entities

type UserDataFormat struct {
	UserID    string              `json:"user_id" bson:"user_id,omitempty"`
	Firstname string              `json:"first_name" bson:"first_name,omitempty"`
	Lastname  string              `json:"last_name" bson:"last_name,omitempty"`
	Email     string              `json:"email" bson:"email,omitempty"`
	Tel       string              `json:"tel" bson:"tel,omitempty"`
	Role      string              `json:"role" bson:"role,omitempty"`
	Addresses []AddressDataFormat `json:"address" bson:"address,omitempty"`
}

type AddressDataFormat struct {
	UserID    string `json:"user_id" bson:"user_id,omitempty"`
	HouseName string `json:"housename" bson:"housename,omitempty"`
	Street    string `json:"street" bson:"street,omitempty"`
	City      string `json:"city" bson:"city,omitempty"`
	State     string `json:"state" bson:"state,omitempty"`
	Pincode   string `json:"pincode" bson:"pincode,omitempty"`
}

package entities

type UserDataFormat struct {
	UserID    string `json:"user_id" bson:"user_id,omitempty"`
	Firstname string `json:"first_name" validate:"required, min=3, max=40" bson:"first_name,omitempty"`
	Lastname  string `json:"last_name" validate:"required, min=3, max=40" bson:"last_name,omitempty"`
	Password  string `json:"password" validate:"required, min=6" bson:"password,omitempty"`
	Email     string `json:"email" validate:"required, email" bson:"email,omitempty"`
	Tel       string `json:"tel" validate:"required" bson:"tel,omitempty"`
	Role      string `json:"role" bson:"role,omitempty"`
}

type AddressDataFormat struct {
	UserID      string        `json:"user_id" bson:"user_id,omitempty"`
	AddressData []AddressData `json:"address_data" bson:"address_data,omitempty"`
}

type AddressData struct {
	HouseName string `json:"housename" bson:"housename,omitempty"`
	Street    string `json:"street" bson:"street,omitempty"`
	City      string `json:"city" bson:"city,omitempty"`
	State     string `json:"state" bson:"state,omitempty"`
	Pincode   string `json:"pincode" bson:"pincode,omitempty"`
}

type CartDataFormat struct {
	UserID string      `json:"user_id" bson:"user_id,omitempty"`
	Orders []OrderData `json:"cart_data" bson:"cart_data,omitempty"`
	Total  int         `json:"total" bson:"total,omitempty"`
}

type OrderData struct {
	ProductID string `json:"product_id" bson:"product_id,omitempty"`
	Quantity  int    `json:"quantity" bson:"quantity,omitempty"`
	Total     int    `json:"total_price" bson:"total_price,omitempty"`
}

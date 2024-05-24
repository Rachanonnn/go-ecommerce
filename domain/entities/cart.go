package entities

type Cart struct {
	ProductID string `json:"product_id" bson:"product_id,omitempty"`
	Quantity  int    `json:"quantity" bson:"quantity,omitempty"`
	Price     int    `json:"price" bson:"price,omitempty"`
	Total     int    `json:"total" bson:"total,omitempty"`
}

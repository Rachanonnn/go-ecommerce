package entities

type ProductDataFormat struct {
	ProductID string `json:"product_id" bson:"product_id,omitempty"`
	Name      string `json:"name" bson:"name,omitempty"`
	Quantity  int    `json:"quantity" bson:"quantity,omitempty"`
	Price     int    `json:"price" bson:"price,omitempty"`
}

package entities

type ProductDataFormat struct {
	ID       string `json:"id" bson:"_id,omitempty"`
	Name     string `json:"name" bson:"name,omitempty"`
	Quantity int    `json:"quantity" bson:"quantity,omitempty"`
	Price    int    `json:"price" bson:"price,omitempty"`
}

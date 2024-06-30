package entities

type HistoryCartData struct {
	CartID   string `json:"cart_id"`
	Quantity int    `json:"quantity"`
	Price    int    `json:"price"`
}

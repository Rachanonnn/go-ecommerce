package gateways

import (
	"encoding/json"
	"fmt"
	"go-ecommerce/domain/entities"
	"go-ecommerce/src/middlewares"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v79"
)

func (h *HTTPGateway) CreatePayment(ctx *fiber.Ctx) error {
	params := ctx.Queries()
	price := params["price"]
	cartID := params["cart_id"]
	method := params["method"]
	quantity := params["quantity"]

	res, err := h.StripeSV.CreatePayment(price, cartID, method, quantity)
	if err != nil {
		return ctx.Status(fiber.StatusForbidden).JSON(entities.ResponseModel{Message: err.Error()})
	}
	return ctx.Status(fiber.StatusOK).JSON(res)
}

func (h *HTTPGateway) Webhook(ctx *fiber.Ctx) error {
	// const MaxBodyBytes = int64(65536)
	// body := ctx.Body()
	// reader := io.LimitReader(bytes.NewReader(body), MaxBodyBytes)
	// payload, err := ioutil.ReadAll(reader)
	// if err != nil {
	// 	fmt.Fprintf(os.Stderr, "Error reading request body: %v\n", err)
	// 	return ctx.SendStatus(fiber.StatusServiceUnavailable)
	// }

	// endpointSecret := os.Getenv("STRIPE_WEBHOOK_SECRET")
	// if endpointSecret == "" {
	// 	fmt.Fprintf(os.Stderr, "Missing STRIPE_WEBHOOK_SECRET env var\n")
	// 	return ctx.SendStatus(fiber.StatusServiceUnavailable)
	// }

	// sigHeader := ctx.Get("Stripe-Signature")
	// if sigHeader == "" {
	// 	fmt.Fprintf(os.Stderr, "Missing Stripe-Signature header\n")
	// 	return ctx.SendStatus(fiber.StatusBadRequest)
	// }

	// event, err := webhook.ConstructEventWithOptions(payload, sigHeader, endpointSecret, webhook.ConstructEventOptions{
	// 	IgnoreAPIVersionMismatch: true,
	// })
	// if err != nil {
	// 	fmt.Fprintf(os.Stderr, "Error verifying webhook signature: %v\n", err)
	// 	return ctx.SendStatus(fiber.StatusBadRequest)
	// }
	decodedToken, err := middlewares.DecodeJWTToken(ctx)

	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(entities.ResponseModel{Message: "cannot decode token"})
	}

	userID := decodedToken.UserID

	type MetadataCart struct {
		CartID   string `json:"cart_id"`
		Price    string `json:"price"`
		Quantity string `json:"quantity"`
	}
	payload := ctx.Body()
	event := stripe.Event{}
	err = json.Unmarshal(payload, &event)
	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(entities.ResponseModel{Message: "invalid webhook"})
	}
	dataCart := event.Data.Object["metadata"].(map[string]interface{})

	metaDataCart := MetadataCart{
		CartID:   fmt.Sprintf("%v", dataCart["cart_id"]),
		Price:    fmt.Sprintf("%v", dataCart["price"]),
		Quantity: fmt.Sprintf("%v", dataCart["quantity"]),
	}
	price, err := strconv.Atoi(metaDataCart.Price)
	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(entities.ResponseModel{Message: "invalid webhook"})
	}
	quantity, err := strconv.Atoi(metaDataCart.Quantity)
	if err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(entities.ResponseModel{Message: "invalid webhook"})
	}
	historyCartData := entities.HistoryCartData{
		CartID:   metaDataCart.CartID,
		Quantity: quantity,
		Price:    price,
	}
	if err := h.StripeSV.InsertHistoryCart(&historyCartData, userID); err != nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(entities.ResponseModel{Message: "can't insert history cart"})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success"})
}

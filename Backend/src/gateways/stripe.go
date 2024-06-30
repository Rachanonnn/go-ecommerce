package gateways

import (
	"bytes"
	"fmt"
	"go-ecommerce/domain/entities"
	"io"
	"io/ioutil"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v78/webhook"
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
	const MaxBodyBytes = int64(65536)
	body := ctx.Body()
	reader := io.LimitReader(bytes.NewReader(body), MaxBodyBytes)
	payload, err := ioutil.ReadAll(reader)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error reading request body: %v\n", err)
		return ctx.SendStatus(fiber.StatusServiceUnavailable)
	}

	endpointSecret := os.Getenv("STRIPE_WEBHOOK_SECRET")
	if endpointSecret == "" {
		fmt.Fprintf(os.Stderr, "Missing STRIPE_WEBHOOK_SECRET env var\n")
		return ctx.SendStatus(fiber.StatusServiceUnavailable)
	}

	sigHeader := ctx.Get("Stripe-Signature")
	if sigHeader == "" {
		fmt.Fprintf(os.Stderr, "Missing Stripe-Signature header\n")
		return ctx.SendStatus(fiber.StatusBadRequest)
	}

	event, err := webhook.ConstructEventWithOptions(payload, sigHeader, endpointSecret, webhook.ConstructEventOptions{
		IgnoreAPIVersionMismatch: true,
	})
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error verifying webhook signature: %v\n", err)
		return ctx.SendStatus(fiber.StatusBadRequest)
	}

	switch event.Type {
	case "checkout.session.completed":
		paymentData := event.Data.Object
		fmt.Println(paymentData)
		fmt.Println("Payment successful")
	default:
		fmt.Fprintf(os.Stderr, "Unhandled event type: %s\n", event.Type)
	}

	return ctx.SendStatus(fiber.StatusOK)
}

package gateways

import (
	"go-ecommerce/domain/entities"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v78"
	"github.com/stripe/stripe-go/v78/webhookendpoint"
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
	stripe.Key = os.Getenv("STRIPE_KEY")
	if os.Getenv("STRIPE_KEY") == "" {
		stripe.Key = "sk..............."
	}

	params := &stripe.WebhookEndpointParams{
		EnabledEvents: []*string{
			stripe.String("charge.succeeded"),
			stripe.String("charge.failed"),
		},
		URL: stripe.String("https://example.com/my/webhook/endpoint"),
	}
	result, err := webhookendpoint.New(params)

	if err != nil {
		return ctx.Status(fiber.StatusForbidden).JSON(entities.ResponseModel{Message: err.Error()})
	}

	return ctx.Status(fiber.StatusOK).JSON(result)
}

package gateways

import (
	"go-ecommerce/domain/entities"

	"github.com/gofiber/fiber/v2"
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

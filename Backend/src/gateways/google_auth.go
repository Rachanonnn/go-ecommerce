package gateways

import (
	"go-ecommerce/domain/entities"

	"github.com/gofiber/fiber/v2"
)

func (h HTTPGateway) GoogleAuthentication(ctx *fiber.Ctx) error {
	data := h.GoogleService.GoogleAuthentication()
	return ctx.Redirect(data)
}

func (h HTTPGateway) GoogleCallback(ctx *fiber.Ctx) error {
	code := ctx.Query("code")

	data, err := h.GoogleService.GoogleCallback(ctx, code)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(err)
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success", Data: data})
}

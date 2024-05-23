package gateways

import (
	"go-ecommerce/domain/entities"

	"github.com/gofiber/fiber/v2"
)

func (h HTTPGateway) GetAllProducts(ctx *fiber.Ctx) error {

	data, err := h.ProductService.GetAllProduct()
	if err != nil {
		return ctx.Status(fiber.StatusForbidden).JSON(entities.ResponseModel{Message: "cannot get all products data"})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success", Data: data})
}

func (h HTTPGateway) CreateNewProduct(ctx *fiber.Ctx) error {

	var bodyData entities.ProductDataFormat

	if err := ctx.BodyParser(&bodyData); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseMessage{Message: "invalid json body"})
	}

	status := h.ProductService.InsertNewProduct(&bodyData)

	if !status {
		return ctx.Status(fiber.StatusForbidden).JSON(entities.ResponseModel{Message: "cannot insert product."})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success"})
}

package gateways

import (
	"fmt"
	"go-ecommerce/domain/entities"
	"io/ioutil"

	"github.com/gofiber/fiber/v2"
)

func (h HTTPGateway) GetAllProducts(ctx *fiber.Ctx) error {

	data, err := h.ProductService.GetAllProduct()
	if err != nil {
		return ctx.Status(fiber.StatusForbidden).JSON(entities.ResponseModel{Message: "cannot get all products data"})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success", Data: data})
}

func (h HTTPGateway) GetProductById(ctx *fiber.Ctx) error {
	params := ctx.Queries()

	product_id := params["id"]

	data, err := h.ProductService.GetProductByID(product_id)

	if err != nil {
		return ctx.Status(fiber.StatusForbidden).JSON(entities.ResponseModel{Message: "cannot get product data"})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success", Data: data})
}

func (h HTTPGateway) CreateNewProduct(ctx *fiber.Ctx) error {

	var bodyData entities.ProductDataFormat

	if err := ctx.BodyParser(&bodyData); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseMessage{Message: "invalid json body"})
	}

	imagefile, err := ctx.FormFile("image")
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "image not found"})
	}

	if imagefile != nil {
		fileContent, err := imagefile.Open()
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Failed to open uploaded file"})
		}
		defer fileContent.Close()

		fileBytes, err := ioutil.ReadAll(fileContent)
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Failed to read uploaded file"})
		}

		status := h.ProductService.InsertNewProduct(&bodyData, fileBytes)

		if !status {
			return ctx.Status(fiber.StatusForbidden).JSON(entities.ResponseModel{Message: "cannot insert product."})
		}
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success"})
}

func (h HTTPGateway) UpdateProduct(ctx *fiber.Ctx) error {

	productData := new(entities.ProductDataFormat)

	err := ctx.BodyParser(&productData)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "invalid json body"})
	}

	params := ctx.Queries()

	if len(params) <= 0 {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "product id not fill"})
	}

	product_id := params["id"]

	err = h.ProductService.UpdateProduct(product_id, productData)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "cannot update product data"})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success", Data: productData})
}

func (h HTTPGateway) DeleteProduct(ctx *fiber.Ctx) error {
	params := ctx.Queries()

	if len(params) <= 0 {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "product id not fill"})
	}

	product_id := params["id"]

	err := h.ProductService.DeleteProduct(product_id)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "cannot delete product"})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success"})
}

func (h HTTPGateway) UploadProductPicture(ctx *fiber.Ctx) error {

	params := ctx.Queries()

	if len(params) <= 0 {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "user id not fill"})
	}

	productID := params["product_id"]

	imagefile, err := ctx.FormFile("image")
	if err != nil || imagefile == nil {
		fmt.Println("imagefile:", imagefile)
	}

	if imagefile != nil {
		fileContent, err := imagefile.Open()
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Failed to open uploaded file"})
		}
		defer fileContent.Close()

		fileBytes, err := ioutil.ReadAll(fileContent)
		if err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Failed to read uploaded file"})
		}

		if err = h.ProductService.UpdateProductPicture(productID, fileBytes); err != nil {
			return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "Failed to update product picture"})
		}
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success"})
}

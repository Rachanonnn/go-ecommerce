package gateways

import (
	"go-ecommerce/domain/entities"
	"log"

	"github.com/gofiber/fiber/v2"
)

func (h HTTPGateway) GetAllUserData(ctx *fiber.Ctx) error {

	data, err := h.UserService.GetAllUser()
	if err != nil {
		return ctx.Status(fiber.StatusForbidden).JSON(entities.ResponseModel{Message: "cannot get all users data"})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success", Data: data})
}

func (h HTTPGateway) CreateNewUserAccount(ctx *fiber.Ctx) error {

	var bodyData entities.UserDataFormat
	if err := ctx.BodyParser(&bodyData); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseMessage{Message: "invalid json body"})
	}

	status := h.UserService.InsertNewAccount(&bodyData)
	log.Println("status after ", status)

	if !status {
		return ctx.Status(fiber.StatusForbidden).JSON(entities.ResponseModel{Message: "cannot insert new user account."})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success"})
}

func (h HTTPGateway) GetUserById(ctx *fiber.Ctx) error {

	params := ctx.Queries()

	user_id := params["id"]

	data, err := h.UserService.GetUserByID(user_id)

	if err != nil {
		return ctx.Status(fiber.StatusForbidden).JSON(entities.ResponseModel{Message: "cannot get user data"})
	}
	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success", Data: data})
}

func (h HTTPGateway) UpdateUser(ctx *fiber.Ctx) error {
	userData := new(entities.UserDataFormat)

	err := ctx.BodyParser(&userData)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "invalid json body"})
	}

	params := ctx.Queries()

	if len(params) <= 0 {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "user id not fill"})
	}

	user_id := params["id"]

	err = h.UserService.UpdateUser(user_id, userData)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "cannot update user data"})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success", Data: userData})
}

func (h HTTPGateway) DeleteUser(ctx *fiber.Ctx) error {

	params := ctx.Queries()

	if len(params) <= 0 {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "user id not fill"})
	}

	user_id := params["id"]

	err := h.UserService.DeleteUser(user_id)

	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(entities.ResponseModel{Message: "cannot delete user data"})
	}

	return ctx.Status(fiber.StatusOK).JSON(entities.ResponseModel{Message: "success"})
}

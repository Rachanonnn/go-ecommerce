package gateways

import "github.com/gofiber/fiber/v2"

func GatewayUsers(gateway HTTPGateway, app *fiber.App) {
	api := app.Group("/api/v1/users")

	api.Post("/add_user", gateway.CreateNewUserAccount)
	api.Get("/users", gateway.GetAllUserData)
	api.Get("/get_user_by_id", gateway.GetUserById)
	api.Put("/update_user", gateway.UpdateUser)
	api.Delete("/delete_users", gateway.DeleteUser)
}

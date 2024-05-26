package gateways

import "github.com/gofiber/fiber/v2"

func GatewayUsers(gateway HTTPGateway, app *fiber.App) {

	apiProfile := app.Group("/api/v1/profile")

	apiProfile.Post("/add_user", gateway.CreateNewUserAccount)
	apiProfile.Get("/users", gateway.GetAllUserData)
	apiProfile.Get("/get_user_by_id", gateway.GetUserById)
	apiProfile.Put("/update_user", gateway.UpdateUser)
	apiProfile.Delete("/delete_users", gateway.DeleteUser)
	apiProfile.Get("/get_address_by_user_id", gateway.GetAddressByUserID)
	apiProfile.Post("/add_address", gateway.CreateNewAddress)
	apiProfile.Put("/update_address", gateway.UpdateAddress)
	apiProfile.Delete("/delete_address", gateway.DeleteAddress)
	apiProfile.Get("/get_orders_by_user_id", gateway.GetOrdersByUserID)
}

func GatewayProducts(gateway HTTPGateway, app *fiber.App) {

	apiProduct := app.Group("/api/v1/product")

	apiProduct.Get("/get_all_products", gateway.GetAllProducts)
	apiProduct.Get("/get_product_by_id", gateway.GetProductById)
	apiProduct.Post("/add_product", gateway.CreateNewProduct)
	apiProduct.Put("/update_product", gateway.UpdateProduct)
	apiProduct.Delete("/delete_product", gateway.DeleteProduct)
}

func GatewayGoogle(gateway HTTPGateway, app *fiber.App) {

	apiGoogle := app.Group("/api/v1")

	apiGoogle.Get("/google", gateway.GoogleAuthentication)
	apiGoogle.Get("/google_callback", gateway.GoogleCallback)
}

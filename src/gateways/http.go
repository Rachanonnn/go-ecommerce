package gateways

import (
	service "go-ecommerce/src/services"

	"github.com/gofiber/fiber/v2"
)

type HTTPGateway struct {
	UserService    service.IUsersService
	ProductService service.IProductService
}

func NewHTTPGateway(app *fiber.App, users service.IUsersService, product service.IProductService) {
	gateway := &HTTPGateway{
		UserService:    users,
		ProductService: product,
	}

	GatewayUsers(*gateway, app)
}

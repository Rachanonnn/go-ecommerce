package gateways

import (
	service "go-ecommerce/src/services"

	"github.com/gofiber/fiber/v2"
)

type HTTPGateway struct {
	UserService    service.IUsersService
	ProductService service.IProductService
	AddressService service.IAddressService
}

func NewHTTPGateway(app *fiber.App, users service.IUsersService, product service.IProductService, address service.IAddressService) {
	gateway := &HTTPGateway{
		UserService:    users,
		ProductService: product,
		AddressService: address,
	}

	GatewayProducts(*gateway, app)
	GatewayUsers(*gateway, app)
}

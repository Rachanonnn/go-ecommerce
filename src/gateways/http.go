package gateways

import (
	service "go-ecommerce/src/services"

	"github.com/gofiber/fiber/v2"
)

type HTTPGateway struct {
	UserService    service.IUsersService
	ProductService service.IProductService
	AddressService service.IAddressService
	GoogleService  service.IGoogleService
}

func NewHTTPGateway(app *fiber.App, users service.IUsersService, product service.IProductService, address service.IAddressService, google service.IGoogleService) {
	gateway := &HTTPGateway{
		UserService:    users,
		ProductService: product,
		AddressService: address,
		GoogleService:  google,
	}

	GatewayGoogle(*gateway, app)
	GatewayProducts(*gateway, app)
	GatewayUsers(*gateway, app)
}

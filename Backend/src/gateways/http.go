package gateways

import (
	service "go-ecommerce/src/services"

	"github.com/gofiber/fiber/v2"
)

type HTTPGateway struct {
	UserService    service.IUsersService
	ProductService service.IProductService
	AddressService service.IAddressService
	CartService    service.ICartService
	GoogleService  service.IGoogleService
	StripeSV       service.IStripeService
}

func NewHTTPGateway(app *fiber.App, users service.IUsersService, product service.IProductService, address service.IAddressService, cart service.ICartService, google service.IGoogleService, StripeSV service.IStripeService) {
	gateway := &HTTPGateway{
		UserService:    users,
		ProductService: product,
		AddressService: address,
		CartService:    cart,
		GoogleService:  google,
		StripeSV:       StripeSV,
	}

	GatewayGoogle(*gateway, app)
	GatewayProducts(*gateway, app)
	GatewayUsers(*gateway, app)
	GatewayStripe(*gateway, app)
}

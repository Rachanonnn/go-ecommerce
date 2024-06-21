package services

import (
	"go-ecommerce/domain/entities"
	"go-ecommerce/domain/repositories"
	"os"
	"strconv"

	"github.com/stripe/stripe-go/v78"
	"github.com/stripe/stripe-go/v78/checkout/session"
)

type stripeService struct {
	UsersRepository repositories.IUsersRepository
}

type IStripeService interface {
	CreatePayment(price string, cartID string, methodPay string) (entities.ResponseModel, error)
}

func NewStripeService(repo0 repositories.IUsersRepository) IStripeService {
	return &stripeService{
		UsersRepository: repo0,
	}
}

func (h stripeService) CreatePayment(price string, cartID string, methodPay string) (entities.ResponseModel, error) {
	stripe.Key = os.Getenv("STRIPE_KEY")
	priceData, err := strconv.ParseFloat(price, 64)
	if err != nil {
		return entities.ResponseModel{Message: "invalid price"}, err
	}
	if methodPay == "" {
		methodPay = "promptpay"
	}
	params := &stripe.CheckoutSessionParams{
		PaymentMethodTypes: stripe.StringSlice([]string{methodPay}),
		LineItems: []*stripe.CheckoutSessionLineItemParams{
			{
				PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
					Currency: stripe.String("thb"),
					ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
						Name: stripe.String("cart_id : " + cartID),
					},
					UnitAmount: stripe.Int64(int64(priceData) * 100),
				},
				Quantity: stripe.Int64(1),
			},
		},
		Mode:                stripe.String("payment"),
		SuccessURL:          stripe.String("http://localhost:3000/success"),
		CancelURL:           stripe.String("http://localhost:3000/cancel"),
		AllowPromotionCodes: stripe.Bool(true),
	}

	session, err := session.New(params)

	if err != nil {
		return entities.ResponseModel{Message: "can't create session"}, err
	}
	return entities.ResponseModel{Message: "success", Data: session.URL}, nil
}

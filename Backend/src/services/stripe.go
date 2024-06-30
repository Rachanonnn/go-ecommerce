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
	UsersRepository       repositories.IUsersRepository
	HistoryCartRepository repositories.IHistoryCartRepository
}

type IStripeService interface {
	CreatePayment(price string, cartID string, methodPay string, quantity string) (entities.ResponseModel, error)
	InsertHistoryCart(data *entities.HistoryCartData) error
}

func NewStripeService(repo0 repositories.IUsersRepository, repo1 repositories.IHistoryCartRepository) IStripeService {
	return &stripeService{
		UsersRepository:       repo0,
		HistoryCartRepository: repo1,
	}
}

func (h stripeService) CreatePayment(price string, cartID string, methodPay string, quantity string) (entities.ResponseModel, error) {
	stripe.Key = os.Getenv("STRIPE_KEY")
	if os.Getenv("STRIPE_KEY") == "" {
		return entities.ResponseModel{Message: "invalid stripe key"}, nil
	}
	priceData, err := strconv.ParseFloat(price, 64)
	if err != nil {
		return entities.ResponseModel{Message: "invalid price"}, err
	}
	quantityData, err := strconv.Atoi(quantity)
	if err != nil {
		return entities.ResponseModel{Message: "invalid quantity"}, err
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
				Quantity: stripe.Int64(int64(quantityData)),
			},
		},
		ClientReferenceID:   stripe.String(cartID),
		Metadata:            map[string]string{"cart_id": cartID, "price": price, "quantity": quantity},
		Mode:                stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL:          stripe.String("http://localhost:3000/website/success"),
		CancelURL:           stripe.String("http://localhost:3000/website/cancel"),
		AllowPromotionCodes: stripe.Bool(true),
	}

	session, err := session.New(params)

	if err != nil {
		return entities.ResponseModel{Message: "can't create session"}, err
	}
	return entities.ResponseModel{Message: "success", Data: session.URL}, nil
}

func (h stripeService) InsertHistoryCart(data *entities.HistoryCartData) error {
	return h.HistoryCartRepository.InsertNewHistoryCart(data)
}

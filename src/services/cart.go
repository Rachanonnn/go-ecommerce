package services

import (
	"fmt"
	"go-ecommerce/domain/entities"
	"go-ecommerce/domain/repositories"
)

type cartService struct {
	CartRepository    repositories.ICartRepository
	UsersRepository   repositories.IUsersRepository
	ProductRepository repositories.IProductRepository
}

type ICartService interface {
	GetOrdersByUserID(userID string) (*entities.CartDataFormat, error)
	AddtoCart(userID string, data *entities.OrderData) error
	UpdateOrder(userID string, index int, data *entities.OrderData) error
	DeleteAddress(userID string, index int) error
}

func NewCartService(repo0 repositories.ICartRepository, repo1 repositories.IUsersRepository, repo2 repositories.IProductRepository) ICartService {
	return &cartService{
		CartRepository:    repo0,
		UsersRepository:   repo1,
		ProductRepository: repo2,
	}
}

func (sv cartService) GetOrdersByUserID(userID string) (*entities.CartDataFormat, error) {

	cartData, err := sv.CartRepository.FindCartByUserID(userID)

	if err != nil || cartData == nil {
		return nil, err
	}

	return cartData, nil
}

func (sv cartService) AddtoCart(userID string, data *entities.OrderData) error {

	productData, err := sv.ProductRepository.FindProductByID(data.ProductID)

	if err != nil {
		return err
	}

	price := productData.Price * data.Quantity

	data.Total = price

	status := sv.CartRepository.InsertNewOrder(userID, data)

	return status
}

func (sv cartService) UpdateOrder(userID string, index int, data *entities.OrderData) error {
	_, err := sv.GetOrdersByUserID(userID)

	if err != nil {
		return err
	}

	productData, err := sv.ProductRepository.FindProductByID(data.ProductID)

	if err != nil {
		return err
	}

	price := productData.Price * data.Quantity

	data.Total = price

	err = sv.CartRepository.UpdateOrder(userID, index, data)

	if err != nil {
		return err
	}

	return nil
}

func (sv cartService) DeleteAddress(userID string, index int) error {
	data, err := sv.GetOrdersByUserID(userID)

	if err != nil {
		return err
	}

	if len(data.Orders) <= 0 {
		return fmt.Errorf("cannot delete last address")
	}

	if index < 0 || index >= len(data.Orders) {
		return fmt.Errorf("index out of bound or is negative")
	}

	err = sv.CartRepository.RemoveOrder(data, index)

	if err != nil {
		return err
	}

	return nil
}

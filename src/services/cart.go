package services

import (
	"go-ecommerce/domain/entities"
	"go-ecommerce/domain/repositories"
)

type cartService struct {
	CartRepository  repositories.ICartRepository
	UsersRepository repositories.IUsersRepository
}

type ICartService interface {
	GetOrdersByUserID(userID string) (*entities.CartDataFormat, error)
}

func NewCartService(repo0 repositories.ICartRepository, repo1 repositories.IUsersRepository) ICartService {
	return &cartService{
		CartRepository:  repo0,
		UsersRepository: repo1,
	}
}

func (sv cartService) GetOrdersByUserID(userID string) (*entities.CartDataFormat, error) {

	cartData, err := sv.CartRepository.FindCartByUserID(userID)

	if err != nil || cartData == nil {
		return nil, err
	}

	return cartData, nil
}

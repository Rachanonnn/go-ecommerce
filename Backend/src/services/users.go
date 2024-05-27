package services

import (
	"fmt"
	"go-ecommerce/domain/entities"
	"go-ecommerce/domain/repositories"
)

type usersService struct {
	UsersRepository   repositories.IUsersRepository
	AddressRepository repositories.IAddressRepository
	CartRepository    repositories.ICartRepository
}

type IUsersService interface {
	GetAllUser() ([]entities.UserDataFormat, error)
	InsertNewAccount(data *entities.UserDataFormat) bool
	GetUserByID(userID string) (*entities.UserDataFormat, error)
	UpdateUser(userID string, data *entities.UserDataFormat) error
	DeleteUser(userID string) error
}

func NewUsersService(repo0 repositories.IUsersRepository, repo1 repositories.IAddressRepository, repo2 repositories.ICartRepository) IUsersService {
	return &usersService{
		UsersRepository:   repo0,
		AddressRepository: repo1,
		CartRepository:    repo2,
	}
}

func (sv usersService) GetAllUser() ([]entities.UserDataFormat, error) {
	userData, err := sv.UsersRepository.FindAll()
	if err != nil {
		return nil, err
	}

	return userData, nil

}

func (sv usersService) InsertNewAccount(data *entities.UserDataFormat) bool {
	status := sv.UsersRepository.InsertNewUser(data)

	err := sv.AddressRepository.InsertDefaultAddress(data.UserID)

	if err != nil {
		return false
	}

	err = sv.CartRepository.InsertDefaultCart(data.UserID)

	if err != nil {
		return false
	}

	return status
}

func (sv usersService) GetUserByID(userID string) (*entities.UserDataFormat, error) {

	userData, err := sv.UsersRepository.FindByID(userID)

	if err != nil || userData == nil {
		return nil, err
	}

	return userData, nil
}

func (sv usersService) UpdateUser(userID string, data *entities.UserDataFormat) error {

	userToUpDate, err := sv.GetUserByID(userID)

	if userToUpDate == nil || err != nil {
		return err
	}

	err = sv.UsersRepository.UpdateUser(userID, data)

	fmt.Println(err)

	return err
}

func (sv usersService) DeleteUser(userID string) error {

	userToDelete, err := sv.GetUserByID(userID)

	if err != nil || userToDelete == nil {
		return err
	}

	err = sv.UsersRepository.DeleteUser(userID)

	if err != nil {
		return err
	}

	return nil
}

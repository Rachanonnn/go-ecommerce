package services

import (
	"fmt"
	"go-ecommerce/domain/entities"
	"go-ecommerce/domain/repositories"

	"github.com/gofiber/fiber/v2/log"
)

type addressService struct {
	AddressRepository repositories.IAddressRepository
	UsersRepository   repositories.IUsersRepository
}

type IAddressService interface {
	GetAddressByUserID(userID string) (*entities.AddressDataFormat, error)
	InsertNewAddress(userID string, data *entities.AddressData) bool
	UpdateAddress(userID string, index int, data *entities.AddressData) error
	DeleteAddress(userID string, index int) error
}

func NewAddressService(repo0 repositories.IAddressRepository, repo1 repositories.IUsersRepository) IAddressService {
	return &addressService{
		AddressRepository: repo0,
		UsersRepository:   repo1,
	}
}

func (sv addressService) GetAddressByUserID(userID string) (*entities.AddressDataFormat, error) {
	addressData, err := sv.AddressRepository.FindAddressByUserID(userID)

	log.Info(addressData)

	if err != nil || addressData == nil {
		return nil, err
	}

	return addressData, nil
}

func (sv addressService) InsertNewAddress(userID string, data *entities.AddressData) bool {

	addresses, err := sv.GetAddressByUserID(userID)

	if err != nil {
		return false
	}

	if len(addresses.AddressData) >= 3 {
		return false
	}

	status := sv.AddressRepository.InsertNewAddress(userID, data)

	return status
}

func (sv addressService) UpdateAddress(userID string, index int, data *entities.AddressData) error {

	_, err := sv.GetAddressByUserID(userID)

	if err != nil {
		return err
	}

	err = sv.AddressRepository.UpdateAddress(userID, index, data)

	if err != nil {
		return err
	}

	return nil
}

func (sv addressService) DeleteAddress(userID string, index int) error {

	data, err := sv.GetAddressByUserID(userID)

	if err != nil {
		return err
	}

	if len(data.AddressData) <= 1 {
		return fmt.Errorf("cannot delete last address")
	}

	err = sv.AddressRepository.RemoveAddress(data, index)

	if err != nil {
		return err
	}

	return nil
}

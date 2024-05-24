package services

import (
	"fmt"
	"go-ecommerce/domain/entities"
	"go-ecommerce/domain/repositories"
)

type addressService struct {
	AddressRepository repositories.IAddressRepository
}

type IAddressService interface {
	GetAddressByID(userID string) ([]entities.AddressDataFormat, error)
	InsertNewAddress(userID string, data *entities.AddressDataFormat) bool
	UpdateAddress(userID string, index int, data *entities.AddressDataFormat) error
	DeleteAddress(userID string, index int) error
}

func NewAddressService(repo0 repositories.IAddressRepository) IAddressService {
	return &addressService{
		AddressRepository: repo0,
	}
}

func (sv addressService) GetAddressByID(userID string) ([]entities.AddressDataFormat, error) {
	addressData, err := sv.AddressRepository.FindAddressByUserID(userID)

	if err != nil || addressData == nil {
		return nil, err
	}

	return addressData, nil
}

func (sv addressService) InsertNewAddress(userID string, data *entities.AddressDataFormat) bool {

	addressData, err := sv.GetAddressByID(userID)

	if err != nil {
		return false
	}

	if len(addressData) >= 3 {
		return false
	}

	status := sv.AddressRepository.InsertNewAddress(userID, data)
	return status
}

func (sv addressService) UpdateAddress(userID string, index int, data *entities.AddressDataFormat) error {

	addressData, err := sv.GetAddressByID(userID)

	if err != nil {
		return err
	}

	if index < 0 || index >= len(addressData) {
		return fmt.Errorf("invalid index")
	}

	err = sv.AddressRepository.UpdateAddress(userID, index, data)

	if err != nil {
		return err
	}

	return err
}

func (sv addressService) DeleteAddress(userID string, index int) error {

	_, err := sv.GetAddressByID(userID)

	if err != nil {
		return err
	}

	err = sv.AddressRepository.DeleteAddress(userID, index)

	if err != nil {
		return err
	}

	return nil
}

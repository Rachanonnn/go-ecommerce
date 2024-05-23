package services

import (
	"go-ecommerce/domain/entities"
	"go-ecommerce/domain/repositories"
)

type productService struct {
	ProductRepository repositories.IProductRepository
}

type IProductService interface {
	GetAllProduct() ([]entities.ProductDataFormat, error)
	InsertNewProduct(data *entities.ProductDataFormat) bool
}

func NewProductService(repo0 repositories.IProductRepository) IProductService {
	return &productService{
		ProductRepository: repo0,
	}
}

func (sv productService) GetAllProduct() ([]entities.ProductDataFormat, error) {
	productData, err := sv.ProductRepository.GetAllProduct()
	if err != nil {
		return nil, err
	}

	return productData, nil
}

func (sv productService) InsertNewProduct(data *entities.ProductDataFormat) bool {
	status := sv.ProductRepository.InsertNewProduct(data)
	return status
}

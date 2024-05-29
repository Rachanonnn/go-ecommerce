package services

import (
	"fmt"
	"go-ecommerce/domain/entities"
	"go-ecommerce/domain/repositories"
	"strconv"
)

type productService struct {
	ProductRepository repositories.IProductRepository
}

type IProductService interface {
	GetAllProduct() ([]entities.ProductDataFormat, error)
	GetProductByID(productID string) (*entities.ProductDataFormat, error)
	InsertNewProduct(data *entities.ProductDataFormat) bool
	UpdateProduct(productID string, data *entities.ProductDataFormat) error
	DeleteProduct(productID string) error
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

func (sv productService) GetProductByID(productID string) (*entities.ProductDataFormat, error) {
	productData, err := sv.ProductRepository.FindProductByID(productID)

	if err != nil || productData == nil {
		return nil, err
	}

	return productData, nil
}

func (sv productService) GenerateNewProductID() (int, error) {
	// Get the most recent product ID from the database
	maxProductID, err := sv.ProductRepository.GetMaxProductID()
	if err != nil {
		return 0, err
	}

	// Convert the maximum product ID to an integer
	lastID, err := strconv.Atoi(maxProductID)
	if err != nil {
		return 0, err
	}

	// Increment the product ID by 1
	newID := lastID + 1

	return newID, nil
}

func (sv productService) InsertNewProduct(data *entities.ProductDataFormat) bool {
	// Generate a new product ID
	newID, err := sv.GenerateNewProductID()
	if err != nil {
		return false
	}

	// Assign the generated product ID to the data
	data.ProductID = strconv.Itoa(newID)

	// Call the repository to insert the new product
	status := sv.ProductRepository.InsertNewProduct(data)

	return status
}

func (sv productService) UpdateProduct(productID string, data *entities.ProductDataFormat) error {

	productToUpDate, err := sv.GetProductByID(productID)

	if productToUpDate == nil || err != nil {
		return err
	}

	err = sv.ProductRepository.UpdateProduct(productID, data)

	fmt.Println(err)

	return err
}

func (sv productService) DeleteProduct(productID string) error {
	productToDelete, err := sv.GetProductByID(productID)

	if err != nil || productToDelete == nil {
		return err
	}

	err = sv.ProductRepository.DeleteProduct(productID)

	if err != nil {
		return err
	}

	return nil
}

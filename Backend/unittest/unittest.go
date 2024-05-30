package unittest

import (
	ds "go-ecommerce/domain/datasources"
	repo "go-ecommerce/domain/repositories"
	sv "go-ecommerce/src/services"
	"go-ecommerce/unittest/test"
	"log"

	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	mongodb := ds.NewMongoDB(10)

	userMongo := repo.NewUsersRepository(mongodb)
	addressMongo := repo.NewAddressRepository(mongodb)
	cartMongo := repo.NewCartRepository(mongodb)
	// productMongo := repo.NewProductRepository(mongodb)

	sv0 := sv.NewUsersService(userMongo, addressMongo, cartMongo)
	// sv1 := sv.NewProductService(productMongo)
	// sv2 := sv.NewAddressService(addressMongo, userMongo)
	// sv3 := sv.NewCartService(cartMongo, userMongo, productMongo)
	// sv4 := sv.NewGoogleService()

	// TestCaseUserService
	test.TestCaseGetAllUserStatusOK(sv0)
}

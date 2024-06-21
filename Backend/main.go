package main

import (
	"go-ecommerce/configuration"
	ds "go-ecommerce/domain/datasources"
	repo "go-ecommerce/domain/repositories"
	gw "go-ecommerce/src/gateways"
	"go-ecommerce/src/middlewares"
	sv "go-ecommerce/src/services"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
)

func main() {

	// // // remove this before deploy ###################
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	// /// ############################################

	app := fiber.New(configuration.NewFiberConfiguration())

	middlewares.Logger(app)
	app.Use(recover.New())
	app.Use(cors.New())

	mongodb := ds.NewMongoDB(10)

	userMongo := repo.NewUsersRepository(mongodb)
	productMongo := repo.NewProductRepository(mongodb)
	addressMongo := repo.NewAddressRepository(mongodb)
	cartMongo := repo.NewCartRepository(mongodb)

	sv0 := sv.NewUsersService(userMongo, addressMongo, cartMongo)
	sv1 := sv.NewProductService(productMongo)
	sv2 := sv.NewAddressService(addressMongo, userMongo)
	sv3 := sv.NewCartService(cartMongo, userMongo, productMongo)
	sv4 := sv.NewGoogleService()
	sv5 := sv.NewStripeService(userMongo)

	gw.NewHTTPGateway(app, sv0, sv1, sv2, sv3, sv4, sv5)

	PORT := os.Getenv("DB_PORT_LOGIN")

	if PORT == "" {
		PORT = "8000"
	}

	app.Listen(":" + PORT)
}

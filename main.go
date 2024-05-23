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

	"go-ecommerce/src/libs"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
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

	// create a config for google config
	conf := &oauth2.Config{
		ClientID:     os.Getenv("G_CLIENT_ID"),
		ClientSecret: os.Getenv("G_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("G_REDIRECT"),
		Endpoint:     google.Endpoint,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
	}

	app.Get("/google", func(c *fiber.Ctx) error {
		// create url for auth process.
		// we can pass state as someway to identify
		// and validate the login process.
		URL := conf.AuthCodeURL("not-implemented-yet")

		// redirect to the google authentication URL
		return c.Redirect(URL)
	})

	app.Get("/auth/callback", func(c *fiber.Ctx) error {
		// get auth code from the query
		code := c.Query("code")

		// exchange the auth code that retrieved from google via
		// URL query parameter into an access token.
		token, err := conf.Exchange(c.Context(), code)
		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		// convert token to user data
		profile, err := libs.ConvertToken(token.AccessToken)
		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}

		return c.JSON(profile)
	})

	mongodb := ds.NewMongoDB(10)

	userMongo := repo.NewUsersRepository(mongodb)

	sv0 := sv.NewUsersService(userMongo)

	gw.NewHTTPGateway(app, sv0)

	PORT := os.Getenv("DB_PORT_LOGIN")

	if PORT == "" {
		PORT = "8000"
	}

	app.Listen(":" + PORT)
}

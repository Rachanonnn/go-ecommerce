package services

import (
	"os"

	"go-ecommerce/src/libs"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type googleService struct {
	conf *oauth2.Config
}

type IGoogleService interface {
	GoogleAuthentication() string
	GoogleCallback(c *fiber.Ctx, code string) (*libs.GooglePayload, error)
}

func NewGoogleService() IGoogleService {
	conf := &oauth2.Config{
		ClientID:     os.Getenv("G_CLIENT_ID"),
		ClientSecret: os.Getenv("G_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("G_REDIRECT"),
		Endpoint:     google.Endpoint,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
	}
	return &googleService{
		conf: conf,
	}
}

func (g *googleService) GoogleAuthentication() string {
	URL := g.conf.AuthCodeURL("not-implemented-yet")
	return URL
}

func (g *googleService) GoogleCallback(c *fiber.Ctx, code string) (*libs.GooglePayload, error) {

	// exchange the auth code that retrieved from google via
	// URL query parameter into an access token.
	token, err := g.conf.Exchange(c.Context(), code)
	if err != nil {
		return nil, err
	}

	// convert token to user data
	profile, err := libs.ConvertToken(token.AccessToken)
	if err != nil {
		return nil, err
	}
	return profile, nil
}

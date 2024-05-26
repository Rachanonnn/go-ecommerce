package repositories

import (
	"context"
	"fmt"
	. "go-ecommerce/domain/datasources"
	"go-ecommerce/domain/entities"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type cartRepository struct {
	Context    context.Context
	Collection *mongo.Collection
}

type ICartRepository interface {
	InsertDefaultCart(userID string) error
	FindCartByUserID(userID string) (*entities.CartDataFormat, error)
}

func NewCartRepository(db *MongoDB) ICartRepository {
	return &cartRepository{
		Context:    db.Context,
		Collection: db.MongoDB.Database(os.Getenv("DATABASE_NAME")).Collection("Cart"),
	}
}

func (repo cartRepository) InsertDefaultCart(userID string) error {

	_, err := repo.Collection.InsertOne(repo.Context, bson.M{"user_id": userID, "cart_data": []entities.CartData{}})

	if err != nil {
		return err
	}

	return nil
}

func (repo cartRepository) FindCartByUserID(userID string) (*entities.CartDataFormat, error) {

	result := entities.CartDataFormat{}

	user := repo.Collection.FindOne(repo.Context, bson.M{"user_id": userID}).Decode(&result)

	if user == mongo.ErrNoDocuments {
		return nil, fmt.Errorf("User not found")
	}

	return &result, nil
}

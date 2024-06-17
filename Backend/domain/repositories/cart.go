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
	InsertNewOrder(userID string, data *entities.OrderData) error
	UpdateOrder(userID string, index int, newData *entities.OrderData) error
	RemoveOrder(data *entities.CartDataFormat, index int) error
	UpdateCart(userID string, data *entities.CartDataFormat) error
}

func NewCartRepository(db *MongoDB) ICartRepository {
	return &cartRepository{
		Context:    db.Context,
		Collection: db.MongoDB.Database(os.Getenv("DATABASE_NAME")).Collection("Cart"),
	}
}

func (repo cartRepository) InsertDefaultCart(userID string) error {

	_, err := repo.Collection.InsertOne(repo.Context, bson.M{"user_id": userID, "cart_data": []entities.OrderData{}})

	if err != nil {
		return err
	}

	return nil
}

func (repo cartRepository) FindCartByUserID(userID string) (*entities.CartDataFormat, error) {

	result := entities.CartDataFormat{}

	err := repo.Collection.FindOne(repo.Context, bson.M{"user_id": userID}).Decode(&result)

	if err == mongo.ErrNoDocuments {
		return nil, fmt.Errorf("user not found")
	}

	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (repo cartRepository) InsertNewOrder(userID string, data *entities.OrderData) error {

	filter := bson.M{"user_id": userID}

	update := bson.M{
		"$push": bson.M{
			"cart_data": bson.M{"$each": []interface{}{data}},
		},
	}

	result, err := repo.Collection.UpdateOne(repo.Context, filter, update)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return err
	}

	return err
}

func (repo cartRepository) UpdateOrder(userID string, index int, newData *entities.OrderData) error {
	filter := bson.M{"user_id": userID}

	update := bson.M{
		"$set": bson.M{
			fmt.Sprintf("cart_data.%d", index): newData, // Update the element at the specified index
		},
	}

	result, err := repo.Collection.UpdateOne(repo.Context, filter, update)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return fmt.Errorf("user not found")
	}

	return nil
}

func (repo cartRepository) RemoveOrder(data *entities.CartDataFormat, index int) error {
	filter := bson.M{"user_id": data.UserID}

	Update := bson.M{
		"$pull": bson.M{"cart_data": data.Orders[index]},
	}

	_, err := repo.Collection.UpdateOne(repo.Context, filter, Update)
	if err != nil {
		return err
	}

	return nil
}

func (repo cartRepository) UpdateCart(userID string, data *entities.CartDataFormat) error {

	_, err := repo.Collection.UpdateOne(repo.Context, bson.M{"user_id": userID}, bson.M{"$set": data})

	if err != nil {
		return err
	}

	return nil
}

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

type addressRepository struct {
	Context    context.Context
	Collection *mongo.Collection
}

type IAddressRepository interface {
	InsertDefaultAddress(userID string) error
	FindAddressByUserID(userID string) (*entities.AddressDataFormat, error)
	InsertNewAddress(userID string, data *entities.AddressData) bool
	UpdateAddress(userID string, index int, newData *entities.AddressData) error
	PushAddress(data *entities.AddressDataFormat, index int) error
}

func NewAddressRepository(db *MongoDB) IAddressRepository {
	return &addressRepository{
		Context:    db.Context,
		Collection: db.MongoDB.Database(os.Getenv("DATABASE_NAME")).Collection("Address"),
	}
}

func (repo addressRepository) InsertDefaultAddress(userID string) error {

	_, err := repo.Collection.InsertOne(repo.Context, bson.M{"user_id": userID, "address_data": []entities.AddressData{}})

	if err != nil {
		return err
	}

	return nil
}

func (repo addressRepository) InsertNewAddress(userID string, data *entities.AddressData) bool {

	filter := bson.M{"user_id": userID}

	update := bson.M{
		"$push": bson.M{
			"address_data": bson.M{"$each": []interface{}{data}},
		},
	}

	result, err := repo.Collection.UpdateOne(repo.Context, filter, update)

	if err != nil {
		return false
	}

	if result.MatchedCount == 0 {
		return false
	}

	return true
}

func (repo addressRepository) FindAddressByUserID(userID string) (*entities.AddressDataFormat, error) {

	result := entities.AddressDataFormat{}

	user := repo.Collection.FindOne(repo.Context, bson.M{"user_id": userID}).Decode(&result)

	fmt.Println(result)

	if user == mongo.ErrNoDocuments {
		return nil, fmt.Errorf("User not found")
	}

	return &result, nil
}

func (repo addressRepository) UpdateAddress(userID string, index int, newData *entities.AddressData) error {

	filter := bson.M{"user_id": userID}

	update := bson.M{
		"$set": bson.M{
			fmt.Sprintf("address_data.%d", index): newData, // Update the element at the specified index
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

func (repo addressRepository) PushAddress(data *entities.AddressDataFormat, index int) error {

	filter := bson.M{"user_id": data.UserID}

	Update := bson.M{
		"$pull": bson.M{"address_data": data.AddressData[index]},
	}

	_, err := repo.Collection.UpdateOne(repo.Context, filter, Update)
	if err != nil {
		return err
	}

	return nil
}

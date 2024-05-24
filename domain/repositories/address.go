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
	FindAddressByUserID(userID string) ([]entities.AddressDataFormat, error)
	InsertNewAddress(userID string, data *entities.AddressDataFormat) bool
	UpdateAddress(userID string, index int, newData *entities.AddressDataFormat) error
	DeleteAddress(userID string, index int) error
}

func NewAddressRepository(db *MongoDB) IAddressRepository {
	return &addressRepository{
		Context:    db.Context,
		Collection: db.MongoDB.Database(os.Getenv("DATABASE_NAME")).Collection("Address"),
	}
}

func (repo addressRepository) InsertNewAddress(userID string, data *entities.AddressDataFormat) bool {

	result := entities.UserDataFormat{}

	user := repo.Collection.FindOne(repo.Context, bson.M{"user_id": userID}).Decode(&result)

	if user == mongo.ErrNoDocuments {
		return false
	}

	result.Addresses = append(result.Addresses, *data)

	_, err := repo.Collection.UpdateOne(repo.Context, bson.M{"user_id": userID}, bson.M{"$set": result})

	if err != nil {
		return false
	}

	return true
}

func (repo addressRepository) FindAddressByUserID(userID string) ([]entities.AddressDataFormat, error) {

	result := entities.UserDataFormat{}

	user := repo.Collection.FindOne(repo.Context, bson.M{"user_id": userID}).Decode(&result)

	if user == mongo.ErrNoDocuments {
		return nil, fmt.Errorf("Address not found")
	}

	return result.Addresses, nil
}

func (repo addressRepository) UpdateAddress(userID string, index int, newData *entities.AddressDataFormat) error {

	result := entities.UserDataFormat{}

	user := repo.Collection.FindOne(repo.Context, bson.M{"user_id": userID}).Decode(&result)

	if user == mongo.ErrNoDocuments {
		return fmt.Errorf("Address not found")
	}

	result.Addresses[index] = *newData

	_, err := repo.Collection.UpdateOne(repo.Context, bson.M{"user_id": userID}, bson.M{"$set": newData})

	fmt.Println(err)

	if err != nil {
		return err
	}

	return nil

}

func (repo addressRepository) DeleteAddress(userID string, index int) error {

	result := entities.UserDataFormat{}

	err := repo.Collection.FindOne(repo.Context, bson.M{"user_id": userID}).Decode(&result)

	if err == mongo.ErrNoDocuments {
		return fmt.Errorf("Address not found")
	}

	result.Addresses = append(result.Addresses[:index], result.Addresses[index+1:]...)

	_, err = repo.Collection.UpdateOne(repo.Context, bson.M{"user_id": userID}, bson.M{"$set": result})

	if err != nil {
		return err
	}

	return nil
}

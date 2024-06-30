package repositories

import (
	"context"
	"os"

	"go.mongodb.org/mongo-driver/mongo"

	. "go-ecommerce/domain/datasources"
	"go-ecommerce/domain/entities"
)

type HistoryCartRepository struct {
	Context    context.Context
	Collection *mongo.Collection
}

type IHistoryCartRepository interface {
	InsertNewHistoryCart(data *entities.HistoryCartData) error
}

func NewHistoryCartRepository(db *MongoDB) IHistoryCartRepository {
	return &HistoryCartRepository{
		Context:    db.Context,
		Collection: db.MongoDB.Database(os.Getenv("DATABASE_NAME")).Collection("history_cart"),
	}
}
func (repo *HistoryCartRepository) InsertNewHistoryCart(data *entities.HistoryCartData) error {

	_, err := repo.Collection.InsertOne(repo.Context, data)
	if err != nil {
		return err
	}

	return nil
}

package repositories

import (
	"context"
	. "go-ecommerce/domain/datasources"
	"go-ecommerce/domain/entities"
	"os"

	fiberlog "github.com/gofiber/fiber/v2/log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type productRepository struct {
	Context    context.Context
	Collection *mongo.Collection
}

type IProductRepository interface {
	GetAllProduct() ([]entities.ProductDataFormat, error)
	InsertNewProduct(data *entities.ProductDataFormat) bool
}

func NewProductRepository(db *MongoDB) IProductRepository {
	return &productRepository{
		Context:    db.Context,
		Collection: db.MongoDB.Database(os.Getenv("DATABASE_NAME")).Collection("Product"),
	}
}

func (repo productRepository) GetAllProduct() ([]entities.ProductDataFormat, error) {
	options := options.Find()
	filter := bson.M{}
	cursor, err := repo.Collection.Find(repo.Context, filter, options)
	if err != nil {
		fiberlog.Errorf("Products -> FindAll: %s \n", err)
		return nil, err
	}
	defer cursor.Close(repo.Context)
	pack := make([]entities.ProductDataFormat, 0)
	for cursor.Next(repo.Context) {
		var item entities.ProductDataFormat

		err := cursor.Decode(&item)
		if err != nil {
			continue
		}

		pack = append(pack, item)
	}
	return pack, nil
}

func (repo productRepository) InsertNewProduct(data *entities.ProductDataFormat) bool {
	if _, err := repo.Collection.InsertOne(repo.Context, data); err != nil {
		fiberlog.Errorf("Products -> InsertNewProduct: %s \n", err)
		return false
	}
	return true
}

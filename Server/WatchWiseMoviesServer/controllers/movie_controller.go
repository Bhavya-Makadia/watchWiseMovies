package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/Bhavya-Makadia/WatchWiseMovies/Server/WatchWiseMoviesServer/database"
	"github.com/Bhavya-Makadia/WatchWiseMovies/Server/WatchWiseMoviesServer/models"
	"go.mongodb.org/mongo-driver/v2/mongo"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
)

var movieCollection *mongo.Collection = database.OpenCollection("movies")

func GetMovies() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()

		var movies []models.Movie

		cursor, err := movieCollection.Find(ctx, bson.M{})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch Movies."})
		}

		defer cursor.Close(ctx)

		// defer is for clearing the resources used by cursor, this is for memory management

		if err = cursor.All(ctx, &movies); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode Movies."})
		}

		c.JSON(http.StatusOK, movies)
	}
}

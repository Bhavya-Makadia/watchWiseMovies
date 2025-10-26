package routes

import (
	controller "github.com/Bhavya-Makadia/WatchWiseMovies/Server/WatchWiseMoviesServer/controllers"
	"github.com/Bhavya-Makadia/WatchWiseMovies/Server/WatchWiseMoviesServer/middleware"
	"github.com/gin-gonic/gin"
)

func SetupProtectedRoutes(router *gin.Engine) {
	router.Use(middleware.AuthMiddleWare())

	router.GET("/movie/:imdb_id", controller.GetMovie())
	router.POST("/addmovie", controller.AddMovie())
	router.GET("/recommendedmovies", controller.GetRecommendedMovies())
	router.PATCH("/updatereview/:imdb_id", controller.AdminReviewUpdate())

}

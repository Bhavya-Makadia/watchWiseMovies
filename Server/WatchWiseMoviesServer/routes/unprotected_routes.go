package routes

import (
	controller "github.com/Bhavya-Makadia/WatchWiseMovies/Server/WatchWiseMoviesServer/controllers"
	"github.com/gin-gonic/gin"
)

func SetupUnProtectedRoutes(router *gin.Engine) {

	router.GET("/movies", controller.GetMovies())
	router.POST("/register", controller.RegisterUser())
	router.POST("/login", controller.LoginUser())
	router.PATCH("/updatereview/:imdb_id", controller.AdminReviewUpdate())

}

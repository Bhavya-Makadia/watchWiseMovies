package models

import (
	"go.mongodb.org/mongo-driver/v2/bson"
)

/* The backticks (`) in Go are not comments, but rather a way to attach metadata to struct fields.
the struct tags define how the data should be serialized, deserialized, and validated.
They provide additional information about the fields, which can be accessed and used by Go libraries and frameworks.
They are Executable code, Machine-readable, By using struct tags, you can customize the behavior of libraries and frameworks without modifying their code */

type Genre struct {
	GenreID   int    `bson:"genre_id" json:"genre_id" validate:"required"`
	GenreName string `bson:"genre_name" json:"genre_name" validate:"required,min=2,max=100"`
}

type Ranking struct {
	RankingValue int    `bson:"ranking_value" json:"ranking_value" validate:"required"`
	RankingName  string `bson:"ranking_name" json:"ranking_name" validate:"required"`
}

type Movie struct {
	ID          bson.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	ImdbID      string        `bson:"imdb_id" json:"imdb_id" validate:"required"`
	Title       string        `bson:"title" json:"title" validate:"required,min=2,max=500"`
	PosterPath  string        `bson:"poster_path" json:"poster_path" validate:"required,url"`
	YouTubeID   string        `bson:"youtube_id" json:"youtube_id" validate:"required"`
	Genre       []Genre       `bson:"genre" json:"genre" validate:"required,dive"` // dive here ensures it validates the nested fields as well
	AdminReview string        `bson:"admin_review" json:"admin_review"`
	Ranking     Ranking       `bson:"ranking" json:"ranking" validate:"required"`
}

package app

import (
	config "AuthInGo/config/env"
	"AuthInGo/controllers"
	repo "AuthInGo/db/repositories"
	"AuthInGo/router"
	"AuthInGo/services"
	"fmt"
	"net/http"
	"time"
	dbConfig "AuthInGo/config/db"
)

type Config struct {
	Addr string
}
type Application struct {
	Config Config
}

// Constructor for Config
func NewConfig() Config {
	port := config.GetString("PORT", ":3001")
	return Config{
		Addr: port,
	}
}

// Constructor for Application
func NewApplication(cfg Config) *Application {
	return &Application{
		Config: cfg,
	}
}

func (app *Application) Run() error {
	db, err := dbConfig.SetupDB();

	if err != nil{
		fmt.Println("Error setting up database", err);
		return err;
	}

	ur := repo.NewUserRepository(db);
	rr := repo.NewRoleRepository(db);
	us := services.NewUserService(ur);
	rs := services.NewRoleService(rr);
	uc := controllers.NewUserController(us);
	rc := controllers.NewRoleController(rs);
	uRouter := router.NewUserRouter(uc);
	rRouter := router.NewRoleRouter(rc);


	server := &http.Server{
		Addr:         app.Config.Addr,
		Handler:      router.SetupRouter(uRouter, rRouter),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	fmt.Print("Starting server on ", app.Config.Addr , "\n")
	return server.ListenAndServe()
}

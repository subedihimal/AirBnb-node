package router

import (
	"AuthInGo/controllers"
	"AuthInGo/middlewares"
	// "AuthInGo/utils"

	"github.com/go-chi/chi/v5"
)
type Router interface{
	Register(r chi.Router)
}

func SetupRouter(UserRouter Router, RoleRouter Router) *chi.Mux{
	chiRouter := chi.NewRouter();

	chiRouter.Use(middlewares.RateLimiterMiddleware);

	chiRouter.Get("/ping", controllers.PingHandler )
	// chiRouter.HandleFunc("/fakestoreapi/*", utils.ProxyToService("https://fakestoreapi.com/", "/fakestoreapi"))   //test using http://localhost:3001/fakestoreapi/products goes to -> https://fakestoreapi.com/products


	chiRouter.Route("/api", func(r chi.Router) {
		UserRouter.Register(r)
		RoleRouter.Register(r)
	})
	return chiRouter;
}
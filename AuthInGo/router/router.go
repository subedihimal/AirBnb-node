package router

import (
	"AuthInGo/controllers"
	"github.com/go-chi/chi/v5"
)
type Router interface{
	Register(r chi.Router)
}

func SetupRouter(UserRouter Router) *chi.Mux{
	chiRouter := chi.NewRouter();

	chiRouter.Get("/ping", controllers.PingHandler )
	chiRouter.Route("/api", func(r chi.Router) {
		UserRouter.Register(r)
	})
	return chiRouter;
}
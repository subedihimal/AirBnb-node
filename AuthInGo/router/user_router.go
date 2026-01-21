package router

import (
	"AuthInGo/controllers"
	"github.com/go-chi/chi/v5"
)
type UserRouter struct{
	userController *controllers.UserController
}

func NewUserRouter(_userController *controllers.UserController) Router {
	return &UserRouter{
		userController: _userController,
	}
}
func (ur *UserRouter)  Register (r chi.Router){
	r.Get("/api/profile", ur.userController.GetUserById)
	r.Post("/api/signup", ur.userController.CreateUser)
	
}
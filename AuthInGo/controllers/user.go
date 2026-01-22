package controllers

import (
	"AuthInGo/services"
	"AuthInGo/utils"
	"fmt"
	"net/http"
)
type UserController struct{
	UserService services.UserService
}

func NewUserController(_userService services.UserService) *UserController{
	return  &UserController{
		UserService: _userService,
	}
}
func (uc *UserController) GetUserById(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Get User Id called in user controller")
	uc.UserService.GetUserById()
	w.Write([]byte("User Fetching Endpoint Done"));
}
func (uc *UserController) CreateUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("CreateUser called in user controller")
	uc.UserService.CreateUser()
	w.Write([]byte("User Fetching Endpoint Done"));
}
func (uc *UserController) LoginUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println("LoginUser called in user controller")
	jwtToken, err := uc.UserService.LoginUser();
	if err != nil{
		w.Write([]byte("Something went wrong"));
		return
	}

	response := map[string] any{
		"message": "User logged in sucessfully",
		"data": jwtToken,
		"sucess": true,
		"error": nil,
	}
	utils.WriteJsonResponse(w, http.StatusOK, response);
}
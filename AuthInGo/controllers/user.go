package controllers

import (
	"AuthInGo/dto"
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
	
	var payload dto.LoginUserRequestDTO;

	if jsonErr := utils.ReadJsonBody(r, &payload); jsonErr != nil{
		utils.WriteJsonErrorResponse(w, http.StatusBadRequest, "Something went wrong with the login", jsonErr);
		return
	}

	if validationErr := utils.Validator.Struct(&payload); validationErr != nil{
		utils.WriteJsonErrorResponse(w, http.StatusBadRequest, "Invalid Input data", validationErr);
		return
	}



	jwtToken, err := uc.UserService.LoginUser(&payload);
	if err != nil{
		utils.WriteJsonErrorResponse(w, http.StatusInternalServerError, "Failed to login user", err)
		return
	}

	utils.WriteJsonSuccessResponse(w, http.StatusOK, "User Logged in sucessfully" , jwtToken);
}
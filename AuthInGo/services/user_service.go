package services

import (
	db "AuthInGo/db/repositories"
	"AuthInGo/utils"
	"fmt"
	env "AuthInGo/config/env"
	"github.com/golang-jwt/jwt/v5"
)

type UserService interface{
	GetUserById() error
	CreateUser() error
	LoginUser() (string, error)
}

type UserServiceImpl struct{
	UserRepository db.UserRepository
}

func NewUserService(_userRepository db.UserRepository) UserService{
	return &UserServiceImpl{
		UserRepository: _userRepository,
	}
}

func (u *UserServiceImpl) GetUserById() error{
	fmt.Println("Fetching User in UserService");
	u.UserRepository.GetById();
	return nil;
}

func (u *UserServiceImpl) CreateUser() error{
	fmt.Println("Creating user in user service");
	password := "example password"
	hashedPassword, err := utils.HashedPassword(password);

	if err != nil{
		return err
	}

	u.UserRepository.Create(
		"username2_example",
		"user@gexample2.com",
		hashedPassword,
	)
	return nil;
}

func (u *UserServiceImpl) LoginUser() (string, error){
	email := "user@gexample2.com"
	password := "example password"
	
	user, err := u.UserRepository. GetByEmail(email);

	if err != nil{
		fmt.Println("Error fetching user by email", err);
		return "",err
	}

	isPasswordValid := utils.CheckPasswordHash(password, user.Password);
	if !isPasswordValid{
		fmt.Println("Passwrod doesnt match");
		return "",nil;
	}

	//Creating JWT token
	payload := jwt.MapClaims{
		"email" : user.Email,
		"id" : user.Id,
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload);

	tokenString, err := token.SignedString([]byte(env.GetString("JWT_SECRET", "token")));

	if err != nil{
		fmt.Println("Error Signing the token", err);
		return  "", err
	}
	fmt.Println("Generaated JWT token:", tokenString)

	return tokenString, nil;
}
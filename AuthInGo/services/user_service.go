package services

import (
	env "AuthInGo/config/env"
	db "AuthInGo/db/repositories"
	"AuthInGo/dto"
	"AuthInGo/utils"
	"fmt"
	"AuthInGo/models"

	"github.com/golang-jwt/jwt/v5"
)

type UserService interface{
	GetUserById(id int64) (*models.User, error)
	CreateUser(payload *dto.CreateUserRequestDTO) (*models.User, error)
	LoginUser(payload *dto.LoginUserRequestDTO) (string, error)
}

type UserServiceImpl struct{
	UserRepository db.UserRepository
}

func NewUserService(_userRepository db.UserRepository) UserService{
	return &UserServiceImpl{
		UserRepository: _userRepository,
	}
}

func (u *UserServiceImpl) GetUserById(id int64) (*models.User, error){
	fmt.Println("Fetching User in UserService");
	user, err := u.UserRepository.GetById(id);
	if err != nil{
		fmt.Println("Error fetching user:", err)
		return nil, err
	}
	return user, nil;
}

func (u *UserServiceImpl) CreateUser(payload *dto.CreateUserRequestDTO) (*models.User, error){
	fmt.Println("Creating user in user service");


	hashedPassword, err := utils.HashedPassword(payload.Password);

	if err != nil{
		fmt.Println("Error hashing password: ", err);
		return nil, err
	}

	user, err := u.UserRepository.Create(payload.Username, payload.Email, hashedPassword);

	if err != nil{
		fmt.Println("Error creating user:", err);
		return nil, err
	}
	return user, nil;
}

func (u *UserServiceImpl) LoginUser(payload *dto.LoginUserRequestDTO) (string, error){
	email := payload.Email
	password := payload.Password
	
	user, err := u.UserRepository. GetByEmail(email);

	if err != nil{
		fmt.Println("Error fetching user by email", err);
		return "",err
	}

	isPasswordValid := utils.CheckPasswordHash(password, user.Password);
	if !isPasswordValid{
		fmt.Println("Password doesnt match");
		return "",nil;
	}

	jwtPayload := jwt.MapClaims{
		"email": user.Email,
		"id": user.Id,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwtPayload);

	tokenString, err := token.SignedString([]byte(env.GetString("JWT_SECRET", "token")));

	if err != nil{
		fmt.Println("Error Signing the token", err);
		return  "", err
	}
	fmt.Println("Generaated JWT token:", tokenString)

	return tokenString, nil;
}
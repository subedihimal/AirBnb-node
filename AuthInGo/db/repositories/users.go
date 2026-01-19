package db

import (
	"AuthInGo/models"
	"database/sql"
	"fmt"
)

type UserRepository interface{
	GetById() error
}
type UserRepositoryImpl struct{
	 db *sql.DB
}
func NewUserRepository(_db *sql.DB) UserRepository{
	return &UserRepositoryImpl{
		db: _db,
	}
}
func (u *UserRepositoryImpl) GetById() error{
	fmt.Println("Fetching uesr in user Repository");

	//1. Process the query
	query := "SELECT id, username, email, password, created_at, updated_at FROM users WHERE id= ?"

	//2 Execute the query
	row := u.db.QueryRow(query, 1);

	//3 Process the result
	user := &models.User{}

	err := row.Scan(&user.Id, &user.Username, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt);

	if err != nil{
		if err == sql.ErrNoRows{
			fmt.Println("No user found with the given Id");
			return nil
		}else{
			fmt.Println("Error scanning user", err);
			return err
		}
	}

	//4 Return the object

	fmt.Println("User fetched sucessfully", user)
	return nil
}
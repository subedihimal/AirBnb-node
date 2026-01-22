package db

import (
	"AuthInGo/models"
	"database/sql"
	"fmt"
)

type UserRepository interface{
	GetById() (*models.User, error)
	Create(username string, email string, hashedPassword string) error
	GetByEmail(email string) (*models.User, error)
	GetAll() ([]*models.User, error)
	DeleteById(id int64) error
}
type UserRepositoryImpl struct{
	 db *sql.DB
}
func NewUserRepository(_db *sql.DB) UserRepository{
	return &UserRepositoryImpl{
		db: _db,
	}
}
//Need to implement
func (u *UserRepositoryImpl) GetAll() ([]*models.User, error){
	return nil,nil;
}

//Need to implement
func (u *UserRepositoryImpl) DeleteById(id int64) error{
	return nil;
}
func (u *UserRepositoryImpl) GetByEmail(email string) (*models.User, error){
	query := "SELECT id, email, password FROM users WHERE email = ?"
	row := u.db.QueryRow(query, email);
	user := &models.User{};

	err := row.Scan(&user.Id, &user.Email, &user.Password);

	if err != nil{
		if err == sql.ErrNoRows{
			fmt.Println("No user found with the given email");
			return  nil,err;
		}else{
			fmt.Print("Error scanning the user", err);
			return nil,err;
		}
	}
	return user, nil
	
}

func (u *UserRepositoryImpl) Create(username string, email string, hashedPassword string) (error){
	fmt.Println("Starting the user creation process...");

	query := "INSERT INTO users (username, email, password) VALUES( ?, ?, ?)";
	result, err := u.db.Exec(query, username, email, hashedPassword);

	if err != nil{
		fmt.Println("Error inserting user", err);
		return err
	}
	rowsAffected, rowErr := result.RowsAffected();

	if rowErr != nil{
		fmt.Println("Error getting rows effected", rowErr);
		return rowErr;
	}
	if rowsAffected == 0{
		fmt.Println("No rows were created");
		return nil;
	}
	fmt.Println("User created, rows effected = ", rowsAffected);

	return   nil;

}

func (u *UserRepositoryImpl) GetById() (*models.User, error){
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
			return nil, err
		}else{
			fmt.Println("Error scanning user", err);
			return nil, err
		}
	}

	//4 Return the object

	fmt.Println("User fetched sucessfully", user)
	return user, nil
}
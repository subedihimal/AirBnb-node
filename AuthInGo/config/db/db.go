package config

import (
	env "AuthInGo/config/env"
	"database/sql"
	"fmt"

	"github.com/go-sql-driver/mysql"
)

func SetupDB() (*sql.DB, error){
	cfg := mysql.NewConfig();

	cfg.User = env.GetString("DB_USER", "root");
	cfg.Passwd = env.GetString("DB_PASS", "root");
	cfg.Net = env.GetString("DB_NET", "tcp");
	cfg.Addr = env.GetString("DB_ADDR","127.0.0.1:3306");
	cfg.DBName = env.GetString("DBNAME", "airbnb_auth_service");

	fmt.Println("Connecting to the db:", cfg.DBName, cfg.FormatDSN());
	db, err := sql.Open("mysql",cfg.FormatDSN());

	if err!=nil{
		fmt.Println("Error Connecting to Db: ", err);
		return nil, err
	}
	fmt.Println("Trying to Db...");
	pingErr := db.Ping();

	if pingErr != nil{
		fmt.Println("Error Pinging the db", pingErr);
		return nil, pingErr
	}
	fmt.Println("Connected to the db sucessfully", cfg.DBName)
	return db, nil;
}
package db
import (
	"AuthInGo/models"
)

type RolePermissionRepository interface {
	GetPermissionById(id int64) (*models.Permission, error)
	GetRolePermissionByRoleId(roleId int64) ([]*models.Permission, error)
	AddPermissionToRole(roleId int64, permissionId int64) error
	GetAllRolePermissions() ([]*models.RolePermission, error)
}
//To implement
package services
import (
	"AuthInGo/models"
	repositories "AuthInGo/db/repositories"
)

type RoleService interface {
	GetRoleById(id int64) (*models.Role, error)
	GetRolesByName(name string) (*models.Role, error)
	GetAllRoles() ([]*models.Role, error)
	CreateRole(name string, description string) (*models.Role, error)
	DeleteRoleById(id int64) error
	UpdateRole(id int64, name string, description string)(*models.Role, error)
	GetRolePermissions(roleId int64) ([]*models.Permission, error)
	AddPermissionToRole(roleId int64, permissionId int64) error
}

type RoleServiceImpl struct{
	roleRepository repositories.RoleRepository
	rolePermissionRepository repositories.RolePermissionRepository
}

func NewRoleService(roleRepo repositories.RoleRepository) RoleService{
	return &RoleServiceImpl{
		roleRepository: roleRepo,
	}
}

func (s *RoleServiceImpl) GetRoleById(id int64) (*models.Role, error){
	return s.roleRepository.GetRoleById(id)
}

func (s *RoleServiceImpl) GetRolesByName(name string) (*models.Role, error){
	return s.roleRepository.GetRolesByName(name)
}

func (s *RoleServiceImpl) GetAllRoles() ([]*models.Role, error){
	return s.roleRepository.GetAllRoles()
}

func (s *RoleServiceImpl) CreateRole(name string, description string) (*models.Role, error){
	return s.roleRepository.CreateRole(name, description)
}

func (s *RoleServiceImpl) DeleteRoleById(id int64) error{
	return s.roleRepository.DeleteRoleById(id)
}

func (s *RoleServiceImpl) UpdateRole(id int64, name string, description string)(*models.Role, error){
	return s.roleRepository.UpdateRole(id, name, description)
}

func (s *RoleServiceImpl) GetRolePermissions(roleId int64) ([]*models.Permission, error){
	return  s.rolePermissionRepository.GetRolePermissionByRoleId(roleId)
}

func (s *RoleServiceImpl) AddPermissionToRole(roleId int64, permissionId int64) error{
	return s.rolePermissionRepository.AddPermissionToRole(roleId, permissionId)
}
package controllers

import (
	"AuthInGo/services"
	"AuthInGo/utils"
	"net/http"
	"fmt"
	"strconv"
)

type RoleController struct {
	RoleService services.RoleService
}

func NewRoleController(roleService services.RoleService) *RoleController {
	return &RoleController{
		RoleService: roleService,
	}
}

func (rc *RoleController) GetRoleById(w http.ResponseWriter, r *http.Request) {
	roleId := r.URL.Query().Get("id");
	if roleId == "" {
		utils.WriteJsonErrorResponse(w, http.StatusBadRequest, "Role ID is required", fmt.Errorf("Role ID is required"))
		return
	}
	id, err := strconv.ParseInt(roleId, 10, 64)
	if err != nil {
		utils.WriteJsonErrorResponse(w, http.StatusBadRequest, "Invalid Role ID", err)
		return
	}
	role, err := rc.RoleService.GetRoleById(id)
	if err != nil {
		utils.WriteJsonErrorResponse(w, http.StatusInternalServerError, "Failed to get role", err)
		return
	}
	if role == nil {
		utils.WriteJsonErrorResponse(w, http.StatusNotFound, "Role not found", fmt.Errorf("Role not found"))
		return
	}
	utils.WriteJsonResponse(w, http.StatusOK, role)
}

func (rc *RoleController) GetAllRoles(w http.ResponseWriter, r *http.Request) {
	roles, err := rc.RoleService.GetAllRoles()
	if err != nil {
		utils.WriteJsonErrorResponse(w, http.StatusInternalServerError, "Failed to get roles", err)
		return
	}
	utils.WriteJsonResponse(w, http.StatusOK, roles)
}

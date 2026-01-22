package utils

import (
	"encoding/json"
	"net/http"
)

func WriteJsonResponse(w http.ResponseWriter, status int, data any) error{
	w.Header().Set("Content-Type", "application/json"); //Set content type to application/json
	w.WriteHeader(status); //Set up HTTP status code

	return json.NewEncoder(w).Encode(data); // Encode the ddata as json and write it to the response
}

func ReadJsonBody(r *http.Request, result any) error {
	decoder := json.NewDecoder(r.Body);
	decoder.DisallowUnknownFields();

	return decoder.Decode(result);
}
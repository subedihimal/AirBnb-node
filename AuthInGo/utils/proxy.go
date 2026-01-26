package utils

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"
)

func ProxyToService(targetBaseUrl string, pathPreflix string) http.HandlerFunc{
	target, err := url.Parse(targetBaseUrl)
	if err != nil{
		fmt.Println("Error parsing the target URL : ", err)
		return  nil
	}
	proxy := httputil.NewSingleHostReverseProxy(target)

	orginalDirector := proxy.Director

	proxy.Director = func(r *http.Request){
		orginalDirector(r)
		r.Host = target.Host;
		r.URL.Path = strings.TrimPrefix(r.URL.Path, pathPreflix)

		if userId, ok := r.Context().Value("UserID").(string); ok{
			r.Header.Set("X-User-ID", userId)
		}

	}
	return  proxy.ServeHTTP


}
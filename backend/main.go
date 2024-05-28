package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

var itemsArray = []struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}{
	{ID: 1, Name: "Galactic Goggles"},
	{ID: 2, Name: "Meteor Muffins"},
	{ID: 3, Name: "Alien Antenna Kit"},
	{ID: 4, Name: "Starlight Lantern"},
}

func main() {
	router := gin.Default()
	router.GET("/", greet)
	router.GET("/items", getItems)
	router.POST("/items", addItem)
	router.HEAD("/healthcheck", healthcheck)

	router.Run()
}

func addItem(c *gin.Context) {
	var newItem struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	}
	if err := c.BindJSON(&newItem); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	newItem.ID = len(itemsArray) + 1
	itemsArray = append(itemsArray, newItem)
	c.IndentedJSON(http.StatusOK, newItem)
}

func getItems(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, itemsArray)
}
func greet(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, "Welcome, Go navigator, to the Anythink cosmic catalog.")
}

func healthcheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}

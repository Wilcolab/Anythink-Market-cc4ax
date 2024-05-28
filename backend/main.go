package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"strconv" // Import the strconv package
)

var itemsArray = []struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Views int    `json:"views"`
}{
	{ID: 1, Name: "Galactic Goggles", Views: 0},
	{ID: 2, Name: "Meteor Muffins", Views: 0},
	{ID: 3, Name: "Alien Antenna Kit", Views: 0},
	{ID: 4, Name: "Starlight Lantern", Views: 0},
	{ID: 5, Name: "Comet Camera", Views: 0},
}

func main() {
	router := gin.Default()
	router.GET("/", greet)
	router.GET("/items", getItems)
	router.POST("/items", addItem)
	router.HEAD("/healthcheck", healthcheck)
	router.GET("/items/:id", getItemByID)
	router.Run()
}

func addItem(c *gin.Context) {
	var newItem struct {
		ID    int    `json:"id"`
		Name  string `json:"name"`
		Views int    `json:"views"`
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

func getItemByID(c *gin.Context) {
	id := c.Param("id")
	for i := range itemsArray {
		if strconv.Itoa(itemsArray[i].ID) == id {
			go func() {
				itemsArray[i].Views++
			}()
				c.IndentedJSON(http.StatusOK, itemsArray[i])
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "item not found"})
}
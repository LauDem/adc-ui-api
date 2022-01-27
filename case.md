# Recipe data module |  GetProductionItemData

## 1. Weird behavior spotted

### 1a. The request body accepts unknown parameters

ex. 
```javascript
{
    "dummy" : "parameter"
}
```

### 1b. The request always returns an empty array

Whatever the request payload (valid or not)

### 1c. A valid request returns an error

request example :
```javascript
{
    "BusinessUnits" : [0]
}
```

response :
- status : *400 Bad Request*
- x-message : *A key xxx has already been added*

But this is a GET verb, so nothing should be added    



## 2. Ubiquitous language unclear

Since the endpoint is called **GetProductionItemData**, you would expect the request to return the production items for a given recipe.

Hence a payload looking like this

```javascript
{
    "recipeId" : "xxx"
}
```

Instead, the *try it* mentions a payload as follow :

```javascript
{
    "BusinessUnits": [1]
}
```

with a response of type **GetProductionItemDataByBusinessUnit**

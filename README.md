#API usage
**Show bars**
----
  Returns json of all bars.

* **URL**

  /api/bars

* **Method:**
  
  GET
  
* **Response:**

   * **Content:** `[{
                     "prices": {
                     "beer": 4,
                     "cider": 6,
                     "longdrink": 8
                     },
                     "name": "Mallaskaski",
                     "address": "Kaskipiha 1",
                     "city": "Espoo",
                     "likes": 20,
                     "user": {
                     "username": "timo",
                     "name": "timo",
                     "id": "5de0fd9fe1a9657d5e9db498"
                     },
                     "id": "5de3aac1d04f08df5150ec29"
                     }, {bar2 JSON}, ...]`
 
**Add bar**
----

Adds a bar to list and returns json of all bars

* **URL**

    /api/bars

* **Method:**
  
    POST
  
* **Response:**
  
     * **Content:** `[{bar1 JSON}, {bar2 JSON}, ...]`
     
**Update bar**
----
Updates bar and retursn JSON of all bars

* **URL**

    /api/bars/:id
    
* **Method:**

    PUT
    
* **URL params**

    id=[integer]

* ** Data params**

    body=[Bar JSON]
    
    _example_
    
    _{
    "prices": {
    "beer": 4.20,
    "cider": 6,
    "longdrink": 8
    },
    "name": "Mallaskaski",
    "address": "Kaskipiha 1",
    "city": "Espoo",
    }_
    
    _At least one price and all other information required!_
    
* **Response**

    * **Content:** `[{bar1 JSON}, {bar2 JSON}, ...]`
    
**Delete bar**
----

Delete bar from database

* **URL**

    /api/bars/:id
    
* **Method:**

    DELETE
    
* **URL params**

    id=[integer]
    
* **Response**

    **Code**: 204, Bar deleted

    
# API usage

**Show bar**
---
Returns json of bar

* **URL**

    /api/bars/:id
    
* **Method**

    GET
    
* **URL params**

    id=[String] Bar id
    
* **Response**

    * **Content**: `{
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
                   }`

**Show bars**
----
  Returns json of all bars.

* **URL**

  /api/bars

* **Method:**
  
  GET
  
* **Response:**

   * **Content:** `{[{bar1 JSON}, {bar2 JSON}, ...]}`
 
**Add bar**
----

Adds a bar to list and returns json of all bars

* **URL**

    /api/bars

* **Method:**
  
    POST
  
* **Response:**
  
     * **Content:** `{[{bar1 JSON}, {bar2 JSON}, ...]}`
     
* **Additional information**

    Authentication needed!
     
**Update bar**
----
Updates bar and retursn JSON of all bars

* **URL**

    /api/bars/:id
    
* **Method:**

    PUT
    
* **URL params**

    id=[String] Bar id

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

    * **Content:** `{[{bar1 JSON}, {bar2 JSON}, ...]}`
    
* **Additional information**

    Authentication needed!
    
**Delete bar**
----

Delete bar from database

* **URL**

    /api/bars/:id
    
* **Method:**

    DELETE
    
* **URL params**

    id=[String] Bar id
    
* **Response**

    **Code**: 204, Bar deleted
    
* **Additional information**

    You can only delete bars that you have added

**Show user**
----

Returns JSON of user

* **URL**

    /api/users/:id
    
* **Mehtod**

    GET
    
* **URL params**

    id=[string] User id
    
* **Response**

    * **Content**: `{
                    "bars": [{Added bar1 Json},
                    {Added bar2 JSON}, ...]
                    "username": "kake",
                    "name": "kake",
                    "id": "5dde6f2ee440b4227c891dce"
                    "default city": "Espoo"
                    }`
                    
**Show users**
----

Returns JSON of all users

* **URL**

    /api/users
    
* **Method**

    GET
    
* **Response**

    * **Content**: `{[
                    {user1 JSON},
                    {user2 JSON}, ...]}`
                    
**Add user**
----

Adds new user

* **URL**

    /api/users
    
* **Method**

    POST
    
* **Data params**

    body={"username": "user",
          "name": "user",
          "password": "123"}

* **Response**

    * **Content**: `{
                   "bars": [],
                   "username": "user",
                   "name": "user",
                   "id": "5dedfec0371cc963586c644f"
                   }`
    
**Add default city to user**
----

Adds default city for user

* **URL**

    /api/users/:id
    
* **Method**

    PUT
    
* **URL params**

    id=[String] User id
    
* **Data params**

    body=[user JSON]
    
    _Example_
    
    _{[{Bar1 JSON}, {Bar2 JSON}, ...] 
    "username": "sr",
    "name": "Samu",
    "defaultCity": "Espoo",
    "id": "5ddf8b5e1d14b71718da7f0c"
    "token": "token"_
    
* **Response**

    * **Content**: `{User JSON}`
    
* **Additional information**

    Authentication needed!

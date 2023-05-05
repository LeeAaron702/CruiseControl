# Create a client account

Endpoint path: /clients/signup

Endpoint method: POST

Headers: None

Request shape (JSON):

```
{
    "email": "string",
    "password": "string",
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string"
}
```

Response: Returns the client ID and a success message.

Response shape (JSON):

```
{
"client_id": "integer",
"message": "string"
}
```

# Log in as a client

Endpoint path: /clients/login

Endpoint method: POST

Headers:
-None

Request shape (JSON):

```
{
    "email": "string",
    "password": "string"
}
```

Response: Returns the client ID and a token to use for authentication.

Response shape (JSON):

```
{
    "client_id": "integer",
    "token": "string"
}
```

# Access client profile

Endpoint path: /clients/profile

Endpoint method: GET

Headers:
-Authorization: Bearer token

Request shape (JSON):
-None

Response: Returns the client's information.

Response shape (JSON):

```
{
    "client_id": "integer",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string"
}
```

# Log out as a client

Endpoint path: /clients/logout

Endpoint method: POST

Headers:
-Authorization: Bearer token

Request shape (JSON):
-None

Response: Returns a success message.

Response shape (JSON):

```
{
    "message": "string"
}
```

# Create a service

Endpoint path: /services

Endpoint method: POST

Headers:
-Authorization: Bearer token

Request shape (JSON):

```
{
    "name": "string",
    "description": "string",
    "price": "number"
}
```

Response: Returns the service ID and a success message.

Response shape (JSON):

```
{
    "service_id": "integer",
    "message": "string"
}
```

# Retrieve all services

Endpoint path: /services

Endpoint method: GET

Headers:
-Authorization: Bearer token

Query parameters:
-None

Response: Returns a list of all services.

Response shape (JSON):

```
[
    {
        "service_id": "integer",
        "name": "string",
        "description": "string",
        "price": "number"
    },
    ...
]
```

# Update a service

Endpoint path: /services/{service_id}

Endpoint method: PUT

Headers:
Authorization: Bearer token

Query parameters:
None

Request shape (JSON):

```
{
    "name": "string",
    "description": "string",
    "price": "number"
}
```

Response: Returns a success message.

Response shape (JSON):

```
{
    "message": "string"
}
```

# Delete a service

Endpoint path: /services/{service_id}

Endpoint method: DELETE

Headers:

Authorization: Bearer token
Query parameters:
None

Response: Returns a success message.

Response shape (JSON):

```
{
    "message": "string"
}
```

# Create a checklist

Endpoint path: /checklists

Endpoint method: POST

Headers:

Authorization: Bearer token
Request shape (JSON):

```
{
    "name": "string",
    "description": "string",
    "entries": [
        {
            "name": "string",
            "description": "string"
        },
        ...
    ]
}
```

Response: Returns the checklist ID and a success message.

Response shape (JSON):

```
{
    "checklist_id": "integer",
    "message": "string"
}
```

# Update a checklist or checklist entry

Endpoint path: /checklists/{checklist_id}

Endpoint method: PUT

Headers:

Authorization: Bearer token
Query parameters:

None
Request shape (JSON):

```
{
    "name": "string",
    "description": "string",
    "entries": [
        {
            "name": "string",
            "description": "string"
        },
        ...
    ]
}
```

Response: Returns a success message.

Response shape (JSON):

```
{
    "message": "string"
}
```

# Delete a checklist or checklist entry

Endpoint path: /checklists/{checklist_id}

Endpoint method: DELETE

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns a success message.

Response shape (JSON):

```
{
    "message": "string"
}
```

# View appointments and inquiries

Endpoint path: /appointments

Endpoint method: GET

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns a list of all appointments and inquiries.

Response shape (JSON):

```
[
    {
        "appointment_id": "integer",
        "client_id": "integer",
        "technician_id": "integer",
        "service_id": "integer",
        "status": "string",
        "date": "string"
    },
    ...
]
```

# Approve or deny appointments

Endpoint path: /appointments/{appointment_id}/status

Endpoint method: PUT

Headers:

Authorization: Bearer token
Query parameters:

None
Request shape (JSON):

```
{
    "status": "string"
}
```

Response: Returns a success message.

Response shape (JSON):

```
{
    "message": "string"
}
```

# Retrieve upcoming appointments

Endpoint path: /appointments/upcoming

Endpoint method: GET

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns a list of all upcoming appointments.

Response shape (JSON):

```
[
    {
        "appointment_id": "integer",
        "client_id": "integer",
        "technician_id": "integer",
        "service_id": "integer",
        "status": "string",
        "date": "string"
    },
    ...
]
```

# Retrieve appointment details

Endpoint path: /appointments/{appointment_id}

Endpoint method: GET

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns the details of a specific appointment.

Response shape (JSON):

```
{
    "appointment_id": "integer",
    "client_id": "integer",
    "technician_id": "integer",
    "service_id": "integer",
    "status": "string",
    "date": "string"
}
```

# Update an appointment

Endpoint path: /appointments/{appointment_id}

Endpoint method: PUT

Headers:

Authorization: Bearer token
Query parameters:

None
Request shape (JSON):

```
{
    "client_id": "integer",
    "technician_id": "integer",
    "service_id": "integer",
    "status": "string",
    "date": "string"
}
```

Response: Returns a success message.

Response shape (JSON):

```
{
    "message": "string"
}
```

# Delete an appointment

Endpoint path: /appointments/{appointment_id}

Endpoint method: DELETE

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns a success message.

Response shape (JSON):

```
{
    "message": "string"
}
```

# Create a technician

Endpoint path: /technicians

Endpoint method: POST

Headers:

Authorization: Bearer token
Request shape (JSON):

```
{
    "email": "string",
    "password": "string",
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string",
    "services": [
        {
            "service_id": "integer",
            "price": "number"
        },
        ...
    ]
}
```

Response: Returns the technician ID and a success message.

Response shape (JSON):

```
{
    "technician_id": "integer",
    "message": "string"
}
```

# Retrieve a list of technicians

Endpoint path: /technicians

Endpoint method: GET

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns a list of all technicians.

Response shape (JSON):

```
[
    {
        "technician_id": "integer",
        "email": "string",
        "first_name": "string",
        "last_name": "string",
        "phone_number": "string",
        "services": [
            {
                "service_id": "integer",
                "price": "number"
            },
            ...
        ]
    },
    ...
]
```

# Retrieve technician details

Endpoint path: /technicians/{technician_id}

Endpoint method: GET

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns the details of a specific technician.

Response shape (JSON):

```
{
    "technician_id": "integer",
    "email": "string",
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string",
    "services": [
        {
            "service_id": "integer",
            "price": "number"
        },
        ...
    ]
}
```

# Update a technician

Endpoint path: /technicians/{technician_id}

Endpoint method: PUT

Headers:

Authorization: Bearer token
Query parameters:

None
Request shape (JSON):

```
{
    "email": "string",
    "password": "string",
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string",
    "services":
    [
            {
            "service_id": "integer",
            "price": "number"
            },
            ...
    ]
}
```

Response: Returns a success message.
Response shape (JSON):

```
{
    "message": "string"
}
```

# Delete a technician

Endpoint path: /technicians/{technician_id}

Endpoint method: DELETE

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns a success message.

Response shape (JSON):

```
{
    "message": "string"
}
```

# Access technician list and complete service history

Endpoint path: /business-owner/technicians

Endpoint method: GET

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns a list of all technicians and their complete service history.

Response shape (JSON):

```
[
{
"technician_id": "integer",
"email": "string",
"first_name": "string",
"last_name": "string",
"phone_number": "string",
"services": [
{
"service_id": "integer",
"price": "number",
"appointments": [
{
"appointment_id": "integer",
"client_id": "integer",
"status": "string",
"date": "string"
},
...
]
},
...
]
},
...
]
```

# Log out as a business owner

Endpoint path: /business-owner/logout

Endpoint method: POST

Headers:

Authorization: Bearer token
Request shape (JSON):

None
Response: Returns a success message.

Response shape (JSON):

```
{
"message": "string"
}
```

# View technician profile with service history

Endpoint path: /technician/profile

Endpoint method: GET

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns the technician's information and service history.

Response shape (JSON):

```
{
"technician_id": "integer",
"email": "string",
"first_name": "string",
"last_name": "string",
"phone_number": "string",
"services": [
{
"service_id": "integer",
"price": "number",
"appointments": [
{
"appointment_id": "integer",
"client_id": "integer",
"status": "string",
"date": "string"
},
...
]
},
...
]
}
```

# View service appointments and details

Endpoint path: /technician/appointments

Endpoint method: GET

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns a list of all service appointments and their details.

Response shape (JSON):

```
[
{
"appointment_id": "integer",
"client_id": "integer",
"service_id": "integer",
"status": "string",
"date": "string"
},
...
]
```

# Log out as a technician

Endpoint path: /technician/logout

Endpoint method:
POST

Headers:

Authorization: Bearer token
Request shape (JSON):

None
Response: Returns a success message.

Response shape (JSON):

```
{
    "message": "string"
}
```

# Submit customer information and service inquiry

Endpoint path: /inquiries

Endpoint method: POST

Headers:

None
Request shape (JSON):

```
{
    "name": "string",
    "email": "string",
    "phone_number": "string",
    "service_id": "integer",
    "message": "string"
}
```

Response: Returns a success message.

Response shape (JSON):

```
{
    "message": "string"
}
```

# Start a service/job timer

Endpoint path: /technician/timer/start

Endpoint method: POST

Headers:

Authorization: Bearer token
Request shape (JSON):

```
{
    "appointment_id": "integer",
    "start_time": "string"
}
```

Response: Returns a success message.

Response shape (JSON):

```
{
    "message": "string"
}
```

# Stop a service/job timer

Endpoint path: /technician/timer/stop

Endpoint method: POST

Headers:

Authorization: Bearer token
Request shape (JSON):

```
{
    "appointment_id": "integer",
    "end_time": "string"
}
```

Response: Returns the elapsed time and a success message.

Response shape (JSON):

```
{
    "elapsed_time": "string",
    "message": "string"
}
```

---

# this is garbage under here

# this is garbage under here

Retrieve user profile
Endpoint path: /users/{user_id}/profile

Endpoint method: GET

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns the user's profile information.

Response shape (JSON):

json
Copy code
{
"user_id": "integer",
"email": "string",
"first_name": "string",
"last_name": "string",
"phone_number": "string"
}
Update user profile
Endpoint path: /users/{user_id}/profile

Endpoint method: PUT

Headers:

Authorization: Bearer token
Query parameters:

None
Request shape (JSON):

json
Copy code
{
"email": "string",
"password": "string",
"first_name": "string",
"last_name": "string",
"phone_number": "string"
}
Response: Returns a success message.

Response shape (JSON):

json
Copy code
{
"message": "string"
}
Delete user profile
Endpoint path: /users/{user_id}/profile

Endpoint method: DELETE

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns a success message.

Response shape (JSON):

json
Copy code
{
"message": "string"
}

Retrieve all users
Endpoint path: /users

Endpoint method: GET

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns a list of all users.

Response shape (JSON):

json
Copy code
[
{
"user_id": "integer",
"email": "string",
"first_name": "string",
"last_name": "string",
"phone_number": "string"
},
...
]
Retrieve all appointments for a specific user
Endpoint path: /users/{user_id}/appointments

Endpoint method: GET

Headers:

Authorization: Bearer token
Query parameters:

None
Response: Returns a list of all appointments for the specified user.

Response shape (JSON):

json
Copy code
[
{
"appointment_id": "integer",
"client_id": "integer",
"technician_id": "integer",
"service_id": "integer",
"status": "string",
"date": "string"
},
...
]

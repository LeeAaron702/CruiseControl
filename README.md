# Cruise Control

Cruise Control is an appointment and service management application built using FastAPI for the backend, React.js for the frontend, Bootstrap for the css library, and PostgreSQL as the database. The application provides a platform for businesses to manage appointments, services, and technicians.

---

## Created by

- Lee Seaver
- Joshua Evangelista
- Nicholas Trevino
- Kenneth Wilson

---

## Overview

The application is designed to handle appointment scheduling, service management, and technician management for businesses. It allows users to create, update, and delete appointments and services, as well as manage technicians.

## Features

- **Account management**: The system allows users to create, edit, and manage accounts for clients and technicians. It provides authentication and authorization functionalities to ensure data security and privacy.

- **Appointment scheduling**: Customers can easily schedule appointments for vehicle services. The system also provides features to approve or disapprove appointments based on availability.

- **Service management**: Ability to create, edit, and manage a list of services they offer. This allows clients to easily browse and select the required services for their vehicles.

- **Checklist management**: The system allows businesses to create and maintain checklists for each service, ensuring that all necessary tasks are completed during vehicle maintenance and repair.

- **Docker deployment**: The Cruise Control Project can be easily downloaded from the Git repository and installed using Docker. This simplifies the deployment process and ensures a consistent environment across different platforms.

## Technologies

- React.js for frontend development
- FastAPI for backend development
- PostgreSQL for database management
- JWT for user authentication
- Bootstrap for responsive design and styling

---

## How to Install and Run the Project

### Requirements

- Docker
- Docker Compose
- Git

### Downloading and Installing the Project

Follow the steps below to download the project from Git and install it using Docker:

**Step 1: Clone the Repository**

To clone the repository, open a terminal, and run the following command:

```
git clone https://gitlab.com/low-expectations/cruise-control.git
```

**Step 2: Change to the Project Directory**

Change your working directory to the root of the cloned project:

```
cd cruise-control
```

**Step 3: Build and Run the Docker Container**

To build and run the Docker container, use the following commands:
These commands will create the volume, build the Docker image and run the containers in the background.

```
docker volume create cruisecontrolvolume
docker-compose up
```

**Step 4: Access the API**

The API should now be accessible at http://localhost:8000. You can interact with the API using the provided FastAPI interactive documentation at http://localhost:8000/docs.

**Stopping and Removing the Docker Container**

To stop the running container, run the following command:

```
docker-compose down
```

This command will stop and remove the container. If you want to rebuild and start the container again, you can use the command from Step 3.

---

## Database Schema

The application uses the following tables in the PostgreSQL database:

- Acounts: Information for users, including email, password, and role.
- Businesses: Stores business information, such as name, address, and phone number.
- Technicians: Stores technician information, including name, phone number, and email.
- Services: Stores service information, including service name, description, and duration.
- Appointments: Stores appointment information, including appointment time, status, and related business, technician, and service information.

---

## Api Endpoints

The following are the main API endpoints in the Cruise Control project

**Accounts**

- GET /token: Retrieves an account token for the currently logged-in user.
- POST /api/clientsignup: Creates a new client account.
- GET /api/accounts/{username}: Retrieves an account's details by username.
- GET /api/accounts: Retrieves a list of all accounts.
- PUT /accounts/{user_id}: Updates an account's details.
- DELETE /accounts/{user_id}: Deletes an account.

**Technicians**

- GET /technician/{user_id}: Retrieves a technician's details.
- GET /technicians: Retrieves a list of all technicians.
- POST /technician: Creates a new technician account.

**Appointments**

- GET /api/appointments: Retrieves a list of all appointments.
- GET /api/appointments/{appointment_id}: Retrieves details of a specific appointment.
- POST /api/appointments: Creates a new appointment.
- PUT /api/appointments/{appointment_id}: Updates an appointment's details.
- DELETE /api/appointments/{appointment_id}: Deletes an appointment.
- PUT /api/appointments/{appointment_id}/approve: Approves an appointment.

**Checklist**

- GET /api/checklist: Retrieves a list of all checklist items.
- GET /services/{service_id}/checklist: Retrieves a list of all checklist items for a specific service.
- POST /api/checklist: Creates a new checklist item.
- PUT /checklist/{checklist_id}: Updates a checklist item.
- DELETE /api/checklist/{checklist_id}: Deletes a checklist item.

**Services**

- GET /api/services: Retrieves a list of all services.
- POST /api/services: Creates a new service.
- PUT /api/services/{service_id}: Updates a service's details.
- DELETE /api/services/{service_id}: Deletes a service.
- GET /api/services/{service_id}: Retrieves details of a specific service.

**Authentication**

- All API endpoints (except /token and /api/clientsignup) require authentication. The Cruise Control project uses JWT (JSON Web Tokens) for authentication. To access protected endpoints, include the JWT token in the Authorization header of the HTTP request as a Bearer token.

---

## Models

The Cruise Control project uses Pydantic models for data validation and serialization. The main models used in the project include:

- AccountIn
- AccountOut
- AccountToken
- AppointmentIn
- AppointmentOut
- ChecklistIn
- ChecklistOut
- ServiceIn
- ServiceOut

---

## Wireframe

![Wireframe](Excalidraw\Excalidraw.png)

---

## License

Cruise Control, including its backend FastAPI, and frontend React.js code, is licensed under the MIT License. This means that the code is free to use, modify, and distribute, subject to the terms and conditions of the license.

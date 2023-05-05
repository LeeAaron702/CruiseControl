from fastapi.testclient import TestClient
from main import app
from queries.appointments import (
    AppointmentQueries,
)
from authenticator import authenticator

client = TestClient(app)


test_user = {
    "id": 1,
    "username": "Nick",
    "business_id": 1,
    "employee_id": 0,
    "first_name": "string",
    "last_name": "string",
    "website": "string",
    "email": "string",
    "address": "string",
    "phone_number": "string",
    "is_client": "true",
    "is_technician": "false",
}


def user_override():
    return test_user


class CreateAppointmentQueries:
    def create(self, info):
        result = {
            "id": 1,
            "service_name": "Oil Change",
        }
        result.update(info)
        return result


def test_create_appointment():
    app.dependency_overrides[AppointmentQueries] = CreateAppointmentQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = user_override

    json = {
        "customer_name": "John Doe",
        "customer_phone": 1234567890,
        "vehicle_make": "Toyota",
        "vehicle_model": "Corolla",
        "vehicle_year": 2019,
        "vehicle_color": "Blue",
        "notes": "Some notes",
        "date_of_service": "2023-05-01",
        "is_approved": False,
        "service_id": 1,
        "business_id": 1,
    }

    expected = {
        "customer_name": "John Doe",
        "customer_phone": 1234567890,
        "vehicle_make": "Toyota",
        "vehicle_model": "Corolla",
        "vehicle_year": 2019,
        "vehicle_color": "Blue",
        "notes": "Some notes",
        "date_of_service": "2023-05-01",
        "is_approved": False,
        "business_id": 1,
        "service_id": 1,
        "id": 1,
        "service_name": "Oil Change",
    }

    response = client.post("/api/appointments", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected

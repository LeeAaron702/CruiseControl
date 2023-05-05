from fastapi.testclient import TestClient
from main import app
from queries.services import ServiceQueries
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


class CreateServiceQueries:
    def create(self, info, business_id):
        result = {"id": 12, "business_id": business_id}
        result.update(info)
        return result


def test_create_service():
    app.dependency_overrides[ServiceQueries] = CreateServiceQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = user_override

    json = {
        "service_name": "double clean",
        "service_type": "detail",
        "service_description": "yellow",
        "service_price": 5,
    }
    expected = {
        "service_name": "double clean",
        "service_type": "detail",
        "service_description": "yellow",
        "service_price": 5,
        "id": 12,
        "business_id": 1,
    }

    response = client.post("/api/services", json=json)
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected

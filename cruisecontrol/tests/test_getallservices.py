from fastapi.testclient import TestClient
from main import app
from queries.services import ServiceQueries
from authenticator import authenticator


client = TestClient(app)

test_user = {
    "id": 1,
    "username": "Ken",
    "business_id": 1,
    "employee_id": 0,
    "first_name": "Ken",
    "last_name": "Wilson",
    "website": "string",
    "email": "string",
    "address": "string",
    "phone_number": "string",
    "is_client": "true",
    "is_technician": "false",
}


def user_override():
    return test_user


class GetAllServiceQueries:
    def get_all(self, repo, business_id):
        return []


def test_get_all_services():
    app.dependency_overrides[ServiceQueries] = GetAllServiceQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = user_override

    response = client.get("/api/services")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []

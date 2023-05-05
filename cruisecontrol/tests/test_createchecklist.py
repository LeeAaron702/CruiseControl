from fastapi.testclient import TestClient
from main import app
from queries.checklist import ChecklistQueries, ChecklistIn
from authenticator import authenticator

client = TestClient(app)

test_user = {
    "id": 1,
    "username": "josh",
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


class CreateChecklistQueries:
    def create_checklist_item(self, checklist: ChecklistIn, business_id: int):
        result = {"id": 1}
        result.update(checklist.dict())
        return result


def test_create_checklist():
    app.dependency_overrides[ChecklistQueries] = CreateChecklistQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = user_override

    json = {"checklist_item": "test item", "service_id": 1}
    expected = {
        "id": 1,
        "checklist_item": "test item",
        "service_id": 1,
    }

    response = client.post("/api/checklist", json=json)
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected

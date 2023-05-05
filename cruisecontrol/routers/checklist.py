from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
)
from authenticator import authenticator
from pydantic import BaseModel
from typing import List

from queries.checklist import (
    ChecklistIn,
    ChecklistOut,
    ChecklistQueries,
    DuplicateChecklistError,
)


class ChecklistForm(BaseModel):
    checklist_item: str
    service_id: int


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/checklist", response_model=List[ChecklistOut])
def get_all_checklist(
    repo: ChecklistQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
):
    business_id = account_data["business_id"]
    try:
        return repo.get_all(business_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot get a checklist with those credentials",
        )


@router.get(
    "/services/{service_id}/checklist",
    response_model=List[ChecklistOut],
)
def get_one_checklist(
    service_id: int,
    response: Response,
    repo: ChecklistQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
) -> List[ChecklistOut]:
    checklist = repo.get_all_for_service(service_id)
    if checklist is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"detail": "Checklist not found"}
    return checklist


@router.post("/api/checklist", response_model=ChecklistOut | HttpError)
def create_checklist(
    info: ChecklistIn,
    response: Response,
    repo: ChecklistQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
):
    business_id = account_data["business_id"]
    try:
        return repo.create_checklist_item(info, business_id)
    except DuplicateChecklistError:
        response.status_code = status.HTTP_409_CONFLICT
        return HttpError(detail="Checklist with the same id already exists")
    except Exception as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return HttpError(detail=str(e))


@router.put("/checklist/{checklist_id}", response_model=ChecklistOut)
def update_checklist_item(
    checklist_id: int,
    checklist: ChecklistIn,
    response: Response,
    repo: ChecklistQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
) -> ChecklistOut:
    return repo.update(checklist_id, checklist)


@router.delete("/api/checklist/{checklist_id}")
def delete_checklist_item(
    checklist_id: int,
    repo: ChecklistQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
):
    try:
        repo.delete(checklist_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No checklist found with the given ID and business ID",
        )
    return {"message": "Checklist deleted successfully"}

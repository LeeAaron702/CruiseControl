from fastapi import APIRouter, Depends, Response
from queries.services import ServiceIn, ServiceOut, ServiceQueries
from typing import List, Optional
from authenticator import authenticator


router = APIRouter()


@router.get("/api/services", response_model=List[ServiceOut])
def get_all_services(
    repo: ServiceQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
):
    business_id = account_data["business_id"]
    return repo.get_all(repo, business_id)


@router.get("/api/heroservices", response_model=List[ServiceOut])
def get_all_hero_services(
    business_id: int,
    repo: ServiceQueries = Depends(),
):
    return repo.get_all(repo, business_id)


@router.post("/api/services", response_model=ServiceOut)
def create_service(
    info: ServiceIn,
    response: Response,
    repo: ServiceQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
):
    business_id = account_data["business_id"]
    return repo.create(info, business_id)


@router.put("/api/services/{service_id}", response_model=ServiceOut)
def update_service(
    service_id: int,
    service: ServiceIn,
    response: Response,
    repo: ServiceQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
) -> ServiceOut:
    business_id = account_data["business_id"]
    return repo.update(service_id, business_id, service)


@router.delete("/api/services/{service_id}", response_model=bool)
def delete_service(
    service_id: int,
    repo: ServiceQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
) -> bool:
    business_id = account_data["business_id"]
    return repo.delete(service_id, business_id)


@router.get("/api/services/{service_id}", response_model=Optional[ServiceOut])
def get_service(
    service_id: int,
    response: Response,
    repo: ServiceQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
) -> ServiceOut:
    business_id = account_data["business_id"]
    service = repo.get_one(service_id, business_id)
    if service is None:
        response.status_code = 404
    return service

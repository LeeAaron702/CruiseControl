from fastapi import APIRouter, Depends
from typing import List
from queries.business import Business, BusinessQueries


router = APIRouter()


@router.get("/api/businesses", response_model=List[Business])
def businesses(repo: BusinessQueries = Depends()):
    return repo.get_all_businesses()

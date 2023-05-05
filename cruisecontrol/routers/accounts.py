# router.py
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel
from typing import List

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError,
)


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/clientsignup", response_model=AccountToken | HttpError)
async def create_client_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create_client(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.post("/technician", response_model=AccountToken | HttpError)
async def create_technician_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    client_username = account_data["username"]
    client_account = repo.get(client_username)
    business_id = client_account.business_id

    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create_technician(info, hashed_password, business_id)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/api/accounts/{username}", response_model=AccountOut)
def get_account(
    username: str,
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> AccountOut:
    try:
        return repo.get(username)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot get an account with those credentials",
        )


@router.get("/api/accounts", response_model=List[AccountOut])
def get_accounts(
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> AccountOut:

    business_id = account_data["business_id"]

    try:
        return repo.get_all(business_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot get an account with those credentials",
        )


@router.put("/accounts/{user_id}", response_model=AccountOut)
def update_account(
    user_id: int,
    account: AccountOut,
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> AccountOut:
    is_technician = account_data["is_technician"]
    business_id = account_data["business_id"]
    is_client = account_data["is_client"]
    try:
        return repo.update(
            user_id, business_id, is_client, is_technician, account
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot get an account with those credentials",
        )


@router.delete("/accounts/{user_id}", response_model=bool)
def delete_accounts(
    user_id: int,
    repo: AccountQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
) -> bool:
    business_id = account_data["business_id"]
    return repo.delete(user_id, business_id)


@router.get("/technician/{user_id}", response_model=AccountOut)
def get_technician(
    user_id: int,
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> AccountOut:
    business_id = account_data["business_id"]
    try:
        return repo.gettech(user_id, business_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot get an account with those credentials",
        )


@router.get("/technicians", response_model=List[AccountOut])
def get_technicians(
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> AccountOut:

    business_id = account_data["business_id"]

    try:
        return repo.get_all_tech(business_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot get an account with those credentials",
        )


@router.get("/client/{user_id}", response_model=AccountOut)
def get_a_client(
    user_id: int,
    repo: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> AccountOut:
    business_id = account_data["business_id"]
    try:
        return repo.get_client(user_id, business_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot get an account with those credentials",
        )

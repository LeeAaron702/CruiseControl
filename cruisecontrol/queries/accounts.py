from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    password: str
    employee_id: Optional[int]
    business_name: Optional[str]
    business_id: Optional[int]
    first_name: Optional[str]
    last_name: Optional[str]
    website: Optional[str]
    email: Optional[str]
    address: Optional[str]
    phone_number: Optional[str]


class AccountOut(BaseModel):
    id: int
    username: str
    business_id: Optional[int]
    employee_id: Optional[int]
    first_name: Optional[str]
    last_name: Optional[str]
    website: Optional[str]
    email: Optional[str]
    address: Optional[str]
    phone_number: Optional[str]
    is_client: Optional[bool]
    is_technician: Optional[bool]


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries:
    # Client SignUp / LogIn
    def get(self, username: str) -> Optional[AccountOutWithPassword]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                select id
                    , username
                    , hashed_password
                    , business_id
                    , employee_id
                    , first_name
                    , last_name
                    , website
                    , email
                    , address
                    , phone_number
                    , is_client
                    , is_technician
                from accounts
                where username = %s
                """,
                    [username],
                )
                record = result.fetchone()
                if record is None:
                    return None
                Account = AccountOutWithPassword(
                    id=record[0],
                    username=record[1],
                    hashed_password=record[2],
                    business_id=record[3],
                    employee_id=record[4],
                    first_name=record[5],
                    last_name=record[6],
                    website=record[7],
                    email=record[8],
                    address=record[9],
                    phone_number=record[10],
                    is_client=record[11],
                    is_technician=record[12],
                )
                print("Account data from get method:", Account)
                return Account

    def create_client(
        self, account: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    insert into businesses (business_name)
                    values (%s)
                    """,
                    [account.business_name],
                )
                db.execute(
                    """
                    select id
                    from businesses
                    where business_name = %s
                    """,
                    [account.business_name],
                )

                business_id = db.fetchone()[0]
                result = db.execute(
                    """
                    insert into accounts
                        (
                        username
                        , hashed_password
                        , business_id
                        , employee_id
                        , first_name
                        , last_name
                        , website
                        , email
                        , address
                        , phone_number
                        , is_client
                        )

                        values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, TRUE)
                        returning id
                    """,
                    [
                        account.username,
                        hashed_password,
                        business_id,
                        account.employee_id,
                        account.first_name,
                        account.last_name,
                        account.website,
                        account.email,
                        account.address,
                        account.phone_number,
                    ],
                )
                id = result.fetchone()[0]
                old_data = account.dict()
                old_data["hashed_password"] = hashed_password
                old_data["business_id"] = business_id
                old_data["is_client"] = True
                return AccountOutWithPassword(id=id, **old_data)

    # Tech
    def create_technician(
        self, account: AccountIn, hashed_password: str, business_id: int
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    insert into accounts
                        (
                        username
                        , hashed_password
                        , business_id
                        , employee_id
                        , first_name
                        , last_name
                        , website
                        , email
                        , address
                        , phone_number
                        , is_technician
                        )
                        values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, TRUE)
                        returning id
                    """,
                    [
                        account.username,
                        hashed_password,
                        business_id,
                        account.employee_id,
                        account.first_name,
                        account.last_name,
                        account.website,
                        account.email,
                        account.address,
                        account.phone_number,
                    ],
                )
                id = result.fetchone()[0]
                old_data = account.dict()
                old_data["hashed_password"] = hashed_password
                old_data["business_id"] = business_id
                old_data["is_technician"] = True
                return AccountOutWithPassword(id=id, **old_data)

    # Get all
    def get_all(self, business_id: int) -> List[AccountOutWithPassword]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                results = db.execute(
                    """
                select id
                    , username
                    , hashed_password
                    , business_id
                    , employee_id
                    , first_name
                    , last_name
                    , website
                    , email
                    , address
                    , phone_number
                    , is_client
                    , is_technician
                from accounts
                where business_id = %s
                """,
                    [business_id],
                )
                results = []
                for record in db:
                    Account = AccountOutWithPassword(
                        id=record[0],
                        username=record[1],
                        hashed_password=record[2],
                        business_id=record[3],
                        employee_id=record[4],
                        first_name=record[5],
                        last_name=record[6],
                        website=record[7],
                        email=record[8],
                        address=record[9],
                        phone_number=record[10],
                        is_client=record[11],
                        is_technician=record[12],
                    )
                    results.append(Account)
                return results

    def update(
        self,
        user_id: int,
        business_id: int,
        is_client: bool,
        is_technician: bool,
        account: AccountOut,
    ) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    update accounts
                    set username = %s
                        , employee_id = %s
                        , first_name = %s
                        , last_name = %s
                        , website = %s
                        , email = %s
                        , address = %s
                        , phone_number  = %s
                    where id = %s AND business_id = %s
                    """,
                    [
                        account.username,
                        account.employee_id,
                        account.first_name,
                        account.last_name,
                        account.website,
                        account.email,
                        account.address,
                        account.phone_number,
                        user_id,
                        business_id,
                    ],
                )
                old_data = account.dict()
                old_data["business_id"] = business_id
                old_data["is_technician"] = is_technician
                old_data["is_client"] = is_client
                old_data["id"] = user_id
                return AccountOut(**old_data)

    def delete(self, user_id: int, business_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    delete from accounts
                    WHERE id = %s AND business_id = %s

                    """,
                    [user_id, business_id],
                )
                return True

    def gettech(
        self, user_id: int, business_id: int
    ) -> Optional[AccountOutWithPassword]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                select id
                    , username
                    , hashed_password
                    , business_id
                    , employee_id
                    , first_name
                    , last_name
                    , website
                    , email
                    , address
                    , phone_number
                    , is_client
                    , is_technician
                from accounts
                where id = %s AND business_id = %s AND is_technician = true
                """,
                    [user_id, business_id],
                )
                record = result.fetchone()
                if record is None:
                    return None
                Account = AccountOutWithPassword(
                    id=record[0],
                    username=record[1],
                    hashed_password=record[2],
                    business_id=record[3],
                    employee_id=record[4],
                    first_name=record[5],
                    last_name=record[6],
                    website=record[7],
                    email=record[8],
                    address=record[9],
                    phone_number=record[10],
                    is_client=record[11],
                    is_technician=record[12],
                )
                return Account

    def get_all_tech(self, business_id: int) -> List[AccountOutWithPassword]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                results = db.execute(
                    """
                select id
                    , username
                    , hashed_password
                    , business_id
                    , employee_id
                    , first_name
                    , last_name
                    , website
                    , email
                    , address
                    , phone_number
                    , is_client
                    , is_technician
                from accounts
                where business_id = %s AND is_technician = true
                """,
                    [business_id],
                )
                results = []
                for record in db:
                    Account = AccountOutWithPassword(
                        id=record[0],
                        username=record[1],
                        hashed_password=record[2],
                        business_id=record[3],
                        employee_id=record[4],
                        first_name=record[5],
                        last_name=record[6],
                        website=record[7],
                        email=record[8],
                        address=record[9],
                        phone_number=record[10],
                        is_client=record[11],
                        is_technician=record[12],
                    )
                    results.append(Account)
                return results

    def get_client(
        self, user_id: int, business_id: int
    ) -> Optional[AccountOutWithPassword]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                select id
                    , username
                    , hashed_password
                    , business_id
                    , employee_id
                    , first_name
                    , last_name
                    , website
                    , email
                    , address
                    , phone_number
                    , is_client
                    , is_technician
                from accounts
                where id = %s AND business_id = %s AND is_client = true
                """,
                    [user_id, business_id],
                )
                record = result.fetchone()
                if record is None:
                    return None
                Account = AccountOutWithPassword(
                    id=record[0],
                    username=record[1],
                    hashed_password=record[2],
                    business_id=record[3],
                    employee_id=record[4],
                    first_name=record[5],
                    last_name=record[6],
                    website=record[7],
                    email=record[8],
                    address=record[9],
                    phone_number=record[10],
                    is_client=record[11],
                    is_technician=record[12],
                )
                return Account

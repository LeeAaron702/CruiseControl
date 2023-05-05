from pydantic import BaseModel
from queries.pool import pool
from typing import List


class ServiceIn(BaseModel):
    service_name: str
    service_type: str
    service_description: str
    service_price: int


class ServiceOut(BaseModel):
    id: int
    service_name: str
    service_type: str
    service_description: str
    service_price: float
    business_id: int


class ServiceQueries:
    def get_all(
        self, service: ServiceIn, business_id: int
    ) -> List[ServiceOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    select id
                    , service_name
                    , service_type
                    , service_description
                    , service_price
                    , business_id
                    from services
                    where business_id = %s
                    """,
                    [business_id],
                )
                result = []
                for record in db:
                    print(record)
                    service = ServiceOut(
                        id=record[0],
                        service_name=record[1],
                        service_type=record[2],
                        service_description=record[3],
                        service_price=record[4],
                        business_id=record[5],
                    )
                    result.append(service)
                return result

    def create(self, service: ServiceIn, business_id: int) -> ServiceOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    insert into services
                        (
                        service_name
                        , service_type
                        , service_description
                        , service_price
                        , business_id
                        )
                        values (%s, %s, %s, %s, %s)
                        returning id
                    """,
                    [
                        service.service_name,
                        service.service_type,
                        service.service_description,
                        service.service_price,
                        business_id,
                    ],
                )
                result = db.fetchone()
                id = result[0]
                old_data = service.dict()
                return ServiceOut(id=id, business_id=business_id, **old_data)

    def update(
        self, service_id: int, business_id: int, service: ServiceIn
    ) -> ServiceOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    update services
                    set service_name = %s
                        , service_type = %s
                        , service_description = %s
                        , service_price = %s
                        , business_id = %s
                    where id = %s
                    """,
                    [
                        service.service_name,
                        service.service_type,
                        service.service_description,
                        service.service_price,
                        business_id,
                        service_id,
                    ],
                )
                old_data = service.dict()
                return ServiceOut(
                    id=service_id, business_id=business_id, **old_data
                )

    def delete(self, service_id: int, business_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                        delete from services
                        WHERE id = %s AND business_id = %s

                        """,
                    [service_id, business_id],
                )
                return True

    def get_one(self, service_id: int, business_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    select id
                        ,service_name
                        ,service_type
                        ,service_description
                        ,service_price
                        ,business_id
                    from services
                    where id = %s and business_id = %s
                    """,
                    [service_id, business_id],
                )
                record = result.fetchone()
                if record is None:
                    return None
                return ServiceOut(
                    id=record[0],
                    service_name=record[1],
                    service_type=record[2],
                    service_description=record[3],
                    service_price=record[4],
                    business_id=record[5],
                )

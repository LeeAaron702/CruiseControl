from queries.pool import pool
from typing import List, Optional
from pydantic import BaseModel


class Business(BaseModel):
    id: Optional[int]
    business_name: str


class BusinessQueries:
    def get_all_businesses(self) -> List[Business]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    select * from businesses
                    """
                )
                rows = db.fetchall()
                print(rows)
                businesses = []
                for row in rows:
                    businesses.append(
                        Business(id=row[0], business_name=row[1])
                    )
                return businesses

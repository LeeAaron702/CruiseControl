from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional


class DuplicateChecklistError(ValueError):
    pass


class ChecklistIn(BaseModel):
    checklist_item: str
    service_id: int


class ChecklistOut(ChecklistIn):
    id: int


class ChecklistQueries:
    def create_checklist_item(
        self, checklist: ChecklistIn, business_id: int
    ) -> ChecklistOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
          insert into checklist
            (
            checklist_item, service_id
            )
            values(%s, %s)
            returning id
          """,
                    [
                        checklist.checklist_item,
                        checklist.service_id,
                    ],
                )
                id = result.fetchone()[0]
                old_data = checklist.dict()
                return ChecklistOut(id=id, business_id=business_id, **old_data)

    def get_all_for_service(self, service_id: int) -> List[ChecklistOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT id
                    , checklist_item
                    , service_id
                    FROM checklist
                    WHERE service_id = %s
                    """,
                    [service_id],
                )
                results = []
                for record in db:
                    checklist = ChecklistOut(
                        id=record[0],
                        checklist_item=record[1],
                        service_id=record[2],
                    )
                    results.append(checklist.dict())
                return results

    def get_one(
        self, service_id: int, checklist_id: int
    ) -> Optional[ChecklistOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                  select *
                  from checklist
                  where service_id = %s and id = %s
                  """,
                    [service_id, checklist_id],
                )
                result = db.fetchone()
                if result is None:
                    return None
                return ChecklistOut(
                    id=result[0],
                    checklist_item=result[1],
                    service_id=result[2],
                )

    def update(
        self, checklist_id: int, checklist: ChecklistIn
    ) -> ChecklistOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
            update checklist
            set checklist_item = %s
            where id = %s
            """,
                    [
                        checklist.checklist_item,
                        checklist_id,
                    ],
                )
                old_data = checklist.dict()
                return ChecklistOut(id=checklist_id, **old_data)

    def delete(self, checklist_id: int):
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
          DELETE FROM checklist
          WHERE id = %s
          """,
                    [checklist_id],
                )
                if db.rowcount == 0:
                    raise ValueError(
                        "No checklist found with the given ID and business ID"
                    )

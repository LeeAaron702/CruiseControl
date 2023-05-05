from pydantic import BaseModel
from queries.pool import pool
from datetime import date
from typing import List, Optional


class AppointmentIn(BaseModel):
    customer_name: str
    customer_phone: int
    vehicle_make: Optional[str]
    vehicle_model: Optional[str]
    vehicle_year: Optional[int]
    vehicle_color: Optional[str]
    notes: Optional[str]
    date_of_service: Optional[date]
    business_id: int
    is_approved: Optional[bool] = False
    service_id: int


class AppointmentOut(AppointmentIn):
    id: int
    service_name: Optional[str]


class AppointmentQueries:
    def get_all(
        self, appointment: AppointmentIn, business_id: int
    ) -> List[AppointmentOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT appointments.id
                    , customer_name
                    , customer_phone
                    , vehicle_make
                    , vehicle_model
                    , vehicle_year
                    , vehicle_color
                    , notes
                    , date_of_service
                    , appointments.business_id
                    , is_approved
                    , service_id
                    , service_name
                    FROM appointments
                    JOIN services ON appointments.service_id = services.id
                    WHERE appointments.business_id = %s
                    """,
                    [business_id],
                )
                appointments = []
                for record in db:
                    appointment = AppointmentOut(
                        id=record[0],
                        customer_name=record[1],
                        customer_phone=record[2],
                        vehicle_make=record[3],
                        vehicle_model=record[4],
                        vehicle_year=record[5],
                        vehicle_color=record[6],
                        notes=record[7],
                        date_of_service=record[8],
                        business_id=record[9],
                        is_approved=record[10],
                        service_id=record[11],
                        service_name=record[12],
                    )
                    appointments.append(appointment)
                return appointments

    def get_one(
        self, appointment_id: int, business_id: int
    ) -> Optional[AppointmentOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT a.id AS appointment_id,
                        a.customer_name,
                        a.customer_phone,
                        a.vehicle_make,
                        a.vehicle_model,
                        a.vehicle_year,
                        a.vehicle_color,
                        a.notes,
                        a.date_of_service,
                        a.business_id,
                        a.is_approved,
                        a.service_id,
                        s.service_name
                    FROM appointments a
                    JOIN services s ON a.service_id = s.id
                    WHERE a.id = %s
                    AND a.business_id = %s;

                    """,
                    [appointment_id, business_id],
                )
                record = db.fetchone()
                if record is None:
                    return None
                return AppointmentOut(
                    id=record[0],
                    customer_name=record[1],
                    customer_phone=record[2],
                    vehicle_make=record[3],
                    vehicle_model=record[4],
                    vehicle_year=record[5],
                    vehicle_color=record[6],
                    notes=record[7],
                    date_of_service=record[8],
                    business_id=record[9],
                    is_approved=record[10],
                    service_id=record[11],
                    service_name=record[12],
                )

    def create(self, appointment: AppointmentIn) -> AppointmentOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    insert into appointments
                        (
                        customer_name,
                        customer_phone,
                        vehicle_make,
                        vehicle_model,
                        vehicle_year,
                        vehicle_color,
                        notes,
                        date_of_service,
                        business_id,
                        is_approved,
                        service_id
                        )
                        values (%s, %s, %s, %s, %s, %s, %s, %s, %s, false, %s)
                        returning id
                    """,
                    [
                        appointment.customer_name,
                        appointment.customer_phone,
                        appointment.vehicle_make,
                        appointment.vehicle_model,
                        appointment.vehicle_year,
                        appointment.vehicle_color,
                        appointment.notes,
                        appointment.date_of_service,
                        appointment.business_id,
                        appointment.service_id,
                    ],
                )
                id = db.fetchone()[0]
                old_data = appointment.dict()
                return AppointmentOut(id=id, **old_data)

    def update(
        self, appointment_id: int, business_id: int, appointment: AppointmentIn
    ) -> AppointmentOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    update appointments
                        set customer_name = %s
                        , customer_phone = %s
                        , vehicle_make = %s
                        , vehicle_model = %s
                        , vehicle_year = %s
                        , vehicle_color = %s
                        , notes = %s
                        , date_of_service = %s
                        , business_id = %s
                        , is_approved = %s
                        , service_id = %s
                    where id = %s
                    """,
                    [
                        appointment.customer_name,
                        appointment.customer_phone,
                        appointment.vehicle_make,
                        appointment.vehicle_model,
                        appointment.vehicle_year,
                        appointment.vehicle_color,
                        appointment.notes,
                        appointment.date_of_service,
                        appointment.business_id,
                        appointment.is_approved,
                        appointment.service_id,
                        appointment_id,
                    ],
                )
                old_data = appointment.dict()
                return AppointmentOut(id=appointment_id, **old_data)

    def delete(self, appointment_id: int, business_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    delete from appointments
                    where id = %s and business_id = %s
                    """,
                    [appointment_id, business_id],
                )
                return True

    def approve(self, appointment_id: int, business_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    update appointments
                    set is_approved = true
                    where id = %s and business_id = %s
                    returning id
                    """,
                    [appointment_id, business_id],
                )
                record = db.fetchone()
                return record is not None

    def disapprove(self, appointment_id: int, business_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    update appointments
                    set is_approved = false
                    where id = %s and business_id = %s
                    returning id
                    """,
                    [appointment_id, business_id],
                )
                record = db.fetchone()
                return record is not None

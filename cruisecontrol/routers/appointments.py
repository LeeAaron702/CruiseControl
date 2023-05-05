from fastapi import APIRouter, Depends, Response
from queries.appointments import (
    AppointmentIn,
    AppointmentOut,
    AppointmentQueries,
)
from typing import List, Optional
from authenticator import authenticator


router = APIRouter()


@router.get("/api/appointments", response_model=List[AppointmentOut])
def get_all_appointments(
    repo: AppointmentQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
):
    business_id = account_data["business_id"]
    return repo.get_all(repo, business_id)


@router.get(
    "/api/appointments/{appointment_id}",
    response_model=Optional[AppointmentOut],
)
def get_appointment(
    appointment_id: int,
    response: Response,
    repo: AppointmentQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
) -> AppointmentOut:
    business_id = account_data["business_id"]
    appointment = repo.get_one(appointment_id, business_id)
    if appointment is None:
        response.status_code = 404
    return appointment


@router.post("/api/appointments", response_model=AppointmentOut)
def create_appointment(
    info: AppointmentIn,
    response: Response,
    repo: AppointmentQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
):
    business_id = account_data["business_id"]
    info.business_id = business_id
    return repo.create(info)


@router.post("/api/heroappointments", response_model=AppointmentOut)
def create_appointment(
    business_id: int,
    info: AppointmentIn,
    response: Response,
    repo: AppointmentQueries = Depends(),
):
    info.business_id = business_id
    print(business_id, info)
    return repo.create(info)


@router.put(
    "/api/appointments/{appointment_id}", response_model=AppointmentOut
)
def update_appointment(
    appointment_id: int,
    appointment: AppointmentIn,
    response: Response,
    repo: AppointmentQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
) -> AppointmentOut:
    business_id = account_data["business_id"]
    appointment.business_id = business_id

    return repo.update(appointment_id, business_id, appointment)


@router.delete("/api/appointments/{appointment_id}", response_model=bool)
def delete_appointment(
    appointment_id: int,
    repo: AppointmentQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
) -> bool:
    business_id = account_data["business_id"]
    return repo.delete(appointment_id, business_id)


@router.put("/api/appointments/{appointment_id}/approve", response_model=bool)
def approve_appointment(
    appointment_id: int,
    repo: AppointmentQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
) -> bool:
    business_id = account_data["business_id"]
    return repo.approve(appointment_id, business_id)


@router.put(
    "/api/appointments/{appointment_id}/disapprove", response_model=bool
)
def disapprove_appointment(
    appointment_id: int,
    repo: AppointmentQueries = Depends(),
    account_data=Depends(authenticator.get_current_account_data),
) -> bool:
    business_id = account_data["business_id"]
    return repo.disapprove(appointment_id, business_id)

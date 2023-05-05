import React, { useEffect, useState } from "react";

function AppointmentDetail({ appointmentId, onClose, onEdit, user, approveAppointment, deleteAppointment, token }) {
  const [appointment, setAppointment] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const getAppointment = async (appointmentId) => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/appointments/${appointmentId}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setAppointment(data);
    }
  };

  const handleApprove = async () => {
    setIsPending(true);
    await approveAppointment(appointmentId);
    setIsPending(false);
    onClose();
  };

  const handleDelete = async () => {
    setIsPending(true);
    await deleteAppointment(appointmentId);
    setIsPending(false);
    onClose();
  };
  useEffect(() => {
    if (token) {
      getAppointment(appointmentId);
    }
  }, [token, appointmentId]);

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        onClick={onClose}
      >
        <div
          className="modal-dialog modal modal-dialog-centered modal-dialog-scrollable"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Appointment Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <ul className="list-group ">
                <li className="list-group-item">
                  <strong>Customer Name:</strong> {appointment.customer_name}
                </li>
                <li className="list-group-item">
                  <strong>Customer Phone:</strong> {appointment.customer_phone}
                </li>
                <li className="list-group-item">
                  <strong>Vehicle Make:</strong> {appointment.vehicle_make}
                </li>
                <li className="list-group-item">
                  <strong>Vehicle Model:</strong> {appointment.vehicle_model}
                </li>
                <li className="list-group-item">
                  <strong>Vehicle Year:</strong> {appointment.vehicle_year}
                </li>
                <li className="list-group-item">
                  <strong>Vehicle Color:</strong> {appointment.vehicle_color}
                </li>
                <li className="list-group-item">
                  <strong>Date of Service:</strong> {appointment.date_of_service}
                </li>
                <li className="list-group-item">
                  <strong>Service Name:</strong> {appointment.service_name}
                </li>
                <li className="list-group-item">
                  <strong>Notes:</strong> {appointment.notes}
                </li>
                <li className="list-group-item">
                  <strong>Status:</strong>{" "}
                  {appointment.is_approved ? "Approved" : "Pending"}
                </li>
              </ul>
              {token && user?.is_client ? (
                <div className="mt-3 btn-group gap-4 d-md-block">
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      onEdit();
                    }}
                  >
                    Edit
                  </button>
                  {!appointment.is_approved && (
                    <button
                      type="button"
                      onClick={handleApprove}
                      className="btn btn-success"
                      disabled={isPending}
                    >
                      {isPending ? "Approving..." : "Approve"}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="btn btn-danger"
                    disabled={isPending}
                  >
                    {isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default AppointmentDetail;
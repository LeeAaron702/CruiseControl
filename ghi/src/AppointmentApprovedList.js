import React, { useState } from "react";
import AppointmentDetail from "./AppointmentDetail";
import AppointmentEdit from "./AppointmentUpdate";
import { Link } from "react-router-dom";

function AppointmentApprovedList({ approveAppointment, deleteAppointment, user, getAppointments, appointments, token }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [modalContent, setModalContent] = useState("details");
  const [selectedAppointmentData, setSelectedAppointmentData] = useState(null);

  const openAppointmentModal = (appointmentId, content, appointmentData) => {
    setShowModal(true);
    setSelectedAppointmentId(appointmentId);
    setModalContent(content);
    setSelectedAppointmentData(appointmentData);

  };

  const closeAppointmentModal = () => {
    setShowModal(false);
    setSelectedAppointmentId(null);
    setSelectedAppointmentData(null);

  };


  const renderModalContent = () => {
    if (modalContent === "details") {
      return (
        <AppointmentDetail
          appointmentId={selectedAppointmentId}
          approveAppointment={approveAppointment}
          deleteAppointment={deleteAppointment}
          onEdit={() => setModalContent("edit")}
          onClose={closeAppointmentModal}
          token={token}
          user={user}
        />
      );
    } else if (modalContent === "edit") {
      return (
        <AppointmentEdit
          appointmentId={selectedAppointmentId}
          getAppointments={getAppointments}
          onClose={() => {
            setModalContent("details");
            closeAppointmentModal();
          }}
          setModalContent={setModalContent}
          token={token}
          user={user}
        />
      );
    }
  };

  return (
    <div>
      {user?.is_client && <h1 className="text-center">Approved Appointments</h1>}
      <table className="table table-striped">
        <thead className="text-center">
          <tr className="header">
            <th>Customer Name</th>
            <th>Vehicle Model</th>
            <th>Date of Service</th>
            <th>Service Name</th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {appointments
            .sort(
              (a, b) =>
                new Date(b.date_of_service) - new Date(a.date_of_service)
            )
            .map((appointment, index) => {
              return (
                <tr key={appointment.id}>
                  <td>{appointment.customer_name}</td>
                  <td>{appointment.vehicle_model}</td>
                  <td>{appointment.date_of_service}</td>
                  <td>{appointment.service_name}</td>
                  <td>
                    <div className="btn-group gap-4 d-md-block">

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => openAppointmentModal(appointment.id, "details")}
                      >
                        Details
                      </button>
                      {token && user?.is_client && (
                        <button
                          type="button"
                          onClick={() => deleteAppointment(appointment.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {showModal && (
        <div
          className="modal show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">{renderModalContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
export default AppointmentApprovedList;

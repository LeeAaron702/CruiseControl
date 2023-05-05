import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";
import CalendarComponent from "./CalendarComponent";
import AppointmentPendingList from "./AppointmentsPendingList";
import AppointmentApprovedList from "./AppointmentApprovedList";
import ServiceParent from "./ServiceParent";
import TechnicianParent from "./TechParent";
import ApprovedAppointmentsGraph from "./ApprovedAppointmentsGraph";
import AppointmentCreation from "./AppointmentCreation";
import ClientEdit from "./ClientEdit";

function ClientLanding() {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const [account, setAccount] = useState(null);
  // const [showPending, setShowPending] = useState(true);
  const [activeComponent, setActiveComponent] = useState("pending");
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [approvedAppointments, setApprovedAppointments] = useState([]);

  const getAppointments = async () => {
    const listUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/appointments`;
    const response = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      const approvedAppointments = data.filter(
        (appointment) => appointment.is_approved
      );
      setApprovedAppointments(approvedAppointments);
      const pendingAppointments = data.filter(
        (appointment) => !appointment.is_approved
      );
      setPendingAppointments(pendingAppointments);
    }
  };

  const getClient = async () => {
    const clientUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/client/${user.id}`;
    const response = await fetch(clientUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setAccount(data);
    }
  };

  const approveAppointment = async (id) => {
    await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/appointments/${id}/approve`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    await getAppointments();
  };

  const deleteAppointment = async (id) => {
    await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/appointments/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    await getAppointments();
  };

  const filterAppointmentsByWeek = (appointments, weeksAgo) => {
    const now = new Date();
    const startOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay() - weeksAgo * 7
    );
    const endOfWeek = new Date(
      startOfWeek.getFullYear(),
      startOfWeek.getMonth(),
      startOfWeek.getDate() + 6
    );

    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date_of_service);
      return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek;
    });
  };
  const lastWeekAppointments = filterAppointmentsByWeek(
    approvedAppointments,
    0
  );
  const weekBeforeLastAppointments = filterAppointmentsByWeek(
    approvedAppointments,
    1
  );

  useEffect(() => {
    if (token) {
      getAppointments();
    }
    if (user) {
      getClient();
    }
  }, [token, user]);

  const handlePendingClick = () => {
    setActiveComponent("pending");
  };

  const handleApprovedClick = () => {
    setActiveComponent("approved");
  };

  const handleServicesClick = () => {
    setActiveComponent("services");
  };

  const handleTechniciansClick = () => {
    setActiveComponent("technicians");
  };

  const handleAppointmentClick = () => {
    setActiveComponent("appointmentCreate");
  };

  const handleClientEditClick = () => {
    setActiveComponent("clientedit");
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "pending":
        return <AppointmentPendingList approveAppointment={approveAppointment} deleteAppointment={deleteAppointment} user={user} getAppointments={getAppointments} appointments={pendingAppointments} token={token} />;
      case "approved":
        return <AppointmentApprovedList approveAppointment={approveAppointment} deleteAppointment={deleteAppointment} user={user} getAppointments={getAppointments} appointments={approvedAppointments} token={token} />;
      case "services":
        return <ServiceParent user={user} token={token} />;
      case "technicians":
        return <TechnicianParent user={user} token={token} />;
      case "appointmentCreate":
        return (
          <AppointmentCreation
            user={user}
            token={token}
            getAppointments={getAppointments}
          />
        );
      case "clientedit":
        return (
          <ClientEdit
            user={user}
            token={token}
            account={account}
            getclient={getClient}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      {token && user?.is_client && (
        <div className="">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    {account ? (
                      <h1 className="text-center text-capitalize text-black">
                        {account.username}'s Dashboard
                      </h1>
                    ) : null}
                  </div>
                </div>
                <ApprovedAppointmentsGraph
                  lastWeek={lastWeekAppointments.length}
                  weekBeforeLast={weekBeforeLastAppointments.length}
                />
              </div>
              <div className="col-md-6">
                <CalendarComponent
                  appointments={approvedAppointments}
                  token={token}
                />
              </div>
            </div>
          </div>
          <div className="row p-1">
            <div className="row mb-1">
              <div className="col">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeComponent === "pending" ? "active" : ""
                        }`}
                      onClick={handlePendingClick}
                    >
                      Upcoming Appointments
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeComponent === "approved" ? "active" : ""
                        }`}
                      onClick={handleApprovedClick}
                    >
                      Approved Appointments
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeComponent === "services" ? "active" : ""
                        }`}
                      onClick={handleServicesClick}
                    >
                      Services
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeComponent === "technicians" ? "active" : ""
                        }`}
                      onClick={handleTechniciansClick}
                    >
                      Technicians
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeComponent === "appointmentCreate" ? "active" : ""
                        }`}
                      onClick={handleAppointmentClick}
                    >
                      Create Appointment
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeComponent === "clientedit" ? "active" : ""
                        }`}
                      onClick={handleClientEditClick}
                    >
                      Update Account
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col mb-4">{renderActiveComponent()}</div>
          </div>
        </div>
        // </div >
      )}
      {!token ||
        (token && user?.is_technician && (
          <div className="alert alert-danger" role="alert">
            This area is off limits.
          </div>
        ))}
    </>
  );
}

export default ClientLanding;

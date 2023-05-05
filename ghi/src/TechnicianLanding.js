import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";

import AppointmentApprovedList from "./AppointmentApprovedList";

import CalendarComponent from "./CalendarComponent";

function TechnicianLanding() {

  const [approvedAppointments, setApprovedAppointments] = useState([]);
  const { token } = useContext(AuthContext);
  const user = useUser(token);

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

    };
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

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


  return (
    <div>
      <CalendarComponent appointments={approvedAppointments} />
      <AppointmentApprovedList approveAppointment={approveAppointment} deleteAppointment={deleteAppointment} user={user} getAppointments={getAppointments} appointments={approvedAppointments} token={token} />    </div>
  );
}

export default TechnicianLanding;

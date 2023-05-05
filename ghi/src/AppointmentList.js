import React, { useEffect, useState } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useContext } from "react";
import useUser from "./useUser";
import { Link } from "react-router-dom";

function AppointmentList() {
  const { token } = useContext(AuthContext);
  const user = useUser(token);

  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    const listUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/appointments`;
    const response = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setAppointments(data);
    }
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);
  return (
    <div>
      {token && user?.is_client === true ? (
        <>
          <h1 className="text-center">List of All Appointments</h1>
          <table className="table table-striped">
            <thead className="text-center">
              <tr className="header">
                <th>Customer Name</th>
                <th>Vehicle Model</th>
                <th>Date of Service</th>
                <th>Service Name</th>
                <th>Approved Or Denied</th>
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
                    <tr key={`${appointment.id}-${index}`}>
                      <td>{appointment.customer_name}</td>
                      <td>{appointment.vehicle_model}</td>
                      <td>{appointment.date_of_service}</td>
                      <td>{appointment.service_name}</td>
                      <td>{appointment.is_approved ? "Approved" : "Denied"}</td>
                      <td>
                        <Link
                          className="btn btn-primary btn-sm mr-2"
                          to={`/appointment/${appointment.id}`}
                          role="button"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : null}
      {token && user?.is_technician ? (
        <div class="alert alert-danger" role="alert">
          This area is off limits.
        </div>
      ) : null}
    </div>
  );
}
export default AppointmentList;

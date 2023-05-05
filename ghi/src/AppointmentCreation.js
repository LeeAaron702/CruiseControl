import React, { useState, useEffect } from "react";

import useUser from "./useUser";

function AppointmentCreation({ getAppointments, token, user }) {


  const [services, setServices] = useState([]);

  const [customer_name, setCustomerName] = useState("");
  const [customer_phone, setCustomerPhone] = useState("");
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_year, setVehicleYear] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");
  const [notes, setNotes] = useState("");
  const [date_of_service, setDateOfService] = useState("");
  const [business_id, setBusinessId] = useState("");
  const [service_id, setServiceId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.customer_name = customer_name;
    data.customer_phone = customer_phone;
    data.vehicle_make = vehicle_make;
    data.vehicle_model = vehicle_model;
    data.vehicle_year = vehicle_year;
    data.vehicle_color = vehicle_color;
    data.notes = notes;
    data.date_of_service = date_of_service;
    data.business_id = user.business_id;
    data.service_id = service_id;
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/appointments`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      await response.json();
      setCustomerName("");
      setCustomerPhone("");
      setVehicleMake("");
      setVehicleModel("");
      setVehicleYear("");
      setVehicleColor("");
      setNotes("");
      setDateOfService("");
      setBusinessId("");
      setServiceId("");
      getAppointments();
    } else {
      console.error("Error creating appointment; Please try again.");
    }
  };

  const getServices = async (event) => {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/services`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setServices(data);
  };
  useEffect(() => {
    if (token) {
      getServices();
    }
  }, [token]);
  return (
    <div>
      {token && user?.is_client === true ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="shadow p-4 mt-4">
                <h1>Create An Appointment</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      id="service_id"
                      name="service_id"
                      value={service_id}
                      onChange={(event) => setServiceId(event.target.value)}
                      required
                    >
                      <option value="">Select a Service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.service_name} {service.service_type}{" "}
                          {service.service_price}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="service_id">Service</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="customer_name"
                      name="customer_name"
                      value={customer_name}
                      onChange={(event) => setCustomerName(event.target.value)}
                      required
                      placeholder="customer_name"
                    />
                    <label htmlFor="customer_name">Customer Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      id="customer_phone"
                      name="customer_phone"
                      value={customer_phone}
                      onChange={(event) => setCustomerPhone(event.target.value)}
                      required
                      placeholder="customer_phone"
                    />
                    <label htmlFor="customer_phone">Customer Phone</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="date"
                      className="form-control"
                      id="date_of_service"
                      name="date_of_service"
                      value={date_of_service}
                      onChange={(event) => setDateOfService(event.target.value)}
                      required
                      placeholder="date_of_service"
                    />
                    <label htmlFor="date_of_service">Date of Service</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="vehicle_make"
                      name="vehicle_make"
                      value={vehicle_make}
                      onChange={(event) => setVehicleMake(event.target.value)}
                      placeholder="vehicle_make"
                    />
                    <label htmlFor="vehicle_make">Vehicle Make</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="vehicle_model"
                      name="vehicle_model"
                      value={vehicle_model}
                      onChange={(event) => setVehicleModel(event.target.value)}
                      placeholder="vehicle_model"
                    />
                    <label htmlFor="vehicle_model">Vehicle Model</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="vehicle_year"
                      name="vehicle_year"
                      value={vehicle_year}
                      onChange={(event) => setVehicleYear(event.target.value)}
                      placeholder="vehicle_year"
                    />
                    <label htmlFor="vehicle_year">Vehicle Year</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="vehicle_color"
                      name="vehicle_color"
                      value={vehicle_color}
                      onChange={(event) => setVehicleColor(event.target.value)}
                      placeholder="vehicle_color"
                    />
                    <label htmlFor="vehicle_color">Vehicle Color</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="notes"
                      name="notes"
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="notes"
                    />
                    <label htmlFor="notes">Notes</label>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {token && user?.is_technician ? (
        <div class="alert alert-danger" role="alert">
          This area is off limits.
        </div>
      ) : null}
    </div>
  );
}
export default AppointmentCreation;

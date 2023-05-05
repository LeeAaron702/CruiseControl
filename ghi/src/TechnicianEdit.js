import React, { useState } from "react";

function TechnicianEdit(props) {
  const [id] = useState(props.technician.id);
  const [username, setUsername] = useState(props.technician.username);
  const [password, setPassword] = useState(props.technician.password);
  const [business_id] = useState(props.technician.business_id);
  const [employee_id, setEmployeeId] = useState(props.technician.employee_id);
  const [first_name, setFirstName] = useState(props.technician.first_name);
  const [last_name, setLastName] = useState(props.technician.last_name);
  const [email, setEmail] = useState(props.technician.email);
  const [address, setAddress] = useState(props.technician.address);
  const [phone_number, setPhoneNumber] = useState(
    props.technician.phone_number
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.id = id;
    data.username = username;
    data.hashed_password = password;
    data.business_id = business_id;
    data.employee_id = employee_id;
    data.first_name = first_name;
    data.last_name = last_name;
    data.email = email;
    data.address = address;
    data.phone_number = phone_number;
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/accounts/${id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      await response.json();
      props.getTechnician();
      props.editToggle();
    } else {
      console.error("Error Couldnt Update Technician");
    }
  };

  return (
    <div>
      {props.token && props.user?.is_client === true ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="shadow p-4 mt-4">
                <h1>Edit A Technician</h1>
                <form onSubmit={handleSubmit} className="row g-10">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="Username"
                    />
                    <label htmlFor="username"></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      placeholder="First Name"
                      value={first_name}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                    <label htmlFor="first_name"></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      placeholder="Last Name"
                      value={last_name}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                    <label htmlFor="last_name"></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      id="employee_id"
                      placeholder="Employee Id"
                      value={employee_id}
                      onChange={(event) => setEmployeeId(event.target.value)}
                    />
                    <label htmlFor="Employee_id"></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <label htmlFor="email"></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                    <label htmlFor="address"></label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="tel"
                      className="form-control"
                      id="phone_number"
                      placeholder="Phone Number"
                      value={phone_number}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                    <label htmlFor="phone_number"></label>
                  </div>
                  <div className="btn-group gap-4 d-md-block">
                    <button
                      className="btn btn-warning btn-sm mr-2"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="This will Submit your changes"
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-secondary btn-sm mr-2"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="This will Discard your changes"
                      onClick={() => props.editToggle()}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {props.token && props.user?.is_technician ? (
        <div class="alert alert-danger" role="alert">
          This area is off limits.
        </div>
      ) : null}
    </div>
  );
}

export default TechnicianEdit;

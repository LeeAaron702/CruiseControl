import React, { useState } from "react";

function ServiceCreation({ getServices, token, user }) {
  const [service_name, setService_Name] = useState("");
  const [service_type, setService_type] = useState("");
  const [service_description, setService_description] = useState("");
  const [service_price, setService_price] = useState("");
  const [business_id, setbusiness_id] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.service_name = service_name;
    data.service_type = service_type;
    data.service_description = service_description;
    data.service_price = service_price;
    data.business_id = business_id;
    const submitUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/services`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(submitUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      setService_Name("");
      setService_type("");
      setService_description("");
      setService_price("");
      getServices();
    } else {
      console.error("Error creating service; Please try again.");
    }
  };
  return (
    <div>
      {token && user?.is_client === true ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="shadow p-4 mt-4">
                <h1>Create A Service</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="service_name"
                      value={service_name}
                      onChange={(event) => setService_Name(event.target.value)}
                      required
                      placeholder="name"
                    />
                    <label htmlFor="Name">Service Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="service_type"
                      value={service_type}
                      onChange={(event) => setService_type(event.target.value)}
                      required
                      placeholder="service_type"
                    />
                    <label htmlFor="Name">Service Type</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="service_description"
                      value={service_description}
                      onChange={(event) =>
                        setService_description(event.target.value)
                      }
                      required
                      placeholder="service_description"
                    />
                    <label htmlFor="Name">Service Description</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="service_price"
                      value={service_price}
                      onChange={(event) => setService_price(event.target.value)}
                      required
                      placeholder="service_price"
                    />
                    <label htmlFor="Name">Service Price</label>
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
export default ServiceCreation;

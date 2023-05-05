import React, { useState } from "react";


function ServiceEdit(props) {
  const [id, setId] = useState(props.service.id);
  const [service_name, setService_Name] = useState(props.service.service_name);
  const [service_type, setService_type] = useState(props.service.service_type);
  const [service_description, setService_description] = useState(
    props.service.service_description
  );
  const [service_price, setService_price] = useState(
    props.service.service_price
  );
  const [business_id, setbusiness_id] = useState(props.service.business_id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.id = id;
    data.service_name = service_name;
    data.service_type = service_type;
    data.service_description = service_description;
    data.service_price = service_price;
    data.business_id = business_id;
    const submitUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/services/${id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(submitUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      props.getServices();
      props.toggleEditMode();
    } else {
      console.error("Error updating service; Please try again.");
    }
  };
  return (
    <div>
      {props.token && props.user?.is_client === true ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="shadow p-4 mt-4">
                <h1>Edit A Service</h1>
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
                  <button className="btn btn-warning">Update</button>
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

export default ServiceEdit;

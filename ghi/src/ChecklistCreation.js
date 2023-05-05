import React, { useState } from "react";

function ChecklistCreation({ getChecklist, token, serviceId }) {
  const [checklist_item, setChecklistItem] = useState("");
  const [serviceName, setServiceName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.checklist_item = checklist_item;
    data.service_id = serviceId;
    data.service_name = serviceName;

    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/checklist`;
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
      setChecklistItem("");
      setServiceName("");
      getChecklist(serviceId);
    } else {
      console.error("Error creating checklist, please check input");
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center">
        <div className="shadow p-4 mt-4">
          <h1>Create Checklist Item</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                value={checklist_item}
                onChange={(event) => setChecklistItem(event.target.value)}
                placeholder="Enter Step Details"
              />
              <label htmlFor="Enter Step">Enter Step Detail</label>
            </div>

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default ChecklistCreation;

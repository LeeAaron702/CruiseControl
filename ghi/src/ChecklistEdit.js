import React from "react-router-dom";
import { useState } from "react";

function ChecklistEdit({
  getChecklist,
  token,
  checklistItem,
  setIsEditing,
  serviceId,
}) {
  const [checklist_item, setChecklistItem] = useState(
    checklistItem.checklist_item
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      checklist_item: checklist_item,
      service_id: serviceId,
    };
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/checklist/${checklistItem.id}`;
    const fetchConfig = {
      method: "PUT",
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
      getChecklist(serviceId);
      setIsEditing(false);
    } else {
      console.error("Error updating checklist, please check input");
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center">
        <div className="shadow p-4 mt-4">
          <h1>Edit Checklist Item</h1>
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

            <button className="btn btn-warning">Update</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChecklistEdit;

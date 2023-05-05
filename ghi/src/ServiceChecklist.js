import React, { useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import ChecklistCreation from "./ChecklistCreation";
import ChecklistList from "./ChecklistList";
import ChecklistEdit from "./ChecklistEdit";
import useUser from "./useUser";

function ServiceChecklist({ serviceId, closeModal }) {
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  const [checklistItems, setChecklistItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingChecklistItem, setEditingChecklistItem] = useState(null);
  const toggleEditMode = (checklist_item) => {
    setIsEditing(!isEditing);
    setEditingChecklistItem(checklist_item);
  };
  const fetchServiceChecklistEntry = useCallback(
    async (serviceId) => {
      const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/services/${serviceId}/checklist`;
      const fetchConfig = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, fetchConfig);
      const data = await response.json();
      setChecklistItems(data);
    },
    [token]
  );

  useEffect(() => {
    if (token) {
      fetchServiceChecklistEntry(serviceId);
    }
  }, [token, serviceId, fetchServiceChecklistEntry]);



  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        onClick={closeModal}
      >
        <div
          className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Service Checklist</h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-md-5">
                    {isEditing ? (
                      <ChecklistEdit
                        checklistItem={editingChecklistItem}
                        token={token}
                        checklistitems={checklistItems}
                        toggleEditMode={toggleEditMode}
                        getChecklist={fetchServiceChecklistEntry}
                        user={user}
                        serviceId={serviceId}
                        setIsEditing={setIsEditing}
                      />
                    ) : (
                      <ChecklistCreation
                        token={token}
                        getChecklist={fetchServiceChecklistEntry}
                        user={user}
                        serviceId={serviceId}
                      />
                    )}
                  </div>

                  <div className="col-12 col-md-7">
                    <div className="card-body">
                      <ChecklistList
                        toggleEditMode={toggleEditMode}
                        checklistitems={checklistItems}
                        getChecklist={fetchServiceChecklistEntry}
                        token={token}
                        user={user}
                        serviceId={serviceId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceChecklist;

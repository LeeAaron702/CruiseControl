import React from "react";
import { Link } from "react-router-dom";

function ChecklistList({
  toggleEditMode,
  getChecklist,
  token,
  user,
  checklistitems,
  serviceId,
}) {
  const deleteChecklistItem = async (checklist_id) => {
    await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/checklist/${checklist_id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    await getChecklist(serviceId);
  };

  return (
    <div>
      {token && user?.is_client === true ? (
        <>
          <h1 className="text-center">Checklist Steps</h1>
          <table className="table table-striped">
            <thead className="text-center">
              <tr className="header">
                <th>Details</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {checklistitems
                .sort((a, b) => a.id - b.id)
                .map((checklistitem, index) => {
                  return (
                    <tr
                      key={`${
                        checklistitem.service_id / checklistitem
                      }-${index}`}
                    >
                      <td>
                        <Link
                          to={`/services/${checklistitem.id}`}
                          className="text-reset text-decoration-none"
                        >
                          {checklistitem.checklist_item}
                        </Link>
                      </td>
                      <td>
                        <div className="btn-group gap-4 d-md-block">
                          <button
                            type="button"
                            onClick={() => {
                              toggleEditMode(checklistitem);
                            }}
                            className="btn btn-warning btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              deleteChecklistItem(checklistitem.id)
                            }
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </div>
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
export default ChecklistList;

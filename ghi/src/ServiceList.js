import React, { useState } from "react";
import ServiceChecklist from "./ServiceChecklist";

function ServiceList({ services, toggleEditMode, getServices, token, user }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const openChecklistModal = (serviceId) => {
    setShowModal(true);
    setSelectedServiceId(serviceId);
  };


  const closeChecklistModal = () => {
    setShowModal(false);
    setSelectedServiceId(null);
  };

  const deleteService = async (service_id) => {
    await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/services/${service_id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    await getServices();
  };


  return (
    <div>
      {token && user?.is_client === true ? (
        <>
          <h1 className="text-center">List of Services</h1>
          <table className="table table-striped">
            <thead className="text-center">
              <tr className="header">
                <th>Type</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {services
                .sort((a, b) => a.service_type.localeCompare(b.service_type))
                .map((service, index) => {
                  return (
                    <tr key={`${service.service_id}-${index}`}>
                      <td>{service.service_type}</td>
                      <td>{service.service_name}</td>
                      <td>{service.service_description}</td>
                      <td>{service.service_price}</td>
                      <td>
                        <div className="btn-group gap-4 d-md-block">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => openChecklistModal(service.id)}
                          >
                            Checklist
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleEditMode(service)}
                            className="btn btn-sm btn-warning"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteService(service.id)}
                            className="btn btn-sm btn-danger"
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
        <div className="alert alert-danger" role="alert">
          This area is off limits.
        </div>
      ) : null}
      {showModal && (
        <ServiceChecklist
          serviceId={selectedServiceId}
          closeModal={closeChecklistModal}
        />
      )}
    </div>
  );
}
export default ServiceList;

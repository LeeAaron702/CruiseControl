import React, { useEffect, useState } from "react";
import ServiceCreation from "./ServiceCreation";
import ServiceEdit from "./ServiceEdit";
import ServiceList from "./ServiceList";

function ServiceParent({ user, token }) {
  const [services, setServices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const toggleEditMode = (service) => {
    setIsEditing(!isEditing);
    setEditingService(service);
  };

  const getServices = async () => {
    const listUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/services`;
    const response = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setServices(data);
    }
  };

  useEffect(() => {
    if (token) {
      getServices();
    }
  }, [token]);

  return (
    <div className="row">
      <div className="col-12 col-md-4">
        {isEditing ? (
          <ServiceEdit
            service={editingService}
            toggleEditMode={toggleEditMode}
            getServices={getServices}
            token={token}
            user={user}
          />
        ) : (
          <ServiceCreation
            getServices={getServices}
            token={token}
            user={user}
          />
        )}
      </div>
      <div className="col-12 col-md-8">
        <div className="card-body">
          <ServiceList
            services={services}
            toggleEditMode={toggleEditMode}
            getServices={getServices}
            token={token}
            user={user}
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceParent;

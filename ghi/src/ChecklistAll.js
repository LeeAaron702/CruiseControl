import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function ChecklistAll() {
  const { token } = useContext(AuthContext);
  const [checklist, setChecklist] = useState();

  const fetchChecklist = async () => {
    const checklistUrl = `http://localhost:8000/api/checklist`;
    const fetchConfig = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(checklistUrl, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        setChecklist(data);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (checklistId) => {
    const deleteUrl = `http://localhost:8000/api/checklist/${checklistId}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(deleteUrl, fetchConfig);
      if (response.ok) {
        // Remove the deleted item from the checklist state
        const updatedChecklist = checklist.filter(
          (item) => item.id !== checklistId
        );
        setChecklist(updatedChecklist);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChecklist();
  }, []);

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Checklist ID</th>
            <th>Step One</th>
            <th>Step Two</th>
            <th>Step Three</th>
            <th>Step Four</th>
            <th>Step Five</th>
            <th>Step Six</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {checklist.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.line_item1}</td>
                <td>{item.line_item2}</td>
                <td>{item.line_item3}</td>
                <td>{item.line_item4}</td>
                <td>{item.line_item5}</td>
                <td>{item.line_item6}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ChecklistAll;

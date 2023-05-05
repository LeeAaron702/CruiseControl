import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarComponent.css";

const CalendarComponent = ({ appointments }) => {
  const [date, setDate] = useState(new Date());
  const tileClassName = ({ date, view }) => {
    if (view !== "month") return null;

    const isToday = new Date().toDateString() === date.toDateString();
    const appointmentsOnDate = appointments.filter((appointment) => {
      const appointmentDate = new Date(
        appointment.date_of_service + "T00:00:00"
      );
      return appointmentDate.toDateString() === date.toDateString();
    });

    const appointmentCount = appointmentsOnDate.length;

    if (isToday) return "today";
    if (appointmentCount === 1) return "one-appointment";
    if (appointmentCount === 2) return "two-appointments";
    if (appointmentCount >= 3) return "three-or-more-appointments";
  };

  return (
    <Container>
      <Row>
        <Card>
          <Card.Body>
            <h1 className="text-center">Approved Appointments</h1>
            <Calendar
              value={date}
              tileDisabled={() => true}
              onChange={setDate}
              tileClassName={tileClassName}
            />
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default CalendarComponent;

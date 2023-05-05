steps = [
    [
        """
        CREATE TABLE appointments (
            id SERIAL PRIMARY KEY NOT NULL,
            customer_name VARCHAR(50) NOT NULL,
            customer_phone VARCHAR(50) NOT NULL,
            vehicle_make VARCHAR(50),
            vehicle_model VARCHAR(50),
            vehicle_year INTEGER,
            vehicle_color VARCHAR(50),
            notes TEXT,
            date_of_service DATE,
            business_id INTEGER NOT NULL,
            is_approved BOOLEAN NOT NULL DEFAULT FALSE,
            service_id INTEGER NOT NULL,
            FOREIGN KEY (service_id) REFERENCES services (id)
        );
        """,
        """
        DROP TABLE appointments;
        """,
    ]
]

steps = [
    [
        """
        CREATE TABLE services (
            id SERIAL PRIMARY KEY NOT NULL,
            service_name VARCHAR(50) NOT NULL,
            service_type VARCHAR(50) NOT NULL,
            service_description TEXT NOT NULL,
            service_price NUMERIC NOT NULL,
            business_id INT NOT NULL,
            FOREIGN KEY (business_id) REFERENCES businesses (id)
        );
        """,
        """
        DROP TABLE services;
        """,
    ]
]

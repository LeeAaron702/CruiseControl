steps = [
    [
        """
        CREATE TABLE businesses(
            id SERIAL PRIMARY KEY NOT NULL,
            business_name TEXT UNIQUE
            );
        """,
        """
        DROP TABLE businesses
        """,
    ]
]

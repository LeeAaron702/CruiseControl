steps = [
    [
        """
    CREATE TABLE checklist (
      id SERIAL PRIMARY KEY NOT NULL,
      checklist_item VARCHAR(1000) NOT NULL,
      service_id INTEGER NOT NULL,
      FOREIGN KEY (service_id) REFERENCES services (id)
    );
    """,
        """
    DROP TABLE checklist;
    """,
    ]
]

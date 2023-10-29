DROP TABLE IF EXISTS invoice_lines;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS hours;
DROP TABLE IF EXISTS clients;


-- Create the clients table
CREATE TABLE clients (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL
);

-- Create the hours table
CREATE TABLE hours (
    id INTEGER PRIMARY KEY,
    client_id INTEGER NOT NULL,
    time_in TEXT NOT NULL,
    time_out TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Create the invoices table
CREATE TABLE invoices (
    id INTEGER PRIMARY KEY,
    client_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    date_paid TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Create the invoice_lines table
CREATE TABLE invoice_lines (
    id INTEGER PRIMARY KEY,
    invoice_id INTEGER NOT NULL,
    hours_id INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (invoice_id) REFERENCES invoice(id),
    FOREIGN KEY (hours_id) REFERENCES hours(id)
);
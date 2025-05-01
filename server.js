// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');

// Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS for all origins (optional, for allowing requests from different domains)
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost', // or your database server IP
    user: 'root', // your MySQL username
    password: '', // your MySQL password
    database: 'hospital_management_system' // your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Now you can use 'db' to interact with the database in your routes

// Get all doctors


// ------------------ Patient CRUD -------------------
app.post('/add-patient', (req, res) => {
    const { id,name, contact, type } = req.body;
    db.query("INSERT INTO patient (Patient_ID,Name, Contact, Patient_Type) VALUES (?, ?, ?, ?)", [id,name, contact, type], (err, result) => {
        if (err) throw err;
        res.send('Patient added!');
    });
});



app.get('/get-patient/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM patient WHERE Patient_id = ?", [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.put('/update-patient/:id', (req, res) => {
    const id = req.params.id;
    const { name, contact, type } = req.body;
    db.query("UPDATE patient SET Name=?, Contact=?, Patient=? WHERE Patient_id=?", [name, contact, type, id], (err, result) => {
        if (err) throw err;
        res.send('Patient updated!');
    });
});

app.delete('/delete-patient/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM patient WHERE Patient_id = ?", [id], (err, result) => {
        if (err) throw err;
        res.send('Patient deleted!');
    });
});


// ----------------- Doctor CRUD -------------------
app.get('/doctors',(req, res)=>{
    db.query('SELECT * FROM doctor',(err,result)=>{
        if(err){
            res.json('An error occured', err);
        }
        else{
            // console.log(result);
            res.json(result);
        }

    });
    
});

// Add Doctor
app.post('/add-doctor', (req, res) => {
    const { id, name, specialization, contact } = req.body;
    db.query("INSERT INTO doctor (Doctor_id, Name, Specialization, Contact) VALUES (?, ?, ?, ?)", 
        [id, name, specialization, contact], 
        (err, result) => {
            if (err) {
                console.error('Error adding doctor:', err);
                res.status(500).json({ error: 'Failed to add doctor' });
                return;
            }
            res.json({ message: 'Doctor added successfully!' });
        }
    );
});

// Get Doctor
app.get('/get-doctor/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM doctor WHERE Doctor_id = ?", [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// Update Doctor
app.put('/update-doctor/:id', (req, res) => {
    const id = req.params.id;
    const { name, specialization, contact } = req.body;
    db.query("UPDATE doctor SET Name=?, Specialization=?, Contact=? WHERE Doctor_id=?", [name, specialization, contact, id], (err, result) => {
        if (err) throw err;
        res.send('Doctor updated!');
    });
});

// Delete Doctor
app.delete('/delete-doctor/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM doctor WHERE Doctor_id = ?", [id], (err, result) => {
        if (err) throw err;
        res.send('Doctor deleted!');
    });
});


// ---------------- Receptionist CRUD ----------------
app.post('/add-receptionist', (req, res) => {
    console.log(req.body);
    const { id,name, contact } = req.body;
    db.query("INSERT INTO receptionist (Receptionist_ID,Name, Contact) VALUES (?, ?, ?)", [id,name, contact], (err, result) => {
        if (err) throw err;
        res.send('Receptionist added!');
    });
});

app.get('/get-receptionist/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM receptionist WHERE Receptionist_id = ?", [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.put('/update-receptionist/:id', (req, res) => {
    const id = req.params.id;
    const { name, contact } = req.body;
    db.query("UPDATE receptionist SET Name=?, Contact=? WHERE Receptionist_id=?", [name, contact, id], (err, result) => {
        if (err) throw err;
        res.send('Receptionist updated!');
    });
});

app.delete('/delete-receptionist/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM receptionist WHERE Receptionist_id = ?", [id], (err, result) => {
        if (err) throw err;
        res.send('Receptionist deleted!');
    });
});


// Server listening
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

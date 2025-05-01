// Add Patient
document.getElementById('addPatientForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('patientName').value;
    const contact = document.getElementById('patientContact').value;
    const patient_type = document.getElementById('patientType').value;

    await fetch('http://localhost:3000/add-patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, patient_type })
    });

    alert('Patient Added!');
});

// Add Doctor
document.getElementById('addDoctorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('doctorName').value;
    const specialization = document.getElementById('specialization').value;
    const contact = document.getElementById('doctorContact').value;

    await fetch('http://localhost:3000/add-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, specialization, contact })
    });

    alert('Doctor Added!');
});

// Add Receptionist
document.getElementById('addReceptionistForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('receptionistName').value;
    const contact = document.getElementById('receptionistContact').value;

    await fetch('http://localhost:3000/add-receptionist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact })
    });

    alert('Receptionist Added!');
});

// Load All Patients
document.getElementById('loadPatientsBtn').addEventListener('click', async () => {
    const res = await fetch('http://localhost:3000/patients');
    const patients = await res.json();

    const tbody = document.querySelector('#patientTable tbody');
    tbody.innerHTML = '';

    patients.forEach(patient => {
        const row = `<tr>
            <td>${patient.Patient_id}</td>
            <td>${patient.Name}</td>
            <td>${patient.Contact}</td>
            <td>${patient.Patient_type}</td>
            <td><button onclick="deletePatient(${patient.Patient_id})">Delete</button></td>
        </tr>`;
        tbody.innerHTML += row;
    });
});

// Delete Patient
async function deletePatient(id) {
    if (confirm('Are you sure you want to delete this patient?')) {
        await fetch(`http://localhost:3000/delete-patient/${id}`, { method: 'DELETE' });
        alert('Patient deleted');
        document.getElementById('loadPatientsBtn').click(); // Reload patient list
    }
}

// Search Patient
document.getElementById('searchBtn').addEventListener('click', async () => {
    const name = document.getElementById('searchName').value;
    const res = await fetch(`http://localhost:3000/search-patient/${name}`);
    const patients = await res.json();

    const tbody = document.querySelector('#patientTable tbody');
    tbody.innerHTML = '';

    patients.forEach(patient => {
        const row = `<tr>
            <td>${patient.Patient_id}</td>
            <td>${patient.Name}</td>
            <td>${patient.Contact}</td>
            <td>${patient.Patient_type}</td>
            <td><button onclick="deletePatient(${patient.Patient_id})">Delete</button></td>
        </tr>`;
        tbody.innerHTML += row;
    });
});

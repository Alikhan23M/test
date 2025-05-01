async function showPatients() {
const response = await fetch('http://localhost:3000/patients');
const data = await response.json();

const patientHTML = data.map((patient)=>
    ` <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
            <h3>${patient.Name}</h3>
            <p><strong>Patient Type:</strong> ${patient.Patient_Type}</p>
            <p><strong>Contact:</strong> ${patient.Contact}</p>
            <p><strong>ID:</strong> ${patient.Patient_ID}</p>
        </div>`
).join('');
document.getElementById('all-patients').innerHTML = patientHTML;

}
showPatients();
// Add Patient
function addPatient() {
    document.getElementById('formArea').innerHTML = `
        <form onsubmit="submitPatient(event)">
            <h3>Add New Patient</h3>
            <div class="form-group">
                <label for="patientId">Patient ID</label>
                <input type="text" id="patientId" placeholder="Enter Patient ID" required>
            </div>
            <div class="form-group">
                <label for="patientName">Patient Name</label>
                <input type="text" id="patientName" placeholder="Enter Patient Name" required>
            </div>
            <div class="form-group">
                <label for="patientContact">Contact Number</label>
                <input type="text" id="patientContact" placeholder="Enter Contact Number" required>
            </div>
            <div class="form-group">
                <label for="patientType">Patient Type</label>
                <select id="patientType" required>
                    <option value="">Select Patient Type</option>
                    <option value="Outpatient">Outpatient</option>
                    <option value="Resident">Resident</option>
                </select>
            </div>
            <button type="submit">Add Patient</button>
        </form>
    `;
}

async function submitPatient(event) {
    event.preventDefault();
    const id = document.getElementById('patientId').value;
    const name = document.getElementById('patientName').value;
    const contact = document.getElementById('patientContact').value;
    const type = document.getElementById('patientType').value;

    try {
        const response = await fetch('http://localhost:3000/add-patient', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, contact, type })
        });

        if (!response.ok) {
            throw new Error('Failed to add patient');
        }

        alert('Patient Added Successfully!');
        document.getElementById('formArea').innerHTML = '';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Search Patient
function searchPatient() {
    document.getElementById('formArea').innerHTML = `
        <form onsubmit="submitSearchPatient(event)">
            <h3>Search Patient</h3>
            <div class="form-group">
                <label for="searchId">Patient ID</label>
                <input type="text" id="searchId" placeholder="Enter Patient ID" required>
            </div>
            <button type="submit">Search</button>
        </form>
    `;
}

async function submitSearchPatient(event) {
    event.preventDefault();
    const id = document.getElementById('searchId').value;

    try {
        const response = await fetch(`http://localhost:3000/get-patient/${id}`);
        if (!response.ok) {
            throw new Error('Patient not found');
        }
        const data = await response.json();

        document.getElementById('resultArea').innerHTML = `
            <div class="result-card">
                <h4>Patient Details</h4>
                <div class="result-item">
                    <span class="label">Name:</span>
                    <span class="value">${data.Name}</span>
                </div>
                <div class="result-item">
                    <span class="label">Contact:</span>
                    <span class="value">${data.Contact}</span>
                </div>
                <div class="result-item">
                    <span class="label">Patient Type:</span>
                    <span class="value">${data.Patient}</span>
                </div>
            </div>
        `;
    } catch (error) {
        document.getElementById('resultArea').innerHTML = `
            <div class="error-message">
                ${error.message}
            </div>
        `;
    }
}

// Update Patient
function updatePatient() {
    document.getElementById('formArea').innerHTML = `
        <form onsubmit="submitUpdatePatient(event)">
            <h3>Update Patient</h3>
            <div class="form-group">
                <label for="editId">Patient ID</label>
                <input type="text" id="editId" placeholder="Enter Patient ID" required>
            </div>
            <div class="form-group">
                <label for="editName">New Name</label>
                <input type="text" id="editName" placeholder="Enter New Name" required>
            </div>
            <div class="form-group">
                <label for="editContact">New Contact</label>
                <input type="text" id="editContact" placeholder="Enter New Contact" required>
            </div>
            <div class="form-group">
                <label for="editType">New Patient Type</label>
                <select id="editType" required>
                    <option value="">Select Patient Type</option>
                    <option value="Outpatient">Outpatient</option>
                    <option value="Resident">Resident</option>
                </select>
            </div>
            <button type="submit">Update Patient</button>
        </form>
    `;
}

async function submitUpdatePatient(event) {
    event.preventDefault();
    const id = document.getElementById('editId').value;
    const name = document.getElementById('editName').value;
    const contact = document.getElementById('editContact').value;
    const type = document.getElementById('editType').value;

    try {
        const response = await fetch(`http://localhost:3000/update-patient/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, contact, type })
        });

        if (!response.ok) {
            throw new Error('Failed to update patient');
        }

        alert('Patient Updated Successfully!');
        document.getElementById('formArea').innerHTML = '';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Delete Patient
function deletePatient() {
    document.getElementById('formArea').innerHTML = `
        <form onsubmit="submitDeletePatient(event)">
            <h3>Delete Patient</h3>
            <div class="form-group">
                <label for="deleteId">Patient ID</label>
                <input type="text" id="deleteId" placeholder="Enter Patient ID" required>
            </div>
            <button type="submit" class="delete-button">Delete Patient</button>
        </form>
    `;
}

async function submitDeletePatient(event) {
    event.preventDefault();
    const id = document.getElementById('deleteId').value;

    if (!confirm('Are you sure you want to delete this patient?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/delete-patient/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete patient');
        }

        alert('Patient Deleted Successfully!');
        document.getElementById('formArea').innerHTML = '';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

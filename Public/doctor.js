async function showDoctors() {
    const response = await fetch('http://localhost:3000/doctors');
    const data = await response.json();

    const doctorsHTML = data.map(doctor => `
        <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
            <h3>${doctor.Name}</h3>
            <p><strong>Specialization:</strong> ${doctor.Specialization}</p>
            <p><strong>Contact:</strong> ${doctor.Contact}</p>
            <p><strong>ID:</strong> ${doctor.Doctor_ID}</p>
        </div>
    `).join('');

    document.getElementById('all-doctors').innerHTML = doctorsHTML;
}

showDoctors();

// Add Doctor
function addDoctor() {
    document.getElementById('formArea').style.display = "block";
    document.getElementById('formArea').innerHTML = `
        <form onsubmit="submitDoctor(event)">
            <h3>Add New Doctor</h3>
            <div class="form-group">
                <label for="doctorId">Doctor ID</label>
                <input type="text" id="doctorId" placeholder="Enter Doctor ID" required>
            </div>
            <div class="form-group">
                <label for="doctorName">Doctor Name</label>
                <input type="text" id="doctorName" placeholder="Enter Doctor Name" required>
            </div>
            <div class="form-group">
                <label for="specialization">Specialization</label>
                <input type="text" id="specialization" placeholder="Enter Specialization" required>
            </div>
            <div class="form-group">
                <label for="contact">Contact</label>
                <input type="text" id="contact" placeholder="Enter Contact Number" required>
            </div>
            <button type="submit">Add Doctor</button>
        </form>
    `;
}

async function submitDoctor(event) {
    event.preventDefault();
    const id = document.getElementById('doctorId').value;
    const name = document.getElementById('doctorName').value;
    const specialization = document.getElementById('specialization').value;
    const contact = document.getElementById('contact').value;

    try {
        const response = await fetch('http://localhost:3000/add-doctor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, specialization, contact })
        });

        if (!response.ok) {
            throw new Error('Failed to add doctor');
        }

        alert('Doctor Added Successfully!');
        document.getElementById('formArea').innerHTML = '';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Search Doctor
function searchDoctor() {
    document.getElementById('formArea').innerHTML = `
        <h3>Search Doctor</h3>
        <input type="text" id="searchId" placeholder="Doctor ID"><br>
        <button onclick="submitSearch()">Search</button>
    `;
}

async function submitSearch() {
    const id = document.getElementById('searchId').value;

    const response = await fetch(`http://localhost:3000/get-doctor/${id}`);
    const data = await response.json();

    document.getElementById('resultArea').innerHTML = `
        <h4>Result:</h4>
        Name: ${data.Name}<br>
        Specialization: ${data.Specialization}<br>
        Contact: ${data.Contact}
    `;
}

// Update Doctor
function updateDoctor() {
    document.getElementById('formArea').innerHTML = `
        <h3>Update Doctor</h3>
        <input type="text" id="editId" placeholder="Doctor ID"><br>
        <input type="text" id="editName" placeholder="New Name"><br>
        <input type="text" id="editSpecialization" placeholder="New Specialization"><br>
        <input type="text" id="editContact" placeholder="New Contact"><br>
        <button onclick="submitUpdate()">Update</button>
    `;
}

async function submitUpdate() {
    const id = document.getElementById('editId').value;
    const name = document.getElementById('editName').value;
    const specialization = document.getElementById('editSpecialization').value;
    const contact = document.getElementById('editContact').value;

    await fetch(`http://localhost:3000/update-doctor/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, specialization, contact })
    });

    alert('Doctor Updated!');
}

// Delete Doctor
function deleteDoctor() {
    document.getElementById('formArea').innerHTML = `
        <h3>Delete Doctor</h3>
        <input type="text" id="deleteId" placeholder="Doctor ID"><br>
        <button onclick="submitDelete()">Delete</button>
    `;
}

async function submitDelete() {
    const id = document.getElementById('deleteId').value;

    await fetch(`http://localhost:3000/delete-doctor/${id}`, {
        method: 'DELETE'
    });

    alert('Doctor Deleted!');
}

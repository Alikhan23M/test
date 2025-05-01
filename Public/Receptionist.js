// Add Receptionist
function addReceptionist() {
    const formArea = document.getElementById('formArea');
    formArea.innerHTML = `
        <form onsubmit="submitReceptionist(event)">
            <h3>Add New Receptionist</h3>
            <div class="form-group">
                <label for="receptionistId">Receptionist ID</label>
                <input type="text" id="receptionistId" required>
            </div>
            <div class="form-group">
                <label for="receptionistName">Name</label>
                <input type="text" id="receptionistName" required>
            </div>
            <div class="form-group">
                <label for="receptionistContact">Contact Number</label>
                <input type="text" id="receptionistContact" required>
            </div>
            <button type="submit">Add Receptionist</button>
        </form>
    `;
}

async function submitReceptionist(event) {
    event.preventDefault();
    const id = document.getElementById('receptionistId').value;
    const name = document.getElementById('receptionistName').value;
    const contact = document.getElementById('receptionistContact').value;

    try {
        const response = await fetch('http://localhost:3000/add-receptionist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                id: id,
                name: name,
                contact: contact 
            })
        });

        if (!response.ok) {
            throw new Error('Failed to add receptionist');
        }

        alert('Receptionist Added Successfully!');
        document.getElementById('formArea').innerHTML = '';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Search Receptionist
function searchReceptionist() {
    const formArea = document.getElementById('formArea');
    formArea.innerHTML = `
        <form onsubmit="submitSearchReceptionist(event)">
            <h3>Search Receptionist</h3>
            <div class="form-group">
                <label for="searchId">Receptionist ID</label>
                <input type="text" id="searchId" required>
            </div>
            <button type="submit">Search</button>
        </form>
        <div id="searchResult"></div>
    `;
}

async function submitSearchReceptionist(event) {
    event.preventDefault();
    const id = document.getElementById('searchId').value;
    try {
        const response = await fetch(`http://localhost:3000/get-receptionist/${id}`);
        const data = await response.json();
        
        const resultDiv = document.getElementById('searchResult');
        if (data.error) {
            resultDiv.innerHTML = `
                <div class="error-message">
                    ${data.error}
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="result-card">
                    <h4>Receptionist Details</h4>
                    <div class="result-item">
                        <span class="label">ID:</span>
                        <span class="value">${data.Receptionist_ID}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Name:</span>
                        <span class="value">${data.Name}</span>
                    </div>
                    <div class="result-item">
                        <span class="label">Contact:</span>
                        <span class="value">${data.Contact}</span>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        const resultDiv = document.getElementById('searchResult');
        resultDiv.innerHTML = `
            <div class="error-message">
                Error searching for receptionist: ${error.message}
            </div>
        `;
    }
}

// Update Receptionist
function updateReceptionist() {
    const formArea = document.getElementById('formArea');
    formArea.innerHTML = `
        <form onsubmit="submitUpdateReceptionist(event)">
            <h3>Update Receptionist</h3>
            <div class="form-group">
                <label for="updateId">Receptionist ID</label>
                <input type="text" id="updateId" required>
            </div>
            <div class="form-group">
                <label for="updateName">New Name</label>
                <input type="text" id="updateName" required>
            </div>
            <div class="form-group">
                <label for="updateContact">New Contact</label>
                <input type="text" id="updateContact" required>
            </div>
            <button type="submit">Update Receptionist</button>
        </form>
    `;
}

async function submitUpdateReceptionist(event) {
    event.preventDefault();
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const contact = document.getElementById('updateContact').value;

    try {
        const response = await fetch(`http://localhost:3000/update-receptionist/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, contact })
        });

        if (!response.ok) {
            throw new Error('Failed to update receptionist');
        }

        alert('Receptionist Updated Successfully!');
        document.getElementById('formArea').innerHTML = '';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Delete Receptionist
function deleteReceptionist() {
    const formArea = document.getElementById('formArea');
    formArea.innerHTML = `
        <form onsubmit="submitDeleteReceptionist(event)">
            <h3>Delete Receptionist</h3>
            <div class="form-group">
                <label for="deleteId">Receptionist ID</label>
                <input type="text" id="deleteId" required>
            </div>
            <button type="submit" class="delete-button">Delete Receptionist</button>
        </form>
    `;
}

async function submitDeleteReceptionist(event) {
    event.preventDefault();
    const id = document.getElementById('deleteId').value;

    if (!confirm('Are you sure you want to delete this receptionist?')) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/delete-receptionist/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete receptionist');
        }

        alert('Receptionist Deleted Successfully!');
        document.getElementById('formArea').innerHTML = '';
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

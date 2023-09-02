// Function to display the selected date
function displayDate() {
    const dateInput = document.getElementById('datePicker');
    const dateValue = dateInput.value;
    const output = document.getElementById('selectedDate');
    if (dateValue) {
        output.textContent = `You selected: ${dateValue}`;
    } else {
        output.textContent = 'No date selected';
    }
}

// Function to handle tab toggling
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Function to store deposit
function storeDeposit() {
    const depositAmount = document.getElementById('depositAmount').value;
    const dateValue = document.getElementById('datePicker').value;
    if (depositAmount && dateValue) {
        const depositTableBody = document.querySelector('#depositTable tbody');
        const newRow = depositTableBody.insertRow();
        const dateCell = newRow.insertCell(0);
        const amountCell = newRow.insertCell(1);
        dateCell.textContent = dateValue;
        amountCell.textContent = depositAmount;

        // Clear the date input field
        document.getElementById('datePicker').value = '';

        // Clear the deposit input field
        document.getElementById('depositAmount').value = '';
        
    } else {
        alert('Please enter both date and deposit amount!');
    }
}

// Function to store and display a transaction
function storeTransaction() {
    const transactionDescription = document.getElementById('transactionDescription').value;
    const transactionAmount = document.getElementById('transactionAmount').value;
    const dateValue = document.getElementById('datePicker').value;
    
    if (transactionDescription && transactionAmount && dateValue) {
        const transactionTableBody = document.querySelector('#transactionTable tbody');
        const newRow = transactionTableBody.insertRow();
        const dateCell = newRow.insertCell(0);
        const descriptionCell = newRow.insertCell(1);
        const amountCell = newRow.insertCell(2);
        
        dateCell.textContent = dateValue;
        descriptionCell.textContent = transactionDescription;
        amountCell.textContent = transactionAmount;

        // Clear the date input field
        document.getElementById('datePicker').value = '';

        // Clear the transaction description and amount input fields
        document.getElementById('transactionDescription').value = '';
        document.getElementById('transactionAmount').value = '';
        
    } else {
        alert('Please enter date, transaction description, and transaction amount!');
    }
}

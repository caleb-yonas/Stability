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

function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function storeDeposit() {
    const depositAmount = document.getElementById('depositAmount').value;
    const dateValue = document.getElementById('datePicker').value;
    if (depositAmount && dateValue) {
        // Add to the deposits table in the DOM
        const depositTableBody = document.querySelector('#depositTable tbody');
        const newRow = depositTableBody.insertRow();
        const dateCell = newRow.insertCell(0);
        const amountCell = newRow.insertCell(1);
        dateCell.textContent = dateValue;
        amountCell.textContent = depositAmount;

        // Clear the inputs
        document.getElementById('datePicker').value = '';
        document.getElementById('depositAmount').value = '';

        // Add to our deposits array
        const deposit = new Payment(null, depositAmount, null, "deposit", dateValue);
    } else {
        alert('Please enter both date and deposit amount!');
    }
}

function storeTransaction() {
    const transactionDescription = document.getElementById('transactionDescription').value;
    const transactionAmount = document.getElementById('transactionAmount').value;
    const dateValue = document.getElementById('datePicker').value;
    const transactionCategory = document.getElementById('budgetChoices').value === "other" ? document.getElementById('otherCategory').value : document.getElementById('budgetChoices').value;
    
    if (transactionDescription && transactionAmount && dateValue && transactionCategory) {
        // Add to the transactions table in the DOM
        const transactionTableBody = document.querySelector('#transactionTable tbody');
        const newRow = transactionTableBody.insertRow();
        const dateCell = newRow.insertCell(0);
        const descriptionCell = newRow.insertCell(1);
        const categoryCell = newRow.insertCell(2); // New cell for category
        const amountCell = newRow.insertCell(3);
        dateCell.textContent = dateValue;
        descriptionCell.textContent = transactionDescription;
        categoryCell.textContent = transactionCategory; // Set the category
        amountCell.textContent = transactionAmount;

        // Clear the inputs
        document.getElementById('datePicker').value = '';
        document.getElementById('transactionDescription').value = '';
        document.getElementById('transactionAmount').value = '';
        if (transactionCategory === "other") {
            document.getElementById('otherCategory').value = ''; // Clear the other category if it was used
        }

        // Add to our transactions array
        const transaction = new Payment(transactionDescription, transactionAmount, transactionCategory, "transaction", dateValue);
    } else {
        alert('Please complete all fields including date, transaction description, amount, and category!');
    }
}

function checkOther(selectBox) {
    const otherInputDiv = document.getElementById('otherInput');
    if (selectBox.value === "other") {
        otherInputDiv.style.display = "block";
    } else {
        otherInputDiv.style.display = "none";
    }
}

function createBudgetBar(category) {
    const budgetContainer = document.getElementById('budgetCategoryContainer');
    const newCategoryDiv = document.createElement('div');
    newCategoryDiv.className = 'category';
    newCategoryDiv.innerHTML = `
        <p>${category}:</p>
        <div class="budget-bar">
            <div class="filled-bar ${category.toLowerCase()}"></div>
        </div>
        <input type="number" placeholder="Set budget" class="budget-input" id="${category}Budget">
    `;
    budgetContainer.appendChild(newCategoryDiv);

    // Add event listener to the new budget input element
    const newBudgetInput = document.getElementById(`${category}Budget`);
    newBudgetInput.addEventListener('input', updateBudgetBar);
}

// Function to add a new budget category
function addNewCategory() {
    const selectBox = document.getElementById('budgetChoices');
    const otherCategoryInput = document.getElementById('otherCategory');
    const newCategory = otherCategoryInput.value.trim();

    // Check if the category already exists in the select box
    const categoryExists = [...selectBox.options].some(opt => opt.value === newCategory);

    if (newCategory && !categoryExists) {
        const newOption = document.createElement('option');
        newOption.value = newCategory;
        newOption.textContent = newCategory;
        selectBox.insertBefore(newOption, selectBox.lastChild);

        // Create a new budget category bar
        createBudgetBar(newCategory);

        // Clear the input and hide the input box
        otherCategoryInput.value = "";
        selectBox.value = newCategory;
        document.getElementById('otherInput').style.display = "none";
    } else {
        // If category already exists, select it in the dropdown
        selectBox.value = newCategory;
        document.getElementById('otherInput').style.display = "none";
    }
}

// New Code
let transactions = [];
let deposits = [];
class Payment {
    constructor(name, amount, category, type, date) {
        this.name = name;
        this.amount = parseFloat(amount);
        this.category = category;
        this.type = type;
        this.date = date;
        if (type === "transaction") {
            transactions.push(this);
        } else if (type === "deposit") {
            deposits.push(this);
        }
    }
    getName() { return this.name; }
    getAmount() { return this.amount; }
    getCategory() { return this.category; }
    getDate() { return this.date; }
    editAmount(newAmount) {
        if (typeof newAmount !== "number") { return; }
        else { this.amount = newAmount; }
    }
    editCategory(newCategory) {
        if (typeof newCategory !== "string") { return; }
        else { this.category = newCategory; }
    }
}

function amountSort(list) {
    let cat = list.map(payment => payment.getCategory())
                   .filter((category, idx, arr) => arr.indexOf(category) === idx);
    let amt = Array(cat.length).fill(0);
    for (let i = 0; i < cat.length; i++) {
        for (let payment of list) {
            if (cat[i] === payment.getCategory()) {
                amt[i] += payment.getAmount();
            }
        }
    }
    const result = Object.fromEntries(cat.map((category, idx) => [category, amt[idx]]));
    console.log(result);
}

function dateConvert(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    const correctedDate = new Date(year, month - 1, day);
    if (correctedDate.getDate() !== day) {
        correctedDate.setDate(0);
    }
    return correctedDate;
}

const inputDate = "2023-12-31";
const correctedDate = dateConvert(inputDate);
console.log(correctedDate);

function updateBudgetBar(event) {
    const inputValue = parseFloat(event.target.value) || 0;
    const budgetBar = event.target.closest('.category').querySelector('.filled-bar');
    budgetBar.style.width = inputValue + '%';
}
const budgetInputs = document.querySelectorAll('.budget-input');
budgetInputs.forEach(input => {
    input.addEventListener('input', updateBudgetBar);
});

// Initialize the budget bars for existing categories on page load
const existingCategories = ['groceries', 'utilities', 'entertainment'];
existingCategories.forEach(category => createBudgetBar(category));

// ... Your other functions ...

// Initialize the budget bars for existing categories on page load
window.onload = () => {
    existingCategories.forEach(category => createBudgetBar(category));
};

// Get the canvas element and create a context
const ctx = document.getElementById('lineChart').getContext('2d');

// Sample data for the line graph
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        label: 'Amount of Money',
        data: [100, 150, 200, 130, 180, 250], // Replace with your actual data
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        borderWidth: 2,
        fill: false // No fill under the line
    }]
};

// Create the line chart
const lineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount of Money'
                }
            }
        }
    }
});


let annualExpenses = 0;

$(onReady);
function onReady() {
    console.log('JQ in onReady()');
    addEventHandlers();
}

// Add handler functions to interactive elements
function addEventHandlers() {
    $('#add-employee-button').on('click', addEmployee);
}

// When the 'Submit' button is pressed. Take the actions needed to add an employee.
function addEmployee() {
    console.log('in addEmployee()');
    const firstName = $('#first-name').val();
    const lastName = $('#last-name').val();
    const employeeID = $('#employee-id').val();
    const employeeTitle = $('#employee-title').val();
    const annualSalary = parseFloat($('#annual-salary').val());

    annualExpenses += annualSalary;
    updateMonthlyExpenses();
    updateEmployeeList(firstName, lastName, employeeID, employeeTitle, annualSalary);
    clearInputFields();
}

// Based on the running total of annual expenses, update the displayed field for monthly expenses
function updateMonthlyExpenses() {
    const monthlyExpenses = annualExpenses / 12.0;
    $('#monthly-expenses').html('Total Monthly: $' + formatAsUSD(monthlyExpenses));
}

// Append a given employee to the employee list in the DOM
function updateEmployeeList(firstName, lastName, employeeID, employeeTitle, annualSalary) {
    $('#employee-list').append(`<li>${firstName}, ${lastName}, ${employeeID}, ${employeeTitle}, ${formatAsUSD(annualSalary)}</li>`);
}

// Clear all input fields
function clearInputFields() {
    $('#first-name').val('');
    $('#last-name').val('');
    $('#employee-id').val('');
    $('#employee-title').val('');
    $('#annual-salary').val('');
}

// Format a Number as US dollars. 
// Note: Will not include dollar sign '$'.
function formatAsUSD(inputNum) {
    const formattedNum = inputNum.toLocaleString("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formattedNum;
}
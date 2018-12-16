
let annualExpenses = 0;

$(onReady);
function onReady() {
    addEventHandlers();
}

// Add handler functions to interactive elements
function addEventHandlers() {
    $('#submit-button').on('click', addEmployee);
    $('#employee-list-tbody').on('click', '.delete-button', deleteEmployee);
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

function deleteEmployee() {
    $(this).parent().parent().remove();
}

// Based on the running total of annual expenses, update the displayed field for monthly expenses
function updateMonthlyExpenses() {
    const monthlyExpenses = annualExpenses / 12.0;
    $('#monthly-expenses').html('Total Monthly: $' + formatAsUSD(monthlyExpenses));
    if (monthlyExpenses > 20000.0) {
        $('#monthly-expenses').css('background-color', 'red');
    } else {
        $('#monthly-expenses').css('background-color', 'inherit');
    }
}

// Append a given employee to the employee list in the DOM
function updateEmployeeList(firstName, lastName, employeeID, employeeTitle, annualSalary) {
    let row = '<tr>';
    row += `<td>${firstName}</td>`;
    row += `<td>${lastName}</td>`;
    row += `<td>${employeeID}</td>`;
    row += `<td>${employeeTitle}</td>`;
    row += `<td>${formatAsUSD(annualSalary)}</td>`;
    row += '<td><button class="delete-button">Delete</button></td>';
    row += '</tr>'
    $('#employee-list-tbody').append(row);
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
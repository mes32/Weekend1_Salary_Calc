// --- Global variables and constants --- //

let employeeList = [];

// --- Function definitions --- //

$(onReady);
function onReady() {
    addEventHandlers();

    // If available run the corresponding set of unit tests for this script file
    if (typeof (client_test_js) === typeof(Function)) {
        client_test_js();
    }
}

// Add handler functions to interactive HTML elements
function addEventHandlers() {
    $('#submit-button').on('click', addEmployee);
    $('#employee-list-tbody').on('click', '.delete-button', deleteEmployee);
}

// When the 'Submit' button is pressed. Take the actions needed to add an 
// employee.
function addEmployee() {
    const firstName = $('#first-name').val();
    const lastName = $('#last-name').val();
    const employeeID = $('#employee-id').val();
    const employeeTitle = $('#employee-title').val();
    const annualSalary = $('#annual-salary').val();

    try {
        const employee = new Employee(firstName, lastName, employeeID, employeeTitle, annualSalary);
        employeeList.push(employee);
        updateExpenses();
        updateEmployeeList(employee);
        clearInputFields();
        clearRequiredEmployeeFields();
        return true;
    } catch (err) {
        console.log(err);
        updateRequiredEmployeeFields(firstName, lastName, employeeID, employeeTitle, annualSalary);
        return false;
    }
}

// When a 'Delete' button is pressed. Delete an employee's row (tr) from the 
// employee table.
function deleteEmployee() {
    const rowElement = $(this).parent().parent();
    const employee = rowElement.data('employee');
    const i = employeeList.indexOf(employee);
    employeeList.splice(i, 1);

    rowElement.remove();
    updateExpenses();
}

// Based on the running total of annual expenses, update the displayed heading 
// for monthly expenses.
function updateExpenses() {
    let annualExpenses = 0.0;
    for (let i = 0; i < employeeList.length; i++) {
        annualExpenses += employeeList[i].annualSalary.amount;
    }
    const monthlyExpenses = new CurrencyUSD(annualExpenses / 12.0);
    const str = monthlyExpenses.format(true);
    $('#monthly-expenses').html('Total Monthly: ' + str);
    if (monthlyExpenses.amount > 20000.0) {
        $('#monthly-expenses').css('background-color', 'red');
    } else {
        $('#monthly-expenses').css('background-color', 'inherit');
    }
}

// Append a set of employee data to the employee list in the DOM
function updateEmployeeList(employee) {
    const firstName = employee.firstName;
    const lastName = employee.lastName;
    const employeeID = employee.employeeID;
    const employeeTitle = employee.employeeTitle;
    const annualSalary = employee.annualSalary.format();

    let html = '<tr>';
    html += `<td>${firstName}</td>`;
    html += `<td>${lastName}</td>`;
    html += `<td>${employeeID}</td>`;
    html += `<td>${employeeTitle}</td>`;
    html += `<td>${annualSalary}</td>`;
    html += '<td><button class="delete-button">Delete</button></td>';
    html += '</tr>';

    const rowElement = $(html);
    rowElement.data('employee', employee);
    $('#employee-list-tbody').append(rowElement);
}

// Activate annotation indicating required input fields that are missing user
// input strings. Also selectively deactivates fields that now have data.
// (e.g. elements with class .require-border and .require-txt)
function updateRequiredEmployeeFields(firstName, lastName, employeeID, employeeTitle, annualSalary) {
    const requiredFields = [
        { inputText: firstName, htmlClass: '.require-first-name' },
        { inputText: lastName, htmlClass: '.require-last-name' },
        { inputText: employeeID, htmlClass: '.require-employee-id' },
        { inputText: employeeTitle, htmlClass: '.require-employee-title' },
        { inputText: annualSalary, htmlClass: '.require-annual-salary' },
        { inputText: lastName, htmlClass: '.require-last-name' },
    ];

    for (let req of requiredFields) {
        if (!req.inputText) {
            $(req.htmlClass).toggleClass('require-active', true);
        } else {
            $(req.htmlClass).toggleClass('require-active', false);
        }
    }
}

// Hide any previously activated annotation indicating a required input field
// (e.g. elements with class .require-border and .require-txt)
function deactivateRequiredEmployeeFields() {
    $('#inputs-flex-box').find('.require-active').toggleClass('require-active', false);
}

// Clear all input fields
function clearInputFields() {
    $('#first-name').val('');
    $('#last-name').val('');
    $('#employee-id').val('');
    $('#employee-title').val('');
    $('#annual-salary').val('');
}

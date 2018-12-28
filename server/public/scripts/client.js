// --- Main onReady Function --- //

$(onReady);
function onReady() {
    addEventHandlers();
    getEmployees();
    getMonthlyExpenses();

    // If available run the corresponding set of unit tests for this script file
    if (typeof (client_test_js) === typeof(Function)) {
        client_test_js();
    }
}

// --- Function Definitions --- //

// Add handler functions to interactive HTML elements
function addEventHandlers() {
    $('#submit-button').on('click', submitButton);
    $('#employee-list-tbody').on('click', '.delete-button', deleteButton);
}

// Requests an updated list of employees from the server using GET and then 
// updates the displayed list in the DOM.
function getEmployees() {
    $.ajax({
        method: 'GET',
        url: '/employee',
    }).then(function(response) {
        displayEmployeeList(response);
    });
}

// Requests that a new employee be added to the server using POST. Then updates
// the displayed list of employees and expenses in the DOM.
function postEmployee(employee) {
    $.ajax({
        method: 'POST',
        url: '/employee',
        data: employee,
    }).then(function(response) {
        getEmployees();
        getMonthlyExpenses();
    });
}

// Requests that a given employee be removed from the server using DELETE. Then
// updates the displayed list of employees and expenses in the DOM.
function deleteEmployee(employee) {
    $.ajax({
        method: 'DELETE',
        url: '/employee',
        data: employee,
    }).then(function (response) {
        getEmployees();
        getMonthlyExpenses();
    });
}

// Requests the current monthly expenses from the server using GET and then 
// updates the displayed expenses in the DOM.
function getMonthlyExpenses() {
    $.ajax({
        method: 'GET',
        url: '/monthly-expenses',
    }).then(function (response) {
        displayMonthlyExpenses(response);
    });
}

// When the 'Submit' button is pressed. Take the actions needed to add an 
// employee.
function submitButton() {
    const firstName = $('#first-name').val();
    const lastName = $('#last-name').val();
    const employeeID = $('#employee-id').val();
    const employeeTitle = $('#employee-title').val();
    const annualSalary = $('#annual-salary').val();

    try {
        const employee = new Employee(firstName, lastName, employeeID, employeeTitle, annualSalary);
        postEmployee(employee);

        clearInputFields();
        deactivateRequiredEmployeeFields();
        return true;
    } catch (err) {
        console.log(err);
        updateRequiredEmployeeFields(firstName, lastName, employeeID, employeeTitle, annualSalary);
        return false;
    }
}

// When a 'Delete' button is pressed. Retrieves the employee object from the 
// DOM. Then sends a request to the server to delete that employee.
function deleteButton() {
    const rowElement = $(this).parent().parent();
    const employee = rowElement.data('employee');
    deleteEmployee(employee);
}

// Update the displayed heading for monthly expenses (#monthly-expenses).
function displayMonthlyExpenses(expenses) {
    const currency = new CurrencyUSD(expenses.ammount);
    const currencyStr = currency.format(true);
    $('#monthly-expenses').html('Total Monthly: ' + currencyStr);
    if (currency.amount > 20000.0) {
        $('#monthly-expenses').css('background-color', 'red');
    } else {
        $('#monthly-expenses').css('background-color', 'inherit');
    }
}

// Rebuild the employee list in the DOM using an updated list of employees from
// the server
function displayEmployeeList(employeeList) {
    $('#employee-list-tbody').empty();
    for (employee of employeeList) {
        appendEmployee(employee);
    }
}

// Append data for one employee to the employee list in the DOM 
// (#employee-list-tbody)
function appendEmployee(employee) {
    const firstName = employee.firstName;
    const lastName = employee.lastName;
    const employeeID = employee.employeeID;
    const employeeTitle = employee.employeeTitle;
    const annualSalary = new CurrencyUSD(employee.annualSalary.amount);

    let html = '<tr>';
    html += `<td>${firstName}</td>`;
    html += `<td>${lastName}</td>`;
    html += `<td>${employeeID}</td>`;
    html += `<td>${employeeTitle}</td>`;
    html += `<td>${annualSalary.format()}</td>`;
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

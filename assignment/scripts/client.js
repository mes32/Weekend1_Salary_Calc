// --- Classes --- //


class CurrencyUSD {
    constructor(inputString) {
        if (typeof (inputString) !== typeof(String)) {
            throw 'Input type mismatch';
        }
        let ammount = parseFloat(inputString);
        // if (ammount === NaN) {
        //     throw 
        // }
        this.ammount = ammount;
    }

    // format(prependDollarSign) {
    //     const formattedStr = this.ammount.toLocaleString("en", {
    //         minimumFractionDigits: 2,
    //         maximumFractionDigits: 2,
    //     });
    //     if (prependDollarSign) {
    //         return '$' + formattedStr;
    //     } else {
    //         return formattedStr;
    //     }
    // }

    // toString() {
    //     format(false);
    // }
}

let annualExpenses = 0;

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

// When a 'Delete' button is pressed. Delete an employee's row (tr) from the 
// employee table.
function deleteEmployee() {
    $(this).parent().parent().remove();
}

// Based on the running total of annual expenses, update the displayed heading 
// for monthly expenses.
function updateMonthlyExpenses() {
    const monthlyExpenses = annualExpenses / 12.0;
    $('#monthly-expenses').html('Total Monthly: $' + formatAsUSD(monthlyExpenses));
    if (monthlyExpenses > 20000.0) {
        $('#monthly-expenses').css('background-color', 'red');
    } else {
        $('#monthly-expenses').css('background-color', 'inherit');
    }
}

// Append a set of employee data to the employee list in the DOM
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
// Note: Will not include a leading dollar sign '$'.
function formatAsUSD(inputNum) {
    const formattedNum = inputNum.toLocaleString("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formattedNum;
}
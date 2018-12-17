// --- Classes --- //

// Class representing an employee
class Employee {
    constructor(firstName, lastName, employeeID, employeeTitle, annualSalary) {
        try {
            if (firstName && lastName && employeeID && employeeTitle && annualSalary) {
                this.firstName = firstName;
                this.lastName = lastName;
                this.employeeID = employeeID;
                this.employeeTitle = employeeTitle;
                this.annualSalary = new CurrencyUSD(annualSalary);
            } else {
                throw new Error();
            }
        } catch (err) {
            throw new EmployeeError('invalid employee data');
        }
    }
}

// Error class for CurrencyUSD
class EmployeeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmployeeError';
    }
}

// Class representing currency in US dollars
class CurrencyUSD {
    constructor(inputString) {
        const amount = parseFloat(inputString);
        if (typeof(amount) !== 'number' || !isFinite(amount)) {
            throw new CurrencyUSDError('input must parse to float');
        }
        this.amount = amount;
    }

    // Add a currency object to this object (using arithmetic)
    add(additional) {
        this.amount += additional.amount;
    }

    // Format the current amount as a string for display purposes
    format(hasDollarSign) {
        const formattedStr = this.amount.toLocaleString("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        if (hasDollarSign) {
            return '$' + formattedStr;
        } else {
            return formattedStr;
        }
    }

    // Override toString() using method this.format(false)
    toString() {
        this.format(false);
    }
}

// Error class for CurrencyUSD
class CurrencyUSDError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CurrencyUSDError';
    }
}

// --- Global variables and constants --- //

let annualExpenses = new CurrencyUSD(0.00);
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

    // TODO: Check that inputs are complete and provide visual feedback

    try {
        const employee = new Employee(firstName, lastName, employeeID, employeeTitle, annualSalary);
        annualExpenses.add(employee.annualSalary);
        employeeList.push(employee);

        updateExpenses();
        updateEmployeeList(employee);
        clearInputFields();
    } catch (err) {
        console.log(err);
    }
}

// When a 'Delete' button is pressed. Delete an employee's row (tr) from the 
// employee table.
function deleteEmployee() {
    $(this).parent().parent().remove();
}

// Based on the running total of annual expenses, update the displayed heading 
// for monthly expenses.
function updateExpenses() {
    const monthlyExpenses = new CurrencyUSD(annualExpenses.amount / 12.0);
    const monthlyExpensesStr = monthlyExpenses.format(true);
    $('#monthly-expenses').html('Total Monthly: ' + monthlyExpensesStr);
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

    let row = '<tr>';
    row += `<td>${firstName}</td>`;
    row += `<td>${lastName}</td>`;
    row += `<td>${employeeID}</td>`;
    row += `<td>${employeeTitle}</td>`;
    row += `<td>${annualSalary}</td>`;
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

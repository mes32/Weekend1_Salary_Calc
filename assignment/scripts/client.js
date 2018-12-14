
let annualExpenses = 0;

$(onReady);
function onReady() {
    console.log('JQ in onReady()');
    addEventHandlers();
}

function addEventHandlers() {
    $('#add-employee-button').on('click', addEmployee);
}

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
}

function updateMonthlyExpenses() {
    const monthlyExpenses = annualExpenses / 12.0;
    $('#monthly-expenses').html('Total Monthly: $' + formatAsUSD(monthlyExpenses));
}

function updateEmployeeList(firstName, lastName, employeeID, employeeTitle, annualSalary) {
    $('#employee-list').append(`<li>${firstName}, ${lastName}, ${employeeID}, ${employeeTitle}, ${formatAsUSD(annualSalary)}</li>`);
}

function formatAsUSD(inputNum) {
    const formattedNum = inputNum.toLocaleString("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formattedNum;
}
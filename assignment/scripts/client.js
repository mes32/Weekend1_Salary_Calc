
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
    const annualSalary = $('#annual-salary').val();

    // console.log(firstName, lastName, employeeID, employeeTitle, annualSalary);
    annualExpenses += parseFloat(annualSalary);
    // console.log(`Annual Expenses: ${annualExpenses}`);
    // console.log(`Monthly Expenses: ${annualExpenses/12.0}`);
    updateMonthlyExpenses();
}

function updateMonthlyExpenses() {
    const monthlyExpenses = annualExpenses / 12.0;
    $('#monthly-expenses').html('Total Monthly: ' + formatAsUSD(monthlyExpenses));
}

function formatAsUSD(inputNum) {
    const formattedNum = inputNum.toLocaleString("en", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formattedNum;
}
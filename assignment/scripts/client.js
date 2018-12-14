
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

    console.log(firstName, lastName, employeeID, employeeTitle, annualSalary)
}
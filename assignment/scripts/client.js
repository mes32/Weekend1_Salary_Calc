
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
}
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

// Error class for Employee
class EmployeeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmployeeError';
    }
}
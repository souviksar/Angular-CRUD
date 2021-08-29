export class EmployeeModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    salary: string;

    constructor() {
        this.id = 0;
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.mobile = '';
        this.salary = ''
    }
}
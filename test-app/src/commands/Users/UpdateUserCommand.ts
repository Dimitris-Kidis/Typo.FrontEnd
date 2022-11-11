export class UpdateUserCommand {
    id: number;
    isAdmin: boolean;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    age: number;
    gender: string;

    constructor(id: number, isAdmin: boolean, email: string, firstName: string, lastName: string, password: string, age: number, gender: string) {
        this.id = this.id;
        this.isAdmin = isAdmin;
        this.email = email;
        this.firstName = firstName,
        this.lastName = lastName;
        this.password = password;
        this.age = age;
        this.gender = gender;
    }
}
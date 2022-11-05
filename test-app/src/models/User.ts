export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string; 
    age: number;
    gender: string;
    isAdmin: boolean;

    constructor (id: number, firstName: string, lastName: string, email: string, avatar: string, age: number, gender: string, isAdmin: boolean) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.avatar = avatar;
        this.age = age;
        this.gender = gender;
        this.isAdmin = isAdmin;
    }
    
}
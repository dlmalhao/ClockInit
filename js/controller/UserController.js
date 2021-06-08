import UserModel from "../model/UserModel.js"

export default class UserController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    register(email, password, username, gender, age) {
        if (!this.users.some(user => user.email === email) && !this.users.some(user => user.username === username)) {
            this.users.push(new UserModel(email, password, username, gender, age));
            localStorage.setItem('users', JSON.stringify(this.users))
        } else {
            throw Error(`Your email or username is already registered!`);
        }
    }

    login(username, password) {
        if (this.users.some(user => user.username === username && user.password === password)) {
            sessionStorage.setItem('loggedUser', username)
        } else {
            throw Error('Invalid login!');
        }
    }

    logout() {
        sessionStorage.removeItem('loggedUser')
    }

    isLogged() {
        return sessionStorage.getItem('loggedUser') ? true : false
    }

    isAdminLogged () {
        if(sessionStorage.getItem('loggedUser')) {
            if(sessionStorage.getItem('loggedUser') === "Admin" ) {
                return true
            }
            else {
                return false
            }
        }
        else {
            return false
        }   
    }
}
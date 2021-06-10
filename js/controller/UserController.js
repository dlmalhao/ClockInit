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

        if (this.users.some(user => user.status === "blocked" && user.username === username && user.password === password)) {
            throw Error ('You are blocked by an Admin!')
        }
        else {
            if (this.users.some(user => user.username === username && user.password === password)) {
                sessionStorage.setItem('loggedUser', username)
            } else {
                throw Error('Invalid login!');
            }
        }
    }

    logout() {
        sessionStorage.removeItem('loggedUser')
    }

    isLogged() {
        return sessionStorage.getItem('loggedUser') ? true : false
    }


    getLoggedUser(){
       return sessionStorage.getItem('loggedUser')
    }

    getAllLoggedInInfo() {
        return this.users.find(user => user.username == sessionStorage.getItem("loggedUser"));
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

    isAnyUserLogged () {
        if(sessionStorage.getItem('loggedUser')) {
            return true
        }
        else {
            return false
        }
    }

    updateUserData(id,newUsername, newEmail){
            // verificar se ja existe alguem com o username que vai ser editado
            if ((this.users.some(user => user.username == newUsername && user.email == this.getAllLoggedInInfo().email)) || (!this.users.some(user => user.username == newUsername)))  {
                if(!this.users.some(user => user.email == newEmail)){
                    // o username pertence ao user logado portanto deixar editar
                    this.users[id].email = newEmail;
                    this.users[id].username = newUsername;
                    localStorage.removeItem("users");
                    localStorage.setItem("users", JSON.stringify(this.users));
                    sessionStorage.removeItem('loggedUser');
                    sessionStorage.setItem('loggedUser', newUsername);
                    location.reload() 
                }
                else{
                    alert("Erro, o email já está a ser utilizado!");
                }
                
            } else {
                alert("Erro, o username já está a ser utilizado!");
            }
    }
}
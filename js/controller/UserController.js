import UserModel from "../model/UserModel.js"

export default class UserController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
        this.categories = localStorage.categories ? JSON.parse(localStorage.categories) : [];
        
    }



    // função responsável pelo registo
    register(email, password, username, gender, age) {
        if (!this.users.some(user => user.email === email) && !this.users.some(user => user.username === username)) {
            this.users.push(new UserModel(email, password, username, gender, age));
            localStorage.setItem('users', JSON.stringify(this.users))
        } else {
            throw Error(`Your email or username is already registered!`);
        }
    }


    // função responsável pelo login
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


    // função responsável pelo logout
    logout() {
        sessionStorage.removeItem('loggedUser')
    }


    // função que verifica se o utilizador está logado
    isLogged() {
        return sessionStorage.getItem('loggedUser') ? true : false
    }


    // função que retorna o username do utilizador logado
    getLoggedUser(){
       return sessionStorage.getItem('loggedUser')
    }


    // função que retorna os dados completos do utilizador que está logado
    getAllLoggedInInfo() {
        return this.users.find(user => user.username == sessionStorage.getItem("loggedUser"));
    }


    // função que verifica se o Admin está logado
    isAdminLogged () {
        if(sessionStorage.getItem('loggedUser')) {
            if(this.getAllLoggedInInfo().role === "admin" ) {
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


    // Funcão que retorna a role de um user específico.
    getRoleOfUser(username) {
        let idx = this.users.findIndex(user => user.username === username)
        return this.users[idx].role
    }


    // função que verifica se o utilizador está logado
    isAnyUserLogged () {
        if(sessionStorage.getItem('loggedUser')) {
            return true
        }
        else {
            return false
        }
    }



    // Função que permite editar dados do perfil do utilizador
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
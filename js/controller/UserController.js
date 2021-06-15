import UserModel from "../model/UserModel.js"

export default class UserController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
        this.categories = localStorage.categories ? JSON.parse(localStorage.categories) : [];
        this.activities = localStorage.activities ? JSON.parse(localStorage.activities) : [];
        
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
            if((!this.users.some(user => user.email == newEmail))||((this.users.some(user => user.email == newEmail && user.username == this.getAllLoggedInInfo().username)))){
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





    setNewPassword(newPassword){
        this.getAllLoggedInInfo().password = newPassword
        localStorage.removeItem("users")
        localStorage.setItem("users", JSON.stringify(this.users));
    }


    getOldPassword(){
        return this.getAllLoggedInInfo().password
    }



    // Função que atualiza a foto de perfil do utilizador
    UpdateImage(imageNew){
        
        this.getAllLoggedInInfo().image = imageNew
        localStorage.removeItem("users")
        localStorage.setItem("users", JSON.stringify(this.users));
        
    }


    // Funções que permitem instanciar elementos entre a pag de categorias e a de atividades
    //Não sabemos se terá sido a melhor opção fazer desta forma, mas o resultado era o que nós pretendiamos

    temporarilySendToSessionStorage(name,color) {
        sessionStorage.setItem('Temporarily1', name);
        sessionStorage.setItem('Temporarily2', color)
    }

    getStuffSentToSessionStorage1() {
       return sessionStorage.getItem('Temporarily1')
    }
    getStuffSentToSessionStorage2() {
        return sessionStorage.getItem('Temporarily2')
    }

    removeTemporarilyStuffFromSessionStorage() {
        sessionStorage.removeItem('Temporarily1')
        sessionStorage.removeItem('Temporarily2')

    }




    temporarilySendActivityNameToSessionStorage(value) {
        sessionStorage.setItem('Temporarily3', value)
    }

    getActivitySentToSessionStorage(){
        return sessionStorage.getItem('Temporarily3')
    }

    removeTemporarilyActivityFromSessionStorage() {
        sessionStorage.removeItem('Temporarily3')
    }






    addMoneyToUser(money) {
        console.log(money)
        let dinheiro = this.getAllLoggedInInfo().money
        let novaQuantia = parseInt(money) + parseInt(dinheiro)
        console.log(String(novaQuantia))
        this.getAllLoggedInInfo().money = String(novaQuantia)
        localStorage.removeItem("users")
        localStorage.setItem("users", JSON.stringify(this.users));
    }
}
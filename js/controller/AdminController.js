

export default class AdminController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
        this.categories = localStorage.categories ? JSON.parse(localStorage.categories) : [];
    }


    // função que remove utilizadores
    removeUserBtn (username) {
        let idx = this.users.findIndex(user => user.username === username)
        
       this.users.splice(idx,1)
       localStorage.removeItem("users")
       localStorage.setItem("users", JSON.stringify(this.users))
    }


    // função que remove categorias
    removeCategoryBtn (id) {
        let idx = this.categories.findIndex(category => category.id === id)
        this.categories.splice(idx,1)
        localStorage.removeItem("categories")
        localStorage.setItem("categories", JSON.stringify(this.categories))
    }
       

    // função que bloqueia utilizadores
    blockUserBtn (user2) {
        console.log("user2 " + user2)
        let idx = this.users.findIndex(user => user.username + "2" === user2)
        this.users[idx].status = "blocked"
        localStorage.removeItem("users")
        localStorage.setItem("users", JSON.stringify(this.users))
    }


    // função que desbloqueia utilizadores
    unblockUserBtn (user2) {
        console.log("user2 " + user2)
        let idx = this.users.findIndex(user => user.username + "2" === user2)
        this.users[idx].status = "active"
        localStorage.removeItem("users")
        localStorage.setItem("users", JSON.stringify(this.users))
    }


    // função que verifica se o utilizador está bloqueado
    isUserBlocked (user2){
        let idx = this.users.findIndex(user => user.username + "2" === user2)
        let status = this.users[idx].status
        if(status === "blocked") {
            return true
        } 
        else if (status === "active"){
            return false
        }
    }


    //Função que verifica se o user está registado
    isUsernameRegisted (username) {
        if (this.users.some(user => user.username === username)) {
            return true
        }
        else {
            return false
        }
    }


    //Funcção que promove o user para administrador
    promoteUserToAdmin(username){
        let idx = this.users.findIndex(user => user.username === username)
        console.log(this.users[idx])
        this.users[idx].role = "admin"
        localStorage.removeItem("users")
        localStorage.setItem("users", JSON.stringify(this.users))
    }


    //Função que despromove um admin para utilizador
    demoteAdminToUser(username){
        let idx = this.users.findIndex(user => user.username === username)
        this.users[idx].role = "user"
        localStorage.removeItem("users")
        localStorage.setItem("users", JSON.stringify(this.users))
    }


    //Função que verifica se um certo utilizador tem o cargo de administrador
    isAdmin(username) {
        let idx = this.users.findIndex(user => user.username === username)
        if(this.users[idx].role == "admin") {
            return true
        }
        else {
            return false
        }
    }



    //Função que verifica se um certo utilizador tem o cargo de utilizador
    isUser(username) {
        let idx = this.users.findIndex(user => user.username === username)
        if(this.users[idx].role == "user") {
            return true
        }
        else {
            return false
        }
    }
}


export default class AdminController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }


    removeUserBtn (username) {
        let idx = this.users.findIndex(user => user.username === username)
        
       this.users.splice(idx,1)
       localStorage.removeItem("users")
       localStorage.setItem("users", JSON.stringify(this.users))
    }
       

    blockUserBtn (user2) {
        console.log("user2 " + user2)
        let idx = this.users.findIndex(user => user.username + "2" === user2)
        this.users[idx].status = "blocked"
        console.log("index " + idx)
        localStorage.removeItem("users")
        localStorage.setItem("users", JSON.stringify(this.users))
    }


    unblockUserBtn (user2) {
        console.log("user2 " + user2)
        let idx = this.users.findIndex(user => user.username + "2" === user2)
        console.log("index " + idx)
        this.users[idx].status = "active"
        localStorage.removeItem("users")
        localStorage.setItem("users", JSON.stringify(this.users))
    }


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
}
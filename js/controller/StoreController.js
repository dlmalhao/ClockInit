import StoreModel from "../model/StoreModel.js"

export default class StoreController {
    constructor() {
        this.store = localStorage.store ? JSON.parse(localStorage.store) : [];
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    getAllLoggedInInfo() {
        return this.users.find(user => user.username == sessionStorage.getItem("loggedUser"));
    }

    getUserCoins(){
        return this.getAllLoggedInInfo().money
    }

    UpdateMoney(money){
        this.getAllLoggedInInfo().money = String(money)
        localStorage.removeItem("users")
        localStorage.setItem("users", JSON.stringify(this.users));
    }

    UpdateInventory(buttonId){
        if(this.getAllLoggedInInfo().inventory == ""){
            this.getAllLoggedInInfo().inventory = buttonId
            localStorage.removeItem("users")
            localStorage.setItem("users", JSON.stringify(this.users));
        }
        else{
            this.getAllLoggedInInfo().inventory += ","+ buttonId
            localStorage.removeItem("users")
            localStorage.setItem("users", JSON.stringify(this.users));
        }

         
    }

    
}
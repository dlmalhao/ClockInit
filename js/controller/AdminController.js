import CategoriesModel from "../model/CategoriesModel.js";
import StoreModel from "../model/StoreModel.js";
import ActivitiesModel from "../model/ActivitiesModel.js";

export default class AdminController {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
        this.categories = localStorage.categories ? JSON.parse(localStorage.categories) : [];
        this.store = localStorage.store ? JSON.parse(localStorage.store) : [];
        this.activities = localStorage.activities ? JSON.parse(localStorage.activities) : [];
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

     // função que remove atividades
     removeActivityBtn (id) {
        let idx = this.activities.findIndex(activity => activity.id === id)
        this.activities.splice(idx,1)
        localStorage.removeItem("activities")
        localStorage.setItem("activities", JSON.stringify(this.activities))
    }
       

    // função que remove itens da loja
    removeItemBtn (id) {
       let idx = this.store.findIndex(store => store.id === id)
       this.store.splice(idx,1)
       localStorage.removeItem("store")
       localStorage.setItem("store", JSON.stringify(this.store))
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



    // Função que verifica se uma categoria já existe
    categoryExists(cat) {
        for (let category of this.categories) {
            if(category.name == cat) {
                return true
            }
            else {
                return false
            }
        }
    }



    // Funcão que adiciona uma nova categoria á local storage
    bindAddCategory(name, text, image, color){
        let lastCategory = this.categories[this.categories.length - 1]
        let newCategoryId = parseInt(lastCategory.id) + 1
        this.categories.push(new CategoriesModel(newCategoryId, name, text, image, color));
            localStorage.setItem('categories', JSON.stringify(this.categories))
    }



    // Função que verifica se um item já existe
    ItemExists(Item) {
        for (let item of this.store) {
            if(item.name == Item) {
                return true
            }
            else {
                return false
            }
        }
    }




    // Funcão que adiciona um nova item á local storage
    bindAddItem(image, value){
        let lastItem = this.store[this.store.length - 1]
        let newItemId = parseInt(lastItem.id) + 1
        this.store.push(new StoreModel(newItemId, image, value));
            localStorage.setItem('store', JSON.stringify(this.store))
    }

    // Funcão que adiciona um nova item á local storage
    bindAddActivity(category, name, image, introduction, content){
        let lastActivityIdx = this.activities[this.activities.length - 1]
        let newActivityId = parseInt(lastActivityIdx.id) + 1
        console.log(lastActivityIdx);
        console.log(newActivityId);
        this.activities.push(new ActivitiesModel(newActivityId, category, name, image, introduction, content));
            localStorage.setItem('activities', JSON.stringify(this.activities))
    }


    getActivities(filterName = '', filterCategory = '', isSorted = false) {

        let filteredActivities = this.activities.filter(
            activity =>
                (activity.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
                &&
                (activity.category == filterCategory || filterCategory === '')
        )

        filteredActivities = isSorted ? filteredActivities.sort(this.#compare) : filteredActivities

        return filteredActivities
    }

    #compare(categoryA, categoryB) {
        if (categoryA.name > categoryB.name)
            return 1;
        if (categoryA.name < categoryB.name)
            return -1;
        return 0;
    }
}
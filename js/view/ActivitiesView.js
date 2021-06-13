// import CategoriesController from '../controller/CategoriesController.js'
import UserController from '../controller/UserController.js'
import ActivitiesController from "../controller/ActivitiesController.js";

export default class ActivitiesView {
    constructor() {

        this.activitiesController = new ActivitiesController();
        this.userController = new UserController();
        this.ActivitiesRow = document.querySelector("#activities-row")
        this.sendUser = document.querySelector("#send-user-to-index")

    }



    ActivitiesDataInput () {
        for (let i = 0; i < this.activitiesController.categories.length; i++){
            this.CategoriesRow.innerHTML += 
            `<div class="col-md-4 d-flex justify-center flex-column mb-2">
                <div class="container category-color mb-2" style="background-color: ${this.categoriesController.categories[i].color};">
                    <img src="${this.categoriesController.categories[i].image}" alt="">
                </div>
                <div class="category title">
                    <p>${this.categoriesController.categories[i].name}</p>
                </div>
            </div>`
        }
    }
}
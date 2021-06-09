import CategoriesController from '../controller/CategoriesController.js'

export default class CategoriesView {
    constructor() {


        this.categoriesController = new CategoriesController();
        this.CategoriesRow = document.querySelector("#categories-row")
        this.localStorageData()
        
    }


    localStorageData () {
        for (let i = 0; i < this.categoriesController.categories.length; i++){
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

        // this.userController = new UserController();
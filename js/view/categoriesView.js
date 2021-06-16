import ActivitiesController from '../controller/ActivitiesController.js';
import CategoriesController from '../controller/CategoriesController.js'
import UserController from '../controller/UserController.js'


export default class CategoriesView {
    constructor() {


        this.categoriesController = new CategoriesController();
        this.userController = new UserController();
        this.activitiesController = new ActivitiesController()
        this.CategoriesRow = document.querySelector("#categories-row")
        this.sendUser = document.querySelector("#send-user-to-index")
        this.CategoriesDataInput()
        this.bindIsAnyUserLogged ()
        
    }


    // 
    CategoriesDataInput () {
        for (let i = 0; i < this.categoriesController.categories.length; i++){
            this.CategoriesRow.innerHTML += 
            `<div class="col-md-4 d-flex justify-center flex-column mb-5">
                <div class="container category-color mb-2" style="background-color: ${this.categoriesController.categories[i].color};">
                    <a href="./activities.html" class="CategoryRedirect" style="border: none; background-color: Transparent;" id="${this.categoriesController.categories[i].name}" ><img src="${this.categoriesController.categories[i].image}" alt=""><a>
                </div>
                <div class="category title">
                    <p>${this.categoriesController.categories[i].name}</p>
                </div>
            </div>`
        }



        // Vou buscar o valor do botão, que é o nome da categoria, e a cor da categoria correspondente.
        // Coloco-os num paragrafo hidden, para que seja possivel ir buscar os valores através da activitiesView
        let RedirectBtn = document.querySelectorAll(".CategoryRedirect")
        for (const btn of RedirectBtn) {
            btn.addEventListener("click", () => {
                let btnID = btn.id
                let CategColor = this.categoriesController.getCategoryColor(btnID)
                this.userController.temporarilySendToSessionStorage(btnID,CategColor)
                
            })
        }
    }


    bindIsAnyUserLogged () {
        if(!this.userController.isAnyUserLogged()) {
            this.sendUser.click()
        }
    }


}

        // this.userController = new UserController();
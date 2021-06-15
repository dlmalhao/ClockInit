// import CategoriesController from '../controller/CategoriesController.js'
import UserController from '../controller/UserController.js'
import ActivitiesController from "../controller/ActivitiesController.js";


export default class ActivitiesView {
    constructor() {

        this.activitiesController = new ActivitiesController();
        this.userController = new UserController();
        this.sendUser = document.querySelector("#send-user-to-index")


        // Filtros atividades
        this.txtActivity = document.querySelector("#txtActivity")
        this.btnFilter = document.querySelector("#btnFilter")
        //this.bindFilter()


        this.updateActivitiesInPage()
    }



    // ActivitiesDataInput () {
    //     for (let i = 0; i < this.activitiesController.categories.length; i++){
    //         this.CategoriesRow.innerHTML += 
    //         `<div class="col-md-4 d-flex justify-center flex-column mb-2">
    //             <div class="container category-color mb-2" style="background-color: ${this.categoriesController.categories[i].color};">
    //                 <img src="${this.categoriesController.categories[i].image}" alt="">
    //             </div>
    //             <div class="category title">
    //                 <p>${this.categoriesController.categories[i].name}</p>
    //             </div>
    //         </div>`
    //     }
    // }

    updateActivitiesInPage() {
        let categoryNameByButton = this.userController.getStuffSentToSessionStorage1()
        let categoryColor = this.userController.getStuffSentToSessionStorage2()

        //this.userController.removeTemporarilyStuffFromSessionStorage()

        console.log(categoryNameByButton + categoryColor)

        for (const activity of this.activitiesController.activities) {
            if (categoryNameByButton == activity.category) {
                document.querySelector("#activities-row").innerHTML += `
                <div class="col-md-4 d-flex justify-center flex-column mb-2">
                    <div class="container activity-color mb-2" style="background-color: ${categoryColor};">
                      <a href="./insideActivities.html" class="ActivityRedirect" style="border: none; background-color: Transparent;" id="${activity.id}" ><img src="${activity.image}" alt=""><a>
                    </div>
                    <div class="category title">
                        <p>${activity.name}</p>
                    </div>
                </div>`
            }
        }


        for (let btn of document.querySelectorAll(".ActivityRedirect")) {
            btn.addEventListener("click", () => {
                let idOfBtn = btn.id
                this.userController.temporarilySendActivityNameToSessionStorage(idOfBtn)
            })
        }







        this.btnFilter.addEventListener('click', () => {
            if (!this.txtActivity.value == "") {
                console.log(this.txtActivity.value);
                const results = this.activitiesController.getActivities(this.txtActivity.value)
                const table = document.querySelector("#activities-row")
                table.innerHTML = '';


                for (let i = 0; i < results.length; i++) {
                    table.innerHTML += `
                    <div class="col-md-4 d-flex justify-center flex-column mb-2">
                    <div class="container activity-color mb-2" style="background-color: ${categoryColor};">
                      <a href="./insideActivities.html" class="ActivityRedirect" style="border: none; background-color: Transparent;" id="${results[i].id}" ><img src="${results[i].image}" alt=""><a>
                    </div>
                    <div class="category title">
                        <p>${results[i].name}</p>
                    </div>
                </div>`
                }
            }
            else {
                let categoryNameByButton = this.userController.getStuffSentToSessionStorage1()
                let categoryColor = this.userController.getStuffSentToSessionStorage2()

                
                document.querySelector("#activities-row").innerHTML = ''
               

                for (const activity of this.activitiesController.activities) {
                    if (categoryNameByButton == activity.category) {
                        document.querySelector("#activities-row").innerHTML += `
                        <div class="col-md-4 d-flex justify-center flex-column mb-2">
                        <div class="container activity-color mb-2" style="background-color: ${categoryColor};">
                        <a href="./insideActivities.html" class="ActivityRedirect" style="border: none; background-color: Transparent;" id="${activity.id}" ><img src="${activity.image}" alt=""><a>
                        </div>
                        <div class="category title">
                        <p>${activity.name}</p>
                        </div>
                        </div>`
                    }
                }


                for (let btn of document.querySelectorAll(".ActivityRedirect")) {
                    btn.addEventListener("click", () => {
                        let idOfBtn = btn.id
                        this.userController.temporarilySendActivityNameToSessionStorage(idOfBtn)
                    })
                }
            }
        })


    }

}
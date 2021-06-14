import ActivitiesController from '../controller/ActivitiesController.js';
import CategoriesController from '../controller/CategoriesController.js'
import UserController from '../controller/UserController.js'


export default class InsideActivitiesView {
    constructor() {


        this.categoriesController = new CategoriesController();
        this.userController = new UserController();
        this.activitiesController = new ActivitiesController()
        this.insideActivitiesContent = document.querySelector("#activity-page")
        this.sendUser = document.querySelector("#send-user-to-index3")

        this.changeInputsContent()
        this.bindIsAnyUserLogged()
        
    }

    changeInputsContent () {
        let activityId = this.userController.getActivitySentToSessionStorage()
        this.userController.removeTemporarilyActivityFromSessionStorage()
        
        for(let activity of this.activitiesController.activities) {
            if(activity.id == activityId) {
                document.querySelector("#activityTitle").value = activity.name
                document.querySelector("#activityIntroduction").value = activity.introduction
                document.querySelector("#imgActivity").src = activity.image
                document.querySelector("#activityContent").value = activity.content

            }
        }
    }



    bindIsAnyUserLogged () {
        if(!this.userController.isAnyUserLogged()) {
            this.sendUser.click()
        }
    }



}

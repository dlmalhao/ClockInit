import UserController from '../controller/UserController.js'

export default class AdminView {
    constructor() {

        this.userController = new UserController();
        this.sendUser = document.querySelector("#send-user-to-index")
        this.bindIsAdminLogged()

    }

    bindIsAdminLogged() {
        this.adminButtonBackground = document.querySelector("#admin-btn-background")
        if(!this.userController.isAdminLogged()) {
            this.sendUser.click()
        }
    }
}
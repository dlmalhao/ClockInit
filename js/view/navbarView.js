import UserController from '../controller/UserController.js'

export default class NavView {
    constructor() {

        this.userController = new UserController();

        this.logoutButton = document.querySelector('#logout-btn');
        this.NameOfUser = document.querySelector('#name-of-user');
        this.storeButton = document.querySelector("#store-btn");
        this.SignInButton = document.querySelector("#signinButton");
        this.loggoutTrigger = document.querySelector("#logout-trigger");
        this.activitiesNavlink = document.querySelector("#activities-navlink");
        this.NavNameOfUser = document.querySelector("#nav-name-of-user");
        

        this.loggedUser = sessionStorage.getItem("loggedUser");
        this.bindLogout()
        this.updateStatusUI()
        // this.bindIsAnyUserLogged ()
        

    
    }



    updateStatusUI() {
        if (this.userController.isLogged()) {
            this.SignInButton.style.display = "none"
            this.NameOfUser.innerHTML = this.loggedUser
        } else {
            this.logoutButton.style.display = 'none'
            this.storeButton.style.display = 'none'
            this.NameOfUser.style.display = 'none'
            this.NavNameOfUser.style.display = 'none'
        }
    }



    bindLogout() {
        setTimeout(() => {  
            this.loggoutTrigger.addEventListener('click', () => { 
                this.userController.logout(); }, 1000);
        // this.loggoutTrigger.addEventListener('click', () => {
        //     this.userController.logout();

        })
    }
}
import UserController from '../controller/UserController.js'

export default class UserView {
    constructor() {

        this.userController = new UserController();


        // Register Form

        this.formRegister = document.querySelector('#register-form');
        this.registerEmail = document.querySelector('#register-email');
        this.registerPassword = document.querySelector('#register-password');
        this.registerPassword2 = document.querySelector('#register-confirm-password');
        this.registerUsername = document.querySelector('#register-username');
        this.registerGender = document.querySelector('.form-check-input:checked')
        this.registerAge = document.querySelector('#age-value')
        this.bindRegisterForm();


        // Login Form

        this.formLogin = document.querySelector('#login-form');
        this.loginUsername = document.querySelector('#loginUsername');
        this.loginPassword = document.querySelector('#loginPassword');
        this.showPassword = document.querySelector('#show-password')
        this.bindLoginForm();
        this.showPass();


        //Logged In vs Logout

        this.logoutButton = document.querySelector('#logout-btn');
        this.NameOfUser = document.querySelector('#name-of-user');
        this.storeButton = document.querySelector("#store-btn");
        this.textHeader = document.querySelector("#coluna-direita-header");
        this.textContent = document.querySelector("#coluna-direita-text");
        this.SignInButton = document.querySelector("#signinButton");
        this.StartButton = document.querySelector("#start-btn")
        this.loggoutTrigger = document.querySelector("#logout-trigger")
        this.activitiesNavlink = document.querySelector("#activities-navlink")
        this.NavNameOfUser = document.querySelector("#nav-name-of-user")

        this.loggedUser = sessionStorage.getItem("loggedUser");

        
        this.updateStatusUI()
        this.bindIsAdminLogged()
    }





    bindRegisterForm() {
        this.formRegister.addEventListener('submit', event => {
            event.preventDefault();

            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('Passwords are different!');
                }

                


                this.userController.register(
                    this.registerEmail.value, 
                    this.registerPassword.value, 
                    this.registerUsername.value, 
                    this.registerGender.value, 
                    this.registerAge.value);

                
                document.getElementById("trigger-modal").setAttribute("data-target","#SuccessModal")
                document.getElementById("close-modal").click()

                setTimeout(function(){ document.getElementById("trigger-modal").click() }, 1000);

                
            } catch (e) {
                let error = String(e).substring(7)
                document.getElementById("error-content").innerHTML = error;
                document.getElementById("close-modal").click()
                document.getElementById("trigger-modal").setAttribute("data-target","#ErrorModal")
                setTimeout(function(){ document.getElementById("trigger-modal").click() }, 1000);
            }
        })
    }





    bindLoginForm() {
        this.formLogin.addEventListener('submit', event => {
            event.preventDefault();
            try {
                this.userController.login(
                    this.loginUsername.value,
                    this.loginPassword.value);

                document.getElementById("trigger-modal").setAttribute("data-target","#SuccessModal");
                document.getElementById("success-content").innerHTML = "You are now logged in!";
                document.getElementById("close-modal").click()


                setTimeout(function(){ document.getElementById("trigger-modal").click() }, 1000);

                let successModal = document.querySelector("#SuccessModal")
                successModal.addEventListener('click', function(){
                    location.reload()
                })

                
            } catch (e) {
                let error = String(e).substring(7)
                document.getElementById("error-content").innerHTML = error;
                document.getElementById("close-modal").click()
                document.getElementById("trigger-modal").setAttribute("data-target","#ErrorModal")
                setTimeout(function(){ document.getElementById("trigger-modal").click() }, 1000);
            }
        });
    }


    showPass() {
        this.showPassword.addEventListener('click', function(){
            let pass = document.querySelector('#loginPassword')
     
        if (pass.type === "password") {
            pass.type = "text";

        } else {
            pass.type = "password";
        }
    })
    }

   
    




    updateStatusUI() {
        if (this.userController.isLogged()) {
            // this.SignInButton.style.display = "none"

            this.textHeader.innerHTML = "Welcome <span id='name-of-user2' style = 'color: #FF725E;'></span> ! We hope you are getting a great time with our services! Haven't you taken a look on our activities yet ?"
            this.textContent.innerHTML = "Explore what our website has to offer. Have fun with ClockInit !"
            this.NameOfUser2 = document.querySelector('#name-of-user2');
            // this.NameOfUser.innerHTML = this.loggedUser
            this.NameOfUser2.innerHTML = this.loggedUser
            this.StartButton.innerHTML = "Get Started"

            

            
         } //else {
        //     this.logoutButton.style.display = 'none'
        //     this.storeButton.style.display = 'none'
        //     this.NameOfUser.style.display = 'none'
        //     this.NavNameOfUser.style.display = 'none'
        // }
    }


    bindIsAdminLogged() {
        this.adminButtonBackground = document.querySelector("#admin-btn-background")
        if(!this.userController.isAdminLogged()) {
            this.adminButtonBackground.style.display = 'none'
        }
    }


}


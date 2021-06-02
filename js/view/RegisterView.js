import UserController from '../controller/UserController.js'

export default class RegisterView {
    constructor() {

        this.userController = new UserController();

        this.formRegister = document.querySelector('#register-form');
        this.registerEmail = document.querySelector('#register-email');
        this.registerPassword = document.querySelector('#register-password');
        this.registerPassword2 = document.querySelector('#register-confirm-password');
        this.registerUsername = document.querySelector('#register-username');
        this.registerGender = document.querySelector('.form-check-input:checked')
        this.registerAge = document.querySelector('#age-value')
        this.bindRegisterForm();
    }

    bindRegisterForm() {
        this.formRegister.addEventListener('submit', event => {
            event.preventDefault();

            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('Password and Confirm Password are not equal');
                }

                document.getElementById("trigger-modal").setAttribute("data-target","#SuccessModal")


                this.userController.register(
                    this.registerEmail.value, 
                    this.registerPassword.value, 
                    this.registerUsername.value, 
                    this.registerGender.value, 
                    this.registerAge.value);

                document.getElementById("trigger-modal").click()    
                
            } catch (err) {
                document.getElementById("trigger-modal").setAttribute("data-target","#ErrorModal")
                document.getElementById("trigger-modal").click()
            }
        })
    }
}


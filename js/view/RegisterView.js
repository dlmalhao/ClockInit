import UserController from '../controller/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        this.formRegister = document.querySelector('#register-form');
        this.registerEmail = document.querySelector('#register-email');
        this.registerPassword = document.querySelector('#register-password');
        this.registerPassword2 = document.querySelector('#register-confirm-password');
        this.registerUsername = document.querySelector('#register-username');
        this.registerGender = document.querySelector('.form-check-input:checked').value;
        this.registerAge = document.querySelector('#age-value').value;
        this.bindRegisterForm();
    }

    bindRegisterForm() {
        this.formRegister.addEventListener('submit', event => {
            event.preventDefault();
            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('Password and Confirm Password are not equal');
                }

                this.userController.register(
                    this.registerEmail.value, 
                    this.registerPassword.value, 
                    this.registerUsername.value, 
                    this.registerGender.value, 
                    this.registerAge.value, 
                    this.registerExp.value, 
                    this.registerAchieves.value, 
                    this.registerInventory.value, 
                    this.registerLastSpin.value);
                this.displayMessage('register', 'User registered with success!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
            } catch (err) {
                this.displayMessage('register', err, 'danger');
            }
        })
    }
}


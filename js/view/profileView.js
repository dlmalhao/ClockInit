import UserController from '../controller/UserController.js'

export default class ProfileView {
    constructor() {

        this.userController = new UserController();
        this.sendUser = document.querySelector("#send-user-to-index")

        this.ProfileUser = document.querySelector("#profileUser")
        this.ProfileEmail = document.querySelector("#profileEmail")
        this.ProfileGender = document.querySelector("#profileGender")
        this.ProfileBirth = document.querySelector("#profileBirth")
        this.EditProfile = document.querySelector("#editProfile")
        this.CancelProfile = document.querySelector(".cancelProfile")
        this.SaveProfile = document.querySelector(".saveProfile")
        
        
        this.changeProfileInput()
        this.bindIsAnyUserLogged()
        this.editProfileInputs()
        this.saveProfileInputs()
    }


    changeProfileInput(){
        if(this.userController.isLogged()){
            let userLogged = this.userController.getLoggedUser()
            let idx = this.userController.users.findIndex(user => user.username === userLogged)
            this.profileUsername = this.userController.users[idx].username
            this.profileEmail = this.userController.users[idx].email
            this.profileGender = this.userController.users[idx].gender
            this.profileAge = this.userController.users[idx].age


            this.ProfileUser.value = this.profileUsername
            this.ProfileEmail.value = this.profileEmail
            this.ProfileGender.value = this.profileGender
            this.ProfileBirth.value = this.profileAge

            this.SaveProfile.id =idx
        }
    }

    bindIsAnyUserLogged () {
        if(!this.userController.isAnyUserLogged()) {
            this.sendUser.click()
        }
    }

    editProfileInputs(){
        this.EditProfile.addEventListener("click", () =>{
            document.querySelector(".saveProfile").style.visibility = 'visible'
            document.querySelector(".cancelProfile").style.visibility = 'visible'
            document.querySelector("#profileUser").disabled= false
            document.querySelector("#profileEmail").disabled= false
        })

        this.CancelProfile.addEventListener("click", () =>{
            document.querySelector(".saveProfile").style.visibility = 'hidden'
            document.querySelector(".cancelProfile").style.visibility = 'hidden'
            document.querySelector("#profileUser").disabled= true
            document.querySelector("#profileEmail").disabled= true
            this.changeProfileInput()
        })

        
    }

    saveProfileInputs(){
        this.SaveProfile.addEventListener("click", () =>{
            this.newProfileUsername = this.ProfileUser.value 
            this.newProfileEmail = this.ProfileEmail.value 
            this.userController.updateUserData(

                document.querySelector(".saveProfile").id,
                this.newProfileUsername, this.newProfileEmail
            )
        })
    }

    
    
}
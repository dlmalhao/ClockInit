import UserController from '../controller/UserController.js'
import StoreController from '../controller/StoreController.js';

export default class ProfileView {
    constructor() {

        this.userController = new UserController();
        this.storeController = new StoreController();
        this.sendUser = document.querySelector("#send-user-to-index")

        this.ProfileUser = document.querySelector("#profileUser")
        this.ProfileEmail = document.querySelector("#profileEmail")
        this.ProfileGender = document.querySelector("#profileGender")
        this.ProfileBirth = document.querySelector("#profileBirth")
        this.EditProfile = document.querySelector("#editProfile")
        this.CancelProfile = document.querySelector(".cancelProfile")
        this.SaveProfile = document.querySelector(".saveProfile")
        this.changePassBtn = document.querySelector("#changePassbtn")
        this.showPassword = document.querySelector('#show-password')
        this.ImagemPerfil = document.querySelector("#imagemPerfil")
        

   
        
        
        this.changeProfileInput()
        this.bindIsAnyUserLogged()
        this.editProfileInputs()
        this.saveProfileInputs()
        this.modalChangePassword()
        this.changePassword()
        this.showPass()
        this.changeRigthSide()
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
            this.ImagemPerfil.src = `${this.userController.users[idx].image}`
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
    

    modalChangePassword(){
        this.changePassBtn.addEventListener("click" , () =>{
            document.querySelector("#changePasswordModal")
            
        })
    }

    changePassword(){
        try{

            this.SavePassword = document.querySelector("#savePassword")
        
            this.oldPass = this.userController.getOldPassword()
            this.SavePassword.addEventListener("click", () =>{
                this.OldPassInput = document.querySelector("#oldPassword").value
                this.NewPass = document.querySelector("#newPassword").value
                this.ConfirmNewPass = document.querySelector("#confirmNewPassword").value
                if(this.oldPass == this.OldPassInput){
                    if(this.NewPass == this.ConfirmNewPass){
                        this.userController.setNewPassword(this.NewPass)
                        let successModal = document.querySelector("#SuccessModal")
                        successModal.addEventListener('click', function(){
                        location.reload()
                        })
                    }
                    else{
                        throw Error("Password and Confirm Password are different!")

                    }
                }
                else{
                    throw Error("Your old Password is wrong!")
                }

            })
            
        }catch (e) {
            let error = String(e).substring(7)
            document.getElementById("error-content4").innerHTML = error;
            
            document.getElementById("trigger-modal5").setAttribute("data-target","#ErrorModal")
            setTimeout(function(){ document.getElementById("trigger-modal5").click() }, 1000);
        }
        


        //this.newPass = this.NewPass.value 
        //this.confirmNewPass = this.ConfirmNewPass.value 
        //this.userController.updatePasswordData(
        //document.querySelector("#savePassword").id, this.oldPass,
        //this.newPass, this.confirmNewPass
        //)
    }   


    showPass() {
        this.showPassword.addEventListener('click', function(){
            let passwords = document.querySelectorAll('.show-password')
            
            for (const pass of passwords) {
                if (pass.type === "password") {
                    pass.type = "text";

                } else {
                    pass.type = "password";
                }
            }
        
        })
    }

    changeRigthSide(){
        document.querySelector("#InventoryButton").addEventListener("click", () =>{
            document.querySelector("#parteDireita").innerHTML = `<div class="back overflow-auto">
            <div class="container header">
                <p>Inventory</p>
            </div>
            <div class="row" id="storeItems">

            </div>
            </div>`
            
            document.querySelector("#profileButtons").innerHTML = `
                 <button type="button" class="btn btn-dark" id="BackToProfile" >Profile</button>
                 <button type="button" class="btn btn-dark" >Favorites</button>
                 <button type="button" class="btn btn-dark" id="InventoryButton">Inventory</button>
                 <button type="button" class="btn btn-dark" id="changePassbtn" href="#changePasswordModal" data-toggle="modal" data-target="#changePasswordModal" >Change Password</button>
                 <button type="button" class="btn btn-danger">Log Out</button>`

            document.querySelector("#BackToProfile").addEventListener("click", () => {
                location.reload()
            })

            
            let InventoryData = this.userController.getAllLoggedInInfo().inventory
            let arrayInventory = InventoryData.split(",")
            let storecontroller = new StoreController();
            
            for (const inventoryItem of arrayInventory) {

                for (const item of storecontroller.store) {
                
                    if(inventoryItem == item.id){
                        document.querySelector("#storeItems").innerHTML += `
                            <div class="col-xl-4">
                                <div class="container backgroundImg">
                                    <img src="${item.image}" alt="">
                                </div>                        
                                <div class="buttonDiv d-flex align-items-center justify-content-center mt-3 mb-5">
                                    <button type="button" class="btn btn-dark btnEquipImage" id="${item.id}" style="width: 50%; background-color: #FF725E;">Equip</button>
                                </div>
                            </div>     `
                            


                            
                    }
                    
                }
            }  
            this.inventoryItemBtn = document.querySelectorAll(".btnEquipImage")
                console.log(this.inventoryItemBtn)
                for (const inventoryButton of this.inventoryItemBtn) {
                    inventoryButton.addEventListener("click",() => {
                        for (const image of this.storeController.store) {
                            if(inventoryButton.id == image.id){
                               document.querySelector("#imagemPerfil").src = `${image.image}`

                               this.userController.UpdateImage(image.image)
                
                                location.reload()
                            }
                        }
                    })
                }   

            })
   }  
}
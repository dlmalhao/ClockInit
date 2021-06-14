import AdminController from '../controller/AdminController.js'
import UserController from '../controller/UserController.js'

export default class AdminView {
    constructor() {

        this.adminController = new AdminController();
        this.userController = new UserController();

        this.sendUser = document.querySelector("#send-user-to-index")

        this.bindIsAdminLogged();
        this.localStorageData();
        this.removeUser();
        this.DisplayBlockBtn();
        this.removeCategory()
        this.AdminManagement()
        this.AddCategory()
        this.removeItemStore()
        this.AddItemStore()
    }


    // Função para só o admin conseguir aceder á pagina admin.html através do url. Se não estiver ninguem
    //logado ou se não for Admin, automaticamente redireciona para a página principal
    bindIsAdminLogged() {
        this.adminButtonBackground = document.querySelector("#admin-btn-background")
        if (!this.userController.isAdminLogged()) {
            this.sendUser.click()
        }
    }



    // Tabela de gestão de users
    localStorageData() {
        this.UsersTable = document.querySelector("#users-table")
        this.CategoriesTable = document.querySelector("#categories-table")
        this.StoreTable = document.querySelector("#store-table")
        for (let i = 0; i < this.adminController.users.length; i++) {
            this.UsersTable.innerHTML += `<tr>
            <th scope="row">${i}</th>
            <td>${this.adminController.users[i].email}</td>
            <td>${this.adminController.users[i].password}</td>
            <td>${this.adminController.users[i].username}</td>
            <td>${this.adminController.users[i].gender}</td>
            <td>${this.adminController.users[i].role}</td>
            <td>${this.adminController.users[i].age}</td>
            <td>${this.adminController.users[i].exp}</td>
            <td>${this.adminController.users[i].achieves}</td>
            <td>${this.adminController.users[i].inventory}</td>
            <td>${this.adminController.users[i].spintime}</td>
            <td>${this.adminController.users[i].money}</td>
            <td><button type="button" class="btn btn-danger removebtn" id='${this.adminController.users[i].username}'>X</button></td>
            <td><button type="button" class="btn btn-dark blockbtn" id="${this.adminController.users[i].username}2">Block</button></td>
          </tr>`
        }


        for (let i = 0; i < this.adminController.categories.length; i++) {
            this.CategoriesTable.innerHTML += `<tr>
            <th scope="row">${i}</th>
            <td>${this.adminController.categories[i].id}</td>
            <td>${this.adminController.categories[i].name}</td>
            <td><img src="${this.adminController.categories[i].image}" style ="width: 5rem; height: 5rem;"></td>
            <td>${this.adminController.categories[i].color}</td>
            <td><button type="button" class="btn btn-danger removecategory" id='${this.adminController.categories[i].id}'>X</button></td>
          </tr>`
        }

        for (let i = 0; i < this.adminController.store.length; i++) {
            this.StoreTable.innerHTML += `<tr>
            <th scope="row">${i}</th>
            <td>${this.adminController.store[i].id}</td>
            <td><img src="${this.adminController.store[i].image}" style ="width: 5rem; height: 5rem;"></td>
            <td>${this.adminController.store[i].value}</td>
            <td><button type="button" class="btn btn-danger removeItem" id='${this.adminController.store[i].id}'>X</button></td>
          </tr>`
        }

    }


    // função que remove utilizadores
    removeUser() {
        this.removeButtons = document.querySelectorAll(".removebtn")
        let controller = this.adminController

        for (let button of this.removeButtons) {
            let UserRole = this.userController.getRoleOfUser(button.id)

            if (UserRole === "admin") {
                button.style.visibility = 'hidden'
            }
            else {
                button.addEventListener('click', function () {
                    document.querySelector("#confirmationModalContent").innerHTML = `Are you sure you want to remove ${button.id}'s data?`
                    document.querySelector("#ConfirmationModalTrigger").click()
                    document.querySelector("#yesButton").addEventListener("click", () => {
                        controller.removeUserBtn(button.id)
                        window.location.reload()
                    })
                })
            }
        }
    }


    // função que remove categorias
    removeCategory () {
        this.RemovecategoryButton = document.querySelectorAll(".removecategory")

        let controller = this.adminController
        for (let button of this.RemovecategoryButton) {

            for (const category of this.userController.categories) {
                if(button.id == category.id){
                    button.addEventListener('click', function () {document.querySelector("#confirmationModalContent").innerHTML = `Are you sure you want to remove ${category.name} from categories?`
                    document.querySelector("#ConfirmationModalTrigger").click()
                    document.querySelector("#yesButton").addEventListener("click", () => {
                    controller.removeCategoryBtn(button.id)
                    window.location.reload()
            })
                
            })
                }
            }

            
        }
    }
    


    // função que bloqueia utilizadores
    blockuser() {
        let controller = this.adminController;
        for (let button of this.blockButtons) {
            if(button.innerHTML === 'Unblock') {
                button.addEventListener('click', function() {
                    controller.unblockUserBtn(button.id)
                    location.reload()
                })
            }
            else if (button.innerHTML === 'Block') {
                button.addEventListener('click', function () {
                    controller.blockUserBtn(button.id)
                    location.reload()
                })
            }
        }
    }   


    //Função que remove os itens da loja 
    removeItemStore () {
        this.RemoveItemButton = document.querySelectorAll(".removeItem")

        let controller = this.adminController

        for (let button of this.RemoveItemButton) {
            button.addEventListener('click', function () {
                document.querySelector("#confirmationModalContent").innerHTML = `Are you sure you want to remove the item with id "${button.id}" ?`
                        document.querySelector("#ConfirmationModalTrigger").click()
                        document.querySelector("#yesButton").addEventListener("click", () => {
                        controller.removeItemBtn(button.id)
                        window.location.reload()
                    })
                
            })
        }
    }



    // função reponsável pelo texto do botão de bloquear
    DisplayBlockBtn() {
        this.blockButtons = document.querySelectorAll(".blockbtn")
        let controller = this.adminController;

        for (let button of this.blockButtons) {
            let username = (button.id).slice(0,-1)
            let UserRole = this.userController.getRoleOfUser(username)
            if (UserRole === "admin") {
                button.style.visibility = "hidden";
            }
            if (controller.isUserBlocked(button.id)) {
                button.innerHTML = 'Unblock'
            }
            if(!controller.isUserBlocked(button.id)) {
                button.innerHTML = 'Block'
            }
        }
        this.blockuser()
    }       



    // Função responsavel pela gestão de administradores
    AdminManagement() {
        this.Add = document.querySelector("#addAdminButton")
        this.Remove = document.querySelector("#removeAdminButton")
        this.AdminModalTrigger = document.querySelector("#AdminModalTrigger")
        this.AdminManagementModal = document.querySelector("#adminManagementModal")
        this.userBeeingPromoted = document.querySelector("#futureAdminUsername")


        //Adicionar

        this.Add.addEventListener("click", () => {
            document.querySelector("#textOfAdminModal").innerHTML = `Who do you want to promote to Admin ?`
            this.AdminModalTrigger.click()

            document.querySelector("#confirmButton").addEventListener("click", () => {
                if(this.userBeeingPromoted.value == ""){
                    document.querySelector("#error-content").innerHTML = `Invalid format`
                    document.querySelector("#ErrorModalTrigger").click()
                }
                else {

                    if(this.adminController.isUsernameRegisted(this.userBeeingPromoted.value)) {
                        if(!this.adminController.isAdmin(this.userBeeingPromoted.value)) {
                            document.querySelector("#confirmationModalContent").innerHTML = `Are you sure you want to promote ${this.userBeeingPromoted.value} to Admin ?`
                            document.getElementById("close-modal-2").click()
                            document.querySelector("#ConfirmationModalTrigger").click()

                            document.querySelector("#yesButton").addEventListener("click", () => {
                                this.adminController.promoteUserToAdmin(this.userBeeingPromoted.value)
                                setTimeout(function(){ location.reload() }, 1000);
                            })
                        }
                        else {
                            document.querySelector("#error-content").innerHTML = `User is already an Admin`
                            document.querySelector("#ErrorModalTrigger").click()
                            return
                        }
                    }
                    else {
                        document.querySelector("#error-content").innerHTML = `User is not registed`
                        document.querySelector("#ErrorModalTrigger").click()
                    }
                }
            })
        })
        
        //Remover

        this.Remove.addEventListener("click", () => {
            document.querySelector("#textOfAdminModal").innerHTML = `Who do you want to demote to User ?`
            this.AdminModalTrigger.click()
        

            document.querySelector("#confirmButton").addEventListener("click", () => {
                if(this.userBeeingPromoted.value == ""){
                    document.querySelector("#error-content").innerHTML = `Invalid format`
                    document.querySelector("#ErrorModalTrigger").click()
                }
                else{

                    if(this.adminController.isUsernameRegisted(this.userBeeingPromoted.value)) {
                        if(!this.adminController.isUser(this.userBeeingPromoted.value)) {
                            document.querySelector("#confirmationModalContent").innerHTML = `Are you sure you want to demote ${this.userBeeingPromoted.value} to User ?`
                            document.getElementById("close-modal-2").click()
                            document.querySelector("#ConfirmationModalTrigger").click()

                            document.querySelector("#yesButton").addEventListener("click", () => {
                                this.adminController.demoteAdminToUser(this.userBeeingPromoted.value)
                                setTimeout(function(){ location.reload() }, 1000);
                            })
                        }
                        else {
                            document.querySelector("#error-content").innerHTML = `User is already an User`
                            document.querySelector("#ErrorModalTrigger").click()
                            return
                        }
                    }
                    else {
                        document.querySelector("#error-content").innerHTML = `User is not registed`
                        document.querySelector("#ErrorModalTrigger").click()
                    }
                }
            })
        })
    } 


    //Função responsável pela adição de uma nova categoria
    AddCategory (){
        document.querySelector("#addbutton").addEventListener("click", () => {
            document.querySelector("#textOfCategoryModal").innerHTML = `Which category do you want to add ?`
            document.querySelector("#CategoryModalTrigger").click()

            document.querySelector("#confirmButton2").addEventListener("click", () => {
                this.categoryName = document.querySelector("#CategoryName")
                this.categoryText = document.querySelector("#CategoryText")
                this.categoryImage = document.querySelector("#CategoryImage")
                this.categoryColor = document.querySelector("#CategoryColor")
                if(this.categoryName.value == "" || this.categoryText.value == "" || this.categoryImage.value == "" || this.categoryColor.value == ""){
                    document.querySelector("#error-content").innerHTML = `Invalid format`
                    document.querySelector("#ErrorModalTrigger").click()
                }
                else {

                    if(this.adminController.categoryExists(this.categoryName.value)) {
                        document.querySelector("#error-content").innerHTML = `Category already exists`
                        document.querySelector("#ErrorModalTrigger").click()
                    }
                    else {

                        document.querySelector("#confirmationModalContent").innerHTML = `Are you sure you want to add ${this.categoryName.value} to Categories ?`

                        document.getElementById("close-modal-3").click()
                        document.querySelector("#ConfirmationModalTrigger").click()
                        document.querySelector("#yesButton").addEventListener("click", () => {
                            this.adminController.bindAddCategory(this.categoryName.value, this.categoryText.value, this.categoryImage.value, this.categoryColor.value)
                            setTimeout(function() { location.reload() },1000)
                        })
                    }
                }
            })
        })
    }


    //Função responsável pela adição de um novo item na loja
    AddItemStore (){
        document.querySelector("#addbuttonStore").addEventListener("click", () => {
            document.querySelector("#textOfStoreModal").innerHTML = `Which item do you want to add ?`
            document.querySelector("#StoreModalTrigger").click()

            document.querySelector("#confirmButton3").addEventListener("click", () => {
                this.ItemImage = document.querySelector("#itemImage")
                this.ItemValue = document.querySelector("#itemValue")
                if( this.ItemImage.value == "" || this.ItemValue.value == "" ){
                    document.querySelector("#error-content").innerHTML = `Invalid format`
                    document.querySelector("#ErrorModalTrigger").click()
                }
                else {

                    //if(this.adminController.ItemExists(this.Item.value)) {
                    //    document.querySelector("#error-content").innerHTML = `Item already exists`
                    //    document.querySelector("#ErrorModalTrigger").click()
                    //}
                    //else {

                        document.querySelector("#confirmationModalContent").innerHTML = `Are you sure you want to add  to Store ?`

                        document.getElementById("close-modal-4").click()
                        document.querySelector("#ConfirmationModalTrigger").click()
                        document.querySelector("#yesButton").addEventListener("click", () => {
                            this.adminController.bindAddItem(this.ItemImage.value, this.ItemValue.value)
                            setTimeout(function() { location.reload() },1000)
                        })
                   // }
                }
            })
        })
    }
}
import AdminController from '../controller/AdminUserController.js'
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
    }


    // Script para só o admin conseguir aceder á pagina admin.html através do url


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
        for (let i = 0; i < this.adminController.users.length; i++) {
            this.UsersTable.innerHTML += `<tr>
            <th scope="row">${i}</th>
            <td>${this.adminController.users[i].email}</td>
            <td>${this.adminController.users[i].password}</td>
            <td>${this.adminController.users[i].username}</td>
            <td>${this.adminController.users[i].gender}</td>
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

    }


    removeUser() {
        this.removeButtons = document.querySelectorAll(".removebtn")

        let controller = this.adminController

        for (let button of this.removeButtons) {
            if (button.id === "Admin") {
                button.style.visibility = 'hidden'
            }
            else {
                button.addEventListener('click', function () {
                    controller.removeUserBtn(button.id)
                    window.location.reload()
                })
            }
        }
    }

    removeCategory () {
        this.RemovecategoryButton = document.querySelectorAll(".removecategory")

        let controller = this.adminController

        for (let button of this.RemovecategoryButton) {
            button.addEventListener('click', function () {
                controller.removeCategoryBtn(button.id)
                window.location.reload()
            })
        }
    }
    




    // blockUser() {
    //     this.blockButtons = document.querySelectorAll(".blockbtn")

    //     let controller = this.adminController;

    //     for (let button of this.blockButtons) {
    //         if (button.id === "Admin2") {
    //             button.style.visibility = "hidden";
    //         }
    //         else {
    //             if (!this.adminController.isUserBlocked(button.id)) {
    //                 // console.log(button.id)
    //                 button.addEventListener('click', function () {
    //                     controller.blockUserBtn(button.id)
    //                 })
    //             }
    //             else {
    //                 button.addEventListener('click', function () {
    //                     controller.unblockUserBtn(button.id)
    //                 })
    //             }
    //         }
    //     }
    // }




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



    DisplayBlockBtn() {
        this.blockButtons = document.querySelectorAll(".blockbtn")
        let controller = this.adminController;

        for (let button of this.blockButtons) {
            if (button.id === "Admin2") {
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



    // unblockUser() {
    //     let controller = this.adminController;
    //     this.blockButtons = document.querySelectorAll(".blockbtn")
    //     for (let button of this.blockButtons) {
    //         if(this.adminController.isUserBlocked(button.id)) {
    //             button.addEventListener('click', function() {
    //                 controller.unblockUserBtn(button.id)
    //             })
    //         }
    //     }
    // }    
}
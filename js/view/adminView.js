import UserController from '../controller/UserController.js'

export default class AdminView {
    constructor() {

        this.userController = new UserController();
        this.sendUser = document.querySelector("#send-user-to-index")
        this.bindIsAdminLogged()

        this.localStorageData()
        this.removeUser()
    }

    bindIsAdminLogged() {
        this.adminButtonBackground = document.querySelector("#admin-btn-background")
        if(!this.userController.isAdminLogged()) {
            this.sendUser.click()
        }
    }

    localStorageData() {
        this.UsersTable = document.querySelector("#users-table")
        for(let i = 0; i<this.userController.users.length; i++) {
            this.UsersTable.innerHTML += `<tr>
            <th scope="row">${i}</th>
            <td>${this.userController.users[i].email}</td>
            <td>${this.userController.users[i].password}</td>
            <td>${this.userController.users[i].username}</td>
            <td>${this.userController.users[i].gender}</td>
            <td>${this.userController.users[i].age}</td>
            <td>${this.userController.users[i].exp}</td>
            <td>${this.userController.users[i].achieves}</td>
            <td>${this.userController.users[i].inventory}</td>
            <td>${this.userController.users[i].spintime}</td>
            <td>${this.userController.users[i].money}</td>
            <td><button type="button" class="btn btn-danger removebtn" id='${this.userController.users[i].username}'>X</button></td>
            <td><button type="button" class="btn btn-dark editbtn" id="EditUser">Editar</button></td>
          </tr>`
        }
    }


    removeUser () {
        this.removeButtons = document.querySelectorAll(".removebtn")
        let controller = this.userController
        for (let button of this.removeButtons) {
            button.addEventListener('click', function(){
                controller.removeUserBtn(button.id)
                window.location.reload()
            })
        }
    }
}
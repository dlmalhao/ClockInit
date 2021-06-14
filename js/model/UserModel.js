export default class UserModel {
    constructor(email, password, username, gender, age) {
        this.email = email
        this.password = password
        this.username = username
        this.gender = gender
        this.age = age
        this.exp = "0"
        this.achieves = ""
        this.inventory = ""
        this.spintime = ""
        this.money = "0";
        this.status = "active"
        this.role = "user"
        this.image = "../img/avatarperfil.png"
    }
}
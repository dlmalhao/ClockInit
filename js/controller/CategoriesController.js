// import CategoriesModel from "../model/CategoriesModel"

export default class CategoriesController {
    constructor() {
        this.categories = localStorage.categories ? JSON.parse(localStorage.categories) : [];
    }


    getCategoryColor(btnname) {

        for(let categoria of this.categories) {
            if (btnname == categoria.name) {
                return categoria.color
            }
        }

    }
}
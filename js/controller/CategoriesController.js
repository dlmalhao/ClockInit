// import CategoriesModel from "../model/CategoriesModel"

export default class CategoriesController {
    constructor() {
        this.categories = localStorage.categories ? JSON.parse(localStorage.categories) : [];
    }
}
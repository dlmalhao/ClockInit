export default class ActivitiesController {
    constructor() {
        this.activities = localStorage.activities ? JSON.parse(localStorage.activities) : [];
    }


}
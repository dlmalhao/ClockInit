export default class ActivitiesController {
    constructor() {
        this.activities = localStorage.activities ? JSON.parse(localStorage.activities) : [];
    }


    getActivities(filterName = '', isSorted = false) {
        let filteredActivities = this.activities.filter(
            activity =>
                (activity.name.toLowerCase().includes(filterName.toLowerCase()) || filterName === '')
                
        )

        filteredActivities = isSorted ? filteredActivities.sort(this.#compare) : filteredActivities

        return filteredActivities
    }

    #compare(categoryA, categoryB) {
        if (categoryA.name > categoryB.name)
            return 1;
        if (categoryA.name < categoryB.name)
            return -1;
        return 0;
    }



}

import UserView from './view/IndexView.js'
import AdminView from './view/adminView.js'
import NavView from './view/navbarView.js'
import CategoriesView from './view/categoriesView.js';

class App {
    constructor() {
        // Mapeamento entre os ficheiros HTML e as views que estes vão carregar
        this.routes = {
            '': [
                UserView,
                NavView
            ],
            'index': [
                UserView,
                NavView
            ],
            'admin': [
                AdminView,
                NavView
            ],
            'categories': [
                CategoriesView,
                NavView
            ]
        };

        // importa dados dummy para testes
        this.#importDataFixtures();

        // instancia as views mapeadas no objeto routes
        this.#instantiateViews();
    }

    #instantiateViews() {
        const path = window.location.pathname
        const file = path.substr(path.lastIndexOf('/') + 1);
        const route = file.split(".")[0];

        const views = this.#getViews(route);

        for (const view of views) {
            new view();
        }
    }

    #getViews(route) {
        return typeof this.routes[route] === 'undefined' ? [] : this.routes[route];
    }

    #importDataFixtures() {
        const categories = [
            {
                id: 1,
                name: 'Cooking', 
                image: '../img/Cooking.svg',
                color: '#C79BE3'
            },
            {
                id: 2,
                name: 'Music', 
                image: '../img/Music.svg',
                color: '#505A8D'
            },
            {
                id: 3,
                name: 'Literature', 
                image: '../img/Literature.svg',
                color: '#78D1AD'
            },
            {
                id: 4,
                name: 'Fit', 
                image: '../img/Fit.svg',
                color: '#FFF9A4'
            }
        ];

        const admin = [
            {
                email : 'admin@esmad.ipp.pt',
                password : 'Admin123',
                username : 'Admin',
                gender  : 'male',
                age : '2000-06-13',
                exp : '0',
                achieves : '1,2,3,4,5',
                inventory : '1,2,3,4,5,6',
                spintime : '',
                money : '0',
                status : 'active'
            }
        ];


        if (localStorage.getItem('users')) {

            const users = JSON.parse(localStorage.getItem('users'))


            if(!users.some(user => user.email === 'admin@esmad.ipp.pt')){
                users.push('users', JSON.stringify(admin));
                localStorage.setItem('users', JSON.stringify(admin));
            }
        }
        else {
    
            localStorage.setItem('users', JSON.stringify(admin));
        }



        if (!localStorage.categories) {
            localStorage.setItem('categories', JSON.stringify(categories));
        }
    }
}

new App();

import UserView from './view/IndexView.js'
import AdminView from './view/adminView.js'
import NavView from './view/navbarView.js'
import CategoriesView from './view/categoriesView.js';
import ProfileView from './view/profileView.js';
import ActivitiesView from './view/ActivitiesView.js';
import StoreView from './view/storeView.js';

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
                AdminView
            ],
            'categories': [
                CategoriesView,
                NavView
            ],
            'profile': [
                ProfileView,
                NavView
            ],
            'activities': [
                ActivitiesView,
                NavView
            ],
            'store': [
                StoreView,
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


    // Nós optamos por ter algumas categorias / atividades predefinidas , porém se os administradores quiserem adicionar ou remover, podem.
    #importDataFixtures() {


        const store = [
            {
                id:1,
                image: '../img/avatarperfil.png',
                value:"700"
            },
            {
                id:2,
                image: '../img/avatarperfil.png',
                value:"900"
            },
            {
                id:3,
                image: '../img/avatarperfil.png',
                value:"500"
            },
            {
                id:4,
                image: '../img/avatarperfil.png',
                value:"300"
            }

        ];


        const categories = [
            {
                id: "1",
                name: 'Cooking', 
                text: 'What about tasting new flavors?',
                image: '../img/Cooking.svg',
                color: '#C79BE3'
                
            },
            {
                id: "2",
                name: 'Music', 
                text: 'When words fail, music speaks!',
                image: '../img/Music.svg',
                color: '#505A8D'
            },
            {
                id: "3",
                name: 'Literature', 
                text: 'Are you the master of literature?',
                image: '../img/Literature.svg',
                color: '#78D1AD'
            },
            {
                id: "4",
                name: 'Fit', 
                text: 'Exercise your mind and your body!',
                image: '../img/Fit.svg',
                color: '#FFF9A4'
            }
        ];



        const activities = [
            {
                id : '1',
                category : 'Music',
                name : 'Rock',
                image  : '../img/Music2.jpg'
            },
            {
                id : '2',
                category : 'Music',
                name : 'Pop',
                image  : '../img/Music3.jpg'
            },
            {
                id : '3',
                category : 'Cooking',
                name : 'Taco',
                image  : '../img/Cooking2.jpg'
            },
            {
                id : '4',
                category : 'Cooking',
                name : 'Spaghetti Bolognese',
                image  : '../img/Cooking3.jpg'
            },
            {
                id : '5',
                category : 'Cooking',
                name : 'Roasted Chicken',
                image  : '../img/Cooking4.jpg'
            },
            {
                id : '6',
                category : 'Fit',
                name : 'Exercise',
                image  : '../img/Fit2.jpg'
            },
            {
                id : '7',
                category : 'Fit',
                name : 'Abs',
                image  : '../img/Fit3.jpg'
            },
            {
                id : '8',
                category : 'Literature',
                name : 'Book1',
                image  : '../img/Literature2.jpg'
            },
            {
                id : '9',
                category : 'Literature',
                name : 'Book2',
                image  : '../img/Literature3.jpg'
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
                status : 'active',
                role: 'admin'
            },
            {
                email : 'teste@teste.ipp.pt',
                password : '123',
                username : 'diogo',
                gender  : 'male',
                age : '2000-06-13',
                exp : '0',
                achieves : '1,2,3,4,5',
                inventory : '1,2,3,4,5,6',
                spintime : '',
                money : '0',
                status : 'active',
                role: 'user'
            }
        ];



        if (localStorage.getItem('users')) {

            const users = JSON.parse(localStorage.getItem('users'))


            if(!users.some(user => user.role === 'admin')){
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


        if (!localStorage.activities) {
            localStorage.setItem('activities', JSON.stringify(activities));
        }


        if (!localStorage.store) {
            localStorage.setItem('store', JSON.stringify(store));
        }
    }
}

new App();
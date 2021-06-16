import UserView from './view/IndexView.js'
import AdminView from './view/adminView.js'
import NavView from './view/navbarView.js'
import CategoriesView from './view/categoriesView.js';
import ProfileView from './view/profileView.js';
import ActivitiesView from './view/ActivitiesView.js';
import StoreView from './view/storeView.js';
import InsideActivitiesView from './view/insideActivityView.js';
import FooterView from './view/footerView.js'
import SpinningWheelView from './view/spinningWheelView.js';


class App {
    constructor() {
        // Mapeamento entre os ficheiros HTML e as views que estes vão carregar
        this.routes = {
            '': [
                UserView,
                NavView,
                FooterView
            ],
            'index': [
                UserView,
                NavView,
                FooterView
            ],
            'admin': [
                AdminView
            ],
            'categories': [
                CategoriesView,
                NavView,
                FooterView
            ],
            'profile': [
                ProfileView,
                NavView,
                FooterView
            ],
            'activities': [
                ActivitiesView,
                NavView,
                FooterView
            ],
            'store': [
                StoreView,
                NavView,
                FooterView
            ],
            'insideActivities': [
                InsideActivitiesView,
                NavView,
                FooterView
            ],
            'spinningWheel': [
                SpinningWheelView,
                NavView,
                FooterView
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
                id:"1",
                image: 'https://icons.iconarchive.com/icons/diversity-avatars/avatars/1024/batman-icon.png',
                value:"700"
            },
            {
                id:"2",
                image: 'https://icons-for-free.com/iconfiles/png/512/avatar-1320568024619304547.png',
                value:"900"
            },
            {
                id:"3",
                image: 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png',
                value:"500"
            },
            {
                id:"4",
                image: 'https://cdn.iconscout.com/icon/free/png-256/boy-avatar-4-1129037.png',
                value:"100"
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
                image  : '../img/Music2.jpg',
                introduction : 'Rock ‘n’ roll was born from the mixture of various musical styles: rhythm and blues, gospel music, folk music, blues, country and jazz. Before the style became famous, the expression was already found in movies, commercials and music.',
                content : 'Some Musics : \n If you are a Rock ’n’ roll lover, we think that you will like the following bands: \n -The Clash \n -The Doors \n -The Animals \n -Lynyrd Skynyrd \n -Eagles \n -Dire Straits \n -Elton John \n -Prince \n -The Police '
            },
            {
                id : '2',
                category : 'Music',
                name : 'Pop',
                image  : '../img/Music3.jpg',
                introduction : 'Pop is a genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom. The terms popular music and pop music are often used interchangeably, although the former describes all music that is popular and includes many disparate styles. During the 1950s and 1960s, pop music encompassed rock and roll and the youth-oriented styles it influenced. Rock and pop remained roughly synonymous until the late 1960s, after which pop became associated with music that was more commercial, ephemeral, and accessible.',
                content : 'Some Musics : \n If you are a Pop lover, we think that you will like the following bands: \n - Duava \n - Nelly Furtado \n - Rico & Miella \n - Gwen Stefani \n - Diana Goldberg \n - Annie Sollange \n - Middle Child \n - Rachel Lorin \n - Adrian Jose'
            },
            {
                id : '3',
                category : 'Cooking',
                name : 'Taco',
                image  : '../img/Cooking2.png',
                introduction : '- 1 pound lean (at least 80%) ground beef \n - 1 cup Old El Paso™ Thick Chunky salsa \n - 10 Old El Paso™ taco shells \n - 1/2 head lettuce, shredded \n - 1 medium tomato, chopped (3/4 cup)  \n  - 1 cup shredded Cheddar cheese (4 ounces)',
                content : '1 Cook beef in 10-inch skillet over medium heat 8 to 10 minutes, stirring occasionally, until brown; drain. \n 2 Stir salsa into beef. Heat to boiling, stirring constantly; reduce heat to medium-low. Cook 5 minutes, stirring occasionally. Pour beef mixture into large serving bowl. \n 3 Heat taco shells as directed on package. Serve taco shells with beef mixture, lettuce, tomato and cheese.'
            },
            {
                id : '4',
                category : 'Cooking',
                name : 'Spaghetti Bolognese',
                image  : '../img/Cooking3.png',
                introduction : '1 tbsp olive oil \n 4 rashers smoked streaky bacon, finely chopped \n 2 medium onions, finely chopped \n 2 carrots, trimmed and finely chopped \n 2 celery sticks, finely chopped \n 2 garlic cloves finely chopped \n 500g beef mince \n For the bolognese sauce \n 2 x 400g tins plum tomatoes \n',
                content : 'Put a large saucepan on a medium heat and add 1 tbsp olive oil. \n Add 4 finely chopped bacon rashers and fry for 10 mins until golden and crisp. \n Reduce the heat and add the 2 onions, 2 carrots, 2 celery sticks, 2 garlic cloves and the leaves from 2-3 sprigs rosemary, all finely chopped, then fry for 10 mins. Stir the veg often until it softens. \n Increase the heat to medium-high, add 500g beef mince and cook stirring for 3-4 mins until the meat is browned all over. \n Add 2 tins plum tomatoes, the finely chopped leaves from ¾ small pack basil, 1 tsp dried oregano, 2 bay leaves, 2 tbsp tomato purée, 1 beef stock cube, 1 deseeded and finely chopped red chilli (if using), 125ml red wine and 6 halved cherry tomatoes. Stir with a wooden spoon, breaking up the plum tomatoes. \n Bring to the boil, reduce to a gentle simmer and cover with a lid. Cook for 1 hr 15 mins stirring occasionally, until you have a rich, thick sauce. \n Add the 75g grated parmesan, check the seasoning and stir. \n When the bolognese is nearly finished, cook 400g spaghetti following the pack instructions. \n Drain the spaghetti and either stir into the bolognese sauce, or serve the sauce on top. Serve with more grated parmesan, the remaining basil leaves and crusty bread, if you like.'
            },
            {
                id : '5',
                category : 'Cooking',
                name : 'Roasted Chicken',
                image  : '../img/Cooking4.png',
                introduction : '1 (3 pound) whole chicken, giblets removed \n salt and black pepper to taste \n 1 tablespoon onion powder, or to taste \n ½ cup margarine, divided \n 1 stalk celery, leaves removed',
                content : 'Preheat oven to 350 degrees F (175 degrees C). \n Place chicken in a roasting pan, and season generously inside and out with salt and pepper. Sprinkle inside and out with onion powder. Place 3 tablespoons margarine in the chicken cavity. Arrange dollops of the remaining margarine around the chicken exterior. Cut the celery into 3 or 4 pieces, and place in the chicken cavity. \n Bake uncovered 1 hour and 15 minutes in the preheated oven, to a minimum internal temperature of 180 degrees F (82 degrees C). Remove from heat, and baste with melted margarine and drippings. Cover with aluminum foil, and allow to rest about 30 minutes before serving.    '
            },
            {
                id : '6',
                category : 'Fit',
                name : 'Bicep',
                image  : '../img/Fit2.svg',
                introduction : 'Some exercises to improve biceps at home',
                content : 'Some Exercises : \n - Barbell Curl \n - Chin-Up \n - EZ-Bar Preacher Curl \n Hammer Curl \n Incline Dumbbell Curl \n Reverse-Grip Bent-Over Row \n Cable Curl \n Concentration Curl'
            },
            {
                id : '7',
                category : 'Fit',
                name : 'Abs',
                image  : '../img/Fit3.svg',
                introduction : 'Some exercises to improve your abs at home',
                content : 'Some Exercises : \n - Plank \n - Mountain climber \n - Reverse crunch \n - Grounded Russian twist \n - Dead bug \n - Abs roll-out \n - Hanging knee raise \n - Dumbbell woodchop'
            },
            {
                id : '8',
                category : 'Literature',
                name : 'Drama',
                image  : '../img/Literature2.svg',
                introduction : 'Drama is the specific mode of fiction represented in performance: a play, opera, mime, ballet, etc., performed in a theatre, or on radio or television. Considered as a genre of poetry in general, the dramatic mode has been contrasted with the epic and the lyrical modes ever since Aristotle  Poetics \n The use of drama in a more narrow sense to designate a specific type of play dates from the modern era. Drama in this sense refers to a play that is neither a comedy nor a tragedy',
                content : 'Some books : \n- Hamlet \n - Macbeth \n - Othello \n - The Tempest \n - The Crucible  \n - Death of a Salesman \n - Julius Caesar \n Twelfth Night \n The Elephant Tree'
            },
            {
                id : '9',
                category : 'Literature',
                name : 'Horror',
                image  : '../img/Literature3.svg',
                introduction : 'Horror is a literary, cinematographic or musical genre, which is always closely linked to fantasy and speculative fiction, and is created with the intention of causing fear, terrifying. It can also be seen in painting, drawing, film and photography. The abstract idea of ​​terror or the act of conveying the feeling of terror or horror can be seen in all forms of art. Throughout the 1990s, until today, the genre also comprises a style of electronic game development.',
                content : 'Some books: \n - Rosemary´s Baby \n - Lord of the Flies \n - The Haunting of Hill House \n - Blindness \n - Hell House \n - Haunted: A Novel \n The Ruins \n Ghost Story'
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
                role: 'admin',
                image: 'https://icons.iconarchive.com/icons/diversity-avatars/avatars/1024/batman-icon.png'
            },
            {
                email : 'teste@teste.ipp.pt',
                password : '123',
                username : 'diogo',
                gender  : 'male',
                age : '2000-06-13',
                exp : '0',
                achieves : '1,2,3,4,5',
                inventory : '',
                spintime : '',
                money : '1500',
                status : 'active',
                role: 'user',
                image:'img/avatarperfil.png'
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
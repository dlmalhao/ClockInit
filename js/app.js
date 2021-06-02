import RegisterView from './view/RegisterView.js'

class App {
    constructor() {
        // Mapeamento entre os ficheiros HTML e as views que estes vão carregar
        this.routes = {
            '': [
                
            ],
            'index': [
                
            ],
            'register': [
                RegisterView
            ],
            'newBand': [
                
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
        // const bands = [
        //     {
        //         id: 1,
        //         name: 'Muse',
        //         genre: 'Pop-Rock',
        //         photo: 'http://www.planckmachine.com/wp-content/uploads/2016/09/hysteria-muse-meaning-song.jpg',
        //         description: 'The best band ever',
        //         video: 'https://www.youtube.com/watch?v=AR6A3dap6MI'
        //     },
        //     {
        //         id: 2,
        //         name: 'RadioHead',
        //         genre: 'Pop-Rock',
        //         photo: 'https://ep01.epimg.net/elpais/imagenes/2017/05/17/icon/1495017818_647155_1495125183_noticia_normal.jpg',
        //         description: 'The best band ever',
        //         video: 'https://www.youtube.com/watch?v=fHiGbolFFGw'
        //     },
        //     {
        //         id: 3,
        //         name: 'James',
        //         genre: 'Pop-Rock',
        //         photo: 'http://ksassets.timeincuk.net/wp/uploads/sites/55/2013/01/2012JamesBandPress181212-2.jpg',
        //         description: 'The best band ever',
        //         video: 'https://www.youtube.com/watch?v=BlucfrfxAUc'
        //     },
        //     {
        //         id: 4,
        //         name: 'Metallica',
        //         genre: 'Metal',
        //         photo: 'https://images.impresa.pt/blitz/2016-08-19-metallica.jpg/original/mw-860',
        //         description: 'The best band ever',
        //         video: 'https://www.youtube.com/watch?v=pZTJBViOoik'
        //     }
        // ];

        const users = [
            {
                email : 'admin@esmad.ipp.pt',
                password : 'Admin123',
                username : 'Admin',
                gender  : 'male',
                age : '2000/06/13',
                exp : '2562',
                achieves : '1,2,3,4,5',
                inventory : '1,2,3,4,5,6',
                spintime : ''
            }
        ];


        if (localStorage.getItem('users')) {
            const loginDeets = JSON.parse(localStorage.getItem('users'))
            if(users.some(user => user.email === 'admin@esmad.ipp.pt')){
                console.log("hey")
                localStorage.setItem('users', JSON.stringify(users));
            }
        }
        else {
            console.log("bye")
            localStorage.setItem('users', JSON.stringify(users));
        }

    }
}

new App();

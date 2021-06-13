import StoreController from '../controller/StoreController.js'
import UserController from '../controller/UserController.js'


export default class CategoriesView {
    constructor() {


        this.storeController = new StoreController();
        this.userController = new UserController();
        this.StoreRow = document.querySelector("#store-row")
        this.sendUser = document.querySelector("#send-user-to-index")
        
        this.localStorageData()
        this.bindIsAnyUserLogged ()
        this.showCoins()
        this.buyItem()
        
        
    }

    localStorageData () {
        for (let i = 0; i < this.storeController.store.length; i++){
            this.StoreRow.innerHTML += 
            `<div class="col-md-4 d-flex justify-center flex-column mb-2">
            <div class="container store-back-image mb-2">
                <img src="${this.storeController.store[i].image}" alt="">
            </div>
            <div class="store-price">
            <button class="btn btn-dark lojaButton" id="${this.storeController.store[i].id}" style="width:40%; background-color: #FF725E ">${this.storeController.store[i].value}</button>
                
            </div>
        </div>`
        }
    }

    bindIsAnyUserLogged () {
        if(!this.userController.isAnyUserLogged()) {
            this.sendUser.click()
        }
    }

    showCoins(){
        this.userCoins = this.storeController.getUserCoins()
        this.CoinsLoja = document.querySelector("#coinsLoja")
        
        this.CoinsLoja.value = this.userCoins
        
    }

    buyItem(){
        this.valorItem = document.querySelectorAll(".lojaButton")
        this.CoinsLoja = document.querySelector("#coinsLoja")
        for (const Item of this.valorItem) {
            if(parseInt(this.CoinsLoja.value) < parseInt(Item.innerHTML)){
                Item.setAttribute("disabled","disabled")
                Item.style.backgroundColor = "grey"
               
            }
            
            let InventoryData = this.storeController.getAllLoggedInInfo().inventory
            let arrayInventory = InventoryData.split(",")  
            for (const inventoryItem of arrayInventory) {
                if(inventoryItem == Item.id){
                    Item.setAttribute("disabled","disabled")
                    Item.style.backgroundColor = "grey"
                }
            }  

            Item.addEventListener("click", () =>{
                let newValue = this.CoinsLoja.value -  Item.innerHTML
                this.storeController.UpdateMoney(newValue)
                let buttonId = Item.id
                this.storeController.UpdateInventory(buttonId)
                
               location.reload()
            })
        }
        
        
    }

    
}
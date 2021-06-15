

export default class FooterView {
    constructor() {
        this.footer = document.querySelector(".fixarRodape")

        this.bindFooter()
    }

    bindFooter(){
        this.footer.innerHTML = ` <div class="footerBack" >
        <div class="parteCima">
            <div class="row py-4 d-flex aling-items-center">
                <div class="col-md-12 text-center">
                    <img src="../img/logo.svg" style="width: 100px;">
                    <a href="#" class="text-white ml-4 mr-4">About Us</a>
                    <a href="#" class="text-white ml-4 mr-4">Our Contacts</a>
                    <a href="#"><i class="fab fa-facebook text-white ml-4 mr-4"></i></a>
                    <a href="#"><i class="fab fa-twitter text-white mr-4"></i></a>
                    <a href="#"><i class="fab fa-instagram text-white mr-4"></i></a>
                    <a href="#"><i class="fas fa-envelope text-white mr-4"></i></a>
                </div>
            </div>
        </div>
    </div>

    <div class="parteBaixo text-center text-md-left footerBack2" style="width: 100%;">
        <div class="row d-flex justify-content-center">
            
            <div class="col-md-1 mx-1 mb-1">
                <p class=" text-white">Legal</p>                   
            </div>
            <div class="col-md-1 mx-1 mb-1">
                <p class=" text-white">Privacy Center</p>                   
            </div>
            <div class="col-md-1 mx-1 mb-1">
                <p class=" text-white">Privacy Policy</p>                   
            </div>
            <div class="col-md-1 mx-1 mb-1">
                <p class=" text-white">Cookies</p>                   
            </div>
            <div class="col-md-2 mx-1 mb-2">
                <p class=" text-white">Additional CA Privacy Disclosures</p>                   
            </div>
        </div>
    </div>`
    }
}
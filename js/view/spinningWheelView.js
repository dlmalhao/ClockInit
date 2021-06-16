import UserController from "../controller/UserController.js";

export default class SpinningWheelView {
    constructor() {


        this.sendUser = document.querySelector("#send-user-to-index5")
        this.userController = new UserController()
        this.SpinningWheelData()
        // this.bindIsAnyUserLogged()
    }

    bindIsAnyUserLogged () {
        if(!this.userController.isAnyUserLogged()) {
            this.sendUser.click()
        }
    }


    SpinningWheelData() {
        // Create new wheel object specifying the parameters at creation time.
        let theWheel = new Winwheel({
            'outerRadius'     : 212,        // Set outer radius so wheel fits inside the background.
            'innerRadius'     : 75,         // Make wheel hollow so segments don't go all way to center.
            'textFontSize'    : 24,         // Set default font size for the segments.
            'textOrientation' : 'vertical', // Make text vertial so goes down from the outside of wheel.
            'textAlignment'   : 'outer',    // Align text to outside of wheel.
            'numSegments'     : 12,         // Specify number of segments.
            'segments'        :             // Define segments including colour and text.
            [                               // font size and test colour overridden on backrupt segments.
               {'fillStyle' : '#ee1c24', 'text' : '300'},
               {'fillStyle' : '#3cb878', 'text' : '150'},
               {'fillStyle' : '#00aef0', 'text' : '400'},
               {'fillStyle' : '#f26522', 'text' : '100'},
               {'fillStyle' : '#f6989d', 'text' : '700'},
               {'fillStyle' : '#ee1c24', 'text' : '350'},
               {'fillStyle' : '#f26522', 'text' : '100'},
               {'fillStyle' : '#fff200', 'text' : '200'},
               {'fillStyle' : '#00aef0', 'text' : '650'},
               {'fillStyle' : '#ee1c24', 'text' : '1000'},
               {'fillStyle' : '#f6989d', 'text' : '100'},
               {'fillStyle' : '#3cb878', 'text' : '200'},
            ],
            'animation' :           // Specify the animation to use.
            {
                'type'     : 'spinToStop',
                'duration' : 10,    // Duration in seconds.
                'spins'    : 3,     // Default number of complete spins.
                'callbackFinished' : alertPrize,
                'callbackSound'    : playSound,   // Function to call when the tick sound is to be triggered.
                'soundTrigger'     : 'pin'        // Specify pins are to trigger the sound, the other option is 'segment'.
            },
            'pins' :				// Turn pins on.
            {
                'number'     : 12,
                'fillStyle'  : 'silver',
                'outerRadius': 4,
            }
        });
        // Loads the tick audio sound in to an audio object.
        let audio = new Audio('../audio/tick.mp3');
        // This function is called when the sound is to be played.
        function playSound()
        {
            // Stop and rewind the sound if it already happens to be playing.
            audio.pause();
            audio.currentTime = 0;
            // Play the sound.
            audio.play();
        }
        
        let wheelSpinning = false;
        // -------------------------------------------------------
        // Function to handle the onClick on the power buttons.
        // -------------------------------------------------------
        
        // -------------------------------------------------------
        // Click handler for spin button.
        // -------------------------------------------------------
        document.querySelector("#spin_button").addEventListener("click", () => {

            {
                // Ensure that spinning can't be clicked again while already running.
                if (wheelSpinning == false) {
                    // Based on the power level selected adjust the number of spins for the wheel, the more times is has
                    // to rotate with the duration of the animation the quicker the wheel spins.

                    theWheel.animation.spins = 6;
                
                    // Disable the spin button so can't click again while wheel is spinning.
                    // document.getElementById('spin_button').src       = "spin_off.png";
                    // document.getElementById('spin_button').className = "";
                    // Begin the spin animation by calling startAnimation on the wheel object.
                    theWheel.startAnimation();
                    // Set to true so that power can't be changed and spin button re-enabled during
                    // the current animation. The user will have to reset before spinning again.
                    wheelSpinning = true;
                }
            }

        })
        
        // let spinTimeBef = this.userController.getAllLoggedInInfo().spintime
        // let spinTimeAft = parseInt(spinTimeBef)

        // const countdown = () => {
        //     const now = new Date().getTime();
        //     const aDayLater =  now + 86400000
        //     const gap = aDayLater - now
        //     if (gap < 86400000) {
        //         document.querySelector("#spin_button").setAttribute("disabled","disabled")
        //     }
        //     else {
        //         document.querySelector("#spin_button").setAttribute("disabled","")
        //     }
        // }
        // countdown()
        // {
        //     theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
        //     theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
        //     theWheel.draw();                // Call draw to render changes to the wheel.
        //     wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
        // }
        // -------------------------------------------------------
        // Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
        // -------------------------------------------------------




        function alertPrize(indicatedSegment)
        {
            let userController = new UserController()
            document.querySelector("#confirmationModalContent2").innerHTML = `You have won ${indicatedSegment.text}`
            document.querySelector("#ConfirmationModalTrigger2").click()
            userController.addMoneyToUser(indicatedSegment.text)
            
        }

        
    }
}
        
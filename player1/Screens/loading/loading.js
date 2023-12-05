export class LoadingScreen {
    constructor(p5, changeScreenCallback) {
       this.p5 = p5;
       this.changeScreen = changeScreenCallback;
   
       this.p5.setup = () => {
         this.p5.createCanvas(this.p5.windowWidth, this.p5.windowHeight);
         this.p5.background(0);
       };
   
       this.p5.draw = () => {
         this.p5.background(0);
   
         this.p5.textSize(32);
         this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
         this.p5.text('Waiting for player', this.p5.width / 2, this.p5.height / 2);
   
         if (this.image) {
           this.p5.image(this.image, this.p5.width / 2 - this.image.width / 2, this.p5.height / 2 - this.image.height / 2);
         }
       };
   
       this.image = this.p5.loadImage('./Screens/imgs/rappi-logo-2.png');
    }
   }
class KeyboardInput {
    constructor(){
        this.keys = [];
        document.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
          });
          document.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
          });
    }
    
}
export default KeyboardInput;
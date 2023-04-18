import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';

class Car {
    // /model/uploads_files_3191950_car+whith.glb
    
    constructor(modelGLTF) {
        this.model = modelGLTF;
      }
      
    
      async carObj() {
        return new Promise((resolve, reject) => {
          const loader = new GLTFLoader();
          
          loader.load(
            this.model,
            
            (gltf) => {
              const car = gltf.scene.children[0];
              car.scale.set(0.003,0.004,0.003);
              
              resolve(gltf.scene);
            },
            undefined,
            (error) => {
              console.error(error);
              reject("Failed to load car model: " + error.message);
            }
          );
        });
      }
      
      

}
export default Car;

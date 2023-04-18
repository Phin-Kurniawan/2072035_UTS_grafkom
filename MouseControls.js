import * as THREE from 'three';
class MouseControls {
    constructor(cam,scene, objects) {
        this.caster  = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        document.body.addEventListener('mousedown', event => {
            this.mouse.x = event.clientX/window.innerWidth *2  - 1;
            this.mouse.y = event.clientY/window.innerHeight *(-2) + 1;
            this.caster.setFromCamera(this.mouse,cam);
            let results = this.caster.intersectObjects(scene.children);

            objects.forEach(obj => {
                obj.selected = false;
            })
            results.forEach(item => {
                objects.forEach(obj => {
                    if (obj.name == item.object.name){
                        obj.selected = true;
                    }
                })
            });
        });
    }

}
export default MouseControls
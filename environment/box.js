import * as THREE from 'three';
 function createBox() {
    const brickTexture = new THREE.TextureLoader().load('/textures/154.jpg');
    const normBrickTexture = new THREE.TextureLoader().load('/textures/154_norm.jpg');
    const boxGeo = new THREE.BoxGeometry(14,4,1);
    // '/node_modules/three/examples/fonts/gentilis_regular.typeface.json'
    const boxMat = new THREE.MeshPhongMaterial({map: brickTexture,normalMap:normBrickTexture});
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    boxMesh.position.set(1, 2, 0);    
    
    const boxParent = new THREE.Object3D();
    boxParent.add(boxMesh);
    const objBox = new THREE.Box3().setFromObject(boxParent);

    // Set userData on the parent object
    boxParent.userData.objBox = objBox;

    return boxParent;
    
}

export default createBox;

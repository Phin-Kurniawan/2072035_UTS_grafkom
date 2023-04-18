import * as THREE from 'three';

function land(baseColor, normal){
    // '/textures/Stylized_Stone_Floor_005_basecolor.jpg'
    // '/textures/Stylized_Stone_Floor_005_normal.jpg'
    const groundTexture = new THREE.TextureLoader().load(baseColor);
    const normalTexture = new THREE.TextureLoader().load(normal);
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    normalTexture.wrapS = THREE.RepeatWrapping;
    normalTexture.wrapT = THREE.RepeatWrapping;
    
    groundTexture.repeat.set( 1000, 1000 );
    normalTexture.repeat.set( 1000, 1000);
    const groundMaterial = new THREE.MeshStandardMaterial( { map:groundTexture, normalMap:normalTexture} );
    const groundGeometry = new THREE.BoxGeometry(10000,10000,1)
    const ground = new THREE.Mesh( groundGeometry, groundMaterial );
    ground.receiveShadow = true;
    ground.position.y = 0;
    ground.rotation.x =-Math.PI/2;
    return ground;
}

export default land;
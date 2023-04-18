import * as THREE from 'three';
import createBox from './environment/box.js';
import Car from './environment/car.js';
import floatBall from './environment/floatingBall.js';
import land from './environment/floor.js';
import skyBox from './environment/sky.js';
import textLoad from './environment/text.js';
import KeyboardInput from './KeyBoardControls.js';
import MouseControls from './MouseControls.js';
// import {MouseControls} from 'three/examples/jsm/controls/'
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// cam.position.set(0,8,15);
// cam.rotation.x -= 0.4
// const controls = new OrbitControls( cam, renderer.domElement );

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xFFFFFF);
document.body.appendChild(renderer.domElement);

const fontype = '/node_modules/three/examples/fonts/gentilis_regular.typeface.json'

const textBox1 = await textLoad('Crash me', fontype );
// const controls = new OrbitControls(cam, renderer.domElement);
textBox1.position.z -= 0.5;
textBox1.position.x += 6;
textBox1.position.y += 1.6;
const box1 = createBox();
box1.add(textBox1);


box1.position.z += 10;
const angle = -Math.PI; // 180 degrees in radians
const rotationMatrix = new THREE.Matrix4().makeRotationY(angle);
box1.applyMatrix4(rotationMatrix);
// box1.position.set(-2, 1, -4);
scene.add(box1);
const hlight = new THREE.AmbientLight(0xFFFFFF,0.4);
scene.add(hlight);
const environment = skyBox('/textures/cloudy/bluecloud_ft.jpg','/textures/cloudy/bluecloud_rt.jpg','/textures/cloudy/bluecloud_lf.jpg'
,'/textures/cloudy/bluecloud_bk.jpg','/textures/cloudy/bluecloud_dn.jpg','/textures/cloudy/bluecloud_up.jpg'
);
scene.background = environment;




const car = new Car("/model/scene.gltf");
const carObj = new THREE.Object3D;

const carMesh =await car.carObj();
if (carMesh) {
  carMesh.applyMatrix4(rotationMatrix);
  carObj.add(carMesh);
 
  
  scene.add(carObj);
} 
carMesh.position.set(-10,12,20);
carMesh.rotation.y += 0;
// Check for intersection between car and box

// let kendali = {
  //   x: 1,
  //   y: 1,
  //   z: 1,
  //   rotationX :1,
  //   rotationY: 1,
//   rotationZ: 1,
//   result: 1,
// }
// let gui = new dat.GUI();
// gui.add(kendali,'result',[
  //   1,
  //   2,
  //   3,
//   4,
//   5,
// ]);

// var folder1 = gui.addFolder('position');
// var folder2= gui.addFolder('rotation');

// // -4 awal 4 akhir  0.1 stepnya
// folder1.add(kendali,"x",-4,4,0.1);
// folder1.add(kendali,"y",-4,4,0.1);
// folder1.add(kendali,"z",-4,4,0.1);

// folder2.add(kendali,'rotationX',-4,4,0.1);
// folder2.add(kendali,'rotationY',-4,4,0.1);
// folder2.add(kendali,'rotationZ',-4,4,0.1);

const balls = [];
for(let i= 0;i<100;i++){
  
  const ball = floatBall('ball'+i);
  
  ball.position.set(
    Math.floor(Math.random() * (i + 2) * 10),
    Math.floor(Math.random() * (i + 3) * 5),
    Math.floor(Math.random() * (i + 2) * 10)
    );
  ball.originalPosition = ball.position.clone(); 
  balls.push(ball);
  scene.add(ball);
}
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 10, 0);
scene.add(directionalLight);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.target = carMesh;
scene.add(directionalLight2);
const baseColor = '/textures/Stylized_Stone_Floor_005_basecolor.jpg';
const normColor = '/textures/Stylized_Stone_Floor_005_normal.jpg';
const ground = land(baseColor, normColor);
scene.add(ground);

//posisikan kamera dibelakang mobil dan di atas mobil
// const camAngle = Math.PI / 82; // rotate by 45 degrees
// const axis = new THREE.Vector3(0, 1, 0); // rotate around the y-axis
// const rotateCam = new THREE.Matrix4().makeRotationAxis(axis, camAngle);
const camOffset = new THREE.Vector3(-1, 8, 24);
// camOffset.applyMatrix4(rotateCam);
const cam = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.5, 80);
cam.position.copy(carObj.position).add(camOffset);
cam.lookAt(carObj.position);
document.addEventListener('resize',()=>{
  cam.aspect = window.innerWidth/window.innerHeight;
  cam.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
const mouseControl = new MouseControls(cam,scene,balls);
const updateCamera = () => {
  // ubah camera position dan rotation berdasarkan posisi dan putaran mobil
  const carDirection = new THREE.Vector3(0, -1, 0).applyQuaternion(carObj.quaternion);
  const cameraPosition = carObj.position.clone().add(camOffset.clone().applyQuaternion(carObj.quaternion));
  const target = carObj.position.clone().add(carDirection);
  
  cam.position.copy(cameraPosition);
  cam.lookAt(target);
}
const max_speed = 2;
const acceleration = 0.1;
let speed = 0;
let direction = new THREE.Vector3(0, 0, -1);
const boxBox = new THREE.Box3().setFromObject(box1);
const keyboard = new KeyboardInput();
const draw = () => {
  // controls.update();
  balls.forEach(ball => {
    ball.position.y -= Math.sin(Date.now()*0.001)*0.1
    const time = Date.now() * 0.001;
    const colorStart = new THREE.Color(0xff0000);
    const colorEnd = new THREE.Color(0x00ffff);
    const colorShift = Math.sin(time) * 0.5 + 0.5;

    if (ball.selected) {
      ball.material.color.copy(colorStart.clone().lerp(colorEnd, colorShift));
    } else {
      ball.material.color.copy(colorEnd.clone().lerp(colorStart, colorShift));
    }
        

    });
  const carBox = new THREE.Box3().setFromObject(carObj);

  
  
  if (carMesh) {
    
    const velocity = direction.clone().multiplyScalar(speed);
    
    if (keyboard.keys['ArrowUp'] || keyboard.keys['w'] ) {
      speed = Math.min(speed + acceleration, max_speed);
      
    } else if (keyboard.keys['ArrowDown'] || keyboard.keys['s']) {
      speed = Math.max(speed - acceleration, -max_speed);
    } 
    else {
      speed *= 0.9;
    }
    
    if (keyboard.keys['ArrowLeft'] || keyboard.keys['a']) {
      direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 100);
      carObj.rotation.y -= Math.PI / 100;
    }
    if (keyboard.keys['ArrowRight'] || keyboard.keys['d']) {
      direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), +Math.PI / 100);
      carObj.rotation.y += Math.PI / 100;
    }
    
    if (keyboard.keys['ArrowUp'] || keyboard.keys['ArrowDown'] ||keyboard.keys['ArrowLeft'] || keyboard.keys['ArrowRight'] || keyboard.keys['w'] || keyboard.keys['a'] || keyboard.keys['s'] || keyboard.keys['d'] ) {
      
      carObj.position.add(velocity);
    }
  }
  if (carBox.intersectsBox(boxBox)) {
      window.location.replace('index2.html');
      // console.log(window.location.replace('index2.html'))
    }
  updateCamera();
  renderer.render(scene, cam);
  requestAnimationFrame(draw);
}
draw();
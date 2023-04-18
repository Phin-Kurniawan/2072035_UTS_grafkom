import * as THREE from 'three';
function floatBall(name){
  const ballRadius = 1;
  const ballSegments = 15;
  const ballGeometry = new THREE.SphereGeometry(ballRadius, ballSegments, ballSegments);
  
  const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const ball = new THREE.Mesh(ballGeometry, ballMaterial);
  ball.name = name;
  // Set the ball's position

  ball.selected = false;
  return ball
}
export default floatBall;
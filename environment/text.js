import { FontLoader } from '/node_modules/three/examples/jsm/loaders/FontLoader.js';
import * as THREE from 'three';
import { TextGeometry } from '/node_modules/three/examples/jsm/geometries/TextGeometry.js';

async function textLoad(textString, fontType) {
  return new Promise((resolve, reject) => {
    const fontLoader = new FontLoader();
    fontLoader.load(fontType, (font) => {
      const textGeo = new TextGeometry(textString, {
        font: font,
        size: 2,
        height: 1,
      });
      const textMat = new THREE.MeshBasicMaterial({ transparent: true, side: THREE.DoubleSide, color: 0xFFFFFF });
      const textMesh = new THREE.Mesh(textGeo, textMat);
      
      textMesh.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI));
      resolve(textMesh);
      
    }, undefined, reject);
  });
}

export default textLoad;

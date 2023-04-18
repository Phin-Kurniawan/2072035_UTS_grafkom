import * as THREE from 'three';
function skyBox( ft ,rt,lf,bk,dn,tp){

    const skyboxLoader = new THREE.CubeTextureLoader();
    const skyboxTexture = skyboxLoader.load([

      ft,
      bk,
      rt,
      lf,
      tp,
      dn
    ]
    );
    return skyboxTexture
   
}
export default skyBox;
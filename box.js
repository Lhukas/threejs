
    import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/MTLLoader.js';



const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
const loader = new GLTFLoader();
var box = null;

const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
}



        loader.load('https://cdn.shopify.com/s/files/1/0662/5070/3061/files/test.gltf?v=1666079069',
	
	function(gltf) {
	
        box = gltf.scene;
        box.scale.set(0.1,0.1,0.1)
    
        scene.add(box)
	},
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' )
	},

	function ( error ) {

		console.log( 'An error happened' );

	}
);



    


const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)


const light2 = new THREE.DirectionalLight(0xffffff, 1)
scene.add(light2)





/*
const geometry = new THREE.BoxGeometry()

const boxMesh = new THREE.Mesh(geometry, material)
//boxMesh.scale.set(0,1,0,1,0,1)
scene.add(boxMesh)
*/
var camera = new THREE.PerspectiveCamera( 100, sizes.width / sizes.height, 0.1, 100 );
camera.position.set(0, 2,3);


/*
camera.rotation.y = -10
camera.rotation.x= 0.20;  // Y first*/
scene.add(camera)

const render = new THREE.WebGL1Renderer({
 canvas : canvas,
  alpha: true
})

 render.setSize( sizes.width, sizes.height );
  //render.setPixelRatio( Math.min(window.devicePixelRatio, 5 ) );
//render.shadowMap.enabled = true
//render.gammaOuput = true

const controls = new OrbitControls (camera, canvas);
controls.enableZoom = false;

//controls.enableRotate = false;

controls.minPolarAngle = -10;
controls.maxPolarAngle = 1;


controls.minAzimuthAngle = 0;
controls.maxAzimuthAngle = 5;



render.render(scene, camera)


function animate(){

    requestAnimationFrame(animate)
    switch (true) {
        case (box.rotation.x < 1):
       box.rotation.x += 0.015
            break;

            case (box.rotation.x > 0.9):
            box.rotation.z -= 0.015
            break;

        default:
            break;
    }

    //console.log(box.rotation)
    render.render(scene,camera)
}

animate()


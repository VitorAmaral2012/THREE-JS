import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { Group, Scene } from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const render = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), antialias: true });
render.setPixelRatio(window.devicePixelRatio);
render.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);



let NomeDosPlanetas = {
    "SOL": new THREE.Group(),
    "MERCURI": new THREE.Group(),
    "VENUS": new THREE.Group(),
    "TERRA": new THREE.Group(),
    "MARTE": new THREE.Group(),
    "JUPT": new THREE.Group(),
    "SAT": new THREE.Group(),
    "URA": new THREE.Group(),
    "NET": new THREE.Group()
}

const ORBITA_terra_lua = new THREE.Group();


//texture
const TextSOL = new THREE.TextureLoader().load('./assets/sol.jpeg')
const TextMERCURI = new THREE.TextureLoader().load('./assets/mercury.jpg')
const TextVENUS = new THREE.TextureLoader().load('./assets/Venus.jpg')
const TextTERRA = new THREE.TextureLoader().load('./assets/terra.jpg')
const TextLUA = new THREE.TextureLoader().load('./assets/lua.jpg')
const TextMars = new THREE.TextureLoader().load('./assets/mars.jpg')
const TextJUPT = new THREE.TextureLoader().load('./assets/jupiter.jpg')
const TextSat = new THREE.TextureLoader().load('./assets/saturn.jpg')
const TextUranu = new THREE.TextureLoader().load('./assets/uranus.jpg')
const TextNeptu = new THREE.TextureLoader().load('./assets/neptune.jpg')
const galaxy = new THREE.TextureLoader().load('./assets/stars_milky_way.jpg')
const atmos = new THREE.TextureLoader().load('./assets/atmos.jpg')

scene.background = galaxy
var OrbiPlanets = []
for (var i = 0; i < 9; i++) {
    OrbiPlanets[i] = new THREE.Group();
}



//planetas
const Sol = CreatePlanet(5, TextSOL)
const Mercu = CreatePlanet(0.8, TextMERCURI)
const Venus = CreatePlanet(1, TextVENUS)
const lua = CreatePlanet(0.7, TextLUA)
const terra = CreatePlanet(2, TextTERRA)
const Mars = CreatePlanet(1.4, TextMars)
const jupt = CreatePlanet(4, TextJUPT)
const sat = CreatePlanet(3, TextSat)
const Uranu = CreatePlanet(2.6, TextUranu)
const Neptu = CreatePlanet(2.6, TextNeptu)
const atmosfera = CreatePlanet(2.1, atmos, true, 0.4)

Sol.position.set(0, 0, 0)
Mercu.position.set(10, 0, 0)
Venus.position.set(20, 0, 0)
ORBITA_terra_lua.position.set(30, 0, 0)
atmosfera.position.set(30, 0, 0)
lua.position.set(4, 0, 0);
Mars.position.set(40, 0, 0)
jupt.position.set(50, 0, 0)
sat.position.set(60, 0, 0)
Uranu.position.set(70, 0, 0)
Neptu.position.set(80, 0, 0)
    //relaçãp do sistema

var iterator = 0;
for (let orbita in NomeDosPlanetas) {
    iterator++;
    NomeDosPlanetas["SOL"].add(NomeDosPlanetas[orbita])
}



ORBITA_terra_lua.add(lua)
ORBITA_terra_lua.add(terra)
NomeDosPlanetas["TERRA"].add(atmosfera)

NomeDosPlanetas["SOL"].add(Sol);
NomeDosPlanetas["MERCURI"].add(Mercu);
NomeDosPlanetas["VENUS"].add(Venus);
NomeDosPlanetas["TERRA"].add(ORBITA_terra_lua);
NomeDosPlanetas["MARTE"].add(Mars);
NomeDosPlanetas["JUPT"].add(jupt);
NomeDosPlanetas["SAT"].add(sat);
NomeDosPlanetas["URA"].add(Uranu);
NomeDosPlanetas["NET"].add(Neptu);
scene.add(NomeDosPlanetas["SOL"]);



function CreatePlanet(Tamanho, Textura, trans = false, opa = 1) {
    var Planet_geo = new THREE.SphereGeometry(Tamanho, 32, 32);
    var Material = new THREE.MeshStandardMaterial({ map: Textura, transparent: trans, opacity: opa })
    var Planet = new THREE.Mesh(Planet_geo, Material)
    return Planet
}





const cameraHelp = new OrbitControls(camera, render.domElement);
const grid = new THREE.GridHelper(200, 50);


//rotacao
const YearEarth = 0.0017
NomeDosPlanetas["NET"].rotation.y += 3
NomeDosPlanetas["URA"].rotation.y += 2
NomeDosPlanetas["SAT"].rotation.y += -1;
NomeDosPlanetas["JUPT"].rotation.y += -2;
NomeDosPlanetas["MARTE"].rotation.y += 3


//luz 
const amb = new THREE.AmbientLight(0x505050)

scene.add(amb);
const PointLight = new THREE.PointLight(0xf0f0f0)
scene.add(PointLight)

const renderScene = new RenderPass(scene, camera)
const composer = new EffectComposer(render)
composer.addPass(renderScene)
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.4,
    0.3,
    0.2
)
composer.addPass(bloomPass)

function animate() {
    requestAnimationFrame(animate);
    console.log('1');

    ORBITA_terra_lua.rotation.y += 0.01;
    NomeDosPlanetas["MERCURI"].rotation.y += YearEarth * 4.14
    NomeDosPlanetas["TERRA"].rotation.y += YearEarth;
    NomeDosPlanetas["VENUS"].rotation.y += YearEarth * 1.5
    NomeDosPlanetas["MARTE"].rotation.y += YearEarth * 0.53
    NomeDosPlanetas["JUPT"].rotation.y += YearEarth * 0.08
    NomeDosPlanetas["SAT"].rotation.y += YearEarth * 0.043
    NomeDosPlanetas["URA"].rotation.y += YearEarth * 0.0117
    NomeDosPlanetas["NET"].rotation.y += YearEarth * 0.006

    Sol.rotation.y += 0.01
    Mercu.rotation.y += 0.03
    Venus.rotation.y += 0.04
    lua.rotation.y += 0.01
    terra.rotation.y += 0.03
    Mars.rotation.y += 0.02
    jupt.rotation.y += 0.01
    sat.rotation.y += 0.001
    Uranu.rotation.y += 0.001
    Neptu.rotation.y += 0.003
    atmosfera.rotation.y += 0.01
    atmosfera.rotation.x += 0.02
    atmosfera.rotation.z += 0.03



    composer.render(scene, camera);
}
animate();
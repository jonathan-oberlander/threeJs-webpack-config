import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  BoxGeometry,
  MeshPhongMaterial,
  DoubleSide,
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
  AmbientLight,
  PointLight,
  SpotLight,
  PlaneGeometry,
  Object3D,
  Group,
  Vector3,
  Raycaster,
} from "three";
import { createRandomCube, createSphere, randomColor } from "./utils";

// ----------------------------------------------------------------
let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let light: AmbientLight;
let pointLight: PointLight;
let pointLight2: PointLight;
let cube: Mesh;
let sphere: Mesh;
let sphere2: Mesh;

let spotlight1: SpotLight;
let spotlight2: SpotLight;
let target1: Object3D;
let target2: Object3D;
let plane: Mesh;

let group: Group;

let raycast: Raycaster;
let mouse: Vector3;

// ----------------------------------------------------------------

const W = window.innerWidth;
const H = window.innerHeight;

(function init() {
  scene = new Scene();
  scene.background = new Color(0x000000);

  camera = new PerspectiveCamera(55, W / H, 1, 1000);
  camera.position.set(0, 7, 40);

  raycast = new Raycaster();
  mouse = new Vector3();

  // create the renderer
  renderer = new WebGLRenderer();
  renderer.setSize(W, H);
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  document.body.appendChild(renderer.domElement);

  // const axesHelper = new AxesHelper(5);
  // scene.add(axesHelper);

  createMagicCube();
  createRandomScene();
  mainLoop();
})();

// ----------------------------------------------------------------

let theta = 0;
let ADD = 0.05;

function mainLoop() {
  theta += ADD;

  // aniimate objects
  // updateIntersect();
  animateMagicCube();
  animateRandomScene();
  updateCamera();

  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
}

// ----------------------------------------------------------------
function createMagicCube() {
  const boxGeometry = new BoxGeometry(2, 2, 2);
  const cubeMaterial = new MeshPhongMaterial({
    color: 0xbd9b16,
    shininess: 10,
    transparent: true,
    opacity: 0.8,
    side: DoubleSide,
  });
  cube = new Mesh(boxGeometry, cubeMaterial);
  cube.position.set(0, 0, 0);
  cube.rotation.x = 0.7;
  cube.rotation.y = 0.7;

  const shpereGeometry = new SphereGeometry(0.1, 30, 30);
  const sphereMaterial = new MeshBasicMaterial({
    color: 0xffffff,
  });

  sphere = new Mesh(shpereGeometry, sphereMaterial);
  sphere2 = new Mesh(shpereGeometry, sphereMaterial);

  group = new Group();
  pointLight = new PointLight(0xffffff, 2, 20, 3);
  pointLight2 = new PointLight(0xffffff, 2, 20, 3);
  group.add(cube, sphere, sphere2, pointLight, pointLight2);
  group.position.set(0, 10, 0);
  scene.add(group);
}

function animateMagicCube() {
  pointLight.position.x = 7 * Math.sin(theta);
  pointLight.position.z = 7 * Math.cos(theta);
  sphere.position.x = pointLight.position.x;
  sphere.position.z = pointLight.position.z;

  pointLight2.position.y = -8 * Math.sin(theta * 0.5);
  pointLight2.position.z = -8 * Math.cos(theta * 0.5);
  sphere2.position.y = pointLight2.position.y;
  sphere2.position.z = pointLight2.position.z;
}

// ----------------------------------------------------------------
function createRandomScene() {
  light = new AmbientLight(0xffffff);
  // scene.add(light);

  spotlight1 = new SpotLight(0xffffff, 1, 200, Math.PI / 10, 0.05, 2);
  spotlight1.position.set(15, 20, 10);
  target1 = new Object3D();
  target1.position.set(20, 0, 0);
  spotlight1.target = target1;
  scene.add(spotlight1, target1);

  spotlight2 = new SpotLight(0xffffff, 1, 200, Math.PI / 10, 0.05, 2);
  spotlight2.position.set(-15, 20, 10);
  target2 = new Object3D();
  target2.position.set(-10, 0, 0);
  spotlight2.target = target2;
  scene.add(spotlight2, target2);

  const planeGeometry = new PlaneGeometry(200, 200, 32);
  const planeMaterial = new MeshPhongMaterial({
    color: 0xad8b06,
    side: DoubleSide,
    emissive: randomColor(),
    emissiveIntensity: 0.2,
  });
  plane = new Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = Math.PI / 2;
  plane.position.y = -4;
  scene.add(plane);

  for (let i = 0; i < 10; i++) {
    scene.add(createRandomCube());
  }
}

function animateRandomScene() {
  target1.position.x = Math.sin(theta * -0.15) * 10;
  target2.position.x = Math.sin(theta * 0.2) * 12;
}

function updateCamera() {
  camera.position.x = mouse.x * 20;
  camera.position.z = mouse.y * 20;
  camera.fov = (-mouse.y + 1) * 30 + 50;
  camera.lookAt(new Vector3(0, 10, 0));
  camera.updateProjectionMatrix();
}

// function updateIntersect() {
//   const intersections = raycast.intersectObjects(scene.children);
//   intersections.forEach((intersection) => {
//     console.log(intersection.object);
//   });
// }

// ----------------------------------------------------------------
window.addEventListener("mousemove", function move(evt) {
  mouse.x = (evt.clientX / W) * 2 - 1;
  mouse.y = -(evt.clientY / H) * 2 + 1;
  mouse.z = 1;
});

window.addEventListener("click", function click() {
  raycast.setFromCamera(mouse, camera);
  // raycast.intersectObjects(scene.children).forEach(({ object }: any) => {
  //   console.log(object.material.color);
  //   object.material.color.set(randomColor());
  // });
  // const intersections = raycast.intersectObjects(scene.children);

  // console.log(intersections);
  // const firstObj = intersections[0].object;

  // if (firstObj.type === "Mesh") {
  //   firstObj.material.color.set(randomColor());
  // }

  const s = createSphere(raycast.ray.at(10, new Vector3()));
  scene.add(s);
});

// window.addEventListener('wheel', (evt) => {
//   light.intensity += evt.deltaY * 0.01
// })

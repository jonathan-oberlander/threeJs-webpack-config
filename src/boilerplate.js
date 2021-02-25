// three.js boilerplate
// var container = document.querySelector("body"),
//   w = container.clientWidth,
//   h = container.clientHeight,
//   scene = new THREE.Scene(),
//   camera = new THREE.PerspectiveCamera(75, w / h, 0.001, 100),
//   controls = new THREE.MapControls(camera, container),
//   renderConfig = { antialias: true, alpha: true },
//   renderer = new THREE.WebGLRenderer(renderConfig);
// controls.panSpeed = 0.4;
// camera.position.set(0, 0, -10);
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(w, h);
// container.appendChild(renderer.domElement);

// window.addEventListener("resize", function () {
//   w = container.clientWidth;
//   h = container.clientHeight;
//   camera.aspect = w / h;
//   camera.updateProjectionMatrix();
//   renderer.setSize(w, h);
// });

// function render() {
//   requestAnimationFrame(render);
//   renderer.render(scene, camera);
//   controls.update();
// }

// // draw some geometries
// var geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// var material = new THREE.MeshNormalMaterial({ color: 0xffff00 });
// var torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

// convert click coords to world space
// get the position of a canvas event in world coords
// function getWorldCoords(e) {
//   // get x,y coords into canvas where click occurred
//   var rect = canvas.getBoundingClientRect(),
//       x = e.clientX - rect.left,
//       y = e.clientY - rect.top;
//   // convert x,y to clip space; coords from top left, clockwise:
//   // (-1,1), (1,1), (-1,-1), (1, -1)
//   var mouse = new THREE.Vector3();
//   mouse.x = ( (x / canvas.clientWidth ) * 2) - 1;
//   mouse.y = (-(y / canvas.clientHeight) * 2) + 1;
//   mouse.z = 0.0; // set to z position of mesh objects
//   // reverse projection from 3D to screen
//   mouse.unproject(camera);
//   // convert from point to a direction
//   mouse.sub(camera.position).normalize();
//   // scale the projected ray
//   var distance = -camera.position.z / mouse.z,
//       scaled = mouse.multiplyScalar(distance),
//       coords = camera.position.clone().add(scaled);
//   console.log(mouse, coords.x, coords.y, coords.z);
// }

// var canvas = renderer.domElement;
// canvas.addEventListener('click', getWorldCoords);

// render();

// html,
// body {
//   width: 100%;
//   height: 100%;
//   background: #000;
// }
// body {
//   margin: 0;
//   overflow: hidden;
// }
// canvas {
//   width: 100%;
//   height: 100%;
// }
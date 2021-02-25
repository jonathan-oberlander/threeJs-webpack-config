import {
  BoxGeometry,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  Vector3,
} from "three";

export function randomInRange(from: number, to: number) {
  const n = Math.random() * (to - from);
  return n + from;
}

export function randomColor() {
  return Math.random() * 0xff00ff;
}

export function createRandomCube() {
  const w = randomInRange(1, 5);
  const h = randomInRange(1, 5);
  const d = randomInRange(1, 5);
  const geometry = new BoxGeometry(w, h, d);
  const material = new MeshPhongMaterial({
    color: randomColor(),
  });
  const cube = new Mesh(geometry, material);
  cube.position.set(
    randomInRange(-20, 20),
    randomInRange(0, 10),
    randomInRange(-20, 20)
  );
  return cube;
}

export function createSphere(v: Vector3) {
  const geometry = new SphereGeometry(0.2, 30, 30);
  const material = new MeshPhongMaterial({
    color: randomColor(),
  });
  const sphere = new Mesh(geometry, material);
  sphere.position.set(v.x, v.y, v.z);
  return sphere;
}

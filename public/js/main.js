// js/main.js
import { generateBagFromSVG, analyzeImage } from './bag_generator.js';

document.addEventListener('DOMContentLoaded', () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Analyze an image
  // const image = new Image();
  // image.src = 'images/designs/tote.png';
  // image.onload = () => {
  //   const patternPieces = analyzeImage(image);
  //   console.log(patternPieces);
  // };

  // Generate a bag from an SVG
  generateBagFromSVG('svg/tote_front_path.svg')
    .then(bag => {
      scene.add(bag);
    });

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }

  animate();
});

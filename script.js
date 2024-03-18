
import * as THREE from './node_modules/three/build/three.module.js';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

const size = 10;
const aspectRatio = width / height;
const camera = new THREE.OrthographicCamera(
    -size * aspectRatio,
    size * aspectRatio,
    size,
    -size,
    1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

let playerPosition = new THREE.Vector3(0, 0, 0);
let blueCubePosition = new THREE.Vector3(Math.floor(Math.random() * size), 0, Math.floor(Math.random() * size));

const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const playerCube = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(playerCube);

const blueCubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const blueCubeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const blueCube = new THREE.Mesh(blueCubeGeometry, blueCubeMaterial);
blueCube.position.copy(blueCubePosition);
scene.add(blueCube);

function movePlayer(direction) {
    switch (direction) {
        case 'up':
            playerPosition.z -= 1;
            break;
        case 'down':
            playerPosition.z += 1;
            break;
        case 'left':
            playerPosition.x -= 1;
            break;
        case 'right':
            playerPosition.x += 1;
            break;
    }
    playerCube.position.copy(playerPosition); // Mettre à jour la position du cube rouge
    camera.position.copy(playerPosition.clone().add(new THREE.Vector3(10, 10, 10)));
    camera.lookAt(playerPosition);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            movePlayer('up');
            break;
        case 'ArrowDown':
            movePlayer('down');
            break;
        case 'ArrowLeft':
            movePlayer('left');
            break;
        case 'ArrowRight':
            movePlayer('right');
            break;
    }
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
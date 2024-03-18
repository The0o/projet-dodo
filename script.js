
import * as THREE from './node_modules/three/build/three.module.js';

const scene = new THREE.Scene();

const width = window.innerWidth;
const height = window.innerHeight;

let score = 0;
let bestScore = 0
let started = false;
let gameEnded = false;

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

let timer = 5;
let timerInterval;

function updateTimer() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById("timer").innerHTML = formattedTime;
    if (timer === 0) {
        clearInterval(timerInterval);
        gameEnded = true;
        if (score > bestScore) {
            bestScore = score
        }
        document.getElementById("bestScore").innerHTML = "Votre meilleur score est de " + bestScore
        document.getElementById("gameOver").style.display = "block"
    }
    timer--;
}

export function restart() {
    timer = 5
    score = 0
    document.getElementById("gameOver").style.display = "none"
    document.getElementById("score").innerHTML = "0";
    document.getElementById("timer").innerHTML = "0:30";
    started = false;
    gameEnded = false;
    blueCubePosition.set(Math.floor(Math.random() * size), 0, Math.floor(Math.random() * size));
    blueCube.position.copy(blueCubePosition);
}

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

    if (playerCube.position.equals(blueCube.position)) {
        blueCubePosition.set(Math.floor(Math.random() * size), 0, Math.floor(Math.random() * size));
        blueCube.position.copy(blueCubePosition);
        score++;
        document.getElementById("score").innerHTML = score;
    }
}

document.addEventListener('keydown', (event) => {
    if (!gameEnded) {
        switch (event.key) {
            case 'ArrowUp':
                if (!started) {
                    started = true;
                    timerInterval = setInterval(() => {
                        updateTimer();
                    }, 1000);
                }
                movePlayer('up');
                break;
            case 'ArrowDown':
                if (!started) {
                    started = true;
                    timerInterval = setInterval(() => {
                        updateTimer();
                    }, 1000);
                }
                movePlayer('down');
                break;
            case 'ArrowLeft':
                if (!started) {
                    started = true;
                    timerInterval = setInterval(() => {
                        updateTimer();
                    }, 1000);
                }
                movePlayer('left');
                break;
            case 'ArrowRight':
                if (!started) {
                    started = true;
                    timerInterval = setInterval(() => {
                        updateTimer();
                    }, 1000);
                }
                movePlayer('right');
                break;
        }
    }
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
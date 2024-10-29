const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const particlesCount = 1000;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    colors[i * 3] = Math.random();
    colors[i * 3 + 1] = Math.random();
    colors[i * 3 + 2] = Math.random();
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleMaterial = new THREE.PointsMaterial({ size: 0.1, vertexColors: true });
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

camera.position.z = 5;

const animate = () => {
    requestAnimationFrame(animate);
    particleSystem.rotation.x += 0.001;
    particleSystem.rotation.y += 0.001;
    renderer.render(scene, camera);
};

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

const scratchArea = document.querySelector('.scratch-area');
const scratchText = document.querySelectorAll('.scratch-text span');

const revealLetters = (e) => {
    const rect = scratchArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    scratchText.forEach((letter) => {
        const letterRect = letter.getBoundingClientRect();
        const letterX = letterRect.left - rect.left;
        const letterY = letterRect.top - rect.top;

        if (
            x > letterX &&
            x < letterX + letterRect.width &&
            y > letterY &&
            y < letterY + letterRect.height
        ) {
            letter.style.color = 'white';
        }
    });
};

scratchArea.addEventListener('mousemove', revealLetters);
scratchArea.addEventListener('touchmove', (e) => {
    e.preventDefault();
    revealLetters(e.touches[0]);
});

animate();

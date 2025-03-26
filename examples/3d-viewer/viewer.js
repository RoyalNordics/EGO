// EGO Custom Bags - 3D Viewer Example

// Main viewer class
class BagViewer {
    constructor() {
        // DOM elements
        this.canvas = document.getElementById('3d-viewer');
        this.loadingIndicator = document.getElementById('loading-indicator');
        
        // Three.js components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.loader = null;
        
        // Model references
        this.currentModel = null;
        this.bagMesh = null;
        this.hardwareMeshes = [];
        
        // State
        this.isRotating = false;
        this.currentBagType = 'tote';
        this.currentMaterial = 'leather';
        this.currentColor = '#000000';
        this.currentHardware = 'gold';
        
        // Materials
        this.materials = {
            leather: null,
            suede: null,
            canvas: null,
            'vegan-leather': null
        };
        
        // Hardware materials
        this.hardwareMaterials = {
            gold: null,
            silver: null,
            black: null
        };
        
        // Camera positions for different views
        this.cameraViews = {
            front: { x: 0, y: 0, z: 5 },
            back: { x: 0, y: 0, z: -5 },
            left: { x: -5, y: 0, z: 0 },
            right: { x: 5, y: 0, z: 0 },
            top: { x: 0, y: 5, z: 0 }
        };
        
        // Initialize the viewer
        this.init();
    }
    
    // Initialize the Three.js scene
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf8f8f8);
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            45,
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 5);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        
        // Create controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        
        // Create loader
        this.loader = new THREE.GLTFLoader();
        
        // Add lights
        this.setupLights();
        
        // Create materials
        this.createMaterials();
        
        // Load initial model
        this.loadModel(this.currentBagType);
        
        // Add event listeners
        this.setupEventListeners();
        
        // Start animation loop
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    // Set up scene lighting
    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Main directional light
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 5, 5);
        mainLight.castShadow = true;
        this.scene.add(mainLight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-5, 0, -5);
        this.scene.add(fillLight);
        
        // Top light
        const topLight = new THREE.DirectionalLight(0xffffff, 0.3);
        topLight.position.set(0, 5, 0);
        this.scene.add(topLight);
    }
    
    // Create materials for different bag types
    createMaterials() {
        // Leather material
        this.materials.leather = new THREE.MeshStandardMaterial({
            color: this.currentColor,
            roughness: 0.5,
            metalness: 0.1,
            side: THREE.DoubleSide
        });
        
        // Suede material
        this.materials.suede = new THREE.MeshStandardMaterial({
            color: this.currentColor,
            roughness: 0.8,
            metalness: 0.0,
            side: THREE.DoubleSide
        });
        
        // Canvas material
        this.materials.canvas = new THREE.MeshStandardMaterial({
            color: this.currentColor,
            roughness: 0.7,
            metalness: 0.0,
            side: THREE.DoubleSide
        });
        
        // Vegan leather material
        this.materials['vegan-leather'] = new THREE.MeshStandardMaterial({
            color: this.currentColor,
            roughness: 0.4,
            metalness: 0.2,
            side: THREE.DoubleSide
        });
        
        // Hardware materials
        this.hardwareMaterials.gold = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            roughness: 0.1,
            metalness: 0.9
        });
        
        this.hardwareMaterials.silver = new THREE.MeshStandardMaterial({
            color: 0xc0c0c0,
            roughness: 0.1,
            metalness: 0.9
        });
        
        this.hardwareMaterials.black = new THREE.MeshStandardMaterial({
            color: 0x111111,
            roughness: 0.3,
            metalness: 0.7
        });
    }
    
    // Load a 3D model
    loadModel(modelType) {
        this.showLoading(true);
        
        // In a real implementation, we would load actual models
        // For this example, we'll create a simple geometric shape
        
        // Remove existing model if any
        if (this.currentModel) {
            this.scene.remove(this.currentModel);
        }
        
        this.currentModel = new THREE.Group();
        
        // Create a placeholder bag mesh based on the selected type
        let geometry;
        
        switch (modelType) {
            case 'tote':
                geometry = new THREE.BoxGeometry(2, 2, 0.5);
                break;
            case 'crossbody':
                geometry = new THREE.BoxGeometry(1.5, 1, 0.4);
                break;
            case 'clutch':
                geometry = new THREE.BoxGeometry(1.8, 1, 0.2);
                break;
            case 'shoulder':
                geometry = new THREE.BoxGeometry(2, 1.5, 0.6);
                break;
            case 'backpack':
                geometry = new THREE.BoxGeometry(1.5, 2, 0.8);
                break;
            default:
                geometry = new THREE.BoxGeometry(2, 2, 0.5);
        }
        
        // Create the bag mesh with the current material
        this.bagMesh = new THREE.Mesh(geometry, this.materials[this.currentMaterial]);
        this.bagMesh.castShadow = true;
        this.bagMesh.receiveShadow = true;
        this.currentModel.add(this.bagMesh);
        
        // Add hardware based on bag type
        this.addHardware(modelType);
        
        // Add the model to the scene
        this.scene.add(this.currentModel);
        
        // Reset camera position
        this.resetView();
        
        // Hide loading indicator
        setTimeout(() => {
            this.showLoading(false);
        }, 500);
    }
    
    // Add hardware to the bag model
    addHardware(modelType) {
        // Clear existing hardware
        this.hardwareMeshes.forEach(mesh => {
            this.currentModel.remove(mesh);
        });
        this.hardwareMeshes = [];
        
        // Add hardware based on bag type
        switch (modelType) {
            case 'tote':
                // Add handles
                this.addToteHandles();
                break;
            case 'crossbody':
                // Add strap and clasp
                this.addCrossbodyHardware();
                break;
            case 'clutch':
                // Add clasp
                this.addClutchHardware();
                break;
            case 'shoulder':
                // Add handles and strap
                this.addShoulderHardware();
                break;
            case 'backpack':
                // Add straps and top handle
                this.addBackpackHardware();
                break;
        }
        
        // Apply current hardware material to all hardware meshes
        this.updateHardwareMaterial();
    }
    
    // Add tote bag handles
    addToteHandles() {
        // Left handle
        const leftHandleGeom = new THREE.TorusGeometry(0.3, 0.05, 16, 32, Math.PI);
        const leftHandle = new THREE.Mesh(leftHandleGeom, this.hardwareMaterials[this.currentHardware]);
        leftHandle.position.set(-0.5, 1.1, 0);
        leftHandle.rotation.set(0, 0, Math.PI);
        leftHandle.castShadow = true;
        this.currentModel.add(leftHandle);
        this.hardwareMeshes.push(leftHandle);
        
        // Right handle
        const rightHandleGeom = new THREE.TorusGeometry(0.3, 0.05, 16, 32, Math.PI);
        const rightHandle = new THREE.Mesh(rightHandleGeom, this.hardwareMaterials[this.currentHardware]);
        rightHandle.position.set(0.5, 1.1, 0);
        rightHandle.rotation.set(0, 0, Math.PI);
        rightHandle.castShadow = true;
        this.currentModel.add(rightHandle);
        this.hardwareMeshes.push(rightHandle);
    }
    
    // Add crossbody bag hardware
    addCrossbodyHardware() {
        // Strap
        const strapGeom = new THREE.BoxGeometry(0.1, 3, 0.05);
        const strap = new THREE.Mesh(strapGeom, this.materials[this.currentMaterial]);
        strap.position.set(0.7, 0, 0);
        strap.castShadow = true;
        this.currentModel.add(strap);
        
        // Clasp
        const claspGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 16);
        const clasp = new THREE.Mesh(claspGeom, this.hardwareMaterials[this.currentHardware]);
        clasp.position.set(0.7, 0.6, 0);
        clasp.rotation.set(Math.PI/2, 0, 0);
        clasp.castShadow = true;
        this.currentModel.add(clasp);
        this.hardwareMeshes.push(clasp);
    }
    
    // Add clutch bag hardware
    addClutchHardware() {
        // Clasp
        const claspGeom = new THREE.BoxGeometry(0.3, 0.1, 0.1);
        const clasp = new THREE.Mesh(claspGeom, this.hardwareMaterials[this.currentHardware]);
        clasp.position.set(0, 0.45, 0.15);
        clasp.castShadow = true;
        this.currentModel.add(clasp);
        this.hardwareMeshes.push(clasp);
    }
    
    // Add shoulder bag hardware
    addShoulderHardware() {
        // Handle
        const handleGeom = new THREE.TorusGeometry(0.4, 0.05, 16, 32, Math.PI);
        const handle = new THREE.Mesh(handleGeom, this.hardwareMaterials[this.currentHardware]);
        handle.position.set(0, 0.8, 0);
        handle.rotation.set(0, 0, Math.PI);
        handle.castShadow = true;
        this.currentModel.add(handle);
        this.hardwareMeshes.push(handle);
        
        // Clasps
        const leftClaspGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 16);
        const leftClasp = new THREE.Mesh(leftClaspGeom, this.hardwareMaterials[this.currentHardware]);
        leftClasp.position.set(-0.8, 0.5, 0);
        leftClasp.rotation.set(Math.PI/2, 0, 0);
        leftClasp.castShadow = true;
        this.currentModel.add(leftClasp);
        this.hardwareMeshes.push(leftClasp);
        
        const rightClaspGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 16);
        const rightClasp = new THREE.Mesh(rightClaspGeom, this.hardwareMaterials[this.currentHardware]);
        rightClasp.position.set(0.8, 0.5, 0);
        rightClasp.rotation.set(Math.PI/2, 0, 0);
        rightClasp.castShadow = true;
        this.currentModel.add(rightClasp);
        this.hardwareMeshes.push(rightClasp);
    }
    
    // Add backpack hardware
    addBackpackHardware() {
        // Top handle
        const handleGeom = new THREE.TorusGeometry(0.2, 0.04, 16, 32, Math.PI);
        const handle = new THREE.Mesh(handleGeom, this.hardwareMaterials[this.currentHardware]);
        handle.position.set(0, 1.1, 0);
        handle.rotation.set(0, 0, Math.PI);
        handle.castShadow = true;
        this.currentModel.add(handle);
        this.hardwareMeshes.push(handle);
        
        // Straps
        const leftStrapGeom = new THREE.BoxGeometry(0.3, 2, 0.05);
        const leftStrap = new THREE.Mesh(leftStrapGeom, this.materials[this.currentMaterial]);
        leftStrap.position.set(-0.5, -0.5, 0.4);
        leftStrap.castShadow = true;
        this.currentModel.add(leftStrap);
        
        const rightStrapGeom = new THREE.BoxGeometry(0.3, 2, 0.05);
        const rightStrap = new THREE.Mesh(rightStrapGeom, this.materials[this.currentMaterial]);
        rightStrap.position.set(0.5, -0.5, 0.4);
        rightStrap.castShadow = true;
        this.currentModel.add(rightStrap);
        
        // Buckles
        const leftBuckleGeom = new THREE.BoxGeometry(0.15, 0.1, 0.1);
        const leftBuckle = new THREE.Mesh(leftBuckleGeom, this.hardwareMaterials[this.currentHardware]);
        leftBuckle.position.set(-0.5, 0.2, 0.45);
        leftBuckle.castShadow = true;
        this.currentModel.add(leftBuckle);
        this.hardwareMeshes.push(leftBuckle);
        
        const rightBuckleGeom = new THREE.BoxGeometry(0.15, 0.1, 0.1);
        const rightBuckle = new THREE.Mesh(rightBuckleGeom, this.hardwareMaterials[this.currentHardware]);
        rightBuckle.position.set(0.5, 0.2, 0.45);
        rightBuckle.castShadow = true;
        this.currentModel.add(rightBuckle);
        this.hardwareMeshes.push(rightBuckle);
    }
    
    // Update the bag material
    updateBagMaterial() {
        if (this.bagMesh) {
            this.bagMesh.material = this.materials[this.currentMaterial];
        }
    }
    
    // Update the hardware material
    updateHardwareMaterial() {
        this.hardwareMeshes.forEach(mesh => {
            mesh.material = this.hardwareMaterials[this.currentHardware];
        });
    }
    
    // Update the bag color
    updateBagColor(color) {
        this.currentColor = color;
        
        // Update all material colors
        Object.values(this.materials).forEach(material => {
            material.color.set(color);
        });
    }
    
    // Reset camera view
    resetView() {
        this.camera.position.set(0, 0, 5);
        this.camera.lookAt(0, 0, 0);
        this.controls.reset();
    }
    
    // Set camera to a specific view
    setCameraView(viewName) {
        const view = this.cameraViews[viewName];
        if (view) {
            this.camera.position.set(view.x, view.y, view.z);
            this.camera.lookAt(0, 0, 0);
            this.controls.update();
        }
    }
    
    // Toggle model rotation
    toggleRotation() {
        this.isRotating = !this.isRotating;
    }
    
    // Show/hide loading indicator
    showLoading(show) {
        this.loadingIndicator.style.display = show ? 'block' : 'none';
    }
    
    // Handle window resize
    onWindowResize() {
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }
    
    // Animation loop
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update controls
        this.controls.update();
        
        // Rotate model if enabled
        if (this.isRotating && this.currentModel) {
            this.currentModel.rotation.y += 0.01;
        }
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
    
    // Set up event listeners
    setupEventListeners() {
        // Bag type selection
        document.getElementById('bag-type').addEventListener('change', (e) => {
            this.currentBagType = e.target.value;
            this.loadModel(this.currentBagType);
        });
        
        // Material selection
        document.getElementById('material-type').addEventListener('change', (e) => {
            this.currentMaterial = e.target.value;
            this.updateBagMaterial();
        });
        
        // Color selection
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', (e) => {
                // Remove selected class from all options
                document.querySelectorAll('.color-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                e.target.classList.add('selected');
                
                // Update color
                const color = e.target.getAttribute('data-color');
                this.updateBagColor(color);
            });
        });
        
        // Hardware selection
        document.getElementById('hardware-type').addEventListener('change', (e) => {
            this.currentHardware = e.target.value;
            this.updateHardwareMaterial();
        });
        
        // View controls
        document.getElementById('reset-view').addEventListener('click', () => {
            this.resetView();
        });
        
        document.getElementById('toggle-rotation').addEventListener('click', () => {
            this.toggleRotation();
        });
        
        // View buttons
        document.querySelectorAll('.view-buttons button').forEach(button => {
            button.addEventListener('click', (e) => {
                const view = e.target.getAttribute('data-view');
                this.setCameraView(view);
            });
        });
    }
}

// Initialize the viewer when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const viewer = new BagViewer();
});

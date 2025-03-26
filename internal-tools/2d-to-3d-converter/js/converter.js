// EGO - 2D to 3D Bag Pattern Converter

// Main class for the converter application
class PatternConverter {
    constructor() {
        // DOM elements
        this.svgContainer = document.getElementById('svg-container');
        this.modelContainer = document.getElementById('model-container');
        this.patternList = document.getElementById('pattern-list');
        this.measurementsPanel = document.getElementById('measurements-panel');
        this.piecesPanel = document.getElementById('pieces-panel');
        this.statusBar = document.querySelector('.status-bar');
        
        // Button elements
        this.importSvgBtn = document.getElementById('import-svg');
        this.newProjectBtn = document.getElementById('new-project');
        this.saveProjectBtn = document.getElementById('save-project');
        this.exportModelBtn = document.getElementById('export-model');
        
        // Three.js components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        
        // SVG.js components
        this.svgDraw = null;
        
        // Application state
        this.currentProject = {
            name: 'Untitled Project',
            patterns: [],
            measurements: [],
            pieces: []
        };
        
        // Initialize the application
        this.init();
    }
    
    // Initialize the application
    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize 3D viewer
        this.setup3DViewer();
        
        // Initialize SVG viewer
        this.setupSVGViewer();
        
        // Update status
        this.updateStatus('Ready');
    }
    
    // Set up event listeners
    setupEventListeners() {
        // Import SVG button
        this.importSvgBtn.addEventListener('click', () => {
            this.importSVG();
        });
        
        // New project button
        this.newProjectBtn.addEventListener('click', () => {
            this.newProject();
        });
        
        // Save project button
        this.saveProjectBtn.addEventListener('click', () => {
            this.saveProject();
        });
        
        // Export model button
        this.exportModelBtn.addEventListener('click', () => {
            this.exportModel();
        });
    }
    
    // Set up the 3D viewer
    setup3DViewer() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.modelContainer.clientWidth / this.modelContainer.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.modelContainer.clientWidth, this.modelContainer.clientHeight);
        
        // Clear placeholder and add renderer
        this.modelContainer.innerHTML = '';
        this.modelContainer.appendChild(this.renderer.domElement);
        
        // Add orbit controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        
        // Add grid helper
        const gridHelper = new THREE.GridHelper(10, 10);
        this.scene.add(gridHelper);
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        // Start animation loop
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    // Set up the SVG viewer
    setupSVGViewer() {
        // Clear placeholder
        this.svgContainer.innerHTML = '';
        
        // Create SVG.js drawing
        this.svgDraw = SVG().addTo(this.svgContainer).size('100%', '100%');
        
        // Add a message
        this.svgDraw.text('Import an SVG pattern to begin').move(20, 20);
    }
    
    // Animation loop for 3D viewer
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update controls
        this.controls.update();
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
    
    // Handle window resize
    onWindowResize() {
        // Update camera
        this.camera.aspect = this.modelContainer.clientWidth / this.modelContainer.clientHeight;
        this.camera.updateProjectionMatrix();
        
        // Update renderer
        this.renderer.setSize(this.modelContainer.clientWidth, this.modelContainer.clientHeight);
    }
    
    // Import SVG file
    importSVG() {
        // This is a placeholder for the actual implementation
        // In a real implementation, we would use a file input or drag-and-drop
        
        // For now, we'll simulate loading an SVG
        this.updateStatus('Loading SVG...');
        
        // Clear the SVG container
        this.svgDraw.clear();
        
        // Create a sample rectangle
        const rect = this.svgDraw.rect(200, 100).fill('#4a90e2').move(50, 50);
        
        // Add the pattern to the list
        this.addPatternToList('Sample Pattern');
        
        // Generate a sample 3D model
        this.generateSample3DModel();
        
        // Update status
        this.updateStatus('SVG loaded');
    }
    
    // Add a pattern to the list
    addPatternToList(name) {
        // Clear the "No patterns loaded" message
        this.patternList.innerHTML = '';
        
        // Create a pattern item
        const patternItem = document.createElement('div');
        patternItem.className = 'piece-item';
        patternItem.textContent = name;
        
        // Add to the list
        this.patternList.appendChild(patternItem);
        
        // Add to the current project
        this.currentProject.patterns.push({
            name: name,
            svg: this.svgDraw.svg()
        });
        
        // Add sample pieces
        this.addSamplePieces();
        
        // Add sample measurements
        this.addSampleMeasurements();
    }
    
    // Add sample pieces to the pieces panel
    addSamplePieces() {
        // Clear the "No pattern pieces available" message
        this.piecesPanel.innerHTML = '';
        
        // Sample pieces
        const pieces = ['Front Panel', 'Back Panel', 'Side Panel', 'Bottom'];
        
        // Create piece items
        pieces.forEach(piece => {
            const pieceItem = document.createElement('div');
            pieceItem.className = 'piece-item';
            pieceItem.textContent = piece;
            
            // Add click event
            pieceItem.addEventListener('click', () => {
                // Toggle selected class
                document.querySelectorAll('.piece-item').forEach(item => {
                    item.classList.remove('selected');
                });
                pieceItem.classList.add('selected');
                
                // Update status
                this.updateStatus(`Selected piece: ${piece}`);
            });
            
            // Add to the panel
            this.piecesPanel.appendChild(pieceItem);
            
            // Add to the current project
            this.currentProject.pieces.push({
                name: piece,
                selected: false
            });
        });
    }
    
    // Add sample measurements to the measurements panel
    addSampleMeasurements() {
        // Clear the "No measurements available" message
        this.measurementsPanel.innerHTML = '';
        
        // Sample measurements
        const measurements = [
            { name: 'Width', value: '30', unit: 'cm' },
            { name: 'Height', value: '20', unit: 'cm' },
            { name: 'Depth', value: '10', unit: 'cm' },
            { name: 'Handle Length', value: '40', unit: 'cm' }
        ];
        
        // Create measurement items
        measurements.forEach(measurement => {
            const measurementItem = document.createElement('div');
            measurementItem.className = 'measurement-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = measurement.name;
            
            const valueSpan = document.createElement('span');
            valueSpan.textContent = `${measurement.value} ${measurement.unit}`;
            
            measurementItem.appendChild(nameSpan);
            measurementItem.appendChild(valueSpan);
            
            // Add to the panel
            this.measurementsPanel.appendChild(measurementItem);
            
            // Add to the current project
            this.currentProject.measurements.push(measurement);
        });
    }
    
    // Generate a sample 3D model
    generateSample3DModel() {
        // Clear existing models
        this.scene.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
                this.scene.remove(child);
            }
        });
        
        // Create a simple box geometry
        const geometry = new THREE.BoxGeometry(2, 1, 0.5);
        const material = new THREE.MeshStandardMaterial({
            color: 0x4a90e2,
            roughness: 0.7,
            metalness: 0.2
        });
        
        // Create mesh and add to scene
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
        
        // Reset camera position
        this.camera.position.set(0, 0, 3);
        this.controls.update();
    }
    
    // Create a new project
    newProject() {
        // Confirm with user
        if (confirm('Create a new project? Any unsaved changes will be lost.')) {
            // Reset current project
            this.currentProject = {
                name: 'Untitled Project',
                patterns: [],
                measurements: [],
                pieces: []
            };
            
            // Clear SVG viewer
            this.svgDraw.clear();
            this.svgDraw.text('Import an SVG pattern to begin').move(20, 20);
            
            // Clear pattern list
            this.patternList.innerHTML = '<p>No patterns loaded</p>';
            
            // Clear measurements panel
            this.measurementsPanel.innerHTML = '<p>No measurements available</p>';
            
            // Clear pieces panel
            this.piecesPanel.innerHTML = '<p>No pattern pieces available</p>';
            
            // Clear 3D scene
            this.scene.children.forEach(child => {
                if (child instanceof THREE.Mesh) {
                    this.scene.remove(child);
                }
            });
            
            // Update status
            this.updateStatus('New project created');
        }
    }
    
    // Save the current project
    saveProject() {
        // This is a placeholder for the actual implementation
        // In a real implementation, we would save to a file or database
        
        // For now, we'll just show an alert
        alert(`Project "${this.currentProject.name}" saved (placeholder)`);
        
        // Update status
        this.updateStatus('Project saved');
    }
    
    // Export the 3D model
    exportModel() {
        // This is a placeholder for the actual implementation
        // In a real implementation, we would export to a 3D file format
        
        // For now, we'll just show an alert
        alert('3D model exported (placeholder)');
        
        // Update status
        this.updateStatus('Model exported');
    }
    
    // Update the status bar
    updateStatus(message) {
        this.statusBar.textContent = message;
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const converter = new PatternConverter();
});

// Export the PatternConverter class
export { PatternConverter };

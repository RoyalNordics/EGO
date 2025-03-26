// EGO - 2D to 3D Bag Pattern Converter

import { ImageAnalyzer } from './image-analyzer.js';

// Main class for the converter application
class PatternConverter {
    constructor() {
        // DOM elements
        this.svgContainer = document.getElementById('svg-container');
        this.modelContainer = document.getElementById('model-container');
        this.patternList = document.getElementById('pattern-list');
        this.measurementsPanel = document.getElementById('measurements-panel');
        this.widthInput = document.getElementById('width');
        this.heightInput = document.getElementById('height');
        this.depthInput = document.getElementById('depth');
        this.handleLengthInput = document.getElementById('handleLength');
        this.piecesPanel = document.getElementById('pieces-panel');
        this.statusBar = document.querySelector('.status-bar');
        
        // Button elements
        this.importSvgBtn = document.getElementById('import-svg');
        this.svgFile = document.getElementById('svg-file');
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

        // Image analyzer
        this.imageAnalyzer = new ImageAnalyzer();
        
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

        // Update 3D model when measurements change
        this.widthInput.addEventListener('change', () => this.generateSample3DModel());
        this.heightInput.addEventListener('change', () => this.generateSample3DModel());
        this.depthInput.addEventListener('change', () => this.generateSample3DModel());
        this.handleLengthInput.addEventListener('change', () => this.generateSample3DModel());
    }
    
    // Set up event listeners
    setupEventListeners() {
        // Import SVG button
        this.importSvgBtn.addEventListener('click', () => {
            this.svgFile.click();
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

        // SVG file input
        this.svgFile.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                this.loadSVG(file);
            }
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
    

    // Load SVG file
    loadSVG(file) {
        this.updateStatus('Loading file...');

        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target.result;

            // Clear the SVG container
            this.svgContainer.innerHTML = '';

            if (file.type === 'image/svg+xml') {
                // Create a new SVG.js drawing
                this.svgDraw = SVG().addTo(this.svgContainer).size('100%', '100%');
                this.svgDraw.svg(fileContent);
                this.analyzeImage(fileContent, file.type);
            } else if (file.type === 'image/png') {
                // Create an image element
                const img = new Image();
                img.onload = () => {
                    // Create a canvas element
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;

                    // Get the 2D rendering context
                    const ctx = canvas.getContext('2d');

                    // Draw the image on the canvas
                    ctx.drawImage(img, 0, 0, img.width, img.height);

                    // Append the canvas to the SVG container
                    this.svgContainer.appendChild(canvas);
                    this.analyzeImage(fileContent, file.type);
                };
                img.src = fileContent;
            } else {
                alert('Unsupported file type');
                return;
            }

            // Add the pattern to the list
            this.addPatternToList(file.name);

            // Generate a sample 3D model
            this.generateSample3DModel();

            // Update status
            this.updateStatus('File loaded');
        };
        reader.readAsDataURL(file);
    }


    // Import SVG file
    importSVG() {
        this.svgFile.click();
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
        // Get the measurements from the input fields
        const width = parseFloat(this.widthInput.value);
        const height = parseFloat(this.heightInput.value);
        const depth = parseFloat(this.depthInput.value);

        // Clear existing models
        this.scene.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
                this.scene.remove(child);
            }
        });

        // Create a simple box geometry
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({
            color: 0x4a90e2,
            roughness: 0.7,
            metalness: 0.2
        });
        
        // Create mesh and add to scene
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
        // Reset camera position
        this.camera.position.set(0, 0, Math.max(width, height, depth) * 1.5);
        this.controls.update();
    }
    
    // Create a new project
    newProject() {
        // Confirm with user
        if (confirm('Create a new project? Any unsaved changes will be lost.')) {
            // Reset current project
            this.resetProject();
        }
    }

    resetProject() {
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
    
    analyzeImage(fileContent, fileType) {
        // Analyze the image
        console.log("Analyzing image:", fileContent, fileType);
        this.updateStatus('Image analyzed');
    }

    parseSVGPatternPieces(svg) {
        // TODO: Implement SVG pattern piece extraction
        console.log("Parsing SVG pattern pieces:", svg);
        return [];
    }

    extractMeasurements(svg) {
        // TODO: Implement measurement extraction
        console.log("Extracting measurements:", svg);
        return {};
    }

    createPatternPieceMesh(pathData, measurements) {
        // TODO: Implement 3D mesh creation
        console.log("Creating pattern piece mesh:", pathData, measurements);
        return null;
    }

    assemblePatternPieces(pieces) {
        // TODO: Implement pattern piece assembly
        console.log("Assembling pattern pieces:", pieces);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const converter = new PatternConverter();
});

// Export the PatternConverter class
export { PatternConverter };

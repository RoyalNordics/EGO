// EGO - 2D to 3D Bag Pattern Converter - Image Analyzer

import { PatternDetector } from './pattern-detector.js';
import { MeasurementExtractor } from './measurement-extractor.js';
import { SVGGenerator } from './svg-generator.js';

/**
 * ImageAnalyzer class
 * Core class responsible for orchestrating the image analysis process
 */
class ImageAnalyzer {
    /**
     * Constructor
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        this.options = {
            edgeDetectionThreshold: 50,
            contourMinArea: 1000,
            contourApproximation: true,
            pixelToMmRatio: 1,
            detectMeasurementLines: true,
            detectMeasurementText: false, // Disabled by default as it requires OCR
            ...options
        };
        
        // Initialize component classes
        this.patternDetector = new PatternDetector(this.options);
        this.measurementExtractor = new MeasurementExtractor(this.options);
        this.svgGenerator = new SVGGenerator(this.options);
        
        // Initialize OpenCV when available
        this.cvReady = false;
        this.initOpenCV();
    }
    
    /**
     * Initialize OpenCV
     * @returns {Promise} - Resolves when OpenCV is ready
     */
    async initOpenCV() {
        return new Promise((resolve) => {
            if (window.cv) {
                this.cvReady = true;
                resolve();
            } else {
                // OpenCV.js script loaded separately
                window.onOpenCvReady = () => {
                    this.cvReady = true;
                    resolve();
                };
            }
        });
    }
    
    /**
     * Analyze an image to detect pattern pieces and measurements
     * @param {HTMLCanvasElement|HTMLImageElement} imageData - Canvas or image element containing the image
     * @returns {Promise<Object>} - Analysis results including pattern pieces, measurements, and SVG
     */
    async analyzeImage(imageData) {
        console.log("Analyzing image:", imageData);
        
        // Ensure OpenCV is ready
        if (!this.cvReady) {
            console.log("Waiting for OpenCV to initialize...");
            try {
                await this.initOpenCV();
                console.log("OpenCV initialized");
            } catch (error) {
                console.error("Failed to initialize OpenCV:", error);
                throw new Error("Failed to initialize OpenCV. Please make sure the OpenCV.js script is loaded.");
            }
        }
        
        try {
            console.log("Creating OpenCV matrix from image data");
            // Create OpenCV matrix from image data
            const img = cv.imread(imageData);
            
            try {
                console.log("Detecting pattern pieces");
                // Detect pattern pieces
                const patternPieces = await this.patternDetector.detectPatterns(img);
                console.log("Detected pattern pieces:", patternPieces);
                
                console.log("Extracting measurements");
                // Extract measurements
                const measurements = await this.measurementExtractor.extractMeasurements(img, patternPieces);
                console.log("Extracted measurements:", measurements);
                
                console.log("Generating SVG");
                // Generate SVG
                const svg = this.svgGenerator.generateSVG(patternPieces, measurements);
                console.log("Generated SVG");
                
                // Return the results
                return {
                    patternPieces,
                    measurements,
                    svg
                };
            } finally {
                // Clean up OpenCV resources
                img.delete();
            }
        } catch (error) {
            console.error("Error analyzing image:", error);
            throw error;
        }
    }
    
    /**
     * Set the pixel to mm ratio for accurate measurements
     * @param {number} ratio - The pixel to mm ratio
     */
    setPixelToMmRatio(ratio) {
        this.options.pixelToMmRatio = ratio;
        this.measurementExtractor.options.pixelToMmRatio = ratio;
    }
    
    /**
     * Set the scale from a reference object with known dimensions
     * @param {Object} referenceObject - Object with known dimensions
     * @returns {number} - The calculated ratio
     */
    setScaleFromReference(referenceObject) {
        const ratio = this.measurementExtractor.setScaleFromReference(referenceObject);
        this.options.pixelToMmRatio = ratio;
        return ratio;
    }
    
    /**
     * Update configuration options
     * @param {Object} options - New options to apply
     */
    updateOptions(options) {
        this.options = {
            ...this.options,
            ...options
        };
        
        // Update options in component classes
        this.patternDetector.options = {
            ...this.patternDetector.options,
            ...options
        };
        
        this.measurementExtractor.options = {
            ...this.measurementExtractor.options,
            ...options
        };
        
        this.svgGenerator.options = {
            ...this.svgGenerator.options,
            ...options
        };
    }
}

export { ImageAnalyzer };

// EGO - 2D to 3D Bag Pattern Converter - Pattern Detector

/**
 * PatternDetector class
 * Responsible for detecting pattern pieces in images using OpenCV.js
 */
class PatternDetector {
    /**
     * Constructor
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        this.options = {
            edgeDetectionThreshold: 50,
            contourMinArea: 1000,
            contourApproximation: true,
            ...options
        };
    }
    
    /**
     * Detect pattern pieces in an image
     * @param {cv.Mat} img - OpenCV image matrix
     * @returns {Promise<Array>} - Array of detected pattern pieces
     */
    async detectPatterns(img) {
        // Create working copies
        const gray = new cv.Mat();
        const edges = new cv.Mat();
        const hierarchy = new cv.Mat();
        const contours = new cv.MatVector();
        
        try {
            // Convert to grayscale
            cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY);
            
            // Apply Gaussian blur to reduce noise
            cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0);
            
            // Apply Canny edge detection
            cv.Canny(gray, edges, this.options.edgeDetectionThreshold, 
                     this.options.edgeDetectionThreshold * 2);
            
            // Find contours
            cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, 
                           cv.CHAIN_APPROX_SIMPLE);
            
            // Process contours
            const patternPieces = [];
            for (let i = 0; i < contours.size(); ++i) {
                const contour = contours.get(i);
                
                // Filter small contours
                const area = cv.contourArea(contour);
                if (area < this.options.contourMinArea) {
                    continue;
                }
                
                // Approximate contour to reduce complexity
                let approx = new cv.Mat();
                if (this.options.contourApproximation) {
                    const epsilon = 0.01 * cv.arcLength(contour, true);
                    cv.approxPolyDP(contour, approx, epsilon, true);
                } else {
                    approx = contour.clone();
                }
                
                // Convert to path data
                const points = [];
                for (let j = 0; j < approx.data32S.length; j += 2) {
                    points.push({
                        x: approx.data32S[j],
                        y: approx.data32S[j + 1]
                    });
                }
                
                // Create pattern piece object
                patternPieces.push({
                    id: `piece-${i}`,
                    name: `Pattern Piece ${i + 1}`,
                    type: 'panel',
                    points,
                    area,
                    boundingBox: cv.boundingRect(contour)
                });
                
                approx.delete();
            }
            
            return patternPieces;
        } finally {
            // Clean up resources
            gray.delete();
            edges.delete();
            hierarchy.delete();
            contours.delete();
        }
    }
    
    /**
     * Detect holes within pattern pieces
     * @param {cv.Mat} img - OpenCV image matrix
     * @param {Array} patternPieces - Array of detected pattern pieces
     * @returns {Array} - Updated pattern pieces with hole information
     */
    detectHoles(img, patternPieces) {
        for (const piece of patternPieces) {
            const mask = cv.Mat.zeros(img.rows, img.cols, cv.CV_8U);
            cv.drawContours(mask, [piece.contour], 0, new cv.Scalar(255), cv.FILLED);

            const hierarchy = new cv.Mat();
            const holeContours = new cv.MatVector();
            cv.findContours(mask, holeContours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

            for (let i = 0; i < holeContours.size(); ++i) {
                const holeContour = holeContours.get(i);
                const holeArea = cv.contourArea(holeContour);

                // Filter small holes
                if (holeArea > 100) {
                    piece.holes = piece.holes || [];
                    piece.holes.push({
                        points: this.getContourPoints(holeContour),
                        area: holeArea
                    });
                }
                holeContour.delete();
            }
            hierarchy.delete();
            holeContours.delete();
            mask.delete();
        }
        return patternPieces;
    }

    getContourPoints(contour) {
        const points = [];
        for (let j = 0; j < contour.data32S.length; j += 2) {
            points.push({
                x: contour.data32S[j],
                y: contour.data32S[j + 1]
            });
        }
        return points;
    }
    
    /**
     * Refine pattern piece detection
     * @param {cv.Mat} img - OpenCV image matrix
     * @param {Array} patternPieces - Array of detected pattern pieces
     * @returns {Array} - Refined pattern pieces
     */
    refinePatternPieces(img, patternPieces) {
        // TODO: Implement refinement techniques
        // This could include:
        // - Merging nearby pieces that should be one
        // - Splitting pieces that should be separate
        // - Smoothing contours
        return patternPieces;
    }
}

// Export the PatternDetector class
export { PatternDetector };

// EGO - 2D to 3D Bag Pattern Converter - SVG Generator

/**
 * SVGGenerator class
 * Responsible for generating SVG files from detected pattern pieces and measurements
 */
class SVGGenerator {
    /**
     * Constructor
     * @param {Object} options - Configuration options
     */
    constructor(options = {}) {
        this.options = {
            defaultFill: '#e6f2ff',
            defaultStroke: '#000000',
            defaultStrokeWidth: 2,
            measurementStroke: '#ff0000',
            measurementStrokeWidth: 1,
            measurementStrokeDasharray: '5,5',
            attachmentPointFill: '#ff9900',
            attachmentPointRadius: 5,
            stitchingStroke: '#0000ff',
            stitchingStrokeWidth: 1,
            stitchingStrokeDasharray: '3,3',
            ...options
        };
    }
    
    /**
     * Generate SVG from pattern pieces and measurements
     * @param {Array} patternPieces - Array of detected pattern pieces
     * @param {Array} measurements - Array of extracted measurements
     * @returns {string} - SVG content as a string
     */
    generateSVG(patternPieces, measurements) {
        // Create SVG document
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        
        // Set dimensions based on pattern pieces
        let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;
        for (const piece of patternPieces) {
            const { x, y, width, height } = piece.boundingBox;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x + width);
            maxY = Math.max(maxY, y + height);
        }
        
        // Add some padding
        const padding = 20;
        minX -= padding;
        minY -= padding;
        maxX += padding;
        maxY += padding;
        
        svg.setAttribute('width', maxX - minX);
        svg.setAttribute('height', maxY - minY);
        svg.setAttribute('viewBox', `${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
        
        // Add metadata
        const metadata = this.generateMetadata(patternPieces, measurements);
        svg.appendChild(metadata);
        
        // Add pattern pieces
        for (const piece of patternPieces) {
            const group = this.generatePatternPieceGroup(piece, measurements);
            svg.appendChild(group);
        }
        
        // Convert SVG element to string
        const serializer = new XMLSerializer();
        return serializer.serializeToString(svg);
    }
    
    /**
     * Generate metadata section for the SVG
     * @param {Array} patternPieces - Array of detected pattern pieces
     * @param {Array} measurements - Array of extracted measurements
     * @returns {Element} - Metadata element
     */
    generateMetadata(patternPieces, measurements) {
        const metadata = document.createElementNS('http://www.w3.org/2000/svg', 'metadata');
        const measurementsXml = document.createElementNS('http://www.egocustombags.com/measurements', 'ego:measurements');
        measurementsXml.setAttribute('xmlns:ego', 'http://www.egocustombags.com/measurements');
        
        // Group measurements by piece
        const measurementsByPiece = {};
        for (const measurement of measurements) {
            if (!measurementsByPiece[measurement.pieceId]) {
                measurementsByPiece[measurement.pieceId] = [];
            }
            measurementsByPiece[measurement.pieceId].push(measurement);
        }
        
        // Add measurements to metadata
        for (const piece of patternPieces) {
            const pieceMeasurements = measurementsByPiece[piece.id] || [];
            const pieceXml = document.createElementNS('http://www.egocustombags.com/measurements', 'ego:piece');
            pieceXml.setAttribute('name', piece.name);
            
            for (const measurement of pieceMeasurements) {
                const measurementXml = document.createElementNS('http://www.egocustombags.com/measurements', 'ego:measurement');
                measurementXml.setAttribute('name', measurement.name);
                measurementXml.setAttribute('value', measurement.value);
                measurementXml.setAttribute('unit', measurement.unit);
                pieceXml.appendChild(measurementXml);
            }
            
            measurementsXml.appendChild(pieceXml);
        }
        
        metadata.appendChild(measurementsXml);
        return metadata;
    }
    
    /**
     * Generate a group element for a pattern piece
     * @param {Object} piece - Pattern piece object
     * @param {Array} measurements - Array of measurements
     * @returns {Element} - Group element
     */
    generatePatternPieceGroup(piece, measurements) {
        // Create group for piece
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('id', piece.id);
        group.setAttribute('data-piece-type', piece.type);
        group.setAttribute('data-piece-name', piece.name);
        
        // Create path for piece
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        // Generate path data
        let pathData = '';
        for (let i = 0; i < piece.points.length; i++) {
            const { x, y } = piece.points[i];
            if (i === 0) {
                pathData += `M ${x},${y}`;
            } else {
                pathData += ` L ${x},${y}`;
            }
        }
        pathData += ' Z'; // Close path
        
        path.setAttribute('d', pathData);
        path.setAttribute('fill', this.options.defaultFill);
        path.setAttribute('stroke', this.options.defaultStroke);
        path.setAttribute('stroke-width', this.options.defaultStrokeWidth);
        
        group.appendChild(path);
        
        // Add measurement visualization
        const measurementsGroup = this.generateMeasurementsGroup(piece, measurements);
        if (measurementsGroup) {
            group.appendChild(measurementsGroup);
        }
        
        
        // Add attachment points (placeholder)
        const attachmentPoint1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        attachmentPoint1.setAttribute('cx', piece.boundingBox.x + 50);
        attachmentPoint1.setAttribute('cy', piece.boundingBox.y + 50);
        attachmentPoint1.setAttribute('r', this.options.attachmentPointRadius);
        attachmentPoint1.setAttribute('fill', this.options.attachmentPointFill);
        group.appendChild(attachmentPoint1);

        const attachmentPoint2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        attachmentPoint2.setAttribute('cx', piece.boundingBox.x + piece.boundingBox.width - 50);
        attachmentPoint2.setAttribute('cy', piece.boundingBox.y + 50);
        attachmentPoint2.setAttribute('r', this.options.attachmentPointRadius);
        attachmentPoint2.setAttribute('fill', this.options.attachmentPointFill);
        group.appendChild(attachmentPoint2);
        
        // Add stitching lines (placeholder)
        const stitchingLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        stitchingLine.setAttribute('x1', piece.boundingBox.x);
        stitchingLine.setAttribute('y1', piece.boundingBox.y + piece.boundingBox.height);
        stitchingLine.setAttribute('x2', piece.boundingBox.x + piece.boundingBox.width);
        stitchingLine.setAttribute('y2', piece.boundingBox.y + piece.boundingBox.height);
        stitchingLine.setAttribute('stroke', this.options.stitchingStroke);
        stitchingLine.setAttribute('stroke-width', this.options.stitchingStrokeWidth);
        stitchingLine.setAttribute('stroke-dasharray', this.options.stitchingStrokeDasharray);
        group.appendChild(stitchingLine);
        
        return group;
    }
    /**
     * Generate a group element for measurements
     * @param {Object} piece - Pattern piece object
     * @param {Array} measurements - Array of measurements
     * @returns {Element|null} - Group element or null if no measurements
     */
    generateMeasurementsGroup(piece, measurements) {
        // Filter measurements for this piece
        const pieceMeasurements = measurements.filter(m => m.pieceId === piece.id);
        
        if (pieceMeasurements.length === 0) {
            return null;
        }
        
        // Create measurements group
        const measurementsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        measurementsGroup.setAttribute('class', 'measurements');
        measurementsGroup.setAttribute('stroke', this.options.measurementStroke);
        measurementsGroup.setAttribute('stroke-width', this.options.measurementStrokeWidth);
        measurementsGroup.setAttribute('stroke-dasharray', this.options.measurementStrokeDasharray);
        
        // Get bounding box
        const { x, y, width, height } = piece.boundingBox;
        
        // Add width measurement
        const widthMeasurement = pieceMeasurements.find(m => m.name === 'Width');
        if (widthMeasurement) {
            // Add horizontal line above the piece
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x);
            line.setAttribute('y1', y - 20);
            line.setAttribute('x2', x + width);
            line.setAttribute('y2', y - 20);
            measurementsGroup.appendChild(line);
            
            // Add text
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x + width / 2);
            text.setAttribute('y', y - 25);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '12');
            text.setAttribute('fill', this.options.measurementStroke);
            text.textContent = `Width: ${widthMeasurement.value}${widthMeasurement.unit}`;
            measurementsGroup.appendChild(text);
        }
        
        // Add height measurement
        const heightMeasurement = pieceMeasurements.find(m => m.name === 'Height');
        if (heightMeasurement) {
            // Add vertical line to the left of the piece
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x - 20);
            line.setAttribute('y1', y);
            line.setAttribute('x2', x - 20);
            line.setAttribute('y2', y + height);
            measurementsGroup.appendChild(line);
            
            // Add text
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x - 25);
            text.setAttribute('y', y + height / 2);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '12');
            text.setAttribute('fill', this.options.measurementStroke);
            text.setAttribute('transform', `rotate(270, ${x - 25}, ${y + height / 2})`);
            text.textContent = `Height: ${heightMeasurement.value}${heightMeasurement.unit}`;
            measurementsGroup.appendChild(text);
        }
        
        return measurementsGroup;
    }
    
    /**
     * Convert SVG to a data URL
     * @param {string} svgString - SVG content as a string
     * @returns {string} - Data URL
     */
    svgToDataURL(svgString) {
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    }
    
    /**
     * Save SVG to a file
     * @param {string} svgString - SVG content as a string
     * @param {string} filename - Filename to save as
     */
    saveSVG(svgString, filename) {
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'pattern.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    }
}

// Export the SVGGenerator class
export { SVGGenerator };

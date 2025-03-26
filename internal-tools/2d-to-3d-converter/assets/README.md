# Assets Directory

This directory contains assets used by the 2D to 3D Bag Pattern Converter tool.

## Contents

- Sample SVG patterns for testing
- Icons and UI elements
- Other static assets

## SVG Pattern Format

SVG patterns should follow these guidelines:

1. Use standard SVG format with proper namespaces
2. Include measurement annotations as:
   - Text elements with specific format (e.g., "Width: 40cm")
   - Custom data attributes on path elements
   - Metadata in the SVG header

3. Use consistent IDs for pattern pieces:
   - front-panel, back-panel, side-panel, etc.
   - Include data-piece-type and data-piece-name attributes

4. Mark stitching lines with:
   - Specific stroke color or pattern
   - data-stitch-to attributes indicating connected pieces

5. Indicate attachment points for hardware with:
   - Circle elements
   - data-attachment-point attributes

Sample SVG patterns will be added to this directory as they are created.

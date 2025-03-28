# Sample SVG Files for Testing

This directory contains sample SVG files that demonstrate the expected format for both the SVG parser (TASK-002) and the image analyzer (TASK-003). These files serve multiple purposes:

1. They help test the SVG parsing functionality
2. They provide examples for the image analyzer to generate SVG files in the correct format
3. They serve as documentation for the expected SVG format for future development

## File Descriptions

### tote-simple.svg

A simple tote bag with front and back panels. This file demonstrates the basic structure of an SVG file for the 2D to 3D converter, including:

- Metadata with measurements
- Front and back panels as separate pattern pieces
- Measurement lines and text annotations
- Attachment points for handles
- Stitching lines indicating connections between pattern pieces

### tote-multi-piece.svg

A more complex tote bag with multiple pattern pieces (front, back, sides, bottom, handles). This file demonstrates:

- Multiple pattern pieces with different shapes and sizes
- Relationships between pattern pieces (stitching connections)
- More complex measurements and annotations
- Handle attachment points and other features

### bag-complex.svg

A bag with curved elements and internal features (pockets, zippers, etc.). This file demonstrates:

- Complex path commands (curves, arcs)
- Internal features like pockets and zippers
- More advanced measurements and annotations
- Multiple attachment points and stitching lines

## SVG Format Specification

All sample files follow the SVG Format Specification described in TASK-002. Key elements include:

1. **Metadata**: The `<metadata>` section with custom namespaces for measurements
2. **Groups**: Each pattern piece in a `<g>` element with appropriate ID and data attributes
3. **Paths**: Various path commands (M, L, C, A, etc.) for shapes
4. **Measurement Annotations**: Both metadata and visual measurement elements
5. **Attachment Points**: Special points marked with circles and data attributes
6. **Stitching Lines**: Lines indicating connections between pattern pieces

## Usage

These sample files can be used to:

1. Test the SVG parsing functionality in the 2D to 3D converter
2. Validate the output of the image analyzer
3. Understand the expected SVG format for creating new pattern files

## Document Maintenance

**Version**: 1.0.0  
**Last Updated**: March 26, 2025  
**Update Frequency**: As needed  

### Update Triggers
- Changes to the SVG format specification
- Addition of new sample files
- Updates to existing sample files
- Changes to the 2D to 3D converter requirements

### Changelog
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| March 26, 2025 | 1.0.0 | Initial version | EGO Development Team |

### Review Checklist
- [ ] All sample files are valid SVG files
- [ ] All sample files follow the SVG Format Specification
- [ ] All sample files include the required elements and attributes
- [ ] The README.md file accurately describes the purpose and content of each file

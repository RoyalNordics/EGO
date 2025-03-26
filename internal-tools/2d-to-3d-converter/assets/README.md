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

## Document Maintenance

**Version**: 1.0.0  
**Last Updated**: March 26, 2025  
**Update Frequency**: As needed  

### Update Triggers
- Changes to SVG pattern format guidelines
- Addition of new sample SVG patterns
- Updates to UI elements or icons
- Changes to measurement annotation formats
- Updates to pattern piece naming conventions
- Addition of new asset types

### Changelog
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| March 26, 2025 | 1.0.0 | Initial version | EGO Development Team |

### Review Checklist
- [ ] Contents section accurately reflects directory contents
- [ ] SVG pattern format guidelines are clear and up-to-date
- [ ] Sample SVG patterns follow the specified guidelines
- [ ] UI elements and icons are current
- [ ] All assets are properly organized
- [ ] File formats and naming conventions are consistent

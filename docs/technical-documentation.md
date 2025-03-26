# EGO Custom Bags - Technical Documentation

## Website Structure

The EGO Custom Bags website consists of the following key components:

### Pages

1. **Homepage (index.html)**
   - Landing page with introduction to the concept
   - Featured designs section
   - How it works section
   - Quality commitment section
   - Customer testimonials
   - Newsletter signup

2. **Design Page (design.html)**
   - Interactive 6-step design process
   - Live preview of the bag design
   - Price calculator
   - Order placement functionality

### CSS Files

1. **styles.css**
   - Global styles for the entire website
   - Header and footer styling
   - Homepage-specific styling

2. **design.css**
   - Specific styles for the design page
   - Design process interface styling
   - Interactive elements styling

### JavaScript Files

1. **main.js**
   - Global functionality for the entire website
   - Mobile menu toggle
   - Smooth scrolling for navigation
   - Newsletter form validation
   - Testimonial slider

2. **design.js**
   - Design page specific functionality
   - Step-by-step design process management
   - Selection handling for design options
   - Price calculation
   - Preview updating
   - Order processing

### Image Directories

1. **images/**
   - General images used throughout the site

2. **images/designs/**
   - Base design template images

3. **images/handles/**
   - Handle type images

4. **images/materials/**
   - Material option images

5. **uploads/designs/**
   - Directory for user-uploaded design images

## Design Process Functionality

The design process is implemented as a 6-step wizard interface:

### Step 1: Base Design Selection
- Users select from 6 different bag styles (tote, crossbody, clutch, shoulder, backpack, hobo)
- Each selection updates the base price and preview image

### Step 2: Handle Type Selection
- Users select from 4 handle options (short, long, chain, leather strap)
- Selection updates the handle price component

### Step 3: Material Selection
- Users select from 4 material options (leather, suede, canvas, vegan leather)
- Selection updates the material price component

### Step 4: Color Selection
- Users select colors for both the bag body and handle
- 8 color options are available for each component

### Step 5: Fittings & Details
- Users can select multiple fittings and decorative elements
- Each selection adds to the fittings price component

### Step 6: Review & Order
- Displays a summary of all selections
- Shows the total price
- Provides options to save the design or place an order

## Data Structure

The design selections are stored in a JavaScript object with the following structure:

```javascript
const designSelections = {
    baseDesign: { value: null, price: 0, name: null },
    handle: { value: null, price: 0, name: null },
    material: { value: null, price: 0, name: null },
    bagColor: { value: null, name: null },
    handleColor: { value: null, name: null },
    fittings: { value: [], price: 0, name: [] }
};
```

## Price Calculation

The total price is calculated by summing the individual components:
- Base design price (1000-1800 kr)
- Handle price (200-400 kr)
- Material price (300-600 kr)
- Fittings price (varies based on selections)

## User Interface Components

### Progress Tracking
- Progress bar shows advancement through the 6 steps
- Step indicators highlight the current step and completed steps
- Step title and description update for each step

### Navigation
- Previous/Next buttons for moving between steps
- Validation ensures required selections are made before proceeding

### Preview
- Visual representation of the current design
- Updates based on user selections

### Price Summary
- Real-time display of price components
- Running total of the current design price

## Order Processing

The current implementation includes placeholder functions for:
- Saving designs for future reference
- Placing orders

In a production environment, these would connect to backend services for:
- User authentication
- Design storage in a database
- Payment processing
- Order fulfillment tracking

## Responsive Design

The website is built with responsive design principles:
- Mobile-friendly navigation with hamburger menu
- Flexible layouts that adapt to different screen sizes
- Touch-friendly interface elements for mobile users

## Future Technical Enhancements

Planned technical improvements include:
1. 3D visualization of bag designs
2. More sophisticated color and material combinations
3. User accounts for saving multiple designs
4. Integration with inventory management systems
5. Enhanced analytics for tracking popular design choices

## Document Maintenance

**Version**: 1.0.0  
**Last Updated**: March 26, 2025  
**Update Frequency**: Quarterly or as needed  

### Update Triggers
- Implementation of new features or functionality
- Changes to website structure or architecture
- Updates to the design process flow
- Integration of new technologies (e.g., 3D visualization)
- Significant code refactoring
- Changes to data structures or APIs

### Changelog
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| March 26, 2025 | 1.0.0 | Initial version | EGO Development Team |

### Review Checklist
- [ ] Website structure description is accurate
- [ ] All pages and components are documented
- [ ] CSS and JavaScript files are correctly described
- [ ] Design process functionality is up-to-date
- [ ] Data structures are accurately documented
- [ ] User interface components match current implementation
- [ ] Code examples are current and functional
- [ ] Future enhancements section reflects current roadmap

## Document Maintenance

**Version**: 1.0.0
**Last Updated**: 2025-03-26
**Update Frequency**: Quarterly or as needed

### Update Triggers
- Implementation of new features or functionality
- Changes to website structure or architecture
- Updates to the design process flow
- Integration of new technologies (e.g., 3D visualization)
- Significant code refactoring
- Changes to data structures or APIs

### Changelog
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-03-26 | 1.0.0 | Initial version | EGO Development Team |

### Review Checklist
- [ ] Website structure description is accurate
- [ ] All pages and components are documented
- [ ] CSS and JavaScript files are correctly described
- [ ] Design process functionality is up-to-date
- [ ] Data structures are accurately documented
- [ ] User interface components match current implementation
- [ ] Code examples are current and functional
- [ ] Future enhancements section reflects current roadmap

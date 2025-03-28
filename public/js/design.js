document.addEventListener('DOMContentLoaded', function() {
    // Design process variables
    let currentStep = 1;
    const totalSteps = 6;
    
    // Design selections
    const designSelections = {
        baseDesign: { value: null, price: 0, name: null },
        handle: { value: null, price: 0, name: null },
        material: { value: null, price: 0, name: null },
        bagColor: { value: null, name: null },
        handleColor: { value: null, name: null },
        fittings: { value: [], price: 0, name: [] }
    };
    
    // DOM Elements
    const progressBar = document.getElementById('progress-bar');
    const stepIndicators = document.querySelectorAll('.step-indicator');
    const stepTitle = document.getElementById('step-title');
    const stepInfoElement = document.getElementById('step-info');
    const stepContents = document.querySelectorAll('.step-content');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const bagPreview = document.getElementById('bag-preview');
    
    // Price elements
    const basePrice = document.getElementById('base-price');
    const handlePrice = document.getElementById('handle-price');
    const materialPrice = document.getElementById('material-price');
    const fittingsPrice = document.getElementById('fittings-price');
    const totalPrice = document.getElementById('total-price');
    
    // Review elements
    const reviewBase = document.getElementById('review-base');
    const reviewHandle = document.getElementById('review-handle');
    const reviewMaterial = document.getElementById('review-material');
    const reviewBagColor = document.getElementById('review-bag-color');
    const reviewHandleColor = document.getElementById('review-handle-color');
    const reviewFittings = document.getElementById('review-fittings');
    const reviewTotal = document.getElementById('review-total');
    
    // Order buttons
    const saveDesignBtn = document.getElementById('save-design');
    const placeOrderBtn = document.getElementById('place-order');
    
    // Step information
    const stepInfoData = [
        { title: 'Step 1: Choose Base Design', info: 'Select the basic shape and style for your handbag.' },
        { title: 'Step 2: Select Handle Type', info: 'Pick the perfect handle to complement your bag.' },
        { title: 'Step 3: Choose Material', info: 'Select from premium quality materials for your bag.' },
        { title: 'Step 4: Select Colors', info: 'Choose colors for your bag and handle.' },
        { title: 'Step 5: Add Fittings & Details', info: 'Customize with zippers, clasps, and decorative elements.' },
        { title: 'Step 6: Review & Order', info: 'Confirm your design and place your order.' }
    ];
    
    // Initialize the design process
    function initDesignProcess() {
        updateStep(1);
        setupEventListeners();
        updatePreview();
    }
    
    // Update the current step
    function updateStep(step) {
        currentStep = step;
        
        // Update progress bar
        const progressWidth = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = `${progressWidth}%`;
        
        // Update step indicators
        stepIndicators.forEach((indicator, index) => {
            const stepNum = index + 1;
            indicator.classList.remove('active', 'completed');
            
            if (stepNum === currentStep) {
                indicator.classList.add('active');
            } else if (stepNum < currentStep) {
                indicator.classList.add('completed');
            }
        });
        
        // Update step content visibility
        stepContents.forEach((content, index) => {
            content.classList.remove('active');
            if (index === currentStep - 1) {
                content.classList.add('active');
            }
        });
        
        // Update step title and info
        stepTitle.textContent = stepInfoData[currentStep - 1].title;
        stepInfoElement.textContent = stepInfoData[currentStep - 1].info;
        
        // Update navigation buttons
        prevBtn.disabled = currentStep === 1;
        nextBtn.textContent = currentStep === totalSteps ? 'Finish' : 'Next';
        
        // If on the last step, update the review summary
        if (currentStep === totalSteps) {
            updateReviewSummary();
        }
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Navigation buttons
        prevBtn.addEventListener('click', goToPreviousStep);
        nextBtn.addEventListener('click', goToNextStep);
        
        // Base design options
        const baseDesignOptions = document.querySelectorAll('#step-1 .option-item');
        baseDesignOptions.forEach(option => {
            option.addEventListener('click', function() {
                selectOption(this, 'baseDesign', baseDesignOptions);
            });
        });
        
        // Handle options
        const handleOptions = document.querySelectorAll('#step-2 .option-item');
        handleOptions.forEach(option => {
            option.addEventListener('click', function() {
                selectOption(this, 'handle', handleOptions);
            });
        });
        
        // Material options
        const materialOptions = document.querySelectorAll('#step-3 .option-item');
        materialOptions.forEach(option => {
            option.addEventListener('click', function() {
                selectOption(this, 'material', materialOptions);
            });
        });
        
        // Bag color options
        const bagColorOptions = document.querySelectorAll('.color-section:first-child .color-option');
        bagColorOptions.forEach(option => {
            option.addEventListener('click', function() {
                selectColor(this, 'bagColor', bagColorOptions);
            });
        });
        
        // Handle color options
        const handleColorOptions = document.querySelectorAll('.color-section:last-child .color-option');
        handleColorOptions.forEach(option => {
            option.addEventListener('click', function() {
                selectColor(this, 'handleColor', handleColorOptions);
            });
        });
        
        // Fittings options
        const fittingsOptions = document.querySelectorAll('#step-5 .option-item');
        fittingsOptions.forEach(option => {
            option.addEventListener('click', function() {
                toggleFitting(this);
            });
        });
        
        // Order buttons
        saveDesignBtn.addEventListener('click', saveDesign);
        placeOrderBtn.addEventListener('click', placeOrder);
    }
    
    // Go to the previous step
    function goToPreviousStep() {
        if (currentStep > 1) {
            updateStep(currentStep - 1);
        }
    }
    
    // Go to the next step
    function goToNextStep() {
        // Validate current step
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                updateStep(currentStep + 1);
            } else {
                // On the last step, finish the design process
                finishDesign();
            }
        } else {
            alert('Please make a selection before proceeding.');
        }
    }
    
    // Validate the current step
    function validateCurrentStep() {
        switch (currentStep) {
            case 1:
                return designSelections.baseDesign.value !== null;
            case 2:
                return designSelections.handle.value !== null;
            case 3:
                return designSelections.material.value !== null;
            case 4:
                return designSelections.bagColor.value !== null && designSelections.handleColor.value !== null;
            case 5:
                // Fittings are optional
                return true;
            default:
                return true;
        }
    }
    
    // Select an option (for base design, handle, material)
    function selectOption(element, type, allOptions) {
        // Remove selected class from all options
        allOptions.forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selected class to the clicked option
        element.classList.add('selected');
        
        // Update the selection
        const value = element.getAttribute('data-value');
        const price = parseInt(element.getAttribute('data-price'));
        const name = element.querySelector('h4').textContent;
        
        designSelections[type] = { value, price, name };
        
        // Update price display
        updatePriceDisplay();
        
        // Update preview
        updatePreview();
    }
    
    // Select a color
    function selectColor(element, type, allOptions) {
        // Remove selected class from all options
        allOptions.forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selected class to the clicked option
        element.classList.add('selected');
        
        // Update the selection
        const value = element.getAttribute('data-value');
        const name = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize first letter
        
        designSelections[type] = { value, name };
        
        // Update preview
        updatePreview();
    }
    
    // Toggle a fitting selection
    function toggleFitting(element) {
        // Toggle selected class
        element.classList.toggle('selected');
        
        const value = element.getAttribute('data-value');
        const price = parseInt(element.getAttribute('data-price'));
        const name = element.querySelector('h4').textContent;
        
        // Update the selection
        if (element.classList.contains('selected')) {
            // Add fitting
            designSelections.fittings.value.push(value);
            designSelections.fittings.price += price;
            designSelections.fittings.name.push(name);
        } else {
            // Remove fitting
            const index = designSelections.fittings.value.indexOf(value);
            if (index !== -1) {
                designSelections.fittings.value.splice(index, 1);
                designSelections.fittings.price -= price;
                designSelections.fittings.name.splice(index, 1);
            }
        }
        
        // Update price display
        updatePriceDisplay();
        
        // Update preview
        updatePreview();
    }
    
    // Update the price display
    function updatePriceDisplay() {
        basePrice.textContent = `${designSelections.baseDesign.price} kr`;
        handlePrice.textContent = `${designSelections.handle.price} kr`;
        materialPrice.textContent = `${designSelections.material.price} kr`;
        fittingsPrice.textContent = `${designSelections.fittings.price} kr`;
        
        const total = designSelections.baseDesign.price + 
                      designSelections.handle.price + 
                      designSelections.material.price + 
                      designSelections.fittings.price;
        
        totalPrice.textContent = `${total} kr`;
    }
    
    // Update the bag preview (simplified version)
    function updatePreview() {
        // In a real application, this would update a 3D model or composite image
        // For this demo, we'll just change the image based on the base design
        if (designSelections.baseDesign.value) {
            bagPreview.src = `images/designs/${designSelections.baseDesign.value}.png`;
        } else {
            bagPreview.src = 'images/preview-placeholder.png';
        }
    }
    
    // Update the review summary
    function updateReviewSummary() {
        reviewBase.textContent = designSelections.baseDesign.name || 'Not selected';
        reviewHandle.textContent = designSelections.handle.name || 'Not selected';
        reviewMaterial.textContent = designSelections.material.name || 'Not selected';
        reviewBagColor.textContent = designSelections.bagColor.name || 'Not selected';
        reviewHandleColor.textContent = designSelections.handleColor.name || 'Not selected';
        
        if (designSelections.fittings.name.length > 0) {
            reviewFittings.textContent = designSelections.fittings.name.join(', ');
        } else {
            reviewFittings.textContent = 'None';
        }
        
        const total = designSelections.baseDesign.price + 
                      designSelections.handle.price + 
                      designSelections.material.price + 
                      designSelections.fittings.price;
        
        reviewTotal.textContent = `${total} kr`;
    }
    
    // Save the design (simplified)
    function saveDesign() {
        // In a real application, this would save the design to a database
        // For this demo, we'll just show an alert
        alert('Your design has been saved! You can access it later from your account.');
    }
    
    // Place the order (simplified)
    function placeOrder() {
        // In a real application, this would process the order
        // For this demo, we'll just show an alert
        alert('Thank you for your order! Your custom handbag will be delivered within 14 days.');
    }
    
    // Finish the design process
    function finishDesign() {
        // In a real application, this might redirect to checkout
        // For this demo, we'll just update the UI
        nextBtn.disabled = true;
    }
    
    // Initialize the design process
    initDesignProcess();
});

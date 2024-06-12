// Function to save settings to local storage
function saveSettings() {
    const textSize = document.getElementById('text-size').value;
    localStorage.setItem('textSize', textSize);
    
    showNotification('Settings saved successfully.', 'success');
    applySettings(); // Apply settings immediately after saving
}

// Function to reset settings to default
function resetSettings() {
    localStorage.removeItem('textSize');
    resetFont(); // Reset font sizes
    document.body.style.filter = '';
    document.body.style.webkitFilter = '';
    document.body.classList.remove('dark-mode', 'light-mode', 'high-contrast');
    applyTheme(); // Apply default theme
    
    showNotification('Settings reset.', 'warning');
}

// Function to apply settings from local storage
function applySettings() {
    applyTextSize(); // Apply text size setting
    applyTheme(); // Apply theme based on stored preference
}

// Function to apply text size based on stored preference
function applyTextSize() {
    const textSize = localStorage.getItem('textSize');

    // Apply text size setting
    if (textSize === 'larger') {
        document.body.classList.add('larger-text');
    } else {
        document.body.classList.remove('larger-text');
    }
}

// Function to reset font sizes to their original values
function resetFont() {
    const selector = '.sidebar *, #signupContainer, .underwelcome, .opening-screen button, #about > div, #game1-info > h3, #game3-info > h3, .featured-games, #game2-info > h3, #featured-games > div.featured-games-title, #main-content > div.opening-screen > div, .featured-games-title, p, .footer, #enter-site-button';
    document.querySelectorAll(selector).forEach(element => {
        const originalFontSize = element.getAttribute('data-original-font-size');
        if (originalFontSize) {
            element.style.fontSize = originalFontSize;
        }
    });
}

// Function to show notification messages
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    
    // Prepend notification to the accessibility container
    const accessibilityContainer = document.querySelector('.accessibility-container');
    accessibilityContainer.insertBefore(notification, accessibilityContainer.firstChild); // Insert as first child
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to toggle high contrast mode
function toggleHighContrast() {
    const contrastButton = document.getElementById('contrast-toggle');
    const isHighContrast = document.body.classList.toggle('high-contrast');

    if (isHighContrast) {
        contrastButton.textContent = 'High Contrast: On';
        localStorage.setItem('contrast', 'true');
    } else {
        contrastButton.textContent = 'High Contrast: Off';
        localStorage.setItem('contrast', 'false');
    }

    applyTheme(); // Apply theme after toggling
}

// Function to toggle light mode
function toggleLightMode() {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light'); // Persist theme choice
    applyTheme(); // Apply theme after toggling
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark'); // Persist theme choice
    applyTheme(); // Apply theme after toggling
}

// Function to apply theme based on stored preference
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }

    updateStylesBasedOnTheme(); // Update styles based on current theme and contrast
}

// Function to update styles based on theme and contrast settings
function updateStylesBasedOnTheme() {
    const contrastEnabled = localStorage.getItem('contrast') === 'true';
    const dropup = document.getElementById('accessibility-dropup');

    if (document.body.classList.contains('light-mode')) {
        if (contrastEnabled) {
            dropup.style.backgroundColor = '#fff';
            dropup.style.color = '#000';
        } else {
            dropup.style.backgroundColor = 'white';
            dropup.style.color = 'black';
        }
    } else if (document.body.classList.contains('dark-mode')) {
        if (contrastEnabled) {
            dropup.style.backgroundColor = 'dodgerblue';
            dropup.style.color = 'white';
        } else {
            dropup.style.backgroundColor = 'dodgerblue';
            dropup.style.color = 'white';
        }
    } else {
        dropup.style.backgroundColor = '';
        dropup.style.color = '';
    }
}

// Apply settings when the page loads
document.addEventListener('DOMContentLoaded', function () {
    applySettings(); // Apply saved settings
});

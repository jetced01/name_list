// DOM elements
const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const namesList = document.getElementById('namesList');
const namesCount = document.getElementById('namesCount');
const submitBtn = nameForm.querySelector('.submit-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadNames();
    nameForm.addEventListener('submit', handleFormSubmit);
});

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = nameInput.value.trim();
    if (!name) {
        alert('Please enter a name');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    try {
        const response = await fetch('/api/names', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to submit name');
        }
        
        // Clear the form
        nameInput.value = '';
        
        // Reload the names list
        await loadNames();
        
        // Show success feedback
        showSuccessMessage(`Name "${data.name}" added successfully!`);
        
    } catch (error) {
        console.error('Error submitting name:', error);
        alert('Error submitting name: ' + error.message);
    } finally {
        setLoadingState(false);
    }
}

// Load names from the server
async function loadNames() {
    try {
        const response = await fetch('/api/names');
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error('Failed to load names');
        }
        
        displayNames(data.names);
        updateNamesCount(data.names.length);
        
    } catch (error) {
        console.error('Error loading names:', error);
        namesList.innerHTML = '<li style="color: red;">Error loading names. Please refresh the page.</li>';
    }
}

// Display names in the list
function displayNames(names) {
    namesList.innerHTML = '';
    
    if (names.length === 0) {
        return; // CSS will show the empty state message
    }
    
    names.forEach((name, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = name;
        listItem.style.animationDelay = `${index * 0.1}s`;
        namesList.appendChild(listItem);
    });
}

// Update the names count display
function updateNamesCount(count) {
    namesCount.textContent = count;
}

// Set loading state for the form
function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        nameInput.disabled = true;
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        nameInput.disabled = false;
        nameInput.focus();
    }
}

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    successDiv.textContent = message;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successDiv);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 300);
    }, 3000);
}

// Add some keyboard shortcuts for better UX
document.addEventListener('keydown', function(event) {
    // Press Escape to clear the form
    if (event.key === 'Escape') {
        nameInput.value = '';
        nameInput.focus();
    }
    
    // Press Ctrl/Cmd + R to refresh the names list
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        loadNames();
    }
});
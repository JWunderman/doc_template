// Configuration options - can be customized in mkdocs.yml
const PERSISTENT_BUTTONS_CONFIG = {
  portalUrl: 'https://example.com/portal', // Default portal URL
  portalText: 'Portal',                    // Default portal text
  feedbackEnabled: true,                   // Enable/disable feedback button
  portalEnabled: true,                     // Enable/disable portal button
  buttonsHideable: true                    // Allow users to hide buttons
};

// Function to initialize buttons with configuration
function initializeButtons() {
  // Create container for the persistent buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'persistent-buttons-container';
  
  // Create buttons wrapper that can be hidden
  const buttonsWrapper = document.createElement('div');
  buttonsWrapper.className = 'persistent-buttons-wrapper';
  
  // Only add buttons if they're enabled
  if (PERSISTENT_BUTTONS_CONFIG.portalEnabled) {
    // Create Portal button
    const portalButton = document.createElement('a');
    portalButton.className = 'persistent-button portal-button';
    portalButton.textContent = PERSISTENT_BUTTONS_CONFIG.portalText;
    portalButton.href = PERSISTENT_BUTTONS_CONFIG.portalUrl;
    portalButton.setAttribute('title', 'Go to Portal');
    portalButton.setAttribute('target', '_blank'); // Open in new tab
    portalButton.setAttribute('rel', 'noopener noreferrer'); // Security best practice
    
    buttonsWrapper.appendChild(portalButton);
  }
  
  // Create Feedback button if enabled
  if (PERSISTENT_BUTTONS_CONFIG.feedbackEnabled) {
    const feedbackButton = document.createElement('button');
    feedbackButton.className = 'persistent-button feedback-button';
    feedbackButton.textContent = 'Feedback';
    feedbackButton.setAttribute('title', 'Submit Feedback');
    feedbackButton.addEventListener('click', function() {
      openFeedbackModal();
    });
    
    buttonsWrapper.appendChild(feedbackButton);
  }
  
  // Add buttons wrapper to container
  buttonContainer.appendChild(buttonsWrapper);
  
  // Create toggle button if buttons are hideable
  if (PERSISTENT_BUTTONS_CONFIG.buttonsHideable) {
    const toggleButton = document.createElement('button');
    toggleButton.className = 'persistent-buttons-toggle';
    toggleButton.innerHTML = '<span>×</span>'; // × character for close
    
    // Check if buttons should be hidden by default (from localStorage)
    const buttonsHidden = localStorage.getItem('persistentButtonsHidden') === 'true';
    if (buttonsHidden) {
      buttonsWrapper.classList.add('hidden');
      toggleButton.classList.add('collapsed');
      toggleButton.innerHTML = '<span>+</span>'; // + character for expand
    }
    
    // Add click event to toggle visibility
    toggleButton.addEventListener('click', function() {
      const isHidden = buttonsWrapper.classList.toggle('hidden');
      toggleButton.classList.toggle('collapsed', isHidden);
      
      // Update toggle button appearance
      if (isHidden) {
        toggleButton.innerHTML = '<span>+</span>'; // + character for expand
      } else {
        toggleButton.innerHTML = '<span>×</span>'; // × character for close
      }
      
      // Save preference to localStorage
      localStorage.setItem('persistentButtonsHidden', isHidden);
    });
    
    buttonContainer.appendChild(toggleButton);
  }
  
  // Add container to body
  document.body.appendChild(buttonContainer);
  
  // Create feedback modal if enabled
  if (PERSISTENT_BUTTONS_CONFIG.feedbackEnabled) {
    createFeedbackModal();
  }
}

// Try to load configuration from mkdocs.yml (via window.extra)
document.addEventListener('DOMContentLoaded', function() {
  // Check if configuration exists in mkdocs.yml
  if (window.extra && window.extra.persistent_buttons) {
    // Map the configuration from mkdocs.yml to our config object
    if (window.extra.persistent_buttons.portal_url) {
      PERSISTENT_BUTTONS_CONFIG.portalUrl = window.extra.persistent_buttons.portal_url;
    }
    
    if (window.extra.persistent_buttons.portal_text) {
      PERSISTENT_BUTTONS_CONFIG.portalText = window.extra.persistent_buttons.portal_text;
    }
    
    if (window.extra.persistent_buttons.feedback_enabled !== undefined) {
      PERSISTENT_BUTTONS_CONFIG.feedbackEnabled = window.extra.persistent_buttons.feedback_enabled;
    }
    
    if (window.extra.persistent_buttons.portal_enabled !== undefined) {
      PERSISTENT_BUTTONS_CONFIG.portalEnabled = window.extra.persistent_buttons.portal_enabled;
    }
    
    if (window.extra.persistent_buttons.buttons_hideable !== undefined) {
      PERSISTENT_BUTTONS_CONFIG.buttonsHideable = window.extra.persistent_buttons.buttons_hideable;
    }
  }
  
  // Also check for legacy configuration method
  if (window.persistentButtonsConfig) {
    Object.assign(PERSISTENT_BUTTONS_CONFIG, window.persistentButtonsConfig);
  }
  
  // Initialize the buttons after configuration is loaded
  initializeButtons();
});

// Feedback Modal Functions
function createFeedbackModal() {
  // Create modal element
  const modal = document.createElement('div');
  modal.id = 'feedback-modal';
  modal.className = 'feedback-modal';
  
  // Create modal content
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <h2 class="modal-title">Documentation Feedback</h2>
      <p>Help us improve our documentation by providing your feedback.</p>
      
      <form id="feedback-form" class="feedback-form">
        <input type="hidden" id="feedback-page" name="page">
        
        <div class="form-group">
          <label for="feedback-document">Document Name:</label>
          <input type="text" id="feedback-document" name="document" placeholder="Enter the document name or section">
        </div>
        
        <div class="form-group">
          <label for="feedback-type">Feedback Type:</label>
          <select id="feedback-type" name="type" required>
            <option value="">-- Select Type --</option>
            <option value="error">Error or Inaccuracy</option>
            <option value="missing">Missing Information</option>
            <option value="unclear">Unclear Explanation</option>
            <option value="suggestion">Suggestion</option>
            <option value="praise">Positive Feedback</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="feedback-content">Your Feedback:</label>
          <textarea id="feedback-content" name="content" required placeholder="Please describe the issue or suggestion in detail..."></textarea>
        </div>
        
        <button type="submit" class="feedback-submit">Send Feedback</button>
      </form>
      
      <div id="feedback-success" class="feedback-success" style="display: none;">
        <p>Thank you for your feedback! We appreciate your help in improving our documentation.</p>
      </div>
    </div>
  `;
  
  // Add modal to the page
  document.body.appendChild(modal);
  
  // Set up event listeners
  const closeButton = modal.querySelector('.modal-close');
  closeButton.addEventListener('click', closeFeedbackModal);
  
  // Close modal when clicking outside the content
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeFeedbackModal();
    }
  });
  
  // Handle form submission
  const form = modal.querySelector('#feedback-form');
  form.addEventListener('submit', submitFeedback);
}

function openFeedbackModal() {
  const modal = document.getElementById('feedback-modal');
  if (modal) {
    // Set the current page URL in the form
    const pageInput = document.getElementById('feedback-page');
    if (pageInput) {
      pageInput.value = window.location.href;
    }
    
    // Reset form and success message
    const form = document.getElementById('feedback-form');
    const successMessage = document.getElementById('feedback-success');
    if (form && successMessage) {
      form.reset();
      form.style.display = 'block';
      successMessage.style.display = 'none';
    }
    
    // Show the modal
    modal.style.display = 'block';
  }
}

function closeFeedbackModal() {
  const modal = document.getElementById('feedback-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function submitFeedback(event) {
  event.preventDefault();
  
  // Get form data
  const form = document.getElementById('feedback-form');
  const formData = new FormData(form);
  const feedbackData = {};
  
  for (const [key, value] of formData.entries()) {
    feedbackData[key] = value;
  }
  
  // Add recipient email
  feedbackData.recipient = 'jeffwunderman@gmail.com';
  
  // Log the feedback data to console (for demonstration)
  console.log('Feedback submitted:', feedbackData);
  
  // In a real implementation, you would send this to a server
  // For this example, we'll simulate sending an email
  sendFeedbackEmail(feedbackData);
  
  // Show success message
  form.style.display = 'none';
  const successMessage = document.getElementById('feedback-success');
  if (successMessage) {
    successMessage.style.display = 'block';
  }
  
  // Close the modal after a delay
  setTimeout(closeFeedbackModal, 3000);
}

function sendFeedbackEmail(data) {
  // In a real implementation, you would send this data to your server
  // which would then send an email to the specified recipient
  
  // Example of what the email might look like:
  const emailBody = `
    New Documentation Feedback
    
    Page: ${data.page}
    Type: ${data.type}
    
    Feedback:
    ${data.content}
    
    This feedback was sent to: ${data.recipient}
  `;
  
  console.log('Email that would be sent:', emailBody);
  
  // In a real implementation, you would use a server-side API to send the email
  // For example:
  /*
  fetch('/api/send-feedback-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => {
    console.log('Email sent successfully:', result);
  })
  .catch(error => {
    console.error('Error sending email:', error);
  });
  */
}

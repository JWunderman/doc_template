// Video Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Wait a short time to ensure the DOM is fully processed by MkDocs
  setTimeout(function() {
    // Make sure the video gallery is positioned correctly
    ensureCorrectVideoPosition();
    
    // Load videos from the global GALLERY_VIDEOS variable (defined in video-data.js)
    if (typeof GALLERY_VIDEOS !== 'undefined') {
      // Render videos to the gallery
      renderVideos(GALLERY_VIDEOS);
      
      // Initialize video cards
      initializeVideoCards();
    } else {
      console.error('Error: GALLERY_VIDEOS not found. Make sure video-data.js is loaded before video-gallery.js');
      document.getElementById('video-gallery').innerHTML = 
        `<div class="error-message">Failed to load videos. Please check that video-data.js is included.</div>`;
    }
  }, 100); // Small delay to ensure DOM is ready
});

// Ensure videos are positioned correctly below the "Available Videos" heading
function ensureCorrectVideoPosition() {
  const videoGallery = document.getElementById('video-gallery');
  const availableVideosHeading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Available Videos'));
  
  if (videoGallery && availableVideosHeading) {
    // Get the parent section that should contain the videos
    const videoSection = document.createElement('div');
    videoSection.id = 'video-section';
    
    // Move the video gallery after the heading
    availableVideosHeading.after(videoSection);
    videoSection.appendChild(videoGallery);
    
    // Also move the footer if it exists
    const footer = document.querySelector('.video-gallery-footer');
    if (footer) {
      videoSection.appendChild(footer);
    }
  }
}

// Render videos to the gallery
function renderVideos(videos) {
  const gallery = document.getElementById('video-gallery');
  if (!gallery) return;
  
  let galleryHTML = '';
  
  videos.forEach(video => {
    galleryHTML += `
      <div class="video-card">
        <div class="video-card-header">
          <h3>${video.title}</h3>
          <span class="video-duration">${video.duration}</span>
          <span class="video-card-toggle">▼</span>
        </div>
        <div class="video-card-content">
          <div class="video-description">
            <p>${video.description}</p>
          </div>
          <div class="video-container" data-video-url="${video.video_url}">
            <img src="${video.thumbnail}" alt="${video.title} Thumbnail" class="video-placeholder">
            <div class="video-play-button">▶</div>
          </div>
        </div>
      </div>
    `;
  });
  
  gallery.innerHTML = galleryHTML;
}

// Initialize video cards with click functionality
function initializeVideoCards() {
  const videoCards = document.querySelectorAll('.video-card');
  
  videoCards.forEach(card => {
    // Add click event for the card header to expand/collapse
    const cardHeader = card.querySelector('.video-card-header');
    
    if (cardHeader) {
      cardHeader.addEventListener('click', function() {
        card.classList.toggle('expanded');
      });
    }
    
    // Add click event for the video container to play video
    const videoContainer = card.querySelector('.video-container');
    
    if (videoContainer) {
      videoContainer.addEventListener('click', function(e) {
        // Prevent the click from bubbling up to the card
        e.stopPropagation();
        loadVideo(card);
      });
    }
  });
}

// Load actual video when play button is clicked
function loadVideo(card) {
  const videoContainer = card.querySelector('.video-container');
  const videoUrl = videoContainer.getAttribute('data-video-url');
  const placeholder = videoContainer.querySelector('.video-placeholder');
  const playButton = videoContainer.querySelector('.video-play-button');
  
  // Show loading state
  playButton.textContent = 'Loading...';
  playButton.style.backgroundColor = '#b3d9ff';
  
  // Create iframe for video embed
  const createVideoEmbed = () => {
    // Remove placeholder and play button
    placeholder.style.display = 'none';
    playButton.style.display = 'none';
    
    // Create and add iframe
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    
    videoContainer.appendChild(iframe);
  };
  
  // Check if we're in a demo/development environment
  if (!videoUrl || videoUrl.includes('placeholder') || videoUrl === '#') {
    // Simulate video loading for demo purposes
    setTimeout(() => {
      placeholder.style.opacity = '0.5';
      playButton.style.display = 'none';
      
      // Add a message indicating this is a demo
      const demoMessage = document.createElement('div');
      demoMessage.textContent = 'Video would play here';
      demoMessage.style.position = 'absolute';
      demoMessage.style.top = '50%';
      demoMessage.style.left = '50%';
      demoMessage.style.transform = 'translate(-50%, -50%)';
      demoMessage.style.color = '#002f6c';
      demoMessage.style.fontWeight = 'bold';
      demoMessage.style.padding = '10px';
      demoMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      demoMessage.style.borderRadius = '4px';
      
      videoContainer.appendChild(demoMessage);
    }, 800);
  } else {
    // Load actual video after a short delay
    setTimeout(createVideoEmbed, 800);
  }
}

// No filter functions needed since we removed categories

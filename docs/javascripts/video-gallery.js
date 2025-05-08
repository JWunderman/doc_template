// Video Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Video gallery script loaded');
  
  // Check if we're on the video gallery page
  const gallery = document.getElementById('video-gallery');
  if (!gallery) {
    console.log('Not on video gallery page, skipping initialization');
    return;
  }
  
  console.log('Video gallery found, initializing...');
  
  // Load videos from the global GALLERY_VIDEOS variable (defined in video-data.js)
  if (typeof GALLERY_VIDEOS !== 'undefined') {
    console.log('Found GALLERY_VIDEOS, rendering ' + GALLERY_VIDEOS.length + ' videos');
    // Render videos to the gallery
    renderVideos(GALLERY_VIDEOS);
    
    // Initialize video cards
    initializeVideoCards();
  } else {
    console.error('Error: GALLERY_VIDEOS not found. Make sure video-data.js is loaded before video-gallery.js');
    gallery.innerHTML = `<div class="error-message">Failed to load videos. Please check that video-data.js is included.</div>`;
  }
});

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
  
  // Remove placeholder and play button
  placeholder.style.display = 'none';
  playButton.style.display = 'none';
  
  // Make sure the container has enough height for controls
  videoContainer.style.paddingBottom = '62%';
  
  // Add a class to the card to ensure it expands properly
  const parentCard = videoContainer.closest('.video-card');
  if (parentCard) {
    parentCard.classList.add('expanded');
  }
  
  // Check if it's a direct video file (MP4, etc.)
  if (videoUrl.match(/\.(mp4|webm|ogg|mov)($|\?)/i)) {
    // Create HTML5 video player for direct video files
    const videoElement = document.createElement('video');
    videoElement.src = videoUrl;
    videoElement.controls = true;
    videoElement.autoplay = false; // Don't autoplay initially to avoid issues
    videoElement.preload = 'auto'; // Preload the video
    videoElement.style.position = 'absolute';
    videoElement.style.top = '0';
    videoElement.style.left = '0';
    videoElement.style.width = '100%';
    videoElement.style.height = '100%';
    videoElement.style.backgroundColor = '#000';
    
    // Add event listeners for better error handling
    videoElement.addEventListener('error', function(e) {
      console.error('Video error:', e);
      videoContainer.innerHTML = `
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; background-color: rgba(0,0,0,0.7); color: white; text-align: center; padding: 20px;">
          <div>
            <p>Error loading video. Please try again later.</p>
            <p style="font-size: 0.8em; margin-top: 10px;">Error: ${videoElement.error ? videoElement.error.message : 'Unknown error'}</p>
          </div>
        </div>
      `;
    });
    
    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.innerHTML = 'Loading video...';
    loadingIndicator.style.position = 'absolute';
    loadingIndicator.style.top = '50%';
    loadingIndicator.style.left = '50%';
    loadingIndicator.style.transform = 'translate(-50%, -50%)';
    loadingIndicator.style.color = 'white';
    loadingIndicator.style.backgroundColor = 'rgba(0,0,0,0.5)';
    loadingIndicator.style.padding = '10px';
    loadingIndicator.style.borderRadius = '5px';
    loadingIndicator.style.zIndex = '10';
    videoContainer.appendChild(loadingIndicator);
    
    // Hide loading indicator when video can play
    videoElement.addEventListener('canplay', function() {
      loadingIndicator.style.display = 'none';
      videoElement.play().catch(e => console.error('Play error:', e));
    });
    
    videoContainer.appendChild(videoElement);
  } else {
    // Create iframe for YouTube or other embed videos
    const iframe = document.createElement('iframe');
    
    // For YouTube videos, ensure it's in embed format
    let enhancedUrl = videoUrl;
    if (videoUrl.includes('youtube.com/watch')) {
      try {
        const videoId = new URL(videoUrl).searchParams.get('v');
        if (videoId) {
          enhancedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`;
        }
      } catch (e) {
        console.error('Error parsing YouTube URL:', e);
      }
    } else if (videoUrl.includes('youtube.com/embed/') && !videoUrl.includes('?')) {
      enhancedUrl += '?autoplay=1&controls=1&rel=0';
    }
    
    iframe.src = enhancedUrl;
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    
    videoContainer.appendChild(iframe);
  }
}

// No filter functions needed since we removed categories

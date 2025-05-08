# Video Gallery

A collection of instructional and informational videos to help you learn about our platform and its features.

## About This Gallery

This gallery contains a variety of instructional videos organized by topic. Each video includes:

- A descriptive title
- Duration information
- A brief description of the content

Click on any video card to expand it and view the video content. The videos are located at the bottom of this page.

## How to Use the Video Gallery

1. **Browse videos** by scrolling to the bottom of this page
2. **Click on a video card** to expand it and see the description and video player
3. **Click on the video thumbnail** to play the video
4. **Click on the header again** to collapse the card when finished

## Adding New Videos

To add a new video to this gallery:

1. Open the `docs/javascripts/video-data.js` file
2. Add a new entry to the `GALLERY_VIDEOS` array following the existing format
3. Fill in the required fields:
   - `title`: The title of the video
   - `duration`: Duration in minutes:seconds format (e.g., "3:24")
   - `description`: A brief description of the video content
   - `thumbnail`: URL to the video thumbnail image
   - `video_url`: URL to the video (YouTube embed URL, Vimeo, or other embed URL)

## Additional Resources

Besides the videos in this gallery, you can also find helpful resources in the following sections:

- **User Guide** - Step-by-step instructions for common tasks
- **API Reference** - Technical documentation for developers
- **Getting Started** - Quick start guides for new users

## Video Types

This gallery supports multiple video formats:

- **YouTube Videos** - Embedded directly from YouTube
- **MP4 Videos** - Direct video files from internal repositories
- **Other Formats** - WebM, OGG, and other HTML5-supported formats

All videos include standard playback controls for play/pause, volume, and fullscreen viewing.

## Best Practices for Viewing

For the best experience when viewing videos:

- Use a modern browser (Chrome, Firefox, Safari, or Edge)
- Ensure your internet connection is stable
- For MP4 videos, allow a few seconds for the video to buffer before playback
- Use fullscreen mode for detailed demonstrations

---

## Available Videos

<div class="video-gallery" id="video-gallery">
  <!-- Videos will be dynamically loaded from video-data.js -->
</div>

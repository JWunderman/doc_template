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
4. Save the file and rebuild the documentation

### Example of Adding a New Video

```javascript
// Add this to the GALLERY_VIDEOS array in video-data.js
{
  title: "Your New Video Title",
  duration: "4:30",
  description: "Description of your video content.",
  thumbnail: "https://example.com/your-thumbnail.jpg",
  video_url: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
}
```

No HTML editing required! The gallery will automatically update with your new video.

## Additional Resources

Besides the videos in this gallery, you can also find helpful resources in the following sections:

- **User Guide** - Step-by-step instructions for common tasks
- **API Reference** - Technical documentation for developers
- **Getting Started** - Quick start guides for new users

---

## Available Videos

The videos will appear below this heading.

<div class="video-gallery" id="video-gallery">
  <!-- Videos will be dynamically loaded from video-data.js -->
</div>

<div class="video-gallery-footer">
  <p>Can't find what you're looking for? <a href="#">Request a new tutorial video</a></p>
</div>

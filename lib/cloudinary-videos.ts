// Cloudinary video URLs mapping
// Cloud Name: duguvwfnc
// TEMPORARY: Cloudinary disabled - videos not found on CDN
// Using local paths as fallback until videos are properly uploaded

const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/duguvwfnc/video/upload'
const CLOUDINARY_FOLDER = '' // Empty for root, or set to folder name
const USE_CLOUDINARY = false // Set to true when videos are uploaded

export const cloudinaryVideoUrl = (filename: string): string => {
  // Remove .mp4 extension and any path
  const name = filename.replace(/^.*\//, '').replace('.mp4', '')
  return `${CLOUDINARY_BASE_URL}/${CLOUDINARY_FOLDER ? CLOUDINARY_FOLDER + '/' : ''}${name}.mp4`
}

// Helper to get video URL by path
export const getVideoUrl = (localPath: string): string => {
  // TEMPORARY: Return local path until Cloudinary is set up
  if (!USE_CLOUDINARY) {
    return localPath
  }

  const filename = localPath.split('/').pop() || ''
  const cloudinaryUrl = cloudinaryVideoUrl(filename)

  // Return Cloudinary URL when enabled
  return cloudinaryUrl
}

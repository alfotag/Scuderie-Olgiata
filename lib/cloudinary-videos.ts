// Cloudinary video URLs mapping
// Cloud Name: duguvwfnc
// All videos hosted on Cloudinary CDN

const USE_CLOUDINARY = true // Cloudinary is now active!

// Direct URL mapping from Cloudinary (with version numbers and unique IDs)
const CLOUDINARY_VIDEOS: Record<string, string> = {
  'aerial-view.mp4': 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763380255/aerial-view_iojwhf.mp4',
  'chestnut-horse.mp4': 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763380252/chestnut-horse_clhxil.mp4',
  'horse-hooves.mp4': 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763380253/horse-hooves_jgdkl4.mp4',
  'horse-portrait.mp4': 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763380253/horse-portrait_baztvd.mp4',
  'horse-ranch.mp4': 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763380256/horse-ranch_jeani4.mp4',
  'horses-grazing.mp4': 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763380259/horses-grazing_xexnvg.mp4',
  'jockey-running.mp4': 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763380261/jockey-running_oebrcm.mp4',
  'saddle-close.mp4': 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763380252/saddle-close_v8il94.mp4',
  'stable-window.mp4': 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763380255/stable-window_enh7yc.mp4',
  'stables-exit.mp4': 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763380268/stables-exit_gfnufa.mp4',
  'training.mp4': 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763380255/training_u2vb7q.mp4',
  'whatsapp-video.mp4': 'https://res.cloudinary.com/duguvwfnc/video/upload/v1763380257/whatsapp-video_pmq7ds.mp4',
  // rider-horse is missing from Cloudinary upload - will fallback to local
}

// Helper to get video URL by path
export const getVideoUrl = (localPath: string): string => {
  if (!USE_CLOUDINARY) {
    return localPath
  }

  const filename = localPath.split('/').pop() || ''
  const cloudinaryUrl = CLOUDINARY_VIDEOS[filename]

  // Return Cloudinary URL if available, otherwise fallback to local path
  return cloudinaryUrl || localPath
}

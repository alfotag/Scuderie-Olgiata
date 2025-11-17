// Cloudinary video URLs mapping
// Cloud Name: duguvwfnc
// Folder: scuderie-olgiata

const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/duguvwfnc/video/upload'
const CLOUDINARY_FOLDER = 'scuderie-olgiata'

export const cloudinaryVideoUrl = (filename: string): string => {
  // Remove .mp4 extension and any path
  const name = filename.replace(/^.*\//, '').replace('.mp4', '')
  return `${CLOUDINARY_BASE_URL}/${CLOUDINARY_FOLDER}/${name}.mp4`
}

// Pre-generated URLs for all videos
export const CLOUDINARY_VIDEOS = {
  'stable-window.mp4': cloudinaryVideoUrl('stable-window'),
  'saddle-close.mp4': cloudinaryVideoUrl('saddle-close'),
  'chestnut-horse.mp4': cloudinaryVideoUrl('chestnut-horse'),
  'stables-exit.mp4': cloudinaryVideoUrl('stables-exit'),
  'rider-horse.mp4': cloudinaryVideoUrl('rider-horse'),
  'training.mp4': cloudinaryVideoUrl('training'),
  'jockey-running.mp4': cloudinaryVideoUrl('jockey-running'),
  'horses-grazing.mp4': cloudinaryVideoUrl('horses-grazing'),
  'whatsapp-video.mp4': cloudinaryVideoUrl('whatsapp-video'),
  'aerial-view.mp4': cloudinaryVideoUrl('aerial-view'),
  'horse-hooves.mp4': cloudinaryVideoUrl('horse-hooves'),
  'horse-ranch.mp4': cloudinaryVideoUrl('horse-ranch'),
  'horse-portrait.mp4': cloudinaryVideoUrl('horse-portrait'),
  'jumping-slowmo.mp4': cloudinaryVideoUrl('jumping-slowmo'),
}

// Helper to get video URL by path
export const getVideoUrl = (localPath: string): string => {
  const filename = localPath.split('/').pop() || ''
  return CLOUDINARY_VIDEOS[filename as keyof typeof CLOUDINARY_VIDEOS] || localPath
}

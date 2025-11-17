#!/usr/bin/env node

/**
 * Script to upload videos to Cloudinary
 * Run this script FROM YOUR LOCAL COMPUTER where you have the real video files
 *
 * Usage:
 * 1. Install cloudinary: npm install cloudinary
 * 2. Run: node scripts/upload-videos-to-cloudinary.js
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'duguvwfnc',
  api_key: '961148883552239',
  api_secret: 'rGnhGHNCcbNnMAWEXkW6nE3MftA'
});

// Video files to upload
const videos = [
  'aerial-view.mp4',
  'chestnut-horse.mp4',
  'horse-hooves.mp4',
  'horse-portrait.mp4',
  'horse-ranch.mp4',
  'horses-grazing.mp4',
  'jockey-running.mp4',
  'jumping-slowmo.mp4',
  'rider-horse.mp4',
  'saddle-close.mp4',
  'stable-window.mp4',
  'stables-exit.mp4',
  'training.mp4',
  'whatsapp-video.mp4'
];

const videoDir = path.join(__dirname, '../public/video/compressed');
const cloudinaryFolder = 'scuderie-olgiata';

async function uploadVideo(filename) {
  const filepath = path.join(videoDir, filename);

  // Check if file exists and is not a Git LFS pointer
  const stats = fs.statSync(filepath);
  if (stats.size < 1024) {
    console.log(`⚠️  ${filename} is too small (${stats.size} bytes) - probably a Git LFS pointer. Skipping.`);
    return null;
  }

  console.log(`📤 Uploading ${filename}...`);

  try {
    const result = await cloudinary.uploader.upload(filepath, {
      resource_type: 'video',
      public_id: path.parse(filename).name, // filename without extension
      folder: cloudinaryFolder,
      overwrite: true,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });

    console.log(`✅ ${filename} uploaded! URL: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🎬 Starting video upload to Cloudinary...\n');
  console.log(`Cloud Name: duguvwfnc`);
  console.log(`Folder: ${cloudinaryFolder}\n`);

  const results = [];

  for (const video of videos) {
    const result = await uploadVideo(video);
    if (result) {
      results.push({
        filename: video,
        url: result.secure_url,
        publicId: result.public_id
      });
    }
  }

  console.log('\n✨ Upload complete!\n');
  console.log('📋 Uploaded videos:');
  results.forEach(r => {
    console.log(`  - ${r.filename}: ${r.url}`);
  });

  // Save results to a file
  fs.writeFileSync(
    path.join(__dirname, 'cloudinary-urls.json'),
    JSON.stringify(results, null, 2)
  );
  console.log('\n💾 URLs saved to scripts/cloudinary-urls.json');
}

main().catch(console.error);

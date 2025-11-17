#!/usr/bin/env node

const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'duguvwfnc',
  api_key: '961148883552239',
  api_secret: 'rGnhGHNCcbNnMAWEXkW6nE3MftA'
});

async function getVideos() {
  try {
    console.log('🎬 Fetching videos from Cloudinary folder: scuderie-olgiata\n');

    const result = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'video',
      prefix: 'scuderie-olgiata',
      max_results: 50
    });

    const videos = result.resources.map(resource => ({
      filename: resource.public_id.split('/').pop() + '.mp4',
      publicId: resource.public_id,
      url: resource.secure_url
    }));

    console.log('✅ Found videos:\n');
    videos.forEach(v => {
      console.log(`  ${v.filename}`);
      console.log(`    → ${v.url}\n`);
    });

    // Create a mapping object
    const mapping = {};
    videos.forEach(v => {
      mapping[v.filename] = v.url;
    });

    console.log('\n📋 Video mapping:');
    console.log(JSON.stringify(mapping, null, 2));

    return mapping;
  } catch (error) {
    console.error('❌ Error fetching videos:', error.message);
    return null;
  }
}

getVideos();

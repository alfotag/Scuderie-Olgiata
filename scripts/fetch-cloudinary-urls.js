#!/usr/bin/env node

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: 'duguvwfnc',
  api_key: '961148883552239',
  api_secret: 'rGnhGHNCcbNnMAWEXkW6nE3MftA'
});

async function getAllVideos() {
  try {
    console.log('🎬 Fetching all videos from Cloudinary...\n');

    const result = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'video',
      max_results: 100
    });

    console.log(`✅ Found ${result.resources.length} videos\n`);

    const mapping = {};

    result.resources.forEach(resource => {
      const originalName = resource.original_filename;
      const url = resource.secure_url;

      console.log(`📹 ${originalName}.mp4`);
      console.log(`   → ${url}\n`);

      // Create mapping with original filename
      mapping[`${originalName}.mp4`] = url;
    });

    // Save to file
    const output = {
      cloudName: 'duguvwfnc',
      videos: mapping,
      updatedAt: new Date().toISOString()
    };

    fs.writeFileSync(
      'cloudinary-video-urls.json',
      JSON.stringify(output, null, 2)
    );

    console.log('✅ Mapping saved to cloudinary-video-urls.json');
    console.log('\n📋 TypeScript mapping:');
    console.log('const CLOUDINARY_VIDEOS = ' + JSON.stringify(mapping, null, 2));

    return mapping;
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

getAllVideos();

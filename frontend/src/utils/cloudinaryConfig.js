import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'YOUR_CLOUDINARY_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET',
});

export default cloudinary;
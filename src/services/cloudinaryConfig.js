// services/cloudinaryConfig.js
export const CLOUDINARY_CONFIG = {
  CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  API_KEY: import.meta.env.VITE_CLOUDINARY_API_KEY,
  UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
};

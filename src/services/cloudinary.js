// services/cloudinary.js
import api from '../api';

export const uploadToCloudinary = async (file, folder, upload_preset) => {
  try {
    // Passer 'folder' et 'upload_preset' en paramètres
    const { data: { signature, timestamp, folder: returnedFolder, upload_preset: returnedUploadPreset } } = await api.get('/cloudinary/signature', {
      params: {
        folder,
        upload_preset
      }
    });
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', returnedFolder);
    formData.append('upload_preset', returnedUploadPreset);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    return await response.json();
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};


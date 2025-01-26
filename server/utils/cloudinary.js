import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file) => {
    try {
        if (!file) return null;
        
        // Return a promise that resolves when the file is uploaded
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto', // Automatically determine the file type (image, video, etc.)
                },
                (error, result) => {
                    if (error) {
                        reject('Cloudinary upload failed');
                    } else {
                        resolve(result); // Resolving with the upload result
                    }
                }
            );

            // Pipe the file buffer to Cloudinary
            const bufferStream = streamifier.createReadStream(file.buffer);
            bufferStream.pipe(uploadStream);
        });
        
    } catch (error) {
        return null;
    }
};

export { uploadOnCloudinary };

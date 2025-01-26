// import {v2 as cloudinary} from 'cloudinary'
// import fs from 'fs'

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if(!localFilePath) return null
//         // upload the file
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: 'auto'
//         })
//         fs.unlinkSync(localFilePath)
//         return response
        
//     } catch (error) {
//         fs.unlinkSync(localFilePath) // remove the file
//         return null
//     }
// }

// export {uploadOnCloudinary}



import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file) => {
    try {
        if (!file) return null;

        // Upload the file buffer directly to Cloudinary
        const response = await cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    console.error(error);
                    return null;
                }
                return result;
            }
        );

        // Pipe the buffer from multer to Cloudinary
        file.stream.pipe(response);

        return response; // You can return this once Cloudinary finishes uploading
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { uploadOnCloudinary };

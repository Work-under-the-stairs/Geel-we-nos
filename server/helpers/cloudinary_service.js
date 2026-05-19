const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


/**
 * Upload image or video to Cloudinary
 * @param {Buffer} fileBuffer - file buffer
 * @param {string} folder - target folder
 * @param {"image" | "video"} resourceType
 */
const uploadFile = (fileBuffer, folder, resourceType) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

/**
 * Delete single image or video
 * @param {string} publicId
 * @param {"image" | "video"} resourceType
 */
const deleteFile = async (publicId, resourceType) => {
  return await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
};

/**
 * Delete entire folder with all images/videos
 * @param {string} folderPath
 */
const deleteFolder = async (folderPath) => {
  // Delete images
  await cloudinary.api.delete_resources_by_prefix(folderPath, {
    resource_type: "image",
  });

  // Delete videos
  await cloudinary.api.delete_resources_by_prefix(folderPath, {
    resource_type: "video",
  });

  // Delete folder itself
  await cloudinary.api.delete_folder(folderPath);

  return { status: "folder_deleted" };
};

module.exports = {
  uploadFile,
  deleteFile,
  deleteFolder,
};
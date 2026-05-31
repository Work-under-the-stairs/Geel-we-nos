
const CONFIG = {
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
  useUnsignedUpload: false,
  authEndpoint: "/api/imagekit/auth"
};

/**
 * Upload file to ImageKit
 *
 * @param {File} file
 * @param {string} folder
 * @param {(progress:number)=>void} onProgress
 * @returns {Promise<{url: string, fileId: string}>}
 */
export async function uploadToImageKit(file, folder = "/articles", onProgress) {
  try {
    if (!file) throw new Error("No file selected");

    const authRes = await fetch(CONFIG.authEndpoint);
    if (!authRes.ok) throw new Error("Failed to fetch ImageKit auth params");
    const authParams = await authRes.json();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", `${Date.now()}-${file.name}`);
    formData.append("publicKey", CONFIG.publicKey || ""); 
    formData.append("folder", folder);
    formData.append("useUniqueFileName", "true");
    formData.append("token", authParams.token);
    formData.append("expire", authParams.expire.toString()); 
    formData.append("signature", authParams.signature);

    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://upload.imagekit.io/api/v1/files/upload");

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && onProgress) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        try {
          const response = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) {
            // هنا التعديل: إرجاع الرابط ومعرف الملف للاستخدام في الحذف لاحقاً
            resolve({
              url: response.url,
              fileId: response.fileId
            });
          } else {
            console.error("ImageKit Native Error Payload:", response);
            reject(new Error(response.message || "Upload failed"));
          }
        } catch (err) {
          reject(new Error("Invalid ImageKit response structural parsing layout"));
        }
      };

      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(formData);
    });
  } catch (error) {
    console.error("ImageKit Upload Error:", error);
    throw error;
  }
}

/**
 * Upload folders
 */
export const IK_FOLDERS = {
  featured: "/articles/featured",
  gallery: "/articles/gallery",
  video: "/articles/videos",
  editor: "/articles/editor",
};
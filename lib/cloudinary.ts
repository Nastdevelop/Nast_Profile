import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_url: process.env.CLOUDINARY_URL,
});

export async function uploadImage(base64: string): Promise<string> {
  const result = await cloudinary.uploader.upload(base64, {
    folder: "portfolio",
  });
  return result.secure_url;
}

export async function deleteImage(url: string): Promise<void> {
  const segments = url.split("/");
  const publicIdWithExt = segments[segments.length - 1];
  const publicId = "portfolio/" + publicIdWithExt.split(".")[0];
  await cloudinary.uploader.destroy(publicId);
}

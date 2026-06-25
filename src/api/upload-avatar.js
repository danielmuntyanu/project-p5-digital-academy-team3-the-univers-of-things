export default async function uploadAvatar(file) {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_ID);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: "POST",
                body: formData
            }
        ) 

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        if ('secure_url' in data) {
            return data?.secure_url
        }
    } catch (error) {
        console.log(`In uploadAvatar(): ${error}`);
        
    }
    
    


} 
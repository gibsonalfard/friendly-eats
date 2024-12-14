import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "@/src/lib/firebase/clientApp";

import { updateRestaurantImageReference } from "@/src/lib/firebase/firestore";

// Replace the two functions below
export async function updateRestaurantImage(restaurantId, image) {
    try {
        if (!restaurantId) {
            throw new Error("Restaurant ID is required");
        }

        if (!image) {
            throw new Error("Image is required");
        }

        publicImageUrl = await uploadImage(restaurantId, image);
        await updateRestaurantImageReference(restaurantId, publicImageUrl);

        return publicImageUrl;
    } catch (error) {
        console.error("Error updating restaurant image: ", error);
    }
}

async function uploadImage(restaurantId, image) {
    const filePath = `images/${restaurantId}/${image.name}`;
    const imageRef = ref(storage, filePath);
    await uploadBytesResumable(imageRef, image);

    return await getDownloadURL(imageRef);
}
// Replace the two functions above

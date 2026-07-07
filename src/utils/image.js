const API_URL =
    import.meta.env.VITE_API_URL.replace("/api", "");

export const getImageUrl = (path) => {

    if (!path) {

        return "https://placehold.co/600x600?text=No+Image";

    }

    return `${API_URL}${path}`;
    
};  
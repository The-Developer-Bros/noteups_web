import axios from 'axios';

// cloduinary v2
export default axios.create({
    baseURL: 'https://api.cloudinary.com/v2/noteups',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.CLOUDINARY_API_KEY}`
    }
});

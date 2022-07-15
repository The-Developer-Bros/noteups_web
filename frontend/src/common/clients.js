import axios from "axios";

// cloduinary v2
// export default axios.create({
//     baseURL: 'https://api.cloudinary.com/v2/noteups',
//     headers: {
//         'X-Requested-With': 'XMLHttpRequest',
//         'Content-Type': 'application/json',
//         'Authorization': `Basic ${process.env.CLOUDINARY_API_KEY}`
//     }
// });

export const cloudinaryClient = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/noteups",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    Authorization: `Basic ${process.env.CLOUDINARY_API_KEY}`,
  },
});

export const backendClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "https://localhost:4000",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
    // Authorization: `Basic ${process.env.HEROKU_API_KEY}`,
  },
});

import { motion } from 'framer-motion'
import React from 'react'

const ProductListingCard = ({ movie }) => {
    return (
        <motion.div layout
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </motion.div>
    )
}

export default ProductListingCard
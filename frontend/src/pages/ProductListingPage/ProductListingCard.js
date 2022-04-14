import { motion } from 'framer-motion'
import React from 'react'

const ProductListingCard = ({ subject }) => {
    console.log(`subject:`, subject);
    return (
        <motion.div
            layout
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2>{subject.name}</h2>
            <img src={subject.poster} alt={subject.name}
            />
        </motion.div>
    )
}

export default ProductListingCard
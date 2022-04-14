// Convert dashed casing to Sentence Casing
// "electrical-and-electronics" to "Electrical and Electronics"
export const convertToSentenceCase = (str) => {
    return str.replace(/-/g, ' ').replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
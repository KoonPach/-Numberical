export const createEmptyMatrix = (rows, cols) => {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
};

export const calculateCramerRule = (matrix, constants) => {
    const det = determinant(matrix);
    if (det === 0) return ["No unique solution"];

    const results = [];
    for (let i = 0; i < matrix.length; i++) {
        const modifiedMatrix = matrix.map((row, index) =>
            row.map((value, colIndex) =>
                colIndex === i ? constants[index] : value
            )
        );
        results.push(determinant(modifiedMatrix) / det);
    }

    return results;
};

const determinant = (matrix) => {
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    let det = 0;
    for (let i = 0; i < n; i++) {
        const subMatrix = matrix
            .slice(1)
            .map((row) => row.filter((_, index) => index !== i));
        det += matrix[0][i] * determinant(subMatrix) * (i % 2 === 0 ? 1 : -1);
    }

    return det;
};

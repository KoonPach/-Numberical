import { useState, useEffect } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = 'http://localhost:5000/api/matrix-data';

const Cholesky = () => {
    const [matrixSize, setMatrixSize] = useState(2); 
    const [matrix, setMatrix] = useState(Array(2).fill(Array(2).fill(0)));
    const [constants, setConstants] = useState(Array(2).fill(0));
    const [solution, setSolution] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        setMatrix(Array(matrixSize).fill(Array(matrixSize).fill(0)));
        setConstants(Array(matrixSize).fill(0));
        setShowResults(false);
    }, [matrixSize]);

    const choleskyDecompose = (matrix) => {
        const n = matrix.length;
        const L = Array(n).fill(null).map(() => Array(n).fill(0));

        for (let i = 0; i < n; i++) {
            for (let j = 0; j <= i; j++) {
                let sum = 0;

                if (i === j) { 
                    for (let k = 0; k < j; k++) sum += L[j][k] * L[j][k];
                    L[i][j] = Math.sqrt(matrix[i][i] - sum);
                } else { 
                    for (let k = 0; k < j; k++) sum += L[i][k] * L[j][k];
                    L[i][j] = (matrix[i][j] - sum) / L[j][j];
                }
            }
        }
        return L;
    };

    const forwardSubstitution = (L, b) => {
        const y = Array(b.length).fill(0);
        for (let i = 0; i < b.length; i++) {
            let sum = 0;
            for (let j = 0; j < i; j++) sum += L[i][j] * y[j];
            y[i] = (b[i] - sum) / L[i][i];
        }
        return y;
    };

    const backwardSubstitution = (Lt, y) => {
        const x = Array(y.length).fill(0);
        for (let i = y.length - 1; i >= 0; i--) {
            let sum = 0;
            for (let j = i + 1; j < y.length; j++) sum += Lt[i][j] * x[j];
            x[i] = (y[i] - sum) / Lt[i][i];
        }
        return x;
    };

    const calculateCholesky = () => {
        const L = choleskyDecompose(matrix);
        const Lt = L.map((row, i) => row.map((_, j) => L[j][i])); // Transpose of L
        const y = forwardSubstitution(L, constants);
        const x = backwardSubstitution(Lt, y);
        setSolution(x);
        setShowResults(true);
    };

    const handleMatrixSizeChange = (event) => {
        const size = parseInt(event.target.value);
        setMatrixSize(size);
    };

    const handleMatrixChange = (row, col, value) => {
        const newMatrix = matrix.map((r, i) => (i === row ? [...r] : r));
        newMatrix[row][col] = parseFloat(value);
        setMatrix(newMatrix);
    };

    const handleConstantsChange = (index, value) => {
        const newConstants = [...constants];
        newConstants[index] = parseFloat(value);
        setConstants(newConstants);
    };

    const handleFetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const result = await response.json();
            setMatrix(result.matrix);
            setConstants(result.constants);
            setMatrixSize(result.matrix.length);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Select Matrix Size</Form.Label>
                    <Form.Select value={matrixSize} onChange={handleMatrixSizeChange}>
                        <option value={2}>2x2</option>
                        <option value={3}>3x3</option>
                        <option value={4}>4x4</option>
                    </Form.Select>
                </Form.Group>

                <h5>Enter Matrix A:</h5>
                {matrix.map((row, i) => (
                    <div key={i}>
                        {row.map((_, j) => (
                            <input
                                key={j}
                                type="number"
                                value={matrix[i][j]}
                                onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                                style={{ width: "60px", margin: "5px" }}
                            />
                        ))}
                    </div>
                ))}

                <h5>Enter Matrix B:</h5>
                {constants.map((value, i) => (
                    <input
                        key={i}
                        type="number"
                        value={value}
                        onChange={(e) => handleConstantsChange(i, e.target.value)}
                        style={{ width: "60px", margin: "5px" }}
                    />
                ))}
            </Form>
            <Button variant="dark" onClick={calculateCholesky}>Calculate</Button>
            <Button variant="info" onClick={handleFetchData} style={{ marginLeft: "10px" }}>Fetch API</Button>

            {showResults && (
                <>
                    <h5>Solutions:</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {solution.map((_, index) => (
                                    <th key={index}>X{index + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {solution.map((value, index) => (
                                    <td key={index}>{value.toFixed(5)}</td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
};

export default Cholesky;

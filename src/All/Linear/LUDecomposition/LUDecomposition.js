import { useState, useEffect } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = 'http://localhost:5000/api/matrix-data';

const LUDecomposition = () => {
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

    const luDecompose = (matrix) => {
        const n = matrix.length;
        const L = Array(n).fill(null).map(() => Array(n).fill(0));
        const U = Array(n).fill(null).map(() => Array(n).fill(0));

        for (let i = 0; i < n; i++) {
            for (let k = i; k < n; k++) {
                let sum = 0;
                for (let j = 0; j < i; j++) sum += L[i][j] * U[j][k];
                U[i][k] = matrix[i][k] - sum;
            }

            for (let k = i; k < n; k++) {
                if (i === k) L[i][i] = 1;
                else {
                    let sum = 0;
                    for (let j = 0; j < i; j++) sum += L[k][j] * U[j][i];
                    L[k][i] = (matrix[k][i] - sum) / U[i][i];
                }
            }
        }
        return { L, U };
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

    const backwardSubstitution = (U, y) => {
        const x = Array(y.length).fill(0);
        for (let i = y.length - 1; i >= 0; i--) {
            let sum = 0;
            for (let j = i + 1; j < y.length; j++) sum += U[i][j] * x[j];
            x[i] = (y[i] - sum) / U[i][i];
        }
        return x;
    };

    const calculateLU = () => {
        const { L, U } = luDecompose(matrix);
        const y = forwardSubstitution(L, constants);
        const x = backwardSubstitution(U, y);
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
            <Button variant="dark" onClick={calculateLU}>Calculate</Button>
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

export default LUDecomposition;

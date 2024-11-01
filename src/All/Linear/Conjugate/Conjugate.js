import { useState, useEffect } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = 'http://localhost:5000/api/matrix-data';

const Conjugate = () => {
    const [matrixSize, setMatrixSize] = useState(2); 
    const [matrix, setMatrix] = useState(Array(2).fill(Array(2).fill(0)));
    const [constants, setConstants] = useState(Array(2).fill(0));
    const [solution, setSolution] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [iterations, setIterations] = useState(100); 

    useEffect(() => {
        const newMatrix = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0));
        const newConstants = Array(matrixSize).fill(0);
        setMatrix(newMatrix);
        setConstants(newConstants);
        setShowResults(false);
    }, [matrixSize]);

    const calculateConjugateGradient = () => {
        const x = Array(matrixSize).fill(0); 
        const b = constants.slice();
        const r = b.map((bi, i) => bi - matrix[i].reduce((acc, aij, j) => acc + aij * x[j], 0)); // Initial residual
        let p = [...r]; 
        const tolerance = 1e-10;

        for (let it = 0; it < iterations; it++) {
            const rsold = r.reduce((acc, val) => acc + val * val, 0); 

   
            const Ap = matrix.map(row => row.reduce((acc, aij, j) => acc + aij * p[j], 0));

            const alpha = rsold / p.reduce((acc, pi, i) => acc + pi * Ap[i], 0);

         
            for (let i = 0; i < matrixSize; i++) {
                x[i] += alpha * p[i];
            }

       
            for (let i = 0; i < matrixSize; i++) {
                r[i] -= alpha * Ap[i];
            }

            const rsnew = r.reduce((acc, val) => acc + val * val, 0); 

            if (Math.sqrt(rsnew) < tolerance) {
                break;
            }

 
            p = r.map((ri, i) => ri + (rsnew / rsold) * p[i]);
        }

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
            <Button variant="dark" onClick={calculateConjugateGradient}>Calculate</Button>
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

export default Conjugate;

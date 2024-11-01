import { useState, useEffect } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = 'http://localhost:5000/api/matrix-data';

const GaussElimination = () => {
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

    const calculateGaussElimination = () => {
       
        const mat = matrix.map(row => [...row]);
        const consts = [...constants];
        const n = matrixSize;

        //Forward 
        for (let i = 0; i < n; i++) {
          
            if (mat[i][i] === 0) {
                alert("cannot be solved");
                return;
            }

            // Normalize pivot row
            for (let j = i + 1; j < n; j++) {
                const factor = mat[j][i] / mat[i][i];
                for (let k = i; k < n; k++) {
                    mat[j][k] -= factor * mat[i][k];
                }
                consts[j] -= factor * consts[i];
            }
        }

        //Back 
        const sol = Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            let sum = consts[i];
            for (let j = i + 1; j < n; j++) {
                sum -= mat[i][j] * sol[j];
            }
            sol[i] = sum / mat[i][i];
        }

        setSolution(sol);
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
            <Button variant="dark" onClick={calculateGaussElimination}>Calculate</Button>
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

export default GaussElimination;

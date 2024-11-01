import { useState, useEffect } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = 'http://localhost:5000/api/matrix-data';

const MatrixInverse = () => {
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

  
    const inverseMatrix = (matrix) => {
        const n = matrix.length;
        let augmented = matrix.map((row, i) => [
            ...row,
            ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
        ]);

       
        for (let i = 0; i < n; i++) {
            if (augmented[i][i] === 0) {
                alert("Matrix is singular and cannot be inverted.");
                return null;
            }

       
            let factor = augmented[i][i];
            for (let j = 0; j < 2 * n; j++) {
                augmented[i][j] /= factor;
            }

           
            for (let k = 0; k < n; k++) {
                if (k !== i) {
                    let factor = augmented[k][i];
                    for (let j = 0; j < 2 * n; j++) {
                        augmented[k][j] -= factor * augmented[i][j];
                    }
                }
            }
        }


        const inverse = augmented.map(row => row.slice(n));
        return inverse;
    };

    const calculateInverseSolution = () => {
        const invMatrix = inverseMatrix(matrix);
        if (!invMatrix) return; 

    
        const sol = constants.map((_, i) =>
            invMatrix[i].reduce((sum, val, j) => sum + val * constants[j], 0)
        );

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
            <Button variant="dark" onClick={calculateInverseSolution}>Calculate</Button>
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

export default MatrixInverse;

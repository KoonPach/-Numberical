import { useState, useEffect } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const GaussJordanElimination = () => {
    const [matrixSize, setMatrixSize] = useState(2); 
    const [matrix, setMatrix] = useState(Array(2).fill(Array(3).fill(0)));
    const [solution, setSolution] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
       
        setMatrix(Array(matrixSize).fill(Array(matrixSize + 1).fill(0))); 
        setShowResults(false);
    }, [matrixSize]);

    const gaussJordan = (matrix) => {
        const n = matrix.length;
        let augmentedMatrix = matrix.map(row => [...row]); 

        for (let i = 0; i < n; i++) {
        
            let pivot = augmentedMatrix[i][i];
            if (pivot === 0) {
                alert("Matrix is singular or has no unique solution.");
                return null;
            }
            for (let j = 0; j < n + 1; j++) {
                augmentedMatrix[i][j] /= pivot;
            }

          
            for (let k = 0; k < n; k++) {
                if (k !== i) {
                    let factor = augmentedMatrix[k][i];
                    for (let j = 0; j < n + 1; j++) {
                        augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
                    }
                }
            }
        }

   
        const solutions = augmentedMatrix.map(row => row[n]);
        return solutions;
    };

   
    const calculateGaussJordan = () => {
        const sol = gaussJordan(matrix);
        if (sol) {
            setSolution(sol);
            setShowResults(true);
        }
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

    const handleFetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/matrix-data');
            const result = await response.json();
            setMatrix(result.matrix.map((row, i) => [...row, result.constants[i]]));
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

                <h5>Enter Matrix A: | B:</h5>
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

            </Form>
            <Button variant="dark" onClick={calculateGaussJordan}>Calculate</Button>
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

export default GaussJordanElimination;

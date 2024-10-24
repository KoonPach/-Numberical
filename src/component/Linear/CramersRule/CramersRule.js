import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { calculateCramerRule } from "./CramerRuleUtils";
import { createEmptyMatrix } from "./MatrixUtils";

const CramerRule = () => {
    const [matrixSize, setMatrixSize] = useState(2); 
    const [matrix, setMatrix] = useState(createEmptyMatrix(2, 2));
    const [constants, setConstants] = useState(Array(2).fill());
    const [results, setResults] = useState([]);

    const handleSizeChange = (e) => {
        const size = parseInt(e.target.value);
        setMatrixSize(size);
        setMatrix(createEmptyMatrix(size, size));
        setConstants(Array(size).fill(0));
        setResults([]);
    };

    const handleMatrixChange = (row, col, value) => {
        const newMatrix = [...matrix];
        newMatrix[row][col] = parseFloat(value);
        setMatrix(newMatrix);
    };

    const handleConstantsChange = (index, value) => {
        const newConstants = [...constants];
        newConstants[index] = parseFloat(value);
        setConstants(newConstants);
    };

    const calculateResult = () => {
        const result = calculateCramerRule(matrix, constants);
        setResults(result);
    };

    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label>Select Matrix Size</Form.Label>
                    <Form.Control
                        as="select"
                        value={matrixSize}
                        onChange={handleSizeChange}
                    >
                        {[2, 3, 4, 5].map((size) => (
                            <option key={size} value={size}>
                                {size}x{size}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Input Matrix (A)</Form.Label>
                    {matrix.map((row, rowIndex) => (
                        <div key={rowIndex}>
                            {row.map((value, colIndex) => (
                                <input
                                    type="number"
                                    value={value}
                                    key={`${rowIndex}-${colIndex}`}
                                    onChange={(e) =>
                                        handleMatrixChange(
                                            rowIndex,
                                            colIndex,
                                            e.target.value
                                        )
                                    }
                                    style={{ width: "60px", margin: "5px" }}
                                />
                            ))}
                        </div>
                    ))}
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Input Constants (B)</Form.Label>
                    <div>
                        {constants.map((value, index) => (
                            <input
                                type="number"
                                value={value}
                                key={index}
                                onChange={(e) =>
                                    handleConstantsChange(index, e.target.value)
                                }
                                style={{ width: "60px", margin: "5px" }}
                            />
                        ))}
                    </div>
                </Form.Group>
                <br />
                <Button variant="dark" onClick={calculateResult}>
                    Calculate
                </Button>
            </Form>
            <br />
            <h5>Results</h5>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {results.map((result, index) => (
                            <th key={index}>X{index + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {results.map((result, index) => (
                            <td key={index}>{result.toFixed(6)}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default CramerRule;

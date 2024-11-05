import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MultipleLinearRegression = () => {
    const [dataPoints, setDataPoints] = useState([{ x1: "", x2: "", x3: "", y: "" }]);
    const [coefficients, setCoefficients] = useState([]);

    
    const handleFetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/multiple-linear-regression-data');
            const data = await response.json();
            setDataPoints(data.points || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Handle changes in input fields
    const handleInputChange = (index, field, value) => {
        const newPoints = [...dataPoints];
        newPoints[index][field] = value;
        setDataPoints(newPoints);
    };

   
    const handleAddDataPoint = () => {
        setDataPoints([...dataPoints, { x1: "", x2: "", x3: "", y: "" }]);
    };

    
    const calculateMultipleLinearRegression = () => {
        const n = dataPoints.length;
        if (n === 0) return;

        const X = [];
        const Y = [];

     
        dataPoints.forEach(point => {
            const x1 = parseFloat(point.x1);
            const x2 = parseFloat(point.x2);
            const x3 = parseFloat(point.x3);
            const y = parseFloat(point.y);

            if (!isNaN(x1) && !isNaN(x2) && !isNaN(x3) && !isNaN(y)) {
                X.push([1, x1, x2, x3]); 
                Y.push(y);
            }
        });

        const XT = transpose(X);
        const XTX = multiplyMatrices(XT, X);
        const XTY = multiplyMatrixVector(XT, Y);

        const resultCoefficients = gaussJordan(XTX, XTY);
        setCoefficients(resultCoefficients || []);
    };

    
    const transpose = (matrix) => {
        return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    };

    
    const multiplyMatrices = (A, B) => {
        const result = Array(A.length).fill().map(() => Array(B[0].length).fill(0));
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < B[0].length; j++) {
                for (let k = 0; k < B.length; k++) {
                    result[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return result;
    };

 
    const multiplyMatrixVector = (matrix, vector) => {
        return matrix.map(row => row.reduce((sum, val, i) => sum + val * vector[i], 0));
    };

   
    const gaussJordan = (matrix, vector) => {
        const n = matrix.length;
        for (let i = 0; i < n; i++) {
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
                    maxRow = k;
                }
            }
            [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
            [vector[i], vector[maxRow]] = [vector[maxRow], vector[i]];

            for (let k = i + 1; k < n; k++) {
                const factor = matrix[k][i] / matrix[i][i];
                vector[k] -= factor * vector[i];
                for (let j = i; j < n; j++) {
                    matrix[k][j] -= factor * matrix[i][j];
                }
            }
        }

        const solution = Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            solution[i] = vector[i] / matrix[i][i];
            for (let k = i - 1; k >= 0; k--) {
                vector[k] -= matrix[k][i] * solution[i];
            }
        }
        return solution;
    };

    return (
        <Container>
            <h3>Multiple Linear Regression</h3>

            <Form>
                <h5>Data Points:</h5>
                {dataPoints.map((point, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                        <Form.Group style={{ display: "inline-block", marginRight: "10px" }}>
                            <Form.Label>x1:</Form.Label>
                            <Form.Control
                                type="number"
                                value={point.x1}
                                onChange={(e) => handleInputChange(index, "x1", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group style={{ display: "inline-block", marginRight: "10px" }}>
                            <Form.Label>x2:</Form.Label>
                            <Form.Control
                                type="number"
                                value={point.x2}
                                onChange={(e) => handleInputChange(index, "x2", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group style={{ display: "inline-block", marginRight: "10px" }}>
                            <Form.Label>x3:</Form.Label>
                            <Form.Control
                                type="number"
                                value={point.x3}
                                onChange={(e) => handleInputChange(index, "x3", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group style={{ display: "inline-block" }}>
                            <Form.Label>y:</Form.Label>
                            <Form.Control
                                type="number"
                                value={point.y}
                                onChange={(e) => handleInputChange(index, "y", e.target.value)}
                            />
                        </Form.Group>
                    </div>
                ))}

                <Button variant="secondary" onClick={handleAddDataPoint} style={{ marginTop: "10px" }}>
                    Add Point
                </Button>

                <Button variant="primary" onClick={calculateMultipleLinearRegression} style={{ marginTop: "10px", marginLeft: "10px" }}>
                    Calculate
                </Button>

                <Button variant="info" onClick={handleFetchData} style={{ marginTop: "10px", marginLeft: "10px" }}>
                    Fetch API
                </Button>
            </Form>

            {coefficients.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                   
                    <h2>
                    Result: f(x) = {coefficients.map((coef, index) => (
                            <span key={index}>
                                {coef.toFixed(0)}{index > 0 ? `x${index}` : ""}{index < coefficients.length - 1 ? " + " : ""}
                            </span>
                        ))}
                    </h2>
                </div>
            )}
        </Container>
    );
};

export default MultipleLinearRegression;

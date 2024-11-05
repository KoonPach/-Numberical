import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PolynomialRegression = () => {
    const [dataPoints, setDataPoints] = useState([{ x: "", y: "" }]);
    const [degree, setDegree] = useState(2); 
    const [coefficients, setCoefficients] = useState([]);

    
    const handleFetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/linear-regression-data'); 
            const data = await response.json();

            
            setDataPoints(data.points || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    
    const handleInputChange = (index, field, value) => {
        const newPoints = [...dataPoints];
        newPoints[index][field] = value;
        setDataPoints(newPoints);
    };

    
    const handleAddDataPoint = () => {
        setDataPoints([...dataPoints, { x: "", y: "" }]);
    };

   
    const calculatePolynomialRegression = () => {
        const n = dataPoints.length;
        if (n === 0) return;

        const X = [];
        const Y = [];

        dataPoints.forEach(point => {
            const x = parseFloat(point.x);
            const y = parseFloat(point.y);

            if (!isNaN(x) && !isNaN(y)) {
                X.push(x);
                Y.push(y);
            }
        });

        
        const matrix = Array.from({ length: degree + 1 }, () => Array(degree + 1).fill(0));
        const vector = Array(degree + 1).fill(0);

        for (let i = 0; i <= degree; i++) {
            for (let j = 0; j <= degree; j++) {
                matrix[i][j] = X.reduce((sum, x) => sum + Math.pow(x, i + j), 0);
            }
            vector[i] = Y.reduce((sum, y, index) => sum + y * Math.pow(X[index], i), 0);
        }

      
        const coefficients = gaussJordan(matrix, vector);
        setCoefficients(coefficients);
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
            <h3>Polynomial Regression</h3>

            <Form>
                {/* <Form.Group>
                    <Form.Label>Degree of Polynomial:</Form.Label>
                    <Form.Control
                        type="number"
                        value={degree}
                        onChange={(e) => setDegree(parseInt(e.target.value) || 2)}
                    />
                </Form.Group> */}

                <h5>Data Points:</h5>
                {dataPoints.map((point, index) => (
                    <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                        <Form.Group>
                            <Form.Label>x:</Form.Label>
                            <Form.Control
                                type="number"
                                value={point.x}
                                onChange={(e) => handleInputChange(index, "x", e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
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

                <Button variant="primary" onClick={calculatePolynomialRegression} style={{ marginTop: "10px", marginLeft: "10px" }}>
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
                                {coef.toFixed(4)}{index > 0 ? `x^${index}` : ""}{index < coefficients.length - 1 ? " + " : ""}
                            </span>
                        ))}
                    </h2>
                </div>
            )}
        </Container>
    );
};

export default PolynomialRegression;

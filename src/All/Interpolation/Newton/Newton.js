import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5000/api/newton-data";

const NewtonInterpolation = () => {
    const [points, setPoints] = useState([{ x: '', y: '' }]);
    const [xValue, setXValue] = useState(0);
    const [interpolatedValue, setInterpolatedValue] = useState(null);
    const [showResults, setShowResults] = useState(false);

    // Function to fetch Newton data from the API
    const handleFetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const result = await response.json();
            setPoints(result.points.map(point => ({ x: point.x, y: point.y }))); // Assuming the API returns an array of points with x and y
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Function to perform Newton's interpolation
    const calculateNewtonInterpolation = (x) => {
        const n = points.length;
        let result = points[0].y; // Initial value for result (f(x0))

        // Calculate the divided differences
        const dividedDifferences = Array(n).fill(0).map(() => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            dividedDifferences[i][0] = parseFloat(points[i].y); // f[x_i]
        }

        for (let j = 1; j < n; j++) {
            for (let i = 0; i < n - j; i++) {
                dividedDifferences[i][j] = (dividedDifferences[i + 1][j - 1] - dividedDifferences[i][j - 1]) / (parseFloat(points[i + j].x) - parseFloat(points[i].x));
            }
        }

        // Calculate interpolated value using Newton's formula
        for (let i = 1; i < n; i++) {
            let term = dividedDifferences[0][i]; // f[x_0, x_1, ..., x_i]
            for (let j = 0; j < i; j++) {
                term *= (x - parseFloat(points[j].x)); // (x - x_j)
            }
            result += term;
        }

        return result;
    };

    const handleCalculate = () => {
        const value = calculateNewtonInterpolation(xValue);
        setInterpolatedValue(value);
        setShowResults(true);
    };

    const handlePointChange = (index, field, value) => {
        const newPoints = [...points];
        newPoints[index][field] = value;
        setPoints(newPoints);
    };

    const handleAddPoint = () => {
        setPoints([...points, { x: '', y: '' }]); // Add a new point with empty values
    };

    return (
        <Container>
            <h5>Input Points:</h5>
            {points.map((point, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <Form.Control
                        type="number"
                        placeholder={`X${index + 1}`}
                        value={point.x}
                        onChange={(e) => handlePointChange(index, 'x', e.target.value)}
                        style={{ width: "100px", display: "inline-block", marginRight: "10px" }}
                    />
                    <Form.Control
                        type="number"
                        placeholder={`Y${index + 1}`}
                        value={point.y}
                        onChange={(e) => handlePointChange(index, 'y', e.target.value)}
                        style={{ width: "100px", display: "inline-block", marginRight: "10px" }}
                    />
                </div>
            ))}

            <Button variant="success" onClick={handleAddPoint} style={{ marginBottom: "10px" }}>
                Add Point
            </Button>

            <h5>Input X:</h5>
            <Form.Control
                type="number"
                value={xValue}
                onChange={(e) => setXValue(parseFloat(e.target.value))}
                style={{ width: "200px", marginBottom: "10px" }}
            />

            <Button variant="dark" onClick={handleCalculate} style={{ marginRight: "10px" }}>
                Calculate
            </Button>
            <Button variant="info" onClick={handleFetchData} style={{ marginLeft: "10px" }}>Fetch API</Button>

            {showResults && interpolatedValue !== null && (
                <>
                    <h1>{interpolatedValue.toFixed(5)}</h1>
                </>
            )}
        </Container>
    );
};

export default NewtonInterpolation;

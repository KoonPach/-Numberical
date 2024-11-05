import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const NewtonInterpolation = () => {
    const [points, setPoints] = useState([{ x: '', y: '' }]);
    const [xValue, setXValue] = useState(0);
    const [interpolatedValue, setInterpolatedValue] = useState(null);
    const [showResults, setShowResults] = useState(false);

    
    const handleFetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/newton-data');
            const result = await response.json();
            setPoints(result.points.map(point => ({ x: point.x, y: point.y }))); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    
    const calculateNewtonInterpolation = (x) => {
        const n = points.length;
        let result = points[0].y; 

      
        const dividedDifferences = Array(n).fill(0).map(() => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            dividedDifferences[i][0] = parseFloat(points[i].y); 
        }

        for (let j = 1; j < n; j++) {
            for (let i = 0; i < n - j; i++) {
                dividedDifferences[i][j] = (dividedDifferences[i + 1][j - 1] - dividedDifferences[i][j - 1]) / (parseFloat(points[i + j].x) - parseFloat(points[i].x));
            }
        }

        
        for (let i = 1; i < n; i++) {
            let term = dividedDifferences[0][i]; 
            for (let j = 0; j < i; j++) {
                term *= (x - parseFloat(points[j].x));
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
        setPoints([...points, { x: '', y: '' }]); 
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

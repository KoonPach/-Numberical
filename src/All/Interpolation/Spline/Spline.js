import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5000/api/newton-data"; 

const LinearSplineInterpolation = () => {
    const [points, setPoints] = useState([{ x: '', y: '' }]);
    const [xValue, setXValue] = useState(0);
    const [interpolatedValue, setInterpolatedValue] = useState(null);
    const [showResults, setShowResults] = useState(false);

    
    const handleFetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const result = await response.json();
            setPoints(result.points.map(point => ({ x: point.x, y: point.y }))); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    
    const calculateLinearSplineInterpolation = (x) => {
        const n = points.length;
        if (n < 2) return null; 

        
        for (let i = 0; i < n - 1; i++) {
            if (x >= parseFloat(points[i].x) && x <= parseFloat(points[i + 1].x)) {
                const x0 = parseFloat(points[i].x);
                const y0 = parseFloat(points[i].y);
                const x1 = parseFloat(points[i + 1].x);
                const y1 = parseFloat(points[i + 1].y);
                
                
                return y0 + ((y1 - y0) / (x1 - x0)) * (x - x0);
            }
        }

        return null; 
    };

    const handleCalculate = () => {
        const value = calculateLinearSplineInterpolation(xValue);
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
            <Button variant="info" onClick={handleFetchData} style={{ marginLeft: "10px" }}>
                Fetch API
            </Button>

            {showResults && interpolatedValue !== null && (
                <>
                    <h1>Interpolated Value: {interpolatedValue.toFixed(5)}</h1>
                </>
            )}
        </Container>
    );
};

export default LinearSplineInterpolation;

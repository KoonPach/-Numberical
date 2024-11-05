import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const LinearRegression = () => {
    const [dataPoints, setDataPoints] = useState([{ x: "", y: "" }]);
    const [slope, setSlope] = useState(null);
    const [intercept, setIntercept] = useState(null);

    
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

   
    const calculateLinearRegression = () => {
        const n = dataPoints.length;
        if (n === 0) return;

        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumX2 = 0;

        dataPoints.forEach(point => {
            const x = parseFloat(point.x);
            const y = parseFloat(point.y);

            if (!isNaN(x) && !isNaN(y)) {
                sumX += x;
                sumY += y;
                sumXY += x * y;
                sumX2 += x * x;
            }
        });

        const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const b = (sumY - m * sumX) / n;

        setSlope(m);
        setIntercept(b);
    };

    return (
        <Container>
            <h3>Linear Regression</h3>
            

            <Form>
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

                <Button variant="primary" onClick={calculateLinearRegression} style={{ marginTop: "10px", marginLeft: "10px" }}>
                    Calculate
                </Button>

                <Button variant="info" onClick={handleFetchData} style={{ marginTop: "10px", marginLeft: "10px"}}>
                Fetch API
                </Button>
            </Form>

            {slope !== null && intercept !== null && (
                <div style={{ marginTop: "20px" }}>
                   
                    <h2>Result: f(x) =  {intercept.toFixed(4)} + {slope.toFixed(4)}x</h2>
                </div>
            )}
        </Container>
    );
};

export default LinearRegression;

import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate } from "mathjs";
import "bootstrap/dist/css/bootstrap.min.css";


const Central2 = () => {
    const [expression, setExpression] = useState("");  
    const [x, setX] = useState();                     
    const [h, setH] = useState();                     
    const [result, setResult] = useState(null);        

   
    const handleFetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/forward-difference-data');
            const data = await response.json();

            
            setExpression(data.expression);
            setX(data.x);
            setH(data.h);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

   
    const calculateCentralDifference = () => {
        
        const fxhPlus = evaluate(expression, { x: x + h });
        const fxhMinus = evaluate(expression, { x: x - h });
        const result = (fxhPlus - fxhMinus) / (2 * h);
        setResult(result);
    };

    return (
        <Container>
            <h3>Central Divided Difference O(h⁴)</h3>
            <Form>
                <Form.Group>
                    <Form.Label>Input F(X):</Form.Label>
                    <Form.Control
                        type="text"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Input x:</Form.Label>
                    <Form.Control
                        type="number"
                        value={x}
                        onChange={(e) => setX(parseFloat(e.target.value))}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Input h:</Form.Label>
                    <Form.Control
                        type="number"
                        value={h}
                        onChange={(e) => setH(parseFloat(e.target.value))}
                    />
                </Form.Group>

                <Button variant="primary" onClick={calculateCentralDifference} style={{ marginRight: "10px" }}>
                    Calculate
                </Button>
                <Button variant="info" onClick={handleFetchData}>
                    Fetch API
                </Button>
            </Form>

            {result !== null && (
                <div style={{ marginTop: "20px" }}>
                    <h4>Result: {result.toFixed(5)}</h4>
                </div>
            )}
        </Container>
    );
};

export default Central2;

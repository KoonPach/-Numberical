import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate } from "mathjs";
import "bootstrap/dist/css/bootstrap.min.css";
 

const SingleSimpson = () => {
    const [expression, setExpression] = useState("");  
    const [a, setA] = useState();                    
    const [b, setB] = useState();                    
    const [result, setResult] = useState(null);      

   
    const handleFetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/integration-data');
            const data = await response.json();

            
            setExpression(data.expression);
            setA(data.a);
            setB(data.b);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

   
    const calculateSingleSimpson = () => {
        const h = (b - a) / 2; 
        const midpoint = (a + b) / 2;

       
        const result = (h / 3) * (
            evaluate(expression, { x: a }) +
            4 * evaluate(expression, { x: midpoint }) +
            evaluate(expression, { x: b })
        );

        setResult(result);
    };

    return (
        <Container>
            <h3>Single Simpson's Rule</h3>
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
                    <Form.Label>Input a:</Form.Label>
                    <Form.Control
                        type="number"
                        value={a}
                        onChange={(e) => setA(parseFloat(e.target.value))}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Input b:</Form.Label>
                    <Form.Control
                        type="number"
                        value={b}
                        onChange={(e) => setB(parseFloat(e.target.value))}
                    />
                </Form.Group>

                <Button variant="primary" onClick={calculateSingleSimpson} style={{ marginRight: "10px" }}>
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

export default SingleSimpson;

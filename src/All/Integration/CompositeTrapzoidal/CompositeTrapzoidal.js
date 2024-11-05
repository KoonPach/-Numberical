import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate } from "mathjs";
import "bootstrap/dist/css/bootstrap.min.css";

const CompositeTrapzoidal = () => {
    const [expression, setExpression] = useState("");
    const [a, setA] = useState();
    const [b, setB] = useState();
    const [n, setN] = useState();
    const [result, setResult] = useState(null);


    const handleFetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/Integration-data');
            const result = await response.json();

            setExpression(result.expression);
            setA(result.a);
            setB(result.b);
            setN(result.n);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const calculateCompositeTrapezoidal = () => {
        const h = (b - a) / n;
        let sum = (evaluate(expression, { x: a }) + evaluate(expression, { x: b })) / 2;

        for (let i = 1; i < n; i++) {
            const x = a + i * h;
            sum += evaluate(expression, { x: x });
        }

        const result = h * sum;
        setResult(result);
    };

    return (
        <Container>
            <h3>Composite Trapezoidal Rule</h3>
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

                <Form.Group>
                    <Form.Label>Input n:</Form.Label>
                    <Form.Control
                        type="number"
                        value={n}
                        onChange={(e) => setN(parseInt(e.target.value))}
                    />
                </Form.Group>

                <Button variant="primary" onClick={calculateCompositeTrapezoidal} style={{ marginRight: "10px" }}>
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

export default CompositeTrapzoidal;

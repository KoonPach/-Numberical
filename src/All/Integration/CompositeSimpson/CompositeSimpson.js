import React, { useState } from "react";
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { evaluate } from "mathjs";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2"

const CompositeSimpson = ()=>{
    const [expression,setExpression] = useState("");
    const [a,setA] = useState();
    const [b,setB] = useState();
    const [n,setN] = useState();
    const [result,setResult] = useState();
    const [dataPoints, setDataPoints] = useState([]);

    
    const handleFetchData = async()=>{
        try{
            const response = await fetch("http://localhost:5000/api/Integration-data");
            const result = await response.json();

            setExpression(result.expression);
            setA(result.a)
            setB(result.b)
            setN(result.n)
            
        }
        catch(error){
            console.error(error);
        }
    }




    const calculatecomsimp =()=>{
        if(n % 2 !== 0){
            return;
        }

        const h = (b-a) /n;
        let sum = 0;
        let points = [];

        sum += evaluate(expression, { x: a });
        points.push({ x: a, y: evaluate(expression, { x: a }) }); 

        for (let i = 1; i < n; i++) {
            const x = a + i * h;
            const coe = i % 2 === 0 ? 2 : 4;
            const y = evaluate(expression, { x: x });
            sum += coe * y;
            points.push({ x: x, y: y }); 
        }

        sum += evaluate(expression, { x: b });
        points.push({ x: b, y: evaluate(expression, { x: b }) });

        const result = (h / 3) * sum;
        setResult(result)
        setDataPoints(points)
    };

    const graph = {
        labels: dataPoints.map(point => point.x),
        datasets: [
            {
                label: 'F(X)',
                data: dataPoints.map(point => point.y),
                borderColor: 'red',
                tension: 0.1,
            },
        ],
    };

    return(
        <Container>
            <h1>com simp</h1>
            <Form>
                <FormGroup>
                    <FormLabel>
                        Input F(X):
                    </FormLabel>
                    <FormControl
                        type='text'
                        value={expression}
                        onChange={(e)=>setExpression(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel>
                        Input a:
                    </FormLabel>
                    <FormControl
                        type='number'
                        value={a}
                        onChange={(e)=>setA(parseFloat(e.target.value))}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel>
                        Input b:
                    </FormLabel>
                    <FormControl
                        type='number'
                        value={b}
                        onChange={(e)=>setB(parseFloat(e.target.value))}
                    />
                </FormGroup>

                <FormGroup>
                    <FormLabel>
                        Input n:
                    </FormLabel>
                    <FormControl
                        type='number'
                        value={n}
                        onChange={(e)=>setN(parseFloat(e.target.value))}
                    />
                </FormGroup>

            <Button onClick={calculatecomsimp}>
                    Calculate
            </Button>

            <Button onClick={handleFetchData}>
                    Fetch API
            </Button>

            </Form>
            
            <h4>Result: {result}</h4>
            <Line data={graph}/>
            
        </Container>
)};

export default CompositeSimpson
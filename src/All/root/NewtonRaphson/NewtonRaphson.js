import { useState } from "react"; 
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, derivative } from 'mathjs';
import { Line } from 'react-chartjs-2';
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NewtonRaphson = () => {
    const [data, setData] = useState([]);
    const [valueIter, setValueIter] = useState([]);
    const [valueX, setValueX] = useState([]);
    const [Equation, setEquation] = useState("");
    const [InitialX, setInitialX] = useState();
    const [showResults, setShowResults] = useState(false);

  
    const fetchApiData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/data');
            const data = await response.json();
            setEquation(data.fx); 
            setInitialX(data.X0); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalNewtonRaphson = (x0) => {
        let x1;
        let ea;
        let iter = 0;
        const MAX = 50;
        const e = 0.00001;
        const dataArr = [];
        const iterArr = [];  

        do {
            const fX0 = evaluate(Equation, { x: x0 });
            const fPrimeX0 = evaluate(derivative(Equation, 'x').toString(), { x: x0 }); 
            
            if (fPrimeX0 === 0) {
                break;
            }

            x1 = x0 - (fX0 / fPrimeX0);  
            ea = error(x0, x1);
            iter++;

            const newData = {
                iteration: iter,
                X: x1,
            };
            dataArr.push(newData);
            iterArr.push(iter);  

            x0 = x1;  
        } while (ea > e && iter < MAX);

        setData(dataArr);
        setValueX(dataArr.map((d) => d.X));
        setValueIter(iterArr);  
        setShowResults(true);
    };

    const handleCalculate = () => {
        const initialX = parseFloat(InitialX);
        CalNewtonRaphson(initialX);
    };

    const chartData = {
        labels: valueIter,
        datasets: [
            {
                label: 'X',
                data: valueX,
                borderColor: 'blue',
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Newton-Raphson',
            },
        },
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input 
                        type="text" 
                        value={Equation} 
                        onChange={(e) => setEquation(e.target.value)} 
                        style={{ width: "20%", margin: "0 auto" }} 
                        className="form-control" 
                    />
                    <Form.Label>Input Initial X</Form.Label>
                    <input 
                        type="number" 
                        value={InitialX} 
                        onChange={(e) => setInitialX(e.target.value)} 
                        style={{ width: "20%", margin: "0 auto" }} 
                        className="form-control" 
                    />
                </Form.Group>
               
                <Button variant="dark" onClick={handleCalculate}>Calculate</Button>
                <Button variant="info" onClick={fetchApiData} style={{ marginLeft: "10px" }}>Fetch API</Button>
            </Form>
            <br />
            {showResults && (
                <>
                    <h5>Answer = {valueX[valueX.length - 1].toPrecision(7)}</h5>
                    <Container>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Iteration</th>
                                    <th>X</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((element, index) => (
                                    <tr key={index}>
                                        <td>{element.iteration}</td>
                                        <td>{element.X}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                    {valueX.length > 0 && (  
                        <Line data={chartData} options={options} />
                    )}
                </>
            )}
        </Container>
    );
};

export default NewtonRaphson;

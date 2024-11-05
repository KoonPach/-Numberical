import { useState } from "react"; 
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';
import { Line } from 'react-chartjs-2';
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Secant = () => {
    const [data, setData] = useState([]);
    const [valueIter, setValueIter] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [Equation, setEquation] = useState("");
    const [X0, setX0] = useState();
    const [X1, setX1] = useState();
    const [showResults, setShowResults] = useState(false);

   
    const fetchApiData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/root-data');
            const data = await response.json();
            setEquation(data.fx);
            setX0(data.X0); 
            setX1(data.X1); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalcSecant = (x0, x1) => {
        let xn, fX0, fX1, ea;
        let iter = 0;
        const MAX = 50;
        const e = 0.00001;
        const dataArr = [];

        do {
            fX0 = evaluate(Equation, { x: x0 });
            fX1 = evaluate(Equation, { x: x1 });

            // Secant formula
            xn = x1 - (fX1 * (x1 - x0)) / (fX1 - fX0);
            ea = error(x1, xn);
            iter++;

            const newData = {
                iteration: iter,
                Xn: xn,
            };
            dataArr.push(newData);

           
            x0 = x1;
            x1 = xn;
        } while (ea > e && iter < MAX);

        setData(dataArr);
        setValueIter(dataArr.map((d) => d.iteration));
        setValueXm(dataArr.map((d) => d.Xn));
        setShowResults(true); 
    };

    const handleCalculate = () => {
        const x0 = parseFloat(X0);
        const x1 = parseFloat(X1);
        CalcSecant(x0, x1);
    };

    const chartData = {
        labels: valueIter,
        datasets: [
            {
                label: 'XM',
                data: valueXm,
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
                text: 'Secant',
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
                    <Form.Label>Input X0</Form.Label>
                    <input 
                        type="number" 
                        value={X0} 
                        onChange={(e) => setX0(e.target.value)} 
                        style={{ width: "20%", margin: "0 auto" }} 
                        className="form-control" 
                    />
                    <Form.Label>Input X1</Form.Label>
                    <input 
                        type="number" 
                        value={X1} 
                        onChange={(e) => setX1(e.target.value)} 
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
                    <h5>Answer = {valueXm[valueXm.length - 1].toPrecision(7)}</h5>
                    <Container>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Iteration</th>
                                    <th>Xn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((element, index) => (
                                    <tr key={index}>
                                        <td>{element.iteration}</td>
                                        <td>{element.Xn}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                    <Line data={chartData} options={options} />
                </>
            )}
        </Container>
    );
};

export default Secant;

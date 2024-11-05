import { useState } from "react"; 
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';
import { Line } from 'react-chartjs-2';
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FalsePosition = () => {
    const [data, setData] = useState([]);
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXr, setValueXr] = useState([]);
    const [valueX1, setValueX1] = useState([]);
    const [Equation, setEquation] = useState("");
    const [X, setX] = useState();
    const [XL, setXL] = useState();
    const [XR, setXR] = useState();
    const [showResults, setShowResults] = useState(false);

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalFalsePosition = (xl, xr) => {
        let x1, fX1, fXr, fXl, ea;
        let iter = 0;
        const MAX = 50;
        const e = 0.00001;
        const dataArr = [];

        do {
            fXl = evaluate(Equation, { x: xl });
            fXr = evaluate(Equation, { x: xr });
            x1 = xr - (fXr * (xl - xr)) / (fXl - fXr);
            fX1 = evaluate(Equation, { x: x1 });
            iter++;

            const newData = {
                iteration: iter,
                Xl: xl,
                X1: x1,
                Xr: xr,
            };
            dataArr.push(newData);

            if (fX1 * fXr > 0) {
                ea = error(xr, x1);
                xr = x1;
            } else if (fX1 * fXr < 0) {
                ea = error(xl, x1);
                xl = x1;
            }
        } while (ea > e && iter < MAX);

        setData(dataArr);
        setX(x1);

        setValueIter(dataArr.map((d) => d.iteration));
        setValueXl(dataArr.map((d) => d.Xl));
        setValueX1(dataArr.map((d) => d.X1));
        setValueXr(dataArr.map((d) => d.Xr));

        setShowResults(true);
    };

    const handleCalculate = () => {
        const xl = parseFloat(XL);
        const xr = parseFloat(XR);
        CalFalsePosition(xl, xr);
    };

    const handleFetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/root-data');
            const result = await response.json();
            setEquation(result.fx); 
            setXL(result.XL); 
            setXR(result.XR); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const chartData = {
        labels: valueIter,
        datasets: [
            {
                label: 'XL',
                data: valueXl,
                borderColor: 'red',
                fill: false,
            },
            {
                label: 'X1',
                data: valueX1,
                borderColor: 'blue',
                fill: false,
            },
            {
                label: 'XR',
                data: valueXr,
                borderColor: 'green',
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
                text: 'False-Position',
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
                    <Form.Label>Input XL</Form.Label>
                    <input 
                        type="number" 
                        value={XL} 
                        onChange={(e) => setXL(e.target.value)} 
                        style={{ width: "20%", margin: "0 auto" }} 
                        className="form-control" 
                    />
                    <Form.Label>Input XR</Form.Label>
                    <input 
                        type="number" 
                        value={XR} 
                        onChange={(e) => setXR(e.target.value)} 
                        style={{ width: "20%", margin: "0 auto" }} 
                        className="form-control" 
                    />
                </Form.Group>
                <Button variant="dark" onClick={handleCalculate}>Calculate</Button>
                <Button variant="info" onClick={handleFetchData} style={{ marginLeft: "10px" }}>Fetch API</Button>
            </Form>
            <br />
            {showResults && (
                <>
                    <h5>Answer = {X.toPrecision(7)}</h5>
                    <Container>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Iteration</th>
                                    <th>XL</th>
                                    <th>X1</th>
                                    <th>XR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((element, index) => (
                                    <tr key={index}>
                                        <td>{element.iteration}</td>
                                        <td>{element.Xl}</td>
                                        <td>{element.X1}</td>
                                        <td>{element.Xr}</td>
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

export default FalsePosition;

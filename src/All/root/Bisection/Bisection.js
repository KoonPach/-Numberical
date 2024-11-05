import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';
import { Line } from 'react-chartjs-2';
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);



const Bisection = () => {
    const [data, setData] = useState([]);
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);
    const [Equation, setEquation] = useState("");   
    const [X, setX] = useState();
    const [XL, setXL] = useState();
    const [XR, setXR] = useState();
    const [showResults, setShowResults] = useState(false);

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;
    const Calbisection = (xl, xr) => {
        let xm, fXm, fXr, ea;
        let iter = 0;
        const MAX = 50;
        const e = 0.00001;
        const dataArr = [];

        do {
            xm = (xl + xr) / 2.0;
            fXr = evaluate(Equation, { x: xr });
            fXm = evaluate(Equation, { x: xm });
            iter++;

            const newData = {
                iteration: iter,
                Xl: xl,
                Xm: xm,
                Xr: xr,
            };
            dataArr.push(newData);

            if (fXm * fXr > 0) {
                ea = error(xr, xm);
                xr = xm;
            } else if (fXm * fXr < 0) {
                ea = error(xl, xm);
                xl = xm;
            }
        } while (ea > e && iter < MAX);

        setData(dataArr);
        setX(xm);

        setValueIter(dataArr.map((d) => d.iteration));
        setValueXl(dataArr.map((d) => d.Xl));
        setValueXm(dataArr.map((d) => d.Xm));
        setValueXr(dataArr.map((d) => d.Xr));

        setShowResults(true); 
    };

    const handleCalculate = () => {
        const xl = parseFloat(XL);
        const xr = parseFloat(XR);
        Calbisection(xl, xr);
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
                label: 'XM',
                data: valueXm,
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
                text: 'Bisection',
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
                                    <th>XM</th>
                                    <th>XR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((element, index) => (
                                    <tr key={index}>
                                        <td>{element.iteration}</td>
                                        <td>{element.Xl}</td>
                                        <td>{element.Xm}</td>
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

export default Bisection;

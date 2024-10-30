import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';
import { Line } from 'react-chartjs-2';
import "bootstrap/dist/css/bootstrap.min.css";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OnePointIteration = () => {
    const [data, setData] = useState([]);
    const [valueIter, setValueIter] = useState([]);
    const [valueX, setValueX] = useState([]);
    const [Equation, setEquation] = useState("");
    const [X0, setX0] = useState();
    const [showResults, setShowResults] = useState(false);

    // ฟังก์ชันสำหรับดึงข้อมูลจาก API
    const fetchApiData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/data');
            const data = await response.json();
            setEquation(data.fx); 
            setX0(data.X0);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalOnePoint = (x0) => {
        let x1, ea;
        let iter = 0;
        const MAX = 50;
        const e = 0.00001;
        const dataArr = [];

        do {
            x1 = evaluate(Equation, { x: x0 });
            ea = error(x0, x1);
            iter++;

            const newData = {
                iteration: iter,
                X: x1,
            };
            dataArr.push(newData);

            x0 = x1; 
        } while (ea > e && iter < MAX);

        setData(dataArr);
        setValueIter(dataArr.map((d) => d.iteration)); 
        setValueX(dataArr.map((d) => d.X)); 
        setShowResults(true); 
    };

    const handleCalculate = () => {
        const x0 = parseFloat(X0);
        CalOnePoint(x0);
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
                text: 'One Point',
            },
        },
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x) in terms of x</Form.Label>
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
                        value={X0} // แสดงค่า X0 ที่ได้จาก API
                        onChange={(e) => setX0(e.target.value)}
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
                    <div className="chart-container" style={{ position: 'relative', width: '100%', height: '400px' }}>
                        <Line data={chartData} options={options} />
                    </div>
                </>
            )}
        </Container>
    );
};

export default OnePointIteration;

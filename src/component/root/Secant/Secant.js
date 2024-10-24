import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Line } from 'react-chartjs-2';
import SecantTable from "./SecantTable";
import { CalSecant, chartDataConfig, chartOptionsConfig, error } from "./SecantUtils";

const Secant = () => {
    const [data, setData] = useState([]);
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX0] = useState([]);
    const [valueX1, setValueX1] = useState([]);
    const [valueX2, setValueX2] = useState([]);
    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("(x^4)-13");
    const [X, setX] = useState(0);
    const [X0, setX0] = useState();
    const [X1, setX1] = useState();

    const calculateRoot = () => {
        const x0num = parseFloat(X0);
        const x1num = parseFloat(X1);
        const results = CalSecant(x0num, x1num, Equation, error);
        setData(results);
        setHtml(<SecantTable results={results} />);
        setX(results[results.length - 1].X2);

        // Set chart data
        setValueIter(results.map((x) => x.iteration));
        setValueX0(results.map((x) => x.X0));
        setValueX1(results.map((x) => x.X1));
        setValueX2(results.map((x) => x.X2));
    };

    const chartData = chartDataConfig(valueIter, valueX0, valueX1, valueX2);
    const chartOptions = chartOptionsConfig();

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input
                        type="text"
                        value={Equation}
                        onChange={(e) => setEquation(e.target.value)}
                        className="form-control"
                        style={{ width: "20%", margin: "0 auto" }}
                    />
                    <Form.Label>Input X0</Form.Label>
                    <input
                        type="number"
                        value={X0}
                        onChange={(e) => setX0(e.target.value)}
                        className="form-control"
                        style={{ width: "20%", margin: "0 auto" }}
                    />
                    <Form.Label>Input X1</Form.Label>
                    <input
                        type="number"
                        value={X1}
                        onChange={(e) => setX1(e.target.value)}
                        className="form-control"
                        style={{ width: "20%", margin: "0 auto" }}
                    />
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
            </Form>
            <br />
            <h5>Answer = {X.toPrecision(7)}</h5>
            <Container>{html}</Container>
            <Container>
                <Line data={chartData} options={chartOptions} />
            </Container>
        </Container>
    );
};

export default Secant;

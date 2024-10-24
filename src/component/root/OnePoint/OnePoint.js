import { useState } from "react";
import { Container } from "react-bootstrap";
import { evaluate } from 'mathjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChartDisplay from "./ChartDisplay";
import InputForm from "./InputForm";
import ResultTable from "./ResultTable";

const OnePoint = () => {
    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalOnePointIteration = (x0) => {
        var x1, ea;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj = {};
        do {
            let scope = {
                x: x0,
            };
            x1 = evaluate(Equation, scope);
            ea = error(x0, x1);
            iter++;
            obj = {
                iteration: iter,
                X: x1,
            };
            data.push(obj);
            x0 = x1;
        } while (ea > e && iter < MAX);
        setX(x1);
    };

    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueX, setValueX] = useState([]);
    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("");
    const [X, setX] = useState(0);
    const [X0, setX0] = useState(0);

    const inputEquation = (event) => setEquation(event.target.value);
    const inputX0 = (event) => setX0(event.target.value);

    const calculateRoot = () => {
        const x0num = parseFloat(X0);
        CalOnePointIteration(x0num);
        setValueIter(data.map((x) => x.iteration));
        setValueX(data.map((x) => x.X));
        setHtml(<ResultTable data={data} />);
    };

    return (
        <Container>
            <InputForm
                Equation={Equation}
                X0={X0}
                onEquationChange={inputEquation}
                onX0Change={inputX0}
                onCalculate={calculateRoot}
            />
            <br />
            <h5>Answer = {X.toPrecision(7)}</h5>
            <Container>{html}</Container>
            <ChartDisplay labels={valueIter} values={valueX} />
        </Container>
    );
};

export default OnePoint;

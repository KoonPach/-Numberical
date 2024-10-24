import { useState } from "react";
import { Container } from "react-bootstrap";
import { evaluate, derivative } from 'mathjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputForm from "./InputForm";
import ResultTable from "./ResultTable";
import ChartDisplay from "./ChartDisplay";

const NewtonRaphson = () => {
    const error = (xnew, xold) => Math.abs((xnew - xold) / xnew) * 100;

    const CalNewtonRaphson = (x0) => {
        let xnew, ea, scope;
        let iter = 0;
        const MAX = 50;
        const e = 0.00001;
        let obj = {};

        do {
            scope = { x: x0 };
            const fx = evaluate(Equation, scope);
            const dfx = evaluate(derivative(Equation, 'x').toString(), scope);

            if (dfx === 0) {
                alert("No zero!!!");
                return;
            }

            xnew = x0 - (fx / dfx);
            ea = error(xnew, x0);

            iter++;
            obj = {
                iteration: iter,
                X: xnew,
                Error: ea.toFixed(6)
            };
            data.push(obj);

            x0 = xnew;
        } while (ea > e && iter < MAX);

        setX(xnew);
    };

    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueX, setValueX] = useState([]);
    const [valueError, setValueError] = useState([]);
    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("(x^4)-13");
    const [X, setX] = useState(0);
    const [X0, setX0] = useState(0);

    const inputEquation = (event) => setEquation(event.target.value);
    const inputX0 = (event) => setX0(event.target.value);

    const calculateRoot = () => {
        const x0num = parseFloat(X0);
        CalNewtonRaphson(x0num);
        setValueIter(data.map((x) => x.iteration));
        setValueX(data.map((x) => x.X));
        setValueError(data.map((x) => x.Error));
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
            <ChartDisplay
                labels={valueIter}
                xValues={valueX}
                errorValues={valueError}
            />
        </Container>
    );
};

export default NewtonRaphson;

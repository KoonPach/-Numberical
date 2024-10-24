import { useState } from "react";
import { Container } from "react-bootstrap";
import { evaluate } from "mathjs";
import "bootstrap/dist/css/bootstrap.min.css";
import ChartDisplay from "./ChartDisplay";
import InputForm from "./InputForm";
import ResultTable from "./ResultTable";

const Sample = () => {
    const print = () => {
        return <ResultTable data={data} />;
    };

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const Calbisection = (xl, xr) => {
        var xm, fXm, fXr, ea, scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj = {};
        do {
            xm = (xl + xr) / 2.0;
            scope = {
                x: xr,
            };
            fXr = evaluate(Equation, scope);

            scope = {
                x: xm,
            };
            fXm = evaluate(Equation, scope);

            iter++;
            if (fXm * fXr > 0) {
                ea = error(xr, xm);
                obj = {
                    iteration: iter,
                    Xl: xl,
                    Xm: xm,
                    Xr: xr,
                };
                data.push(obj);
                xr = xm;
            } else if (fXm * fXr < 0) {
                ea = error(xl, xm);
                obj = {
                    iteration: iter,
                    Xl: xl,
                    Xm: xm,
                    Xr: xr,
                };
                data.push(obj);
                xl = xm;
            }
        } while (ea > e && iter < MAX);
        setX(xm);
    };

    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);
    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("(x^4)-13");
    const [X, setX] = useState(0);
    const [XL, setXL] = useState(0);
    const [XR, setXR] = useState(0);

    const inputEquation = (event) => {
        setEquation(event.target.value);
    };

    const inputXL = (event) => {
        setXL(event.target.value);
    };

    const inputXR = (event) => {
        setXR(event.target.value);
    };

    const calculateRoot = () => {
        const xlnum = parseFloat(XL);
        const xrnum = parseFloat(XR);
        Calbisection(xlnum, xrnum);
        setValueIter(data.map((x) => x.iteration));
        setValueXl(data.map((x) => x.Xl));
        setValueXm(data.map((x) => x.Xm));
        setValueXr(data.map((x) => x.Xr));
        setHtml(print());
    };

    return (
        <Container>
            <InputForm
                Equation={Equation}
                XL={XL}
                XR={XR}
                onEquationChange={inputEquation}
                onXLChange={inputXL}
                onXRChange={inputXR}
                onCalculate={calculateRoot}
            />
            <br />
            <h5>Answer = {X.toPrecision(7)}</h5>
            <Container>{html}</Container>
            <Container>
                <ChartDisplay
                    labels={valueIter}
                    valueXl={valueXl}
                    valueXm={valueXm}
                    valueXr={valueXr}
                />
            </Container>
        </Container>
    );
};

export default Sample;

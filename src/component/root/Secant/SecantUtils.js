import { evaluate } from 'mathjs';

export const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

export const CalSecant = (x0, x1, Equation, errorFunc) => {
    let results = [];
    let x2, fX0, fX1, ea, scope;
    let iter = 0;
    const MAX = 50;
    const e = 0.00001;

    do {
        scope = { x: x0 };
        fX0 = evaluate(Equation, scope);

        scope = { x: x1 };
        fX1 = evaluate(Equation, scope);

        x2 = x1 - (fX1 * (x1 - x0)) / (fX1 - fX0);
        ea = errorFunc(x1, x2);

        results.push({
            iteration: iter + 1,
            X0: x0,
            X1: x1,
            X2: x2,
        });

        x0 = x1;
        x1 = x2;
        iter++;
    } while (ea > e && iter < MAX);

    return results;
};

export const chartDataConfig = (valueIter, valueX0, valueX1, valueX2) => ({
    labels: valueIter,
    datasets: [
        {
            label: "X0",
            data: valueX0,
            borderColor: "red",
            fill: false,
        },
        {
            label: "X1",
            data: valueX1,
            borderColor: "green",
            fill: false,
        },
        {
            label: "X2",
            data: valueX2,
            borderColor: "blue",
            fill: false,
        },
    ],
});

export const chartOptionsConfig = () => ({
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
    },
});

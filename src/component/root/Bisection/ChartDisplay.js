import React from "react";
import { Line } from "react-chartjs-2";

const ChartDisplay = ({ labels, valueXl, valueXm, valueXr }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "XL",
                data: valueXl,
                borderColor: "red",
                fill: false,
            },
            {
                label: "XM",
                data: valueXm,
                borderColor: "green",
                fill: false,
            },
            {
                label: "XR",
                data: valueXr,
                borderColor: "blue",
                fill: false,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return <Line data={chartData} options={chartOptions} />;
};

export default ChartDisplay;

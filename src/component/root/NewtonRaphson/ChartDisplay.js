import { Line } from 'react-chartjs-2';
import { Container } from 'react-bootstrap';

const ChartDisplay = ({ labels, xValues, errorValues }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "X Values",
                data: xValues,
                borderColor: "blue",
                fill: false,
            },
            {
                label: "Error Values",
                data: errorValues.map(Number),
                borderColor: "red",
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
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Container>
            <Line data={chartData} options={chartOptions} />
        </Container>
    );
};

export default ChartDisplay;

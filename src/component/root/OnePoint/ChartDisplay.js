import { Line } from 'react-chartjs-2';
import { Container } from 'react-bootstrap';

const ChartDisplay = ({ labels, values }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "X",
                data: values,
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

    return (
        <Container>
            <Line data={chartData} options={chartOptions} />
        </Container>
    );
};

export default ChartDisplay;

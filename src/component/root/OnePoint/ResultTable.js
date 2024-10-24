import { Container, Table } from "react-bootstrap";

const ResultTable = ({ data }) => {
    return (
        <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="10%">Iteration</th>
                        <th width="30%">X</th>
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
    );
};

export default ResultTable;

import React from "react";
import { Container, Table } from "react-bootstrap";

const ResultTable = ({ data }) => {
    return (
        <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="10%">Iteration</th>
                        <th width="30%">XL</th>
                        <th width="30%">XM</th>
                        <th width="30%">XR</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index) => (
                        <tr key={index}>
                            <td>{element.iteration}</td>
                            <td>{element.Xl}</td>
                            <td>{element.Xm}</td>
                            <td>{element.Xr}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ResultTable;

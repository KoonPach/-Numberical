import React from 'react';
import { Container, Table } from "react-bootstrap";

const SecantTable = ({ results }) => {
    return (
        <Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th width="10%">Iteration</th>
                        <th width="30%">X0</th>
                        <th width="30%">X1</th>
                        <th width="30%">X2</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((element, index) => (
                        <tr key={index}>
                            <td>{element.iteration}</td>
                            <td>{element.X0}</td>
                            <td>{element.X1}</td>
                            <td>{element.X2}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default SecantTable;

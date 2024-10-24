import React from "react";
import { Form, Button } from "react-bootstrap";

const InputForm = ({ Equation, XL, XR, onEquationChange, onXLChange, onXRChange, onCalculate }) => {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Input f(x)</Form.Label>
                <input
                    type="text"
                    value={Equation}
                    onChange={onEquationChange}
                    style={{ width: "20%", margin: "0 auto" }}
                    className="form-control"
                />
                <Form.Label>Input XL</Form.Label>
                <input
                    type="number"
                    value={XL}
                    onChange={onXLChange}
                    style={{ width: "20%", margin: "0 auto" }}
                    className="form-control"
                />
                <Form.Label>Input XR</Form.Label>
                <input
                    type="number"
                    value={XR}
                    onChange={onXRChange}
                    style={{ width: "20%", margin: "0 auto" }}
                    className="form-control"
                />
            </Form.Group>
            <Button variant="dark" onClick={onCalculate}>
                Calculate
            </Button>
        </Form>
    );
};

export default InputForm;

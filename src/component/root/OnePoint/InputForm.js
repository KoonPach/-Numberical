import { Form, Button } from "react-bootstrap";

const InputForm = ({ Equation, X0, onEquationChange, onX0Change, onCalculate }) => {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Input g(x)</Form.Label>
                <input
                    type="text"
                    id="equation"
                    value={Equation}
                    onChange={onEquationChange}
                    style={{ width: "20%", margin: "0 auto" }}
                    className="form-control"
                ></input>
                <Form.Label>Input X0</Form.Label>
                <input
                    type="number"
                    id="X0"
                    onChange={onX0Change}
                    style={{ width: "20%", margin: "0 auto" }}
                    className="form-control"
                ></input>
            </Form.Group>
            <Button variant="dark" onClick={onCalculate}>
                Calculate
            </Button>
        </Form>
    );
};

export default InputForm;

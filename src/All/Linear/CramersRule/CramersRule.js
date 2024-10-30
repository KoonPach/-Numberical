import { useState } from "react"; 
import { Button, Container, Form, Table } from "react-bootstrap";

const CramersRule = () => {
    const [matrixSize, setMatrixSize] = useState(3); // ขนาดเริ่มต้น 3x3
    const [matrix, setMatrix] = useState(Array.from({ length: 3 }, () => Array(3).fill(0))); // 3x3 matrix
    const [constants, setConstants] = useState(Array(3).fill(0)); // Constants
    const [result, setResult] = useState(null); // Result from Cramer's Rule
    const [showResults, setShowResults] = useState(false); // Show results toggle

    // ฟังก์ชันสำหรับดึงข้อมูลจาก API
    const fetchApiData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/data'); // URL ของ API
            const data = await response.json();
            setMatrix(data.matrix); // ตั้งค่า matrix จาก API
            setConstants(data.constants); // ตั้งค่า constants จาก API
            setMatrixSize(data.matrix.length); // ตั้งค่า ขนาดของแมทริกซ์จาก API
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // ฟังก์ชันสำหรับคำนวณ Cramer's Rule
    const calculateCramersRule = (matrix, constants) => {
        const determinant = (matrix) => {
            const det = (m) => {
                const [a, b, c] = m[0];
                const [d, e, f] = m[1];
                const [g, h, i] = m[2];
                return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
            };

            // สำหรับแมทริกซ์ขนาด 2x2
            if (matrix.length === 2) {
                return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
            }
            // สำหรับแมทริกซ์ขนาด 3x3
            return det(matrix);
        };

        const detA = determinant(matrix);
        const results = [];

        for (let i = 0; i < constants.length; i++) {
            const tempMatrix = matrix.map((row, rowIndex) => 
                row.map((value, colIndex) => (colIndex === i ? constants[rowIndex] : value))
            );

            const detTemp = determinant(tempMatrix);
            results.push(detTemp / detA);
        }

        setResult(results);
        setShowResults(true); // Show results after calculation
    };

    const handleCalculate = () => {
        calculateCramersRule(matrix, constants);
    };

    // ฟังก์ชันสำหรับการปรับขนาดของแมทริกซ์
    const handleMatrixSizeChange = (e) => {
        const newSize = parseInt(e.target.value);
        setMatrixSize(newSize);
        setMatrix(Array.from({ length: newSize }, () => Array(newSize).fill(0))); // สร้างแมทริกซ์ใหม่
        setConstants(Array(newSize).fill(0)); // สร้างค่าคงที่ใหม่
        setResult(null); // รีเซ็ตผลลัพธ์
        setShowResults(false); // ซ่อนผลลัพธ์
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Select Matrix Size</Form.Label>
                    <Form.Control as="select" value={matrixSize} onChange={handleMatrixSizeChange}>
                        {[2, 3, 4, 5].map((size) => (
                            <option key={size} value={size}>{size}x{size}</option>
                        ))}
                    </Form.Control>
                    <Form.Label>Input Matrix ({matrixSize}x{matrixSize})</Form.Label>
                    {[...Array(matrixSize)].map((_, i) => (
                        <div key={i}>
                            {[...Array(matrixSize)].map((_, j) => (
                                <input 
                                    key={j} 
                                    type="number" 
                                    onChange={(e) => {
                                        const newMatrix = [...matrix];
                                        newMatrix[i][j] = parseFloat(e.target.value) || 0;
                                        setMatrix(newMatrix);
                                    }} 
                                    style={{ width: "5%", margin: "0 5px" }} 
                                    className="form-control" 
                                />
                            ))}
                        </div>
                    ))}
                    <Form.Label>Input Constants</Form.Label>
                    {[...Array(matrixSize)].map((_, i) => (
                        <input 
                            key={i} 
                            type="number" 
                            onChange={(e) => {
                                const newConstants = [...constants];
                                newConstants[i] = parseFloat(e.target.value) || 0;
                                setConstants(newConstants);
                            }} 
                            style={{ width: "20%", margin: "0 auto" }} 
                            className="form-control" 
                        />
                    ))}
                </Form.Group>
                <Button variant="primary" onClick={fetchApiData} style={{ marginRight: '10px' }}>
                    Fetch API Data
                </Button>
                <Button variant="dark" onClick={handleCalculate}>Calculate</Button>
            </Form>
            <br />
            {showResults && result && (
                <>
                    <h5>Results: {result.map((res, index) => `X${index + 1} = ${res.toFixed(5)}`).join(', ')}</h5>
                    <Container>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Variable</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((res, index) => (
                                    <tr key={index}>
                                        <td>X{index + 1}</td>
                                        <td>{res.toFixed(5)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </>
            )}
        </Container>
    );
};

export default CramersRule;

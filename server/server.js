const express = require('express'); 
const cors = require('cors');
const app = express();
const PORT = 5000;


const fetchNewtonData = async () => {
    try {
        
        const points = [
            { x: 0, y: 9.81 },
            { x: 20000, y: 9.7487 },
            { x: 40000, y: 9.6879 },
            { x: 60000, y: 9.6879 },
            { x: 80000, y: 9.5682 }
        ];

        return { points };
    } catch (error) {
        console.error("Error fetching Newton data:", error);
        throw error; 
    }
};

const fetchDataRoot = async () => {
    try {
        const fx = "x^4 - 13"; 
        const XL = 1.5;        
        const XR = 2;         
        const X0 = 2; 
        const X1 = 3; 

        return { fx, XL, XR, X0, X1 }; 
    } catch (error) {
        console.error("Error fetching data from API:", error);
        throw error; 
    }
};

const fetchMatrixData = async () => {
    try {
        const matrix = [
            [4, -1, 0, 0],
            [-1, 4, -1, 0],
            [0, -1, 4, -1],
            [0, 0, -1, 3]
        ];
        const constants = [15, 10, 10, 10];

        return { matrix, constants };
    } catch (error) {
        console.error("Error fetching matrix data:", error);
        throw error; 
    }
};

app.use(cors());

app.get('/api/data', async (req, res) => {
    try {
        const data = await fetchDataRoot();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.get('/api/matrix-data', async (req, res) => {
    try {
        const data = await fetchMatrixData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching matrix data' });
    }
});


app.get('/api/newton-data', async (req, res) => {
    try {
        const data = await fetchNewtonData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Newton data' });
    }
});

app.get('/api/jacobi-data', async (req, res) => {
    try {
        const data = await fetchMatrixData(); 
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Jacobi data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

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

const fetchDataCramers = async () => {
    try {
        
        const matrix = [
            [2, -1, 3],
            [3, 2, 1],
            [1, 1, -1]
        ];
        const constants = [1, 2, 3];

        return { matrix, constants };
    } catch (error) {
        console.error("Error fetching data from API:", error);
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

app.get('/api/cramers-data', async (req, res) => {
    try {
        const data = await fetchDataCramers();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

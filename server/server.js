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

const fetchMultipleLinearRegressionData = async () => {
    try {
        const points = [
            { x1: 1, x2: 0, x3: 1, y: 4 },
            { x1: 0, x2: 1, x3: 3, y: -5 },
            { x1: 2, x2: 4, x3: 1, y: -6 },
            { x1: 3, x2: 2, x3: 2, y: 0 },
            { x1: 4, x2: 1, x3: 5, y: -1 },
            { x1: 2, x2: 3, x3: 3, y: -7 },
            { x1: 1, x2: 6, x3: 4, y: -20 }
        ];
        return { points };
    } catch (error) {
        console.error("Error fetching Multiple Linear Regression data:", error);
        throw error;
    }
};

const fetchIntegrationData = async () => {
    try {
        const expression = "x^7 + 2x^3 - 1";  
        const a = -1;                         
        const b = 2;                       
        const n = 2;                         
        return { expression, a, b, n };
    } catch (error) {
        console.error("Error fetching Simpson data:", error);
        throw error; 
    }
};

const fetchForwardDifferenceData = async () => {
    try {
        const expression = "e^x";  
        const x = 2;               
        const h = 0.25;            
        return { expression, x, h };
    } catch (error) {
        console.error("Error fetching Forward Difference data:", error);
        throw error; 
    }
};


const fetchLinearRegressionData = async () => {
    try {
        const points = [
            { x: 10, y: 5 },
            { x: 15, y: 9 },
            { x: 20, y: 15 },
            { x: 30, y: 18 },
            { x: 40, y: 22 },
            { x: 50, y: 30 },
            { x: 60, y: 35 },
            { x: 70, y: 38 },
            { x: 80, y: 43 }
        ];
        return { points };
    } catch (error) {
        console.error("Error fetching Linear Regression data:", error);
        throw error;
    }
};



app.use(cors());

app.get('/api/root-data', async (req, res) => {
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

app.get('/api/multiple-linear-regression-data', async (req, res) => {
    try {
        const data = await fetchMultipleLinearRegressionData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Multiple Linear Regression data' });
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

app.get('/api/integration-data', async (req, res) => {
    try {
        const data = await fetchIntegrationData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Simpson data' });
    }
});

app.get('/api/forward-difference-data', async (req, res) => {
    try {
        const data = await fetchForwardDifferenceData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Forward Difference data' });
    }
});

app.get('/api/linear-regression-data', async (req, res) => {
    try {
        const data = await fetchLinearRegressionData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching Linear Regression data' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

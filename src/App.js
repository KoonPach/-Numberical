import React from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BisectionPage from './All/root/Bisection/Bisection';
import FalsePosition from './All/root/FalsePosition/FalsePosition'; 
import NewtonRaphson from './All/root/NewtonRaphson/NewtonRaphson'; 
import Secant from './All/root/Secant/Secant';
import CramersRule from './All/Linear/CramersRule/CramersRule';
import OnePoint from './All/root/OnePoint/OnePoint';
import GaussElimination from './All/Linear/GaussElimination/GaussElimination';
import MatrixInverse from './All/Linear/MatrixInverse/MatrixInverse';
import GaussJordan from './All/Linear/GaussJordan/GaussJordan';
import LUDecomposition from './All/Linear/LUDecomposition/LUDecomposition';
import Cholesky from './All/Linear/Cholesky/Cholesky';
import Jacobi from './All/Linear/Jacobi/Jacobi';
import GaussSeidel from './All/Linear/GaussSeidel/GaussSeidel';
import Conjugate from './All/Linear/Conjugate/Conjugate';
const App = () => {
    return (
        <Router>
            <div className="container-fluid p-3">
                <div className="btn-group"> 
                    <h3>Root of equation</h3>
                    <Link to="/" className="me-2">
                        <button className="btn btn-primary">Home</button>
                    </Link>
                    <Link to="/bisection" className="me-2">
                        <button className="btn btn-dark">Bisection</button>
                    </Link>
                    <Link to="/falseposition" className="me-2">
                        <button className="btn btn-dark">False Position</button> 
                    </Link>
                    <Link to="/onePoint" className="me-2">
                        <button className="btn btn-dark">OnePoint</button> 
                    </Link>
                    <Link to="/newtonRaphson" className="me-2">
                        <button className="btn btn-dark">Newton Raphson</button> 
                    </Link>
                    <Link to="/secant" className="me-2">
                        <button className="btn btn-dark">Secant</button> 
                    </Link>
                    <hr />
                    
                </div>
                
            </div>
            <div className="container-fluid p-3">

            <div className="btn-group">         
                <h3 className="me-2">Linear system</h3>
                    <Link to="/cramersRule" className="me-2">
                        <button className="btn btn-dark">Cramers Rule</button> 
                    </Link>
                    <Link to="/GaussElimination" className="me-2">
                        <button className="btn btn-dark">GaussElimination</button> 
                    </Link>
                    <Link to="/MatrixInverse" className="me-2">
                        <button className="btn btn-dark">MatrixInverse</button> 
                    </Link>
                    <Link to="/GaussJordan" className="me-2">
                        <button className="btn btn-dark">GaussJordan</button> 
                    </Link>
                    <Link to="/LUDecomposition" className="me-2">
                        <button className="btn btn-dark">LU</button> 
                    </Link>

                    <Link to="/Cholesky" className="me-2">
                        <button className="btn btn-dark">Cholesky</button> 
                    </Link>

                    <Link to="/Jacobi" className="me-2">
                        <button className="btn btn-dark">Jacobi</button> 
                    </Link>

                    <Link to="/GaussSeidel" className="me-2">
                        <button className="btn btn-dark">GaussSeidel</button> 
                    </Link>
                   
                    <Link to="/Conjugate" className="me-2">
                        <button className="btn btn-dark">Conjugate</button> 
                    </Link>
                    
                </div>
            </div>
            <hr></hr>
            <Routes>
                <Route path="/bisection" element={<BisectionPage />} />
                <Route path="/falseposition" element={<FalsePosition />} /> 
                <Route path="/onePoint" element={<OnePoint />} /> 
                <Route path="/newtonRaphson" element={<NewtonRaphson />} /> 
                <Route path="/secant" element={<Secant />} /> 
                <Route path="/cramersRule" element={<CramersRule />} /> 
                <Route path="/GaussElimination" element={<GaussElimination />} /> 
                <Route path="/MatrixInverse" element={<MatrixInverse />} /> 
                <Route path="/GaussJordan" element={<GaussJordan />} /> 
                <Route path="/LUDecomposition" element={<LUDecomposition />} /> 
                <Route path="/Cholesky" element={<Cholesky />} /> 
                <Route path="/Jacobi" element={<Jacobi />} /> 
                <Route path="/GaussSeidel" element={<GaussSeidel />} /> 
                <Route path="/Conjugate" element={<Conjugate />} /> 
            </Routes>
        </Router>
    );
};

export default App;

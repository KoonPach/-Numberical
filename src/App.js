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
import Newton from './All/Interpolation/Newton/Newton';
import Lagrange from './All/Interpolation/Lagrange/Lagrange';
import Spline from './All/Interpolation/Spline/Spline';
import LinearRegression from './All/Regression/LinearRegression/LinearRegression';
import PolynomialRegression from './All/Regression/PolynomialRegression/PolynomialRegression';
import MultipleLinearRegression from './All/Regression/MultipleLinearRegression/MultipleLinearRegression';
import SingleTrapezoidal from './All/Integration/SingleTrapezoidal/SingleTrapezoidal';
import CompositeTrapzoidal from './All/Integration/CompositeTrapzoidal/CompositeTrapzoidal';
import SingleSimpson from './All/Integration/SingleSimpson/SingleSimpson';
import CompositeSimpson from './All/Integration/CompositeSimpson/CompositeSimpson';
import Forward from './All/Differentiation/Forward/Forward';
import Forward2 from './All/Differentiation/Forward/Forward2';
import Backward from './All/Differentiation/Backward/Backward';
import Backward2 from './All/Differentiation/Backward/Backward2';
import Central from './All/Differentiation/Central/Central';
import Central2 from './All/Differentiation/Central/Central2';
const App = () => {
    return (
        <Router>
            <div className="container-fluid p-3">
                <div className="btn-group"> 
                    <h3 className="me-2">Root of equation</h3>
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

            <div className="container-fluid p-3">

            <div className="btn-group">         
                <h3 className="me-2">Interpolation</h3>
                    <Link to="/Newton" className="me-2">
                        <button className="btn btn-dark">Newton</button> 
                    </Link>

                    <Link to="/Lagrange" className="me-2">
                        <button className="btn btn-dark">Lagrange</button> 
                    </Link>

                    <Link to="/Spline" className="me-2">
                        <button className="btn btn-dark">Spline</button> 
                    </Link>
                    
                    
                </div>
            </div>


            <div className="container-fluid p-3">

            <div className="btn-group">         
                <h3 className="me-2">Regression</h3>
                    <Link to="/LinearRegression" className="me-2">
                        <button className="btn btn-dark">LinearRegression</button> 
                    </Link>

                    <Link to="/PolynomialRegression" className="me-2">
                        <button className="btn btn-dark">PolynomialRegression</button> 
                    </Link>

                    <Link to="/MultipleLinearRegression" className="me-2">
                        <button className="btn btn-dark">MultipleLinearRegression</button> 
                    </Link>
                    
                    
                </div>
            </div>

            <div className="container-fluid p-3">

            <div className="btn-group">         
                <h3 className="me-2">Integration</h3>

                <Link to="/SingleTrapezoidal" className="me-2">
                        <button className="btn btn-dark">SingleTrapezoidal</button> 
                    </Link>

                <Link to="/CompositeTrapzoidal" className="me-2">
                        <button className="btn btn-dark">CompositeTrapzoidal</button> 
                    </Link>

                    <Link to="/SingleSimpson" className="me-2">
                        <button className="btn btn-dark">SingleSimpson</button> 
                    </Link>

                    <Link to="/CompositeSimpson" className="me-2">
                        <button className="btn btn-dark">CompositeSimpson</button> 
                    </Link>

                   
                    
                    
                </div>
            </div>

            <div className="container-fluid p-3">

            <div className="btn-group">         
                <h3 className="me-2">Differentiation</h3>

                <Link to="/Forward" className="me-2">
                        <button className="btn btn-dark">Forward</button> 
                    </Link>

                <Link to="/Backward" className="me-2">
                        <button className="btn btn-dark">Backward</button> 
                    </Link>

                    <Link to="/Central" className="me-2">
                        <button className="btn btn-dark">Central</button> 
                    </Link>

                    <Link to="/Forward2" className="me-2">
                        <button className="btn btn-dark">Forward2</button> 
                    </Link>

                    <Link to="/Backward2" className="me-2">
                        <button className="btn btn-dark">Backward2</button> 
                    </Link>

                    <Link to="/Central2" className="me-2">
                        <button className="btn btn-dark">Central2</button> 
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
                <Route path="/Newton" element={<Newton />} /> 
                <Route path="/Lagrange" element={<Lagrange />} /> 
                <Route path="/Spline" element={<Spline />} /> 
                <Route path="/LinearRegression" element={<LinearRegression />} /> 
                <Route path="/PolynomialRegression" element={<PolynomialRegression />} /> 
                <Route path="/MultipleLinearRegression" element={<MultipleLinearRegression />} /> 
                <Route path="/SingleTrapezoidal" element={<SingleTrapezoidal />} /> 
                <Route path="/CompositeTrapzoidal" element={<CompositeTrapzoidal />} /> 
                <Route path="/SingleSimpson" element={<SingleSimpson />} /> 
                <Route path="/CompositeSimpson" element={<CompositeSimpson />} /> 
                <Route path="/Forward" element={<Forward />} /> 
                <Route path="/Forward2" element={<Forward2 />} /> 
                <Route path="/Backward" element={<Backward />} /> 
                <Route path="/Backward2" element={<Backward2 />} /> 
                <Route path="/Central" element={<Central />} /> 
                <Route path="/Central2" element={<Central2 />} /> 
            </Routes>
        </Router>
    );
};

export default App;

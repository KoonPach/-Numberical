import React from 'react'; 
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BisectionPage from './All/root/Bisection/Bisection';
import FalsePosition from './All/root/FalsePosition/FalsePosition'; 
import NewtonRaphson from './All/root/NewtonRaphson/NewtonRaphson'; 
import Secant from './All/root/Secant/Secant';
import CramersRule from './All/Linear/CramersRule/CramersRule';
import OnePoint from './All/root/OnePoint/OnePoint';

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
            </Routes>
        </Router>
    );
};

export default App;

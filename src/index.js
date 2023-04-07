import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favourites from './components/Favourites';

ReactDOM.render(
    <Router>
        <Routes>
            <Route path='/' element={<App/>} />
            <Route path="/components/Favourites" element={<Favourites />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);

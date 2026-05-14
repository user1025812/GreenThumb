import React from 'react';
import "../Style.css";
import AccountInput from '../components/AccountInput';
import TreeGrid from '../components/TreeGrid';

const Join = () => {
    return (
        <div className="page-container">
        <AccountInput />
        <TreeGrid />
        </div>
    );
};

export default Join; 
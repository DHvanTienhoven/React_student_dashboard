import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Chart from './Chart';
import SelectAssignments from './SelectAssignments';
import SortButtons from './SortButtons';

const Main = () => {
    return (
        <div>
            <Header />
            <Nav />
            <Chart />
            <div className="menu">
                <SortButtons />
                <SelectAssignments />
            </div>
        </div>
    )
}

export default Main

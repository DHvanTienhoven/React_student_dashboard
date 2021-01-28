import React from 'react';
import Nav from './Nav';
import Header from './Header';
import Chart from './Chart';
import SelectAssignments from './SelectAssignments';
import SortButtons from './SortButtons';


const StudentComponent = () => {

    const query = window.location.search;
    const urlParams = new URLSearchParams(query)
    const pageName = urlParams.get('name')

    return (
        <div>
            <Header pagename={pageName} />
            <Nav pagename={pageName} />
            <Chart pagename={pageName} />
            <div className="menu">
                <SortButtons />
                <SelectAssignments />
            </div>
        </div>
    )
}

export default StudentComponent

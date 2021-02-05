import React, { useEffect } from 'react';
import {useLocation} from 'react-router-dom'
import Nav from './Nav';
import Header from './Header';
import Chart from './Chart';
import SelectAssignments from './SelectAssignments';
import SortButtons from './SortButtons';


const StudentComponent = () => {

    const pageName = useLocation().pathname.split("/")[2]

    useEffect(() => {
        document.title = `Winc Dashboard van ${pageName}`
    })

    return (
        <div>
            <Header pagename={pageName} />
            <Nav pagename={pageName} />
            <Chart pagename={pageName} />
            <div className="menu">
                <SelectAssignments />
                <SortButtons />
            </div>
        </div>
    )
}

export default StudentComponent

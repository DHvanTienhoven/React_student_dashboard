import React, { useContext } from 'react';
import Dropdown from './Dropdown';
import { StudentContext } from './StudentContext';

const SelectAssignments = () => {

    const [students, setStudents] = useContext(StudentContext);

    const allAssignments = students[0].assignments;

    const selectAssignment = index => {
        const newStudents = [...students];
        newStudents[0].assignments[index].checked = !newStudents[0].assignments[index].checked;
        setStudents(newStudents)
    };

    const selectAll = () => {
        const newStudents = [...students];
        newStudents[0].assignments.map(item => item.checked = true);
        setStudents(newStudents)
    };

    return (
        <div className="selectassignments">
            <h3>Selecteer welke opdrachten je in het staafdiagram wil tonen</h3>
            <Dropdown />
            <ul>
                {allAssignments.map((item, index) =>
                    <li key={index}>
                        <input type="checkbox" checked={item.checked} onChange={() => selectAssignment(index)} />
                        {item.assignmentName.length < 7 &&
                            <span>{item.assignmentName}</span>}
                        {item.assignmentName.length > 7 &&
                            <span>{item.assignmentName.slice(17)}</span>}
                    </li>)}
            </ul>
            <button onClick={() => selectAll()}>Selecteer alle opdrachten</button>
        </div>
    )
};

export default SelectAssignments

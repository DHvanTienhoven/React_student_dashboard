import React, { useContext } from 'react';
import { AssignmentContext } from './AssignmentContext';
import Dropdown from './Dropdown';


const SelectAssignments = () => {

    const [assignments, setAssignments] = useContext(AssignmentContext)

    const selectAssignment = index => {
        const newAssignments = [...assignments];
        newAssignments[index].checked = !newAssignments[index].checked;
        setAssignments(newAssignments)
    };

    const selectAll = () => {
        const newAssignments = [...assignments];
        newAssignments.map(item => item.checked = true);
        setAssignments(newAssignments)
    };

    return (
        <div className="selectassignments">
            <h3>Selecteer welke opdrachten je in het staafdiagram wil tonen</h3>
            <Dropdown />
            <ul>
                {assignments.map((item, index) =>
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

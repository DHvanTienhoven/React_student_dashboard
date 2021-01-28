import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SortContext } from './SortContext';
import { StudentContext } from './StudentContext';


const Student = ({ student, pagename, index }) => {

    const [students, setStudents] = useContext(StudentContext);

    const url = `/Student/?name=${student.name}`;

    const selectStudent = index => {
        const newStudents = [...students]
        newStudents[index].checked = !newStudents[index].checked
        setStudents(newStudents)
    };

    const [sort, setSort] = useContext(SortContext);

    const setDefault = () => {
        const newStudents = [...students]
        newStudents[0].assignments.map(item => item.checked = true)
        setStudents(newStudents)
        setSort({ moeilijk: false, leuk: false })
    };


    return (
        <li>
            {!pagename &&
                <label className="container">
                    <input type="checkbox" id={student.name} checked={student.checked} onChange={() => selectStudent(index)} />
                    <span className="checkmark"></span>
                </label>}
            <Link to={url} onClick={() => setDefault()}> {student.name} </Link>
        </li>
    )
};

export default Student

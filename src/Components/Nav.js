import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StudentContext } from './StudentContext';
import Student from './Student'
import { SortContext } from './SortContext';


const Nav = ({ pagename }) => {

    const [students, setStudents] = useContext(StudentContext);

    const selectAllStudents = () => {
        const newStudents = [...students]
        newStudents.map(item => item.checked = true)
        setStudents(newStudents)
    };

    const [sort, setSort] = useContext(SortContext);

    const setDefault = () => {
        const newStudents = [...students]
        newStudents.map(item => item.checked = true)
        newStudents[0].assignments.map(item => item.checked = true)
        setStudents(newStudents)
        setSort({ moeilijk: false, leuk: false })
    };

    return (
        <div className="nav">
            <ul>
                {pagename && <li key="home"><Link to="/" onClick={() => setDefault()}>Home</Link></li>}
                {students.map((student, index) => <Student key={index} student={student} pagename={pagename} index={index} />)}
            </ul>
            {!pagename && <button onClick={() => selectAllStudents()}>Selecteer alle studenten</button>}
        </div>
    )
};

export default Nav

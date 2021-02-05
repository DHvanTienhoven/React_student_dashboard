import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StudentProvider } from './Components/StudentContext';
import { SortProvider } from './Components/SortContext';
import { AssignmentProvider } from './Components/AssignmentContext';
import StudentComponent from './Components/StudentComponent';
import Main from './Components/Main';


const App = () => {

  return (
    <Router>
      <StudentProvider>
        <AssignmentProvider>
          <SortProvider>
            <div className="App">
              <Route
                exact path="/"
                component=
                {Main}
              />
              <Route
                path="/Student"
                component=
                {StudentComponent}
              />
            </div>
          </SortProvider>
        </AssignmentProvider>
      </StudentProvider>
    </Router>
  );
}

export default App;

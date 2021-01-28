import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StudentProvider } from './Components/StudentContext';
import { SortProvider } from './Components/SortContext';
import StudentComponent from './Components/StudentComponent';
import Main from './Components/Main';

const App = () => {

  return (
    <Router>
      <StudentProvider>
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
      </StudentProvider>
    </Router>
  );
}

export default App;

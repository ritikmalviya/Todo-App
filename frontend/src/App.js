import './App.css';
import Todo from './components/Todo'
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dev" element={<Todo />} />
      </Routes>
    </BrowserRouter>

    // <div className='bg-zinc-800 text-white h-screen'>
    //   <Nav/>
    //   <CreateTodo/>
    //   <Todo/>
    // </div>
  );
}

export default App;

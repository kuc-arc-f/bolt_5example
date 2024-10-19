import { Routes, Route } from 'react-router-dom';

//
import Home from './client/home';
import BookMark from './client/BookMark';
import Chat from './client/Chat';
import Cms from './client/Cms';
import Login from './client/login';
import Plan from './client/Plan';
import Todo from './client/Todo';
//
export default function App(){
    return(
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookmark" element={<BookMark />} />
        <Route path="/cms" element={<Cms />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
    )
}
/*
*/
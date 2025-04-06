import React, { useState }  from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput('');
    }
  };

  return (
    <div className='App'>
      <h1>To-Do List</h1>
      <input
        type = 'text'
        value = {input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Добавить задачу'
      />
      <button onClick={addTask}>Добавить</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  )
}

export default App;
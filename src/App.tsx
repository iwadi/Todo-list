// import React, { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import './App.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
      return [];
    }
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'tasks') {
        try {
          const newTasks = event.newValue ? JSON.parse(event.newValue) : [];
          setTasks(newTasks);
        } catch (error) {
          console.error('Ошибка при обновлении задач:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Ошибка при сохранении задач:', error);
    }
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: input,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const toggleTask = (id: number) => {
    const newTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const clearTasks = () => {
    setTasks([]);
    localStorage.removeItem('tasks');
  };

  return (
    <div className='App'>
      <h1>To-Do List</h1>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Добавить задачу'
        className="task-input"
      />
      <div className="div-button">
        <button onClick={addTask} className="add-button">Добавить</button>
        <button onClick={clearTasks} className="filters-button">Очистить всё</button>
      </div>
      <ul className="ul">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <div className="task-content">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-text">{task.text}</span>
              </div>
            <div className="task-buttons">
              <button
                  className={task.completed ? 'toggle-button-return' : 'toggle-button'}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed ? 'Возвратить' : 'Завершить'}
                </button>
                <button className="delete-button" onClick={() => deleteTask(task.id)}>Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
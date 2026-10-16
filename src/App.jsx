import React, { useMemo, useState } from 'react';

const DEMO_EMAIL = 'student@example.com';
const DEMO_PASSWORD = 'password123';
const TODOS_KEY = 'daymark.todos';
const AUTH_KEY = 'daymark.signedIn';
const THEME_KEY = 'daymark.theme';

function readTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(TODOS_KEY) ?? '[]');
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

function ThemeToggle({ theme, onToggle }) {
  const nextMode = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      aria-label={`Switch to ${nextMode} mode`}
      className="mode-toggle"
      onClick={onToggle}
      title={`Switch to ${nextMode} mode`}
      type="button"
    >
      <span aria-hidden="true" className="mode-icon">{theme === 'dark' ? '\u2600' : '\u25d0'}</span>
      <span>{nextMode} mode</span>
    </button>
  );
}

function LoginPage({ onLogin, theme, onToggleTheme }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Enter your email and password to continue.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }

    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('That email and password do not match the demo account.');
      return;
    }

    onLogin();
  }

  return (
    <main className="login-layout">
      <ThemeToggle onToggle={onToggleTheme} theme={theme} />
      <section className="login-card" aria-labelledby="login-title">
        <div className="brand-mark" aria-hidden="true">d</div>
        <p className="eyebrow">A little more focus</p>
        <h1 id="login-title">Welcome back</h1>
        <p className="login-description">Sign in to pick up where you left off.</p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email address</label>
          <input
            autoComplete="username"
            id="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            type="email"
            value={email}
          />

          <label htmlFor="password">Password</label>
          <input
            autoComplete="current-password"
            id="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            type="password"
            value={password}
          />

          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button login-button" type="submit">Sign in <span aria-hidden="true">&#8594;</span></button>
        </form>

        <div className="demo-note">
          <span className="demo-note-icon" aria-hidden="true">i</span>
          <p><strong>Demo account</strong><br />student@example.com <span>&middot;</span> password123</p>
        </div>
      </section>
      <p className="login-footer">Make space for what matters.</p>
    </main>
  );
}

function TodoPage({ onLogout, theme, onToggleTheme }) {
  const [todos, setTodos] = useState(readTodos);
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState('All');
  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - remainingCount;
  const completionPercent = todos.length ? Math.round((completedCount / todos.length) * 100) : 0;
  const visibleTodos = useMemo(() => {
    if (filter === 'Active') return todos.filter((todo) => !todo.completed);
    if (filter === 'Completed') return todos.filter((todo) => todo.completed);
    return todos;
  }, [filter, todos]);

  function saveTodos(nextTodos) {
    setTodos(nextTodos);
    localStorage.setItem(TODOS_KEY, JSON.stringify(nextTodos));
  }

  function addTodo(event) {
    event.preventDefault();
    const title = draft.trim();
    if (!title) return;

    saveTodos([{ id: `${Date.now()}-${Math.random()}`, title, completed: false }, ...todos]);
    setDraft('');
  }

  function toggleTodo(id) {
    saveTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  function deleteTodo(id) {
    saveTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <main className="todo-layout">
      <header className="topbar">
        <ThemeToggle onToggle={onToggleTheme} theme={theme} />
        <a className="wordmark" href="#todos" aria-label="Daymark home">
          <span className="brand-mark brand-mark-small" aria-hidden="true">d</span>
          <span>daymark</span>
        </a>
        <button className="logout-button" onClick={onLogout} type="button">Log out <span aria-hidden="true">&#8599;</span></button>
      </header>

      <section className="todo-content" aria-labelledby="todo-title">
        <p className="eyebrow todo-date">YOUR SPACE <span>&middot;</span> TODAY</p>
        <div className="title-row">
          <div>
            <h1 id="todo-title">A clear mind<br className="mobile-break" /> starts here.</h1>
            <p className="todo-subtitle">One thing at a time. You have got this.</p>
          </div>
          <div className="count-card" aria-label={`${remainingCount} tasks remaining`}>
            <span className="count-number">{remainingCount}</span>
            <span className="count-label">left to do</span>
          </div>
        </div>

        <div className="progress-card">
          <div className="progress-copy">
            <span>{remainingCount === 0 && todos.length > 0 ? 'You did it. Take a little victory lap!' : completedCount > 0 ? 'Look at you, making things happen.' : 'A little progress is still progress.'}</span>
            <span>{completedCount} of {todos.length} done</span>
          </div>
          <div
            aria-label={`${completedCount} of ${todos.length} tasks completed`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={completionPercent}
            className="progress-track"
            role="progressbar"
          >
            <span className="progress-fill" style={{ width: `${completionPercent}%` }} />
          </div>
        </div>

        <form className="add-form" onSubmit={addTodo}>
          <span className="add-plus" aria-hidden="true">+</span>
          <label className="visually-hidden" htmlFor="new-todo">Add a task</label>
          <input
            id="new-todo"
            onChange={(event) => setDraft(event.target.value)}
            placeholder="What needs your attention?"
            value={draft}
          />
          <button className="primary-button add-button" disabled={!draft.trim()} type="submit">Add task</button>
        </form>

        <div className="list-toolbar">
          <h2>Your tasks <span>{todos.length}</span></h2>
          <div className="filter-tabs" aria-label="Filter tasks" role="group">
            {['All', 'Active', 'Completed'].map((option) => (
              <button
                aria-pressed={filter === option}
                className={filter === option ? 'filter-tab selected' : 'filter-tab'}
                key={option}
                onClick={() => setFilter(option)}
                type="button"
              >{option}</button>
            ))}
          </div>
        </div>

        {visibleTodos.length > 0 ? (
          <ul className="todo-list">
            {visibleTodos.map((todo) => (
              <li className={todo.completed ? 'todo-item completed' : 'todo-item'} key={todo.id}>
                <button
                  aria-checked={todo.completed}
                  aria-label={`${todo.completed ? 'Mark as active' : 'Mark as completed'}: ${todo.title}`}
                  className="check-button"
                  onClick={() => toggleTodo(todo.id)}
                  role="checkbox"
                  type="button"
                >{todo.completed && <span aria-hidden="true">&#10003;</span>}</button>
                <span className="todo-title">{todo.title}</span>
                <button
                  aria-label={`Delete ${todo.title}`}
                  className="delete-button"
                  onClick={() => deleteTodo(todo.id)}
                  type="button"
                ><span aria-hidden="true">&times;</span></button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">&#10041;</span>
            <p>{filter === 'All' ? 'A fresh page. A lovely place to start.' : `No ${filter.toLowerCase()} tasks.`}</p>
            <span>{filter === 'All' ? 'Add a task above and make today yours.' : 'Try another filter or add a new task.'}</span>
          </div>
        )}

        <footer className="list-footer">
          <span>{remainingCount === 1 ? '1 task' : `${remainingCount} tasks`} remaining</span>
          <span>Small steps add up <span aria-hidden="true">&#10022;</span></span>
        </footer>
      </section>
    </main>
  );
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true');
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark');

  function handleLogin() {
    sessionStorage.setItem(AUTH_KEY, 'true');
    setIsSignedIn(true);
  }

  function handleLogout() {
    sessionStorage.removeItem(AUTH_KEY);
    setIsSignedIn(false);
  }

  function handleToggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <div className="app-shell" data-theme={theme}>
      {isSignedIn
        ? <TodoPage onLogout={handleLogout} onToggleTheme={handleToggleTheme} theme={theme} />
        : <LoginPage onLogin={handleLogin} onToggleTheme={handleToggleTheme} theme={theme} />}
    </div>
  );
}

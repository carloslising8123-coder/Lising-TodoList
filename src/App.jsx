import { useState } from "react";

function TodoItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div>
        <p
          className={`font-medium ${
            task.done
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {task.text}
        </p>

        <span
          className={`text-sm font-semibold ${
            task.done
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {task.done ? "Done" : "Not Done"}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(task.id)}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          {task.done ? "Not Done" : "Done"}
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      done: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, done: !item.done }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            My To-Do List
          </h1>

          <p className="text-gray-500 mt-2">
            Organize your tasks and stay productive
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
              placeholder="Enter a new task..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Tasks
            </h2>

            {tasks.length > 0 && (
              <button
                onClick={clearTasks}
                className="text-red-500 font-medium hover:text-red-700"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <p className="text-lg">No tasks yet.</p>
                <p className="text-sm">
                  Add your first task above!
                </p>
              </div>
            ) : (
              tasks.map((item) => (
                <TodoItem
                  key={item.id}
                  task={item}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Instructions / User Guide
          </h2>

          <div className="space-y-3 text-gray-600">
            <p>
              <strong>1. Add a task:</strong> Enter a task and
              click "Add Task".
            </p>

            <p>
              <strong>2. Mark as Done:</strong> Click the
              "Done" button.
            </p>

            <p>
              <strong>3. Mark as Not Done:</strong> Click
              "Not Done" to change it back.
            </p>

            <p>
              <strong>4. Delete:</strong> Click "Delete"
              to remove a task.
            </p>

            <p>
              <strong>5. Clear All:</strong> Click "Clear All"
              to remove all tasks.
            </p>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          React + Tailwind CSS To-Do List
        </p>

      </div>
    </div>
  );
}

export default App;
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";

function Home() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({ task: "", status: "pending" });
  const [myTask, setMyTask] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);

  useEffect(() => {
    const tasksFromLocalStorage =
      JSON.parse(localStorage.getItem("tasks")) || {};
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      const userEmail = currentUser.email;
      setMyTask(tasksFromLocalStorage[userEmail] || []);
    }
  }, []);

  const handleTask = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const saveTasksToLocalStorage = (updatedTasks) => {
    const tasksFromLocalStorage =
      JSON.parse(localStorage.getItem("tasks")) || {};
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      const userEmail = currentUser.email;
      tasksFromLocalStorage[userEmail] = updatedTasks;
      localStorage.setItem("tasks", JSON.stringify(tasksFromLocalStorage));
    }
  };

  const createTask = () => {
    setOpen(true);
    setTask({ task: "", status: "pending" });
    setEditingIndex(null);
  };

  const assignTask = (e) => {
    e.preventDefault();
    const updatedTasks = [...myTask, task];
    saveTasksToLocalStorage(updatedTasks);
    setMyTask(updatedTasks);
    setOpen(false);
  };

  const editTask = (index) => {
    setTask(myTask[index]);
    setEditingIndex(index);
    setOpen(true);
  };

  const updateTask = (e) => {
    e.preventDefault();
    const updatedTasks = [...myTask];
    updatedTasks[editingIndex] = task;
    saveTasksToLocalStorage(updatedTasks);
    setMyTask(updatedTasks);
    setOpen(false);
  };

  const deleteTask = (index) => {
    const updatedTasks = myTask.filter((_, i) => i !== index);
    saveTasksToLocalStorage(updatedTasks);
    setMyTask(updatedTasks);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = myTask.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="px-10">
      <div className="flex justify-around mt-10">
        <h1 className="font-bold text-gray-500 text-3xl">
          Welcome {user.email} to User Dashboard
        </h1>
        <button
          onClick={createTask}
          className="bg-gray-500 py-3 px-10 text-white rounded-lg shadow-md"
        >
          Create Task
        </button>
      </div>

      <table className="mx-auto w-full table-auto border-collapse mt-10">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-gray-400">Task</th>
            <th className="px-4 py-2 border border-gray-400">Status</th>
            <th className="px-4 py-2 border border-gray-400">Update Task</th>
            <th className="px-4 py-2 border border-gray-400">Delete Task</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((value, i) => (
            <tr key={i} className="hover:bg-gray-100">
              <td className="px-4 py-2 border border-gray-400">{value.task}</td>
              <td className="px-4 py-2 border border-gray-400">
                {value.status}
              </td>
              <td className="px-4 py-2 border border-gray-400">
                <button
                  className="px-3 py-2 rounded-md bg-blue-500 text-white"
                  onClick={() => editTask(i)}
                >
                  Update Task
                </button>
              </td>
              <td className="px-4 py-2 border border-gray-400">
                <button
                  className="px-3 py-2 rounded-md bg-red-500 text-white"
                  onClick={() => deleteTask(i)}
                >
                  Delete Task
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-3 mt-5">
        {[...Array(Math.ceil(myTask.length / tasksPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Task Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        <form onSubmit={editingIndex === null ? assignTask : updateTask}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <DialogTitle
                    as="h3"
                    className="font-semibold text-gray-500 text-3xl"
                  >
                    {editingIndex === null
                      ? "Create Your Task"
                      : "Edit Your Task"}
                  </DialogTitle>
                  <div className="mt-2 flex flex-col gap-5">
                    <input
                      type="text"
                      placeholder="Enter your task"
                      className="px-4 py-2 rounded-md border border-gray-400"
                      name="task"
                      value={task.task}
                      onChange={handleTask}
                    />
                    <select
                      name="status"
                      value={task.status}
                      onChange={handleTask}
                      className="border border-gray-500 px-4 py-2 rounded-md text-gray-600"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="discarded">Discarded</option>
                    </select>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto"
                  >
                    {editingIndex === null ? "Assign" : "Update"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default Home;

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

function Admin() {
  const [users, setUsers] = useState([]);
  const [userTasks, setUserTasks] = useState({});
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [task, setTask] = useState({ task: "", status: "pending" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    task: "",
    status: "pending",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Change this value to set how many users you want per page

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    setUserTasks(storedTasks);
  }, []);

  // Handle pagination - Get current users based on the page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();

    const updatedUsers = [
      ...users,
      { name: newUser.name, email: newUser.email, password: newUser.password },
    ];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedTasks = {
      ...userTasks,
      [newUser.email]: [{ task: newUser.task, status: newUser.status }],
    };
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setUsers(updatedUsers);
    setUserTasks(updatedTasks);
    setCreateUserModal(false);
    setNewUser({
      name: "",
      email: "",
      password: "",
      task: "",
      status: "pending",
    });
  };

  const deleteUser = (index) => {
    const updatedUsers = [...users];
    const userEmail = updatedUsers[index].email;

    updatedUsers.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const updatedTasks = { ...userTasks };
    delete updatedTasks[userEmail];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setUsers(updatedUsers);
    setUserTasks(updatedTasks);
  };

  const editTask = (userEmail, index) => {
    setSelectedUser(userEmail);
    setEditingIndex(index);
    const userTask = userTasks[userEmail] && userTasks[userEmail][index];
    setTask(userTask || { task: "", status: "pending" });
    setOpen(true);
  };

  const updateTask = (e) => {
    e.preventDefault();

    if (selectedUser !== null && editingIndex !== null) {
      const updatedTasks = { ...userTasks };
      updatedTasks[selectedUser][editingIndex] = task;
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      setUserTasks(updatedTasks);
      setOpen(false);
    }
  };

  return (
    <div className="mt-10 px-10">
      <h1 className="text-3xl text-gray-500 mx-auto text-center mb-10">
        Welcome to Admin Dashboard
      </h1>

      <div className="flex justify-around items-center">
       <div>
       <input
          type="text"
          className="border border-gray-500 w-96 rounded-full py-3 px-10"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
       </div>
        <div className="flex justify-center mt-5">
          <button
            onClick={() => setCreateUserModal(true)}
            className="bg-gray-500 py-2 px-6 rounded-lg text-white "
          >
            Create New User
          </button>
        </div>
      </div>

      <div className="border border-gray-600 rounded-xl shadow-xl mt-10 px-5 py-5">
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="px-4 py-2 text-gray-700">Name</th>
              <th className="px-4 py-2 text-gray-700">Email</th>
              <th className="px-4 py-2 text-gray-700">Tasks</th>
              <th className="px-4 py-2 text-gray-700">Status</th>
              <th className="px-4 py-2 text-gray-700">Edit Task</th>
              <th className="px-4 py-2 text-gray-700">Delete User</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => {
              const tasks = userTasks[user.email] || [];

              return (
                <tr key={index} className="bg-white border-b hover:bg-gray-100">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    {tasks.length > 0 ? (
                      <ul>
                        {tasks.map((task, i) => (
                          <li key={i}>{task.task}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500">No Tasks</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {tasks.length > 0 ? (
                      <ul>
                        {tasks.map((task, i) => (
                          <li
                            key={i}
                            className={`text-${
                              task.status === "completed"
                                ? "green"
                                : task.status === "discarded"
                                ? "red"
                                : "yellow"
                            }-500`}
                          >
                            {task.status}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500">No Status</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {tasks.length > 0 ? (
                      tasks.map((_, i) => (
                        <button
                          key={i}
                          className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
                          onClick={() => editTask(user.email, i)}
                        >
                          Edit Task {i + 1}
                        </button>
                      ))
                    ) : (
                      <span className="text-gray-500">No Task</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="bg-red-500 py-2 px-4 rounded-lg text-white hover:bg-red-600"
                      onClick={() => deleteUser(index)}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-5">
          <button
            className="bg-gray-300 py-2 px-4 rounded-lg"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-600">
            Page {currentPage}
          </span>
          <button
            className="bg-gray-300 py-2 px-4 rounded-lg"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage * usersPerPage >= users.length}
          >
            Next
          </button>
        </div>
      </div>

      {/* Task Edit Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        <form onSubmit={updateTask}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <DialogTitle as="h3" className="font-semibold text-gray-500 text-3xl">
                    Edit Task
                  </DialogTitle>
                  <div className="mt-2 flex flex-col gap-5">
                    <input
                      type="text"
                      name="task"
                      value={task.task}
                      onChange={handleTaskChange}
                      className="px-4 py-2 rounded-md border border-gray-400"
                    />
                    <select
                      name="status"
                      value={task.status}
                      onChange={handleTaskChange}
                      className="border border-gray-500 px-4 py-2 rounded-md text-gray-600"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="discarded">Discarded</option>
                    </select>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="submit" className="bg-blue-500 px-3 py-2 text-white rounded-md">
                    Update Task
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="bg-white px-3 py-2 text-gray-900 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </form>
      </Dialog>

      {/* User Create Modal */}
      <Dialog open={createUserModal} onClose={() => setCreateUserModal(false)} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        <form onSubmit={handleCreateUser}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <DialogTitle as="h3" className="font-semibold text-gray-500 text-3xl">
                    Create New User
                  </DialogTitle>
                  <div className="mt-2 flex flex-col gap-5">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={newUser.name}
                      onChange={handleUserChange}
                      className="px-4 py-2 rounded-md border border-gray-400"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={newUser.email}
                      onChange={handleUserChange}
                      className="px-4 py-2 rounded-md border border-gray-400"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={newUser.password}
                      onChange={handleUserChange}
                      className="px-4 py-2 rounded-md border border-gray-400"
                    />
                    <input
                      type="text"
                      name="task"
                      placeholder="Task"
                      value={newUser.task}
                      onChange={handleUserChange}
                      className="px-4 py-2 rounded-md border border-gray-400"
                    />
                    <select
                      name="status"
                      value={newUser.status}
                      onChange={handleUserChange}
                      className="border border-gray-500 px-4 py-2 rounded-md text-gray-600"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="discarded">Discarded</option>
                    </select>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="submit" className="bg-blue-500 px-3 py-2 text-white rounded-md">
                    Create User
                  </button>
                  <button
                    onClick={() => setCreateUserModal(false)}
                    className="bg-white px-3 py-2 text-gray-900 rounded-md"
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

export default Admin;

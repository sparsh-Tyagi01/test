import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };

  const leads = [
    { id: 1, name: "Client A" },
    { id: 2, name: "Client B" },
    { id: 3, name: "Client C" }
  ];

  const tasks = [
    { id: 1, title: "Call Client" },
    { id: 2, title: "Send Proposal" },
    { id: 3, title: "Follow Up" }
  ];

  return (
    <div className="p-10">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-2xl font-bold">
          Welcome {name}
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      <div className="grid grid-cols-2 gap-8">

        <div className="bg-white p-5 shadow rounded">

          <h2 className="text-xl font-semibold mb-3">
            Leads
          </h2>

          <ul>
            {leads.map((lead) => (
              <li key={lead.id} className="border-b py-2">
                {lead.name}
              </li>
            ))}
          </ul>

        </div>

        <div className="bg-white p-5 shadow rounded">

          <h2 className="text-xl font-semibold mb-3">
            Tasks
          </h2>

          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="border-b py-2">
                {task.title}
              </li>
            ))}
          </ul>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
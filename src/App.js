import { useEffect, useState } from "react";
import "./App.css";
import TaskBoard from "./TaskBoard";
import axios from "axios";
import display from "./assets/Display.svg";
import down from "./assets/down.svg";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(
    () => localStorage.getItem("kanbanGroupBy") || "status"
  );
  const [sortBy, setSortBy] = useState(
    () => localStorage.getItem("kanbanSortBy") || "priority"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("kanbanGroupBy", groupBy);
    localStorage.setItem("kanbanSortBy", sortBy);
  }, [groupBy, sortBy]);

  useEffect(() => {
    const savedGroupBy = localStorage.getItem("kanbanGroupBy");
    const savedSortBy = localStorage.getItem("kanbanSortBy");
    if (savedGroupBy) setGroupBy(savedGroupBy);
    if (savedSortBy) setSortBy(savedSortBy);
  }, []);

  const sortedTickets = tickets.sort((a, b) => {
    if (sortBy === "priority") {
      return b.priority - a.priority;
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="kanban-container">
      <header className="black-header">
       
        <h3>VaishNavi</h3>
      </header>
      <div className="kanban-header">
        <div className="display-dropdown">
          <details>
            <summary className="display-summary">
              <img src={display} alt="display" className="display-icon" />
              <span className="display-title">Display</span>
              <img src={down} alt="down" className="down-icon" />
            </summary>
            <div className="dropdown">
              <div className="dropdown-row">
                <span className="dropdown-label">Grouping</span>
                <select
                  id="groupBy"
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                >
                  <option value="status">Status</option>
                  <option value="users">Users</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              <div className="dropdown-row">
                <span className="dropdown-label">Ordering</span>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </details>
        </div>
      </div>
      <TaskBoard tasks={sortedTickets} groupBy={groupBy} users={users}></TaskBoard>
    </div>
  );
}

export default App;

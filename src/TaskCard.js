import React from "react";
import "./TaskCard.css";

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.split(" ");
  const initials = parts.map((part) => part.charAt(0).toUpperCase()).join("");
  return initials;
};

const colorPalette = [
  "#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD",
  "#E67E22", "#2ECC71", "#3498DB", "#9B59B6", "#F39C12"
];

const randomColor = () => {
  return colorPalette[Math.floor(Math.random() * colorPalette.length)];
};

const TaskCard = ({ task, statusIcons, users, groupBy, priorityIcons }) => {
  const userName = users.find((user) => user.id === task.userId)?.name;
  const initials = getInitials(userName);
  const available = users ? users.available : false;

  return (
    <div className="task-card">
      <div className="task-card-header">
        <div className="task-id-initials">
          <span className="task-id">{task.id}</span>
          {groupBy !== "users" && (
            <div className="user-initials-container">
              <span
                className="user-initials"
                style={{ backgroundColor: randomColor() }}
              >
                {initials}
              </span>
              <div
                className={`availability-indicator ${
                  available ? "available" : "unavailable"
                }`}
              ></div>
            </div>
          )}
        </div>
        <div className="task-title-status">
          {groupBy !== "status" ? (
            <img
              src={statusIcons || ""}
              alt={`${statusIcons}`}
              className="status-icon"
            />
          ) : null}
          <h3 className="task-title">{task.title}</h3>
        </div>
      </div>
      {task.tag ? (
        <div className="priority-feature-container">
          {groupBy !== "priority" ? (
            <img
              src={priorityIcons || ""}
              alt={`${priorityIcons}`}
              className="priority-icon"
            />
          ) : null}
          <div className="feature-tag">
            <div className="circle"></div>
            <span className="feature">{task.tag[0]}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TaskCard;

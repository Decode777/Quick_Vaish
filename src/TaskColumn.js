import React from "react";
import TaskCard from "./TaskCard";
import "./TaskColumn.css";

import backlogIcon from "./assets/Backlog.svg";
import todoIcon from "./assets/To-do.svg";
import inProgressIcon from "./assets/in-progress.svg";
import noPriority from "./assets/No-priority.svg";
import urgent from "./assets/SVG - Urgent Priority colour.svg";
import High from "./assets/Img - High Priority.svg";
import Medium from "./assets/Img - Medium Priority.svg";
import Low from "./assets/Img - Low Priority.svg";
import greyUrgent from "./assets/SVG - Urgent Priority grey.svg";
import doneIcon from "./assets/Done.svg";
import cancelledIcon from "./assets/Cancelled.svg";
import dots from "./assets/3 dot menu.svg";
import add from "./assets/add.svg";

const sIcons = {
  "No Priority": noPriority,
  Urgent: urgent,
  Low: Low,
  High: High,
  Medium: Medium,
  Backlog: backlogIcon,
  Todo: todoIcon,
  "In progress": inProgressIcon,
  Done: doneIcon,
  Cancelled: cancelledIcon,
};

const pIcons = {
  "No Priority": noPriority,
  Urgent: greyUrgent,
  Low: Low,
  High: High,
  Medium: Medium,
  Backlog: backlogIcon,
  Todo: todoIcon,
  "In progress": inProgressIcon,
  Done: doneIcon,
  Cancelled: cancelledIcon,
};

const pLabels = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No Priority",
};

const colorOptions = [
  "#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD", 
  "#E67E22", "#2ECC71", "#3498DB", "#9B59B6", "#F39C12"
];

const randomColor = () => {
  return colorOptions[Math.floor(Math.random() * colorOptions.length)];
};

const userInitials = (name) => {
  if (!name) return "";
  const parts = name.split(" ");
  const initials = parts.map((p) => p.charAt(0).toUpperCase()).join("");
  return initials;
};

const TaskColumn = ({ group, tasks, groupBy, users }) => {
  const usr = users.find((u) => u.id === group);
  const available = usr ? usr.available : false;

  return (
    <div className="task-column">
      <div className="task-column-header">
        {groupBy === "users" ? (
          <div className="user-initials-container">
            <div
              className="user-initials"
              style={{ backgroundColor: randomColor() }}
            >
              {userInitials(group)}
            </div>
            <div
              className={`availability-indicator ${available ? "available" : "unavailable"}`}
            ></div>
          </div>
        ) : (
          <img
            src={sIcons[group] || ""}
            alt={`${group} icon`}
            className="status-icon"
          />
        )}
        <h3 className="groupName">{group}</h3>
        <span className="count">{tasks.length}</span>
        <div className="right-icons">
          <img src={add} alt={`${group} icon`} className="add-icon" />
          <img src={dots} alt={`${group} icon`} className="dot-icon" />
        </div>
      </div>
      <div className="task-list">
        {tasks.map((t) => {
          const tVal = groupBy === "status" ? pLabels[t.priority] : t.status;
          const altVal = pLabels[t.priority];

          return (
            <TaskCard
              key={t.id}
              task={t}
              statusIcons={sIcons[tVal]}
              priorityIcons={pIcons[altVal]}
              users={users}
              groupBy={groupBy}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskColumn;

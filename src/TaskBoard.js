import React from "react";
import TaskColumn from "./TaskColumn";
import "./TaskBoard.css";

const groupTasks = (tasks, groupBy) => {
  const grouped = tasks.reduce((groups, task) => {
    let groupKey;
    if (groupBy === "users") {
      groupKey = task.userId;
    } else if (groupBy === "priority") {
      groupKey = task.priority;
    } else if (groupBy === "status") {
      groupKey = task.status;
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(task);
    return groups;
  }, {});

  // Ensure "Done" and "Cancelled" are present when grouping by "status"
  if (groupBy === "status") {
    if (!grouped["Done"]) grouped["Done"] = [];
    if (!grouped["Cancelled"]) grouped["Cancelled"] = [];
  }

  return grouped;
};

const getGroupName = (groupBy, group, users) => {
  if (groupBy === "priority") {
    switch (parseInt(group)) {
      case 4:
        return "Urgent";
      case 3:
        return "High";
      case 2:
        return "Medium";
      case 1:
        return "Low";
      case 0:
        return "No Priority";
      default:
        return "Unknown";
    }
  } else if (groupBy === "users") {
    const user = users.find((u) => u.id === group);
    return user ? user.name : "Unknown User";
  }
  return group;
};

function TaskBoard({ tasks, groupBy, users }) {
  const groupedTasks = groupTasks(tasks, groupBy);

  return (
    <div className="task-board">
      {Object.keys(groupedTasks).map((group) => (
        <TaskColumn
          groupBy={groupBy}
          key={group}
          group={getGroupName(groupBy, group, users)}
          tasks={groupedTasks[group]}
          users={users}
        />
      ))}
    </div>
  );
}

export default TaskBoard;

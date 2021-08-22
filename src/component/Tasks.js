import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import { addDays, isAfter, isBefore, isToday } from "date-fns";

const FORMAT = "dd/MM/yyyy";
function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

const AddTask = function ({ onCancel, onAddTask }) {
  const [task, settask] = useState("");
  const [date, setDate] = useState(null);

  return (
    <div className="add-task-dialog">
      <input value={task} onChange={(e) => settask(e.target.value)} />
      <div className="add-task-actions-container">
        <div className="btns-container">
          <button
            className="add-btn"
            onClick={() => {
              if (task !== "") {
                onAddTask(task, date);
                settask("");
                onCancel();
              }
            }}
          >
            Add Task
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              onCancel();
              settask("");
            }}
          >
            Cancel
          </button>
        </div>
        <div className="icon-container">
          <DayPickerInput
            onDayChange={(day) => setDate(day)}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
            formatDate={formatDate}
            format={FORMAT}
            dayPickerProps={{
              modifiers: {
                disabled: [
                  {
                    before: new Date(),
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

const TASKS_HEADER_MAPING = {
  INBOX: "Inbox",
  TODAY: "Today",
  NEXT_7: "Next 7 days",
};

const TaskItems = function ({ tasks, selectedTab }) {
  let tasksToRender = [...tasks];

  if (selectedTab === "NEXT_7") {
    tasksToRender = tasks.filter((task) => {
      return (
        isAfter(task.date, new Date()) &&
        isBefore(task.date, addDays(new Date(), 7))
      );
    });
  }

  if (selectedTab === "TODAY") {
    tasksToRender = tasks.filter((task) => {
      return isToday(task.date);
    });
  }

    return (
        <div className="task-items-container">
            {tasksToRender.map((task) => (
                <div key={task.text} className="task-item">
                    <p>{task.text}</p>
                    <p>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
                </div>   
            ))}
        </div>
    )
};

export default function Tasks({ selectedTab }) {
  const [showAddTask, setshowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const addNewTask = function (newTask, date) {
    const newTaskItems = { text: newTask, date: date || new Date() };

    setTasks((prev) => {
      return [...prev, newTaskItems];
    });
    console.log(tasks);
  };

  return (
    <div className="tasks">
      <h1>{TASKS_HEADER_MAPING[selectedTab]}</h1>

      {selectedTab === "INBOX" ? (
        <div
          className="add-task-btn"
          onClick={() => setshowAddTask((prev) => !prev)}
        >
          <span className="plus">+</span>
          <span className="add-task-text">Add Task</span>
        </div>
      ) : null}

      {showAddTask && (
        <AddTask
          onAddTask={addNewTask}
          onCancel={() => setshowAddTask(false)}
        />
      )}

      {tasks.length > 0 ? (
        <TaskItems
          className="task-item"
          tasks={tasks}
          selectedTab={selectedTab}
        />
      ) : (
        <h5>No Tasks Yet</h5>
      )}
    </div>
  );
}

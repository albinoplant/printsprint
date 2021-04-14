import { Button } from "@material-ui/core";
import { PROJECTS_COLLECTION } from "constants/firebasePaths";
import { useNotifications } from "modules/notification";
import { useState } from "react";
import { useDatabase, useDatabaseList, useUser } from "reactfire";
import NewTasksForm from "./NewTasksForm";
import TasksList from "./TasksList";

const Draft = ({ project, projectId }) => {
  const { showSuccess, showError } = useNotifications();
  const database = useDatabase();
  const { ServerValue } = useDatabase;
  const tasksRef = database.ref(`${PROJECTS_COLLECTION}/${projectId}/tasks`);

  const { data: tasks } = useDatabaseList(tasksRef);

  function addTask(newInstance) {
    return database
      .ref(`${PROJECTS_COLLECTION}/${projectId}/tasks`)
      .push({
        ...newInstance,
        createdAt: ServerValue.TIMESTAMP,
      })
      .then(() => {
        showSuccess("Task added successfully");
      })
      .catch((err) => {
        console.error("Error:", err); // eslint-disable-line no-console
        showError(err.message || "Could not add task");
        return Promise.reject(err);
      });
  }

  function deleteTask(key) {
    return database
      .ref(`projects/${project.id}/tasks/${key}`)
      .remove()
      .then(() => showSuccess("Task deleted successfully"))
      .catch((err) => {
        console.error("Error:", err); // eslint-disable-line no-console
        showError(err.message || "Could not delete project");
        return Promise.reject(err);
      });
  }

  return (
    <>
      {/* <pre>{JSON.stringify(project, null, 2)}</pre> */}
      <TasksList tasks={tasks} remove={deleteTask} />
      <NewTasksForm onSubmit={addTask} />
    </>
  );
};
export default Draft;

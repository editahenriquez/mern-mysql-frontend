import {useContext, useState } from "react";
import { getTasksReq, createTasksReq ,updateTasksReq, deleteTasksReq, getTaskReq} from "../api/tasks.api";
import { TaskContext } from "./TaskContext";
import PropTypes from 'prop-types';
import DialogBox from '../components/DialogBox'; // import the DialogBox component

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error ('useTasks must be used within a TaskContextProvider');
    }
    return context;
};

export const TaskContextProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);

    const [dialogOpen, setDialogOpen] = useState(false); // state to control the dialog box
    const [dialogType, setDialogType] = useState(''); // state to control the type of dialog box
    const [dialogTitle, setDialogTitle] = useState(''); // state to control the title of dialog box
    const [dialogDescription, setDialogDescription] = useState(''); // state to control the description of dialog box
    const [dialogResolve, setDialogResolve] = useState(false); // state to control response of dialog box

    const openDialog = (type, title, description) => {
      return new Promise((resolve) => {
        setDialogType(type);
        setDialogTitle(title);
        setDialogDescription(description);
        setDialogOpen(true);
        setDialogResolve(() => resolve); // store the resolve function
      });
    };
    const closeDialog = (userChoice) => {
      setDialogOpen(false);
      dialogResolve(userChoice); // resolve the promise with the user's choice
    };
    

    const getTasks = async () => {
        try {
          const response = await getTasksReq();
          //console.log(response);
          setTasks(response);
        }catch (err) {
          console.error(err);
          alert(err);
        }
    };

    const getTask = async (id) => {
      try {
        const response = await getTaskReq(id);
        //console.log(response);
        return response;
      }catch (err) {
        console.error(err);
        alert(err);
      }
  };

  const createTasks = async (fields) => {
    try {
      const response = await createTasksReq(fields);
      //console.log(response);
      try {
        await getTasks();
      }catch(err) {
          console.log(`Error fetching tasks: ${err}`);
          alert(err);
      }
    }catch (err) {
      console.error(err);
      alert(err);
    }
  };

    const updateTasks = async (id, fields) => {
      try {
        const response = await updateTasksReq(id, fields);
        //console.log(response);
        try {
          await getTasks();
        }catch(err) {
            console.log(`Error fetching tasks: ${err}`);
            alert(err);
        }
      }catch (err) {
        console.error(err);
        alert(err);
      }
    };

    const deleteTasks = async (id) => {
      try {
        const response = await deleteTasksReq(id);
        //console.log(response);
        try {
          await getTasks();
        }catch(err) {
            console.log(`Error fetching tasks: ${err}`);
            alert(err);
        }
      }catch (err) {
        console.error(err);
        alert(err);
      }
    };

  return (
    <TaskContext.Provider
    value={{
      tasks,
      getTasks,
      getTask,
      createTasks,
      updateTasks,
      deleteTasks,
      openDialog, // provide the openDialog function
      closeDialog // provide the closeDialog function
    }}
  >
    {children}
    <DialogBox
      open={dialogOpen}
      handleClose={closeDialog}
      type={dialogType}
      title={dialogTitle}
      description={dialogDescription}
    />
  </TaskContext.Provider>
  );
  
}

TaskContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
import {Form, Formik} from 'formik';
import React, { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskProvider';
import {useParams, useNavigate} from 'react-router-dom';

function TaskForm() {
  const {getTask,createTasks,updateTasks,openDialog}=useTasks();
  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetTask = async () => {
      if (params.id) {
        try {
          const fetchedTask = await getTask(params.id);
          //console.log(fetchedTask);
          setTask({
            title: fetchedTask.title,
            description: fetchedTask.description
          });
        }catch(err) {
          console.log(`Error fetching task: ${err}`);
          alert(err);
        }
      }
    };
    handleGetTask();
  }, [])
  
  const handleCreateTasks = async (fields) => {
    try {
      await createTasks(fields);
    }catch(err) {
      console.log(`Error inserting tasks: ${err}`);
      alert(err);
    }
  };

  const handleUpdateTasks = async (fields) => {
    try {
      await updateTasks(params.id,fields);
    }catch(err) {
      console.log(`Error updating tasks: ${err}`);
      alert(err);
    }
  };

  const handleSubmit = async (fields, { setSubmitting }) => {
    if (!fields.title || !fields.description){
      await openDialog('informative', 'Error', 'Title and description are required.');
      setSubmitting(false);
      return;
    }

    if (params.id){
      handleUpdateTasks(fields)
    }else{
      handleCreateTasks(fields)
    }
    navigate('/');
    setTask({
      title: '',
      description: ''
    })
  };

  return (
    <div>
      <Formik
      initialValues={task}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      >
        {
          ({handleChange, handleSubmit, values, isSubmitting })=> (
            <Form 
            onSubmit={handleSubmit}
            className='bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10'
            >
              <h1 className='text-sl font-bold uppercase text-center'>{params.id? 'Edit Task': 'New Task'}</h1>
              <label className='block'>Title</label>
              <input type="text"
              name='title'
              placeholder='Title'
              onChange={handleChange}
              value={values.title}
              className='px-2 py-1 rounded-md w-full'
              />
              <label className='block'>Description</label>
              <textarea name="description"
              rows="3"
              placeholder='Description'
              onChange={handleChange}
              value={values.description}
              className='px-2 py-1 rounded-md w-full'
              ></textarea>
              <button
              type='submit'
              disabled={isSubmitting}
              className='block bg-indigo-500 px-2 py-1 text-white w-full rounded-md'
              >
                {isSubmitting? 'Saving' : 'Save'}
              </button>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}

export default TaskForm
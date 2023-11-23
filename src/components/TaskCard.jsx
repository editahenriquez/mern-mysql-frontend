import PropTypes from 'prop-types';
import { useTasks } from '../context/TaskProvider';
import { useNavigate } from 'react-router-dom';

function TaskCard({task}) {
  const {updateTasks, deleteTasks,openDialog} = useTasks();
  const navigate = useNavigate();

  const dateObject = new Date(task.createdAt);
  const fullDateTime  = dateObject.toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    //timeZoneName: 'short',
  });

  const handleUpdateTasks = async () => {
    try {
      await updateTasks(task.id,{done:task.done ===0 ? 1 : 0});
    }catch(err) {
      console.log(`Error updating tasks: ${err}`);
      alert(err);
    }
  };
  
  const handleDeleteTasks = async () => {

    try {
      const userChoice = await openDialog('confirmation', 'Confirmation', 'Are you sure to delete?');
      if (!userChoice) {
        return;
      }
    }catch(err){
      console.log(`Error deleting tasks: ${err}`);
      alert(err);
    }
    
    try {
      await deleteTasks(task.id);
    }catch(err) {
      console.log(`Error deleting tasks: ${err}`);
      alert(err);
    }
  };

  return (
    <div className='bg-zinc-700 text-white rounded-md p-4'>
      <header className='flex justify-between'>
        <h2 className='text-sm font-bold'>{task.title}</h2>
        <span onClick={handleUpdateTasks} style={{cursor: 'pointer'}}>{task.done == 1 ? '✅️':'⬜'}</span>
      </header>
      <p className='text-xs'>{task.description}</p>
      <p className='text-xs'>{fullDateTime }</p>
      <div className='flex gap-x-2'>
          <button onClick={handleDeleteTasks} className='bg-slate-300 px-2 py-1 text-black'>Delete</button>
          <button onClick={()=>navigate(`/edit/${task.id}`)} className='bg-slate-300 px-2 py-1 text-black'>Edit</button>
      </div>
    </div>
  )
}

TaskCard.propTypes ={
    task: PropTypes.object.isRequired
};

export default TaskCard

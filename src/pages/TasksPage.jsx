import { useEffect } from 'react'
import { useTasks } from '../context/TaskProvider'
import TaskCard from '../components/TaskCard';

function TasksPage() {
  const {tasks, getTasks} = useTasks();

  const handlegetTasks = async () => {
    try {
      await getTasks();
    }catch(err) {
      console.log(`Error fetching tasks: ${err}`);
      alert(err);
    }
  };

  useEffect(() => {
    handlegetTasks();
  }, [])
  

  return (
    <>
      {tasks.length === 0 
      ? (<h1 className='text-4xl text-white font-bold text-center'>No tasks yet</h1>)
      : (
        <>
         <h1 className='text-4xl text-white font-bold text-center'>Tasks</h1>
         <div className='grid grid-cols-3 gap-2'>
            {tasks.map((task)=><TaskCard task={task} key={task.id}/>)}
        </div>
        </>
        )
      }
    </>
  )
}

export default TasksPage

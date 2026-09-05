import { FiEdit2, FiTrash2, FiCheckCircle, FiCircle } from 'react-icons/fi';
import { format, isBefore } from 'date-fns';

const priorityColors = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700'
};

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const overdue = task.dueDate && !task.completed && isBefore(new Date(task.dueDate), new Date());

  return (
    <div className={`bg-white rounded-xl shadow-sm p-4 border-l-4 ${overdue ? 'border-red-500' : 'border-primary'} flex flex-col gap-2`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-2">
          <button onClick={() => onToggle(task._id)} className="mt-1 text-primary">
            {task.completed ? <FiCheckCircle size={20} /> : <FiCircle size={20} />}
          </button>
          <div>
            <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>
            )}
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="text-xs text-gray-500">
          {task.dueDate && (
            <span className={overdue ? 'text-red-500 font-medium' : ''}>
              Due {format(new Date(task.dueDate), 'MMM d, yyyy')}
              {overdue && ' (Overdue)'}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(task)} className="text-gray-500 hover:text-primary">
            <FiEdit2 size={16} />
          </button>
          <button onClick={() => onDelete(task._id)} className="text-gray-500 hover:text-red-500">
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

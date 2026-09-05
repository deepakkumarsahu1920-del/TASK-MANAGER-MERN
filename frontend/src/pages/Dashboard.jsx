import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Stats from '../components/Stats';
import Filters from '../components/Filters';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { FiPlus } from 'react-icons/fi';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (status !== 'all') params.status = status;
      if (search) params.search = search;
      if (sortBy) params.sortBy = sortBy;

      const { data } = await api.get('/tasks', { params });
      setTasks(data.tasks);
    } catch (err) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [status, search, sortBy]);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get('/tasks/stats');
      setStats(data.stats);
    } catch (err) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchTasks]);

  useEffect(() => {
    fetchStats();
  }, [tasks, fetchStats]);

  const handleToggle = async (id) => {
    try {
      await api.patch(`/tasks/${id}/toggle`);
      fetchTasks();
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted');
      fetchTasks();
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const handleDeleteCompleted = async () => {
    if (!confirm('Delete all completed tasks?')) return;
    try {
      await api.delete('/tasks/completed');
      toast.success('Completed tasks cleared');
      fetchTasks();
    } catch (err) {
      toast.error('Failed to clear completed tasks');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSave = async (form) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, form);
        toast.success('Task updated');
      } else {
        await api.post('/tasks', form);
        toast.success('Task created');
      }
      setModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save task');
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        <Stats stats={stats} />
        <Filters
          status={status}
          setStatus={setStatus}
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onDeleteCompleted={handleDeleteCompleted}
        />

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-700">Your Tasks</h2>
          <button
            onClick={() => {
              setEditingTask(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-1 bg-primary text-white px-3 py-2 rounded-md text-sm hover:opacity-90"
          >
            <FiPlus /> New Task
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No tasks found</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Dashboard;

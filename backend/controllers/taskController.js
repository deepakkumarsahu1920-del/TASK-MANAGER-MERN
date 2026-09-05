const Task = require('../models/Task');

const getTasks = async (req, res, next) => {
  try {
    const { status, search, sortBy } = req.query;
    const query = { user: req.user._id };

    if (status === 'completed') query.completed = true;
    if (status === 'pending') query.completed = false;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let sort = { createdAt: -1 };
    if (sortBy === 'oldest') sort = { createdAt: 1 };
    if (sortBy === 'newest') sort = { createdAt: -1 };
    if (sortBy === 'priority') sort = { priority: -1 };
    if (sortBy === 'dueDate') sort = { dueDate: 1 };

    const tasks = await Task.find(query).sort(sort);
    res.json({ success: true, count: tasks.length, tasks });
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      priority,
      dueDate,
      completed
    });
    res.status(201).json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

const deleteCompletedTasks = async (req, res, next) => {
  try {
    const result = await Task.deleteMany({ user: req.user._id, completed: true });
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    next(err);
  }
};

const toggleComplete = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    task.completed = !task.completed;
    await task.save();

    res.json({ success: true, task });
  } catch (err) {
    next(err);
  }
};

const getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const now = new Date();

    const [total, completed, pending, overdue] = await Promise.all([
      Task.countDocuments({ user: userId }),
      Task.countDocuments({ user: userId, completed: true }),
      Task.countDocuments({ user: userId, completed: false }),
      Task.countDocuments({ user: userId, completed: false, dueDate: { $lt: now } })
    ]);

    res.json({ success: true, stats: { total, completed, pending, overdue } });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteCompletedTasks,
  toggleComplete,
  getStats
};

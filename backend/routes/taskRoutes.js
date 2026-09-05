const express = require('express');
const { body } = require('express-validator');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteCompletedTasks,
  toggleComplete,
  getStats
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.use(protect);

router.get('/stats', getStats);
router.delete('/completed', deleteCompletedTasks);

router
  .route('/')
  .get(getTasks)
  .post(
    [
      body('title').notEmpty().withMessage('Title is required'),
      body('priority').optional().isIn(['Low', 'Medium', 'High']),
      body('dueDate').optional().isISO8601().withMessage('Invalid due date')
    ],
    validate,
    createTask
  );

router
  .route('/:id')
  .get(getTask)
  .put(
    [
      body('priority').optional().isIn(['Low', 'Medium', 'High']),
      body('dueDate').optional().isISO8601().withMessage('Invalid due date')
    ],
    validate,
    updateTask
  )
  .delete(deleteTask);

router.patch('/:id/toggle', toggleComplete);

module.exports = router;

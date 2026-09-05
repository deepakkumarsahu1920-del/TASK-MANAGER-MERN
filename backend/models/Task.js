const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

TaskSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Task', TaskSchema);

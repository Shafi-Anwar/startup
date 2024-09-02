import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  email: { type: String, required: true, unique: true },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }, // Associate with a workspace
  createdAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model('Employee', EmployeeSchema);

export default Employee;

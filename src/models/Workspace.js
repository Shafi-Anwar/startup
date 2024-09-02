import mongoose from 'mongoose';

const WorkspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Owner of the workspace
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who are part of the workspace
  createdAt: { type: Date, default: Date.now },
});

const Workspace = mongoose.model('Workspace', WorkspaceSchema);

export default Workspace;

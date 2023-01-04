import mongoose from 'mongoose';
import env from './env.js';

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${env.db_user}:${env.db_pass}@${env.mongo_cluster}/${env.db}`);

const db = mongoose.connection;

export default db;
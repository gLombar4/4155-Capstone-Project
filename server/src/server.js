import 'dotenv/config';
import cors from 'cors';
import express from 'express';
// import supabase from './supabaseClient.js';
import userRoutes from './routes/userRoutes.js'

const app = express();

// Allow requests from the Vite dev server
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Health check route to confirm the server is running
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get("/", (req,res) =>{
  res.json({"message": "Hello world"});
})

app.use('/users', userRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
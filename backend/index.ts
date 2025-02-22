
import express from 'express';
import mediaRoutes from './src/routes/mediaRoutes';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use('/api/media', mediaRoutes); 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

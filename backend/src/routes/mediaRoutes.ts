import { Router } from 'express';
import { deleteMedia, getAllMedia, uploadMedia, getMediaFileController, updateMedia, getMediaDataController } from '../controllers/mediaController';
import multer from 'multer';
import path from 'path';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

router.post('/save', upload.single('audio'), uploadMedia);
router.get('/get-all', getAllMedia);
router.delete('/delete/:id', deleteMedia);
router.get('/:mediaId', getMediaFileController);
router.get('/data/:mediaId', getMediaDataController);
router.put('/update/:id', updateMedia);

export default router;

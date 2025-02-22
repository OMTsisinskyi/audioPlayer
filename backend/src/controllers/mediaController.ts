import { Request, Response } from 'express';
import * as mediaService from '../services/mediaService';
import { getMediaFileService } from '../services/mediaService';

export const uploadMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, duration } = req.body;
        const audioFile = req.file;

        if (!audioFile) {
            res.status(400).send('No audio file uploaded');
            return;
        }

        const media = await mediaService.saveMedia(audioFile, title, description, duration);
        res.status(201).json(media);
    } catch (error) {
        console.error('Error uploading media:', error);
        res.status(500).send('Internal server error');
    }
};

export const getAllMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const mediaRecords = await mediaService.getAllMedia();
        res.status(200).json(mediaRecords);
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).send('Internal server error');
    }
};

export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const result = await mediaService.deleteMedia(id);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting media:', error);
        res.status(500).send('Internal server error');
    }
};

export const getMediaFileController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { mediaId } = req.params;
        const filePath = await getMediaFileService(mediaId);

        if (!filePath) {
            res.status(404).send('Media not found');
            return;
        }

        res.sendFile(filePath, {
            headers: { 'Content-Type': 'audio/mpeg' }
        }, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error sending file');
            }
        });
    } catch (error) {
        console.error('Error in getMediaFileController:', error);
        res.status(500).send('Internal server error');
    }
};

export const getMediaDataController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { mediaId } = req.params;
        const media = await mediaService.getMediaDataService(mediaId);

        if (!media) {
            res.status(404).send('Media not found');
            return;
        }

        res.status(200).json(media);
    } catch (error) {
        console.error('Error in getMediaFileController:', error);
        res.status(500).send('Internal server error');
    }
};



export const updateMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!title && !description) {
            res.status(400).send('Title or description must be provided');
            return;
        }

        const updatedMedia = await mediaService.updateMedia(id, title, description);

        res.status(200).json(updatedMedia);
    } catch (error) {
        console.error('Error updating media:', error);
        res.status(500).send('Internal server error');
    }
};
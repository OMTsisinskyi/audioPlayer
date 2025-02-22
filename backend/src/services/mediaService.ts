import path from 'path';
import { prisma } from '../utils/prisma';
import fs from 'fs';
import { Media } from '@prisma/client';


export const saveMedia = async (audioFile: Express.Multer.File, title: string, description: string, duration: number) => {
    const filePath = path.join('uploads', audioFile.filename);
    const absoluteFilePath = path.resolve(filePath);
    duration = Number(duration);

    const media = await prisma.media.create({
        data: {
            title,
            description,
            filePath: absoluteFilePath,
            duration,
        },
    });

    return media;
};

export const getAllMedia = async () => {
    const mediaRecords = await prisma.media.findMany();
    return mediaRecords;
};

export const deleteMedia = async (mediaId: string) => {
    const media = await prisma.media.findUnique({
        where: { id: mediaId },
    });

    if (!media) {
        throw new Error('Media not found');
    }

    const filePath = path.join(media.filePath);

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        throw new Error('Error deleting file');
    }

    await prisma.media.delete({
        where: { id: mediaId },
    });

    return { message: 'Media deleted successfully' };
};

export const getMediaFileService = async (mediaId: string): Promise<string | null> => {
    try {
        const media = await prisma.media.findUnique({
            where: { id: mediaId },
        });

        if (!media) {
            throw new Error('Media not found');
        }

        const filePath = path.join(media.filePath);
        if (!fs.existsSync(filePath)) {
            throw new Error('File does not exist');
        }


        return filePath;
    } catch (error) {
        console.error('Error in getMediaFileService:', error);
        throw new Error('Error fetching media file');
    }
};

export const getMediaDataService = async (mediaId: string): Promise<Media | null> => {
    try {
        const media = await prisma.media.findUnique({
            where: { id: mediaId },
        });

        if (!media) {
            throw new Error('Media not found');
        }

        return media;
    } catch (error) {
        console.error('Error in getMediaDataService:', error);
        throw new Error('Error fetching media data');
    }
};

export const updateMedia = async (id: string, title?: string, description?: string): Promise<Media | null> => {
    try {
        const media = await prisma.media.findUnique({
            where: { id },
        });

        if (!media) {
            throw new Error('Media not found');
        }

        const updatedMedia = await prisma.media.update({
            where: { id },
            data: {
                title: title || media.title,
                description: description || media.description,
            },
        });

        return updatedMedia;
    } catch (error) {
        console.error('Error updating media in service:', error);
        throw new Error('Error updating media');
    }
};
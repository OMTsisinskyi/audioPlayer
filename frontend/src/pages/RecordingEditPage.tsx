import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMediaFile, getMediaData, updateRecording } from '../api/api';
import { toast } from 'react-toastify';
import RecordingForm from '../components/RecordingForm';
import { Centercontainer } from '../style/style';

const RecordingEditPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [audioURL, setAudioURL] = useState<string | undefined>(undefined);
    const [initialValues, setInitialValues] = useState({ title: '', description: '' });
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const fetchMedia = async () => {
            if (!id) return;

            try {
                const media = await getMediaData(id);
                setInitialValues({
                    title: media.title || '',
                    description: media.description || '',
                });

                setDuration(media.duration || 0);

                const audioFile = await getMediaFile(id);
                const audioBlob = new Blob([audioFile], { type: 'audio/mp3' });
                const audioURL = URL.createObjectURL(audioBlob);
                setAudioURL(audioURL);
            } catch (error) {
                toast.error('Error loading media data');
            } finally {
                setLoading(false);
            }
        };

        fetchMedia();
    }, [id]);

    const handleSubmit = async (values: { title: string; description: string }) => {
        if (!id) return;
        setLoading(true);

        try {
            await updateRecording(id, values);
            toast.success('Recording updated successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Error updating recording');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <Centercontainer>
            <RecordingForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                loading={loading}
                audioURL={audioURL}
                duration={duration}
                onCancel={handleCancel}
                buttonText={{ main: 'Update', secondary: 'Updating...' }}
            />
        </Centercontainer>
    );
};

export default RecordingEditPage;

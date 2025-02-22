import { Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveRecording } from '../api/api';
import { toast } from 'react-toastify';
import RecordingForm from '../components/RecordingForm';
import { Centercontainer } from '../style/style';

interface LocationState {
    audioURL: string;
    duration: number;
}

const RecordingSavePage: React.FC = () => {
    const location = useLocation();
    const { audioURL, duration } = location.state as LocationState;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: { title: string; description: string }) => {
        if (audioURL) {
            setLoading(true);
            try {
                const audioResponse = await fetch(audioURL);
                const audioBlob = await audioResponse.blob();
                const audioFile = new File([audioBlob], 'audio-file.mp3', { type: 'audio/mp3' });

                const formData = new FormData();
                formData.append('audio', audioFile);
                formData.append('title', values.title);
                formData.append('description', values.description);
                formData.append('duration', duration?.toString() || '');

                const response = await saveRecording(formData);
                if (response.status === 201) {
                    toast.success('Recording saved successfully!');
                    navigate('/');
                } else {
                    toast.error('Error saving recording.');
                }
            } catch (error) {
                console.error('Error saving recording:', error);
                toast.error('Error saving recording.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <Centercontainer>
            {audioURL ? (
                <RecordingForm
                    onSubmit={handleSubmit}
                    initialValues={{ title: '', description: '' }}
                    loading={loading}
                    onCancel={handleCancel}
                    audioURL={audioURL}
                    duration={duration}
                    buttonText={{ main: 'Save', secondary: 'Saving...' }}
                />
            ) : (
                <Typography>An error occurred, voice recording lost</Typography>
            )}
        </Centercontainer>
    );
};

export default RecordingSavePage;

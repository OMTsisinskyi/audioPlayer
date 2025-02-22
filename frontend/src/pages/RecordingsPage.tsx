import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomButton from '../components/custom/CustomButton';
import { getAllRecordings } from '../api/api';
import { Recording } from '../types/types';
import MediaItem from '../components/custom/MediaItem';

function RecordingsPage() {
    const [recordings, setRecordings] = useState<Recording[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchRecordings = async () => {
        setLoading(true);
        try {
            const data = await getAllRecordings();
            setRecordings(data);
        } catch (error) {
            console.error("Error fetching recordings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecordings();
    }, []);

    const handleDelete = () => {
        fetchRecordings();
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ width: "630px", marginTop: "70px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: "32px", fontWeight: "700" }}>My Recordings</Typography>
                <Link to="/new-recording">
                    <CustomButton>+ New</CustomButton>
                </Link>
            </Box>
            <Box sx={{ marginTop: "25px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {recordings.map((recording) => (
                    <MediaItem key={recording.id} mediaItem={recording} onDelete={handleDelete} />
                ))}
                {recordings.length === 0 && <Typography sx={{ textAlign: "center", color: "#656565" }}>No recordings yet. Press “New” to create one.</Typography>}
            </Box>
        </Box>
    );
}


export default RecordingsPage;

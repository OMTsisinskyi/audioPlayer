import { Box, styled, Typography } from "@mui/material";
import { Recording } from "../../types/types";
import { deleteRecording } from "../../api/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { getMediaFile } from "../../api/api";
import { useNavigate } from "react-router-dom";

type MediaItemProps = {
    mediaItem: Recording;
    onDelete: () => void;
};

const MediaItem = ({ mediaItem, onDelete }: MediaItemProps) => {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`edit-recording/${mediaItem.id}`);
    };

    const handleLoad = async () => {
        if (!audioUrl) {
            try {
                const data = await getMediaFile(mediaItem.id);
                const audioBlob = new Blob([data], { type: "audio/mpeg" });
                const audioObjectUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioObjectUrl);
                setIsLoaded(true);
                toast.success("File loaded successfully!");
            } catch (error) {
                console.error("Error fetching media file:", error);
                toast.error("Error fetching media file!");
            }
        }
    };

    const handlePlayPause = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play();
                setIsPlaying(true);
            }
        }
    };

    const handleDelete = async () => {
        try {
            await deleteRecording(mediaItem.id);
            setIsDeleted(true);
            toast.success("Media deleted successfully!");

            setTimeout(() => {
                onDelete();
            }, 5000);
        } catch (error) {
            console.error("Error deleting media:", error);
            toast.error("Error deleting media!");
        }
    };


    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

    const handleCopyURL = async () => {
        try {
            await navigator.clipboard.writeText(mediaItem.filePath);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
            toast.success("URL copied to clipboard!");
        } catch (error) {
            console.error("Failed to copy URL:", error);
            toast.error("Failed to copy URL!");
        }
    };

    return (
        <StyledContainer>
            {isDeleted ? (
                <DeletedBox>
                    <Typography>
                        <span style={{ fontWeight: "700" }}>{mediaItem.title}</span> has been deleted.
                    </Typography>
                </DeletedBox>

            ) : (
                <>
                    <Box>
                        <Typography sx={{ fontWeight: "700" }}>{mediaItem.title}</Typography>
                        <Typography sx={{ color: "#4A5565" }}>{mediaItem.description}</Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ textAlign: "right" }}>
                            {new Date(mediaItem.duration * 1000).toISOString().substr(11, 8)}
                        </Typography>
                        <Box sx={{ display: "flex", gap: "16px" }}>
                            <StyledTypography onClick={handleCopyURL}>
                                {isCopied ? "Copied!" : "Copy URL"}
                            </StyledTypography>
                            {!isLoaded ? (
                                <StyledTypography onClick={handleLoad}>Load</StyledTypography>
                            ) : (
                                <StyledTypography onClick={handlePlayPause}>
                                    {isPlaying ? "Stop" : "Play"}
                                </StyledTypography>
                            )}
                            <StyledTypography onClick={handleEdit}>Edit</StyledTypography>
                            <StyledTypography onClick={handleDelete}>Delete</StyledTypography>
                        </Box>
                    </Box>
                </>
            )}
            {audioUrl && (
                <audio
                    ref={(ref) => setAudio(ref)}
                    src={audioUrl}
                    onEnded={handleAudioEnded}
                />
            )}
        </StyledContainer>
    );
};

export default MediaItem;

const StyledContainer = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
    cursor: "pointer",
    '&:hover': {
        color: "#f21f1f",
        textDecoration: "underline",
    },
}));

const DeletedBox = styled(Box)({
    width: "100%",
    height: "48px",
    textAlign: "center",
    fontStyle: "italic",
});
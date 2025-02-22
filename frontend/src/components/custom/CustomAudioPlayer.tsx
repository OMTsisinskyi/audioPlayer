import { Box, Slider, styled } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { PlayArrow, Pause } from '@mui/icons-material';
import CustomMicrophoneButton from './CustomMicrophoneButton';
import { ReactComponent as Back10 } from '../../icons/back-10.svg';
import { ReactComponent as Forward10 } from '../../icons/forward-10.svg';
import { toast } from 'react-toastify';

interface CustomAudioPlayerProps {
    audioURL: string;
    duration: number;
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ audioURL, duration }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
        }
    }, [audioURL]);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(() => setHasError(true));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(newValue);
            setCurrentTime(Number(newValue));
        }
    };

    const handleRewind = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleFastForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
        setCurrentTime(duration);
    };
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAudioError = () => {
        setHasError(true);
        toast.error('The audio file could not be loaded or played. Try recording again.');
    };

    return (
        <Box sx={{ width: '100%' }}>
            <audio
                ref={audioRef}
                src={audioURL}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleAudioEnded}
                onError={handleAudioError}
            />
            {hasError && <ErrorText>The audio file could not be loaded or played. Try recording again.</ErrorText>}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <span>{formatTime(currentTime)}</span>
                    <span>-{formatTime(duration - currentTime)}</span>
                </Box>
                <StyledSlider
                    value={currentTime}
                    min={0}
                    max={duration}
                    step={0.1}
                    onChange={handleSliderChange}

                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: "20px" }}>
                    <StyledButton onClick={handleRewind} >
                        <Back10 style={{ color: 'white', fontSize: "35px" }} />
                    </StyledButton>

                    <CustomMicrophoneButton onClick={handlePlayPause}>
                        {isPlaying ? <Pause sx={{ color: 'white', fontSize: "35px" }} /> : <PlayArrow sx={{ color: 'white', fontSize: "35px" }} />}
                    </CustomMicrophoneButton>

                    <StyledButton onClick={handleFastForward} >
                        <Forward10 />
                    </StyledButton>
                </Box>
            </Box>
        </Box>
    );
};


const ErrorText = styled(Box)({
    color: 'red',
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: '14px',
});

const StyledSlider = styled(Slider)({
    width: '100%',
    marginBottom: "15px",
    '& .MuiSlider-rail': {
        backgroundColor: '#C4C4C4',
    },
    '& .MuiSlider-track': {
        backgroundColor: '#C4C4C4',
        border: "none"
    },
    '& .MuiSlider-thumb': {
        width: '15px',
        height: '15px',
        backgroundColor: '#F65555',
        border: '2px solid #fff',
    },
});

const StyledButton = styled(CustomMicrophoneButton)({
    backgroundColor: "#C4C4C4",
    minHeight: "35px",
    minWidth: "35px",
    height: "35px",
    width: "35px",
});

export default CustomAudioPlayer;

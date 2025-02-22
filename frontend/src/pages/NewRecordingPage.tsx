import { Box, styled, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import CustomMicrophoneButton from '../components/custom/CustomMicrophoneButton';
import { MicNone } from '@mui/icons-material';
import { ReactComponent as StopIcon } from '../icons/stop.svg';
import { ReactComponent as RestartIcon } from '../icons/restart.svg';
import CustomButton from '../components/custom/CustomButton';
import { useNavigate } from 'react-router-dom';
import { Centercontainer } from '../style/style';

function NewRecordingPage() {
    const [recording, setRecording] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isRecordingStopped, setIsRecordingStopped] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (recording && !mediaRecorderRef.current) {
            navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;

                mediaRecorder.ondataavailable = (event) => {
                    audioChunksRef.current.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                    const url = URL.createObjectURL(audioBlob);
                    setAudioURL(url);
                };

                mediaRecorder.start();
            });
        }

        return () => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [recording]);

    useEffect(() => {
        if (recording) {
            intervalRef.current = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        } else if (!recording && timer !== 0 && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [recording, timer]);

    const handleStartStop = () => {
        if (recording) {
            setRecording(false);
            setIsRecordingStopped(true);
        } else {
            setRecording(true);
            setIsRecordingStopped(false);
            setTimer(0);
        }
    };

    const handleRestart = () => {
        setIsRecordingStopped(false);
        setTimer(0);
        audioChunksRef.current = [];
        setAudioURL(null);
        setRecording(false);

        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }

        mediaRecorderRef.current = null;
    };

    const handleContinue = () => {
        navigate('/save-recording', { state: { audioURL, duration: timer } });
    };

    return (
        <Centercontainer>
            <Box sx={{ display: "flex", gap: "80px", justifyContent: "center", alignItems: "center" }}>
                <StyledTypography>
                    {new Date(timer * 1000).toISOString().substr(11, 8)}
                </StyledTypography>
                {
                    !recording && !isRecordingStopped && (
                        <Box>
                            <CustomMicrophoneButton onClick={handleStartStop}>
                                <MicNone sx={{ color: 'white', fontSize: "30px" }} />
                            </CustomMicrophoneButton>
                        </Box>
                    )
                }
                {
                    recording && !isRecordingStopped && (
                        <Box>
                            <CustomMicrophoneButton onClick={handleStartStop}>
                                <StopIcon />
                            </CustomMicrophoneButton>
                        </Box>
                    )
                }

            </Box>
            {
                isRecordingStopped && (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "40px" }}>
                        <CustomMicrophoneButton onClick={handleRestart}>
                            <RestartIcon />
                        </CustomMicrophoneButton>
                        <StyledCustomButton onClick={handleContinue}>
                            Continue
                        </StyledCustomButton>
                    </Box>
                )
            }
        </Centercontainer>
    );
}

const StyledTypography = styled(Typography)({
    fontSize: '42px',
    fontWeight: '400',
    width: '170px',
    textAlign: 'center',
});

const StyledCustomButton = styled(CustomButton)({
    height: "57px",
    marginLeft: "50px",
});

export default NewRecordingPage;

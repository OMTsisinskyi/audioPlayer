import { Box, TextField, CircularProgress, Typography, styled } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../components/custom/CustomButton';
import CustomAudioPlayer from '../components/custom/CustomAudioPlayer';

interface RecordingFormProps {
    onSubmit: (values: { title: string; description: string }) => void;
    initialValues: { title: string; description: string };
    loading: boolean;
    onCancel: () => void;
    audioURL?: string;
    duration: number;
    buttonText: { main: string; secondary: string };
}

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
});

const RecordingForm: React.FC<RecordingFormProps> = ({
    onSubmit,
    initialValues,
    loading,
    onCancel,
    audioURL,
    duration,
    buttonText,
}) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true,
    });

    return (
        <Box sx={{ width: '300px' }}>
            {audioURL && <CustomAudioPlayer audioURL={audioURL} duration={duration} />}

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <CancelButton onClick={onCancel}>Cancel</CancelButton>

                    <CustomButton sx={{ width: '125px', height: '40px' }} type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <CircularProgress size={24} sx={{ marginRight: '8px', color: '#ffffff' }} />
                                <Typography sx={{ color: '#ffffff' }}>{buttonText.secondary}</Typography>
                            </>
                        ) : (
                            `${buttonText.main}`
                        )}
                    </CustomButton>
                </Box>
            </form>
        </Box>
    );
};

export default RecordingForm;

const CancelButton = styled(CustomButton)(({ theme }) => ({
    width: '125px',
    height: '40px',
    backgroundColor: 'transparent',
    border: '1px solid #F65555',
    color: '#F65555',
}));

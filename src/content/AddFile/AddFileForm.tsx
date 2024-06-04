"use client";
import {
    Tooltip,
    Divider,
    Card,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Typography,
    useTheme,
    CardHeader,
    Box,
    Button, Grid, TextField
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
// import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import withAuth from '@/withAuth';

function Add() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const user = JSON.parse(localStorage.getItem('user')).userRollNo
    

    interface MyFormValues {
        id: string;
        name: string;
        type: string;
        startDate: Date;
        endDate: Date;
        file: File;
        userId: number;
        status: string;
        endorsed: string;
    }

    function addFile(values: any) {
        const formattedValues = {
            ...values,
            startDate: values.startDate ? dayjs(values.startDate).toDate() : null,
            endDate: values.endDate ? dayjs(values.endDate).toDate() : null,
            file: file,
            userId: user,
            status: "Pending",
            endorsed: ""
        };
        const index = data.findIndex(item => item.id === formattedValues?.id);

        if (index !== -1) {
            const updatedData = [...data];
            updatedData[index] = formattedValues;
            setData(updatedData);
        } else {
            setData([...data, { ...formattedValues, id: uuidv4(), userId: user, status: "Pending", endorsed: "" }]);
        }
    }

    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            type: '',
            startDate: null,
            endDate: null,
            file: null,
            userId: null,
            status: '',
            endorsed: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    function deleteRecord(index: number) {
        if (index > -1) {
            data.splice(index, 1);
        }
        setData([...data]);
    }

    function editRecord(index: any) {
        const record = data[index];
        formik.setValues({
            id: record.id,
            name: record.name,
            type: record.type,
            startDate: record.startDate,
            endDate: record.endDate,
            file: record.file,
            userId: record.userId,
            status: record.status,
            endorsed: record.endorsed
        })
        formik.initialValues.id = record.id
        formik.initialValues.name = record.name
        formik.initialValues.type = record.type
        formik.initialValues.startDate = dayjs(record.startDate)
        formik.initialValues.endDate = dayjs(record.endDate)
        formik.initialValues.file = record.file
        formik.initialValues.file = record.userId
        formik.initialValues.status = record.status
        formik.initialValues.endorsed = record.endorsed
    }

    function handleChange(event: any) {
        setFile(event.target.files[0])
    }

    async function uploadFiles() {
        try {
            const formData = new FormData();
            if (data.length > 1) {
                data.forEach(item => {
                    formData.append('files', item.file);
                    formData.append('names', item.name);
                    formData.append('types', item.type);
                    formData.append('startDates', item.startDate);
                    formData.append('endDates', item.endDate);
                    formData.append('ids', item.id);
                    formData.append('userId', item.userId);
                    formData.append('status', item.status);
                    formData.append('endorsed', item.endorsed);
                });
            } else {
                formData.append('file', data[0].file);
                formData.append('name', data[0].name);
                formData.append('type', data[0].type);
                formData.append('startDate', data[0].startDate);
                formData.append('endDate', data[0].endDate);
                formData.append('id', data[0].id)
                formData.append('userId', data[0].userId)
                formData.append('status', data[0].status)
                formData.append('endorsed', data[0].endorsed)
            }
            const res = await fetch(`http://localhost:3001/fileupload/${(data.length > 1) ? "add" : "addOne"}`, {
                method: "POST",
                body: formData
            });

            if (!res.ok) {
                throw new Error("Failed to upload files");
            }
            router.push("/management/addfile");
        } catch (error) {
            console.log("Error in uploading the files", error);
        }

    }


    const cancelButton = () => {
        router.push('/management/addfile');
    };



    const CustomErrorMessage = (props: any) => (
        <div style={{ color: 'red' }} {...props} />
    );
    const theme = useTheme();

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Box>
            <Formik
                initialValues={{ ...formik.initialValues }}
                enableReinitialize
                //   validationSchema={formValidation}
                onSubmit={(values: MyFormValues, { resetForm }) => {
                    addFile(values)
                    resetForm();
                    formik.resetForm({
                        values: {
                            id: '',
                            name: '',
                            type: '',
                            startDate: null,
                            endDate: null,
                            file: null,
                            userId: null,
                            status: '',
                            endorsed: ''
                        },
                    });
                }}
            >

                {({ handleSubmit, setFieldValue, values }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Field name="endorsed" type="hidden" />
                            <Field name="status" type="hidden" />
                            <Field name="userId" type="hidden" />
                            <Field name="id" type="hidden" />
                            <Grid item xs={6}>
                                <Field name="name" as={TextField} label="Name" fullWidth />
                                <ErrorMessage name="name" component={CustomErrorMessage} />
                            </Grid>
                            <Grid item xs={6}>
                                <Field name="type" as={TextField} label="Type" fullWidth />
                                <ErrorMessage name="type" component={CustomErrorMessage} />
                            </Grid>
                            <Grid item xs={6}>
                                <DatePicker
                                    label="Start Date"
                                    value={values.startDate}
                                    onChange={(newValue) => setFieldValue("startDate", newValue)}
                                />
                                <ErrorMessage name="startDate" component={CustomErrorMessage} />
                            </Grid>
                            <Grid item xs={6}>
                                <DatePicker
                                    label="End Date"
                                    value={values.endDate}
                                    onChange={(newValue) => setFieldValue("endDate", newValue)}
                                />
                                <ErrorMessage name="endDate" component={CustomErrorMessage} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    fullWidth
                                >
                                    Upload file
                                    <VisuallyHiddenInput type="file" onChange={handleChange} />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ fontSize: '1.1rem', marginTop: 2 }}
                                            type="submit"
                                        >
                                            Add
                                        </Button>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ fontSize: '1.1rem', marginTop: 2, marginLeft: 2 }}
                                            onClick={cancelButton}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <Box mt={4} />
            <Card>
                <CardHeader
                    action={
                        <Box>
                            <Button
                                variant="contained"
                                color="success"
                                sx={{ fontSize: '0.8rem' }}
                                startIcon={<CloudUploadIcon />}
                                onClick={uploadFiles}
                            >
                                Upload All
                            </Button>
                        </Box>
                    }
                    title="All Files"
                    titleTypographyProps={{
                        variant: "h3"
                    }}
                />
                <Divider />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align='center'>Type</TableCell>
                                <TableCell align='center'>Start Date</TableCell>
                                <TableCell align='center'>End Date</TableCell>
                                <TableCell align='center'>File</TableCell>
                                <TableCell align='right'>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data && data.map((item, key: number) => {
                                return (
                                    <TableRow hover key={key}>
                                        <TableCell>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {item.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {item.type}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {item.startDate.toLocaleDateString("es-CL")}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {item.endDate.toLocaleDateString("es-CL")}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography
                                                variant="body1"
                                                fontWeight="bold"
                                                color="text.primary"
                                                gutterBottom
                                                noWrap
                                            >
                                                {item.file.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">

                                            <Tooltip title="Edit Record" arrow>
                                                <IconButton
                                                    onClick={() => editRecord(key)}
                                                    sx={{
                                                        '&:hover': {
                                                            background: theme.colors.primary.lighter
                                                        },
                                                        color: theme.palette.primary.main
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                >
                                                    <EditTwoToneIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete Record" arrow>
                                                <IconButton
                                                    onClick={() => deleteRecord(key)}
                                                    sx={{
                                                        '&:hover': { background: theme.colors.error.lighter },
                                                        color: theme.palette.error.main
                                                    }}
                                                    color="inherit"
                                                    size="small"
                                                >
                                                    <DeleteTwoToneIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );



}





export default withAuth(Add, ['6658219bcfaafbf55271c4ed', '66584b7db71e72ada7eee730']);


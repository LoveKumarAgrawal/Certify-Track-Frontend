"use client";
import { Button, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { addStudentRecord, updateStudentRecord } from '@/redux/features/studentSlice';
import withAuth from '@/withAuth';


function Add() {
  interface User {
    _id: string;
    name: string;
    email: string;
    dob: string;
    phoneNumber: number;
    rollno: number;
  }
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.student)
  const [student, setStudent] = useState<User | null>(null);
  useEffect(() => {
    if (id && id !== '0') {
      const updateStudent = data.find(item => item._id === id);
        setStudent(updateStudent);
    }
  }, [id, data]);


  interface MyFormValues {
    name: string;
    email: string;
    dob: string;
    phoneNumber: string;
    rollno: string;
  }

  const formValidation = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    email: Yup.string()
      .required('Email is Required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Email is not valid'
      ),
    dob: Yup.string()
      .required('Dob is Required')
      .matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/, 'Invalid Date Format (DD-MM-YYYY)'),
    phoneNumber: Yup.string().required('Phone Number is Required')
      .matches(/^[6-9]\d{9}$/, 'Phone number must be 10 digits and start with 6, 7, 8, or 9'),
    rollno: Yup.string()
      .required('Rollno is Required')
      .matches(/^\d{10}$/, 'Roll number must be exactly 10 digits')
  });

  console.log(student);
  

  const cancelButton = () => {
    router.push('/management/addstudent');
  };

  let initialValues: MyFormValues = {
    name: student?.name || '',
    email: student?.email || '',
    dob: student?.dob || '',
    rollno: student?.rollno?.toString() || '',
    phoneNumber: student?.phoneNumber?.toString() || '',
  };
  

  const addStudent = async (values: MyFormValues) => {
    const studentData = {
      ...values,
      roleId: "66584b7db71e72ada7eee730",
      phoneNumber: Number(values.phoneNumber),
      rollno: Number(values.rollno)
    };
    if (id !== '0') {
      try {
        const res = await fetch(`http://localhost:3001/student/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(studentData)
        })
        if (res.ok) {
          const updateStudent = await res.json();
          dispatch(updateStudentRecord(updateStudent))
          router.push("/management/addstudent");
        } else {
          throw new Error("Failed to create a new student")
        }
      } catch (error) {
        console.log("Error in updating the student ye wala", error);
      }

    } else {
      try {
        const res = await fetch('http://localhost:3001/student', {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(studentData)
        })
        if (res.ok) {
          const newStudent = await res.json();
          dispatch(addStudentRecord(newStudent));
          router.push("/management/addstudent");
        } else {
          throw new Error("Failed to create a new student")
        }
      } catch (error) {
        console.log("Error in adding the student");
      }
    }
  }


  const CustomErrorMessage = (props: any) => (
    <div style={{ color: 'red' }} {...props} />
  );

  return (
    <Formik
      initialValues={{ ...initialValues }}
      enableReinitialize={true}
      validationSchema={formValidation}
      onSubmit={(values: MyFormValues) => {
        addStudent(values);
      }}
    >

      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Field name="name" as={TextField} label="Name" fullWidth />
              <ErrorMessage name="name" component={CustomErrorMessage} />
            </Grid>
            <Grid item xs={6}>
              <Field name="email" as={TextField} label="Email" fullWidth />
              <ErrorMessage name="email" component={CustomErrorMessage} />
            </Grid>
            <Grid item xs={6}>
              <Field name="rollno" as={TextField} label="University Roll no" fullWidth />
              <ErrorMessage name="rollno" component={CustomErrorMessage} />
            </Grid>
            <Grid item xs={6}>
              <Field name="phoneNumber" as={TextField} label="Phone Number" fullWidth />
              <ErrorMessage name="phoneNumber" component={CustomErrorMessage} />
            </Grid>
            <Grid item xs={6}>
              <Field name="dob" as={TextField} label="DOB" fullWidth />
              <ErrorMessage name="dob" component={CustomErrorMessage} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: '1.1rem', marginTop: 2 }}
                    type="submit"
                  >
                    Save
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
  );
}

export default withAuth(Add, ['6658219bcfaafbf55271c4ed']);



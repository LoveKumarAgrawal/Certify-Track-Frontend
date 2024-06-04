"use client";
import { Button, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import withAuth from '@/withAuth';
import { addTeacherRecord, updateTeacherRecord } from '@/redux/features/teacherSlice';


function Add() {
  interface User {
    _id: string;
    name: string;
    email: string;
    department: string;
    phoneNumber: number;
    class: string;
  }
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.teacher)
  const [teacher, setTeacher] = useState<User | null>(null);
  useEffect(() => {
    if (id && id !== '0') {
      const updateTeacher = data.find(item => item._id === id);
    setTeacher(updateTeacher);
    }
  }, [id, data]);



  interface MyFormValues {
    name: string;
    email: string;
    department: string;
    phoneNumber: string;
    class: string;
  }

  const formValidation = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    email: Yup.string()
      .required('Email is Required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Email is not valid'
      ),
    department: Yup.string()
      .required('Dob is Required'),
    phoneNumber: Yup.string().required('Phone Number is Required')
      .matches(/^[6-9]\d{9}$/, 'Phone number must be 10 digits and start with 6, 7, 8, or 9'),
    class: Yup.string()
      .required('Rollno is Required')
      
  });  

  const cancelButton = () => {
    router.push('/management/addteacher');
  };

  let initialValues: MyFormValues = {
    name: teacher?.name || '',
    email: teacher?.email || '',
    department: teacher?.department || '',
    class: teacher?.class || '',
    phoneNumber: teacher?.phoneNumber?.toString() || '',
  };
  

  const addTeacher = async (values: MyFormValues) => {
    const teacherData = {
      ...values,
      roleId: "66584b9eb71e72ada7eee731",
      phoneNumber: Number(values.phoneNumber)
    };
    if (id !== '0') {
      try {
        const res = await fetch(`http://localhost:3001/teacher/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(teacherData)
        })
        if (res.ok) {
          const updateTeacher = await res.json();
          dispatch(updateTeacherRecord(updateTeacher))
          router.push("/management/addteacher");
        } else {
          throw new Error("Failed to create a new teacher")
        }
      } catch (error) {
        console.log("Error in updating the teacher ye wala", error);
      }

    } else {
      try {
        const res = await fetch('http://localhost:3001/teacher', {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(teacherData)
        })
        if (res.ok) {
          const newTeacher = await res.json();
          dispatch(addTeacherRecord(newTeacher));
          router.push("/management/addteacher");
        } else {
          throw new Error("Failed to create a new teacher")
        }
      } catch (error) {
        console.log("Error in adding the teacher");
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
        addTeacher(values);
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
              <Field name="department" as={TextField} label="Department" fullWidth />
              <ErrorMessage name="department" component={CustomErrorMessage} />
            </Grid>
            <Grid item xs={6}>
              <Field name="phoneNumber" as={TextField} label="Phone Number" fullWidth />
              <ErrorMessage name="phoneNumber" component={CustomErrorMessage} />
            </Grid>
            <Grid item xs={6}>
              <Field name="class" as={TextField} label="Class" fullWidth />
              <ErrorMessage name="class" component={CustomErrorMessage} />
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


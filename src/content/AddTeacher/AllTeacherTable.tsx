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
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import withAuth from '@/withAuth';
import { deleteTeacherRecord, fetchTeachers } from '@/redux/features/teacherSlice';


function AllTeacherTable() {

    const {data} = useSelector((state: RootState)=> state.teacher)

    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
       data.length === 0 &&  dispatch(fetchTeachers())
    },[])
    
    // interface User {
    //     _id: string;
    //     name: string;
    //     email: string;
    //     department: string;
    //     phoneNumber: number;
    //     class: string;
    // }

    const deleteTeacher = (id: string) => {
        fetch(`http://localhost:3001/teacher/${id}`, {
            method: "DELETE"
        }).then(() => dispatch(deleteTeacherRecord(id))).catch((e) => console.log("Failed to delete the teacher", { e }))
    }


    const theme = useTheme();
    return (
        <Card>
            <CardHeader
                title="All Teachers"
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
                            <TableCell align='center'>Email</TableCell>
                            <TableCell align='center'>Phone Number</TableCell>
                            <TableCell align='center'>Department</TableCell>
                            <TableCell align='center'>Class</TableCell>
                            <TableCell align='right'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((item, key:number) => {
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
                                            {item.email}
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
                                            {item.phoneNumber}
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
                                            {item.department}
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
                                            {item.class}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">

                                        <Tooltip title="Edit Data" arrow>
                                            <Link href={{
                                                pathname: `/management/addteacher/add`,
                                                query: {
                                                    id: item._id
                                                }
                                            }}>
                                                <IconButton
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
                                            </Link>
                                        </Tooltip>
                                        <Tooltip title="Delete Student" arrow>
                                            <IconButton
                                                onClick={() => deleteTeacher(item._id)}
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
    );
}

export default withAuth(AllTeacherTable, ['6658219bcfaafbf55271c4ed']);


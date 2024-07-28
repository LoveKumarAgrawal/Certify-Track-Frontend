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
import { deleteStudentRecord, fetchStudents} from '@/redux/features/studentSlice';
import { AppDispatch, RootState } from '@/redux/store';
import withAuth from '@/withAuth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NEXT_URL } from '@/config';


function AllStudentTable() {

    const {data} = useSelector((state: RootState)=> state.student)
    const { roleId } = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
       data.length === 0 &&  dispatch(fetchStudents())
    },[])

    const deleteStudent = (id: string) => {
        fetch(`${NEXT_URL}/student/${id}`, {
            method: "DELETE"
        }).then(() => dispatch(deleteStudentRecord(id))).catch((e) => console.log("Failed to delete the student", { e }))
    }


    const theme = useTheme();
    return (
        <Card>
            <CardHeader
                title="All Students"
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
                            <TableCell align='center'>DOB</TableCell>
                            <TableCell align='center'>University Roll No</TableCell>
                            {(roleId !== "66584b9eb71e72ada7eee731") ?
                            <TableCell align='right'>Actions</TableCell> : <TableCell align='right'>View Files</TableCell>}
                            
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
                                            {item.dob}
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
                                            {item.rollno}
                                        </Typography>
                                    </TableCell>
                                {(roleId !== "66584b9eb71e72ada7eee731") ?
                                    <TableCell align="right">
                                        <Tooltip title="Edit Data" arrow>
                                            <Link href={{
                                                pathname: `/management/addstudent/add/`,
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
                                                onClick={() => deleteStudent(item._id)}
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
                                    :
                                    <TableCell align="right">
                                        <Tooltip title="See Files" arrow>
                                            <Link href={{
                                                pathname: `/management/addfile/`,
                                                query: {
                                                    id: String(item.rollno)
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
                                                    size="medium"
                                                >
                                                    <VisibilityIcon fontSize="medium" />
                                                </IconButton>
                                            </Link>
                                        </Tooltip>
                                    </TableCell>
                                }
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
}

export default withAuth(AllStudentTable, ['6658219bcfaafbf55271c4ed', '66584b9eb71e72ada7eee731']);

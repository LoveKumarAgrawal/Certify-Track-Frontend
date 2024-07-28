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
  Modal,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import withAuth from '@/withAuth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadIcon from '@mui/icons-material/Upload';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

function AllFileTable() {
  const router = useRouter();
  const [formData, setFormData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const { id } = router.query;
  const userId = JSON.parse(localStorage.getItem('user')).rollno;
  const username = JSON.parse(localStorage.getItem('user')).username;
  const { roleId } = useSelector((state: RootState) => state.user)

  const theme = useTheme();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3001/fileupload/get', { method: 'GET' });
      const data = await res.json();
      let filteredData;
      if (userId === undefined) {
        filteredData = data.filter((item) => item.userId === Number(id));
      } else {
        filteredData = data.filter((item) => item.userId === Number(userId));
      }
      setFormData(filteredData);
    }
    fetchData();
  }, [id]);

  async function deleteData(fileName: string, id: string) {
    await fetch(`http://localhost:3001/fileupload/${id}?filename=${fileName}`, { method: 'DELETE' })
      .then(() => router.reload())
      .catch((e) => console.log('Failed to delete the file', { e }));
  }

  async function handleViewDocument(filename: string) {
    try {
      const res = await fetch(`http://localhost:3001/fileupload/openPdf/${filename}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        setPdfUrl(url);
        setOpenModal(true);
      } else {
        console.error('Error fetching the PDF file');
      }
    } catch (error) {
      console.error('Error fetching the PDF file', error);
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setPdfUrl('');
  };

  const statusOptions = [
    {
      id: 'Approved',
      name: 'Approved',
    },
    {
      id: 'Pending',
      name: 'Pending',
    },
    {
      id: 'Rejected',
      name: 'Rejected',
    },
  ];

  const handleStatusChange = (e, item) => {
    const value = e.target.value;
    setFormData((prevData) =>
      prevData.map((dataItem) => (dataItem.id === item.id ? { ...dataItem, status: value } : dataItem))
    );
  };

  async function uploadStatus(id: string, status: string, username) {
    try {
      const updateStatus = await fetch(`http://localhost:3001/fileupload/${id}?status=${status}&endorsed=${username}`, { method: 'PUT' });
      const data = await updateStatus.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <CardHeader
        title="All Files"
        titleTypographyProps={{
          variant: 'h3',
        }}
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">File</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData &&
              formData.map((item, key) => (
                <TableRow hover key={key}>
                  <TableCell>
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {item.type}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {new Date(item.startDate).toLocaleDateString('es-CL')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {new Date(item.endDate).toLocaleDateString('es-CL')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {item.file}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {roleId !== '66584b9eb71e72ada7eee731' ? ( 
                      <>
                      <Typography variant="body1" fontSize='15px' fontWeight="bold" 
                      color={ item.status==="Pending" ? "orange" : (item.status==="Rejected" ? "red" : "green") } 
                      gutterBottom noWrap>
                        {item.status}
                      </Typography>
                      <Typography variant='body2' fontSize='12px' color='blue' noWrap>
                        Endorsed by - {item.endorsed}
                      </Typography>
                      </>
                    ) : ( 
                      <Select
                        value={item.status || 'Pending'}
                        onChange={(e) => handleStatusChange(e, item)}
                        autoWidth
                      >
                        {statusOptions.map((statusOption) => (
                          <MenuItem key={statusOption.id} value={statusOption.id}>
                            {statusOption.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )} 
                  </TableCell>
                  {roleId === '66584b7db71e72ada7eee730' && item.status === 'Pending' ? ( 
                    <TableCell align="right">
                      <Tooltip title="View Document" arrow>
                        <IconButton
                          onClick={() => handleViewDocument(item.file)}
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter, 
                            },
                            color: theme.palette.primary.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <FilePresentIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete File" arrow>
                        <IconButton
                          onClick={() => deleteData(item.file, item.id)}
                          sx={{
                            '&:hover': { background: theme.colors.error.lighter },
                            color: theme.palette.error.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  ) : roleId === '66584b9eb71e72ada7eee731' ? (
                    <TableCell align="right">
                      <Tooltip title="View Document" arrow>
                        <IconButton
                          onClick={() => handleViewDocument(item.file)}
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter,
                            },
                            color: theme.palette.primary.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Save" arrow>
                        <IconButton
                          onClick={() => uploadStatus(item._id, item.status, username)}
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter,
                            },
                            color: theme.palette.primary.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <UploadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  ) : roleId === '6658219bcfaafbf55271c4ed' ? (
                    <TableCell align="right">
                      <Tooltip title="View Document" arrow>
                        <IconButton
                          onClick={() => handleViewDocument(item.file)}
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter,
                            },
                            color: theme.palette.primary.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete File" arrow>
                        <IconButton
                          onClick={() => deleteData(item.file, item.id)}
                          sx={{
                            '&:hover': { background: theme.colors.error.lighter },
                            color: theme.palette.error.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  ) :
                  <TableCell align='right'>
                    <Typography variant="body1" fontWeight="bold" color="green" gutterBottom noWrap>
                        "Verified"
                      </Typography>
                  </TableCell>
                }
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Viewing Document
          </Typography>
          {pdfUrl ? (
            <iframe src={pdfUrl} width="100%" height="600px"></iframe>
          ) : (
            <p>Loading PDF...</p>
          )}
        </Box>
      </Modal>
    </Card>
  );
}

export default withAuth(AllFileTable, [
  '6658219bcfaafbf55271c4ed',
  '66584b7db71e72ada7eee730',
  '66584b9eb71e72ada7eee731',
]);

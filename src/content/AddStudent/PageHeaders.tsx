import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Link from 'next/link';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Add Student
        </Typography>
      </Grid>
      <Grid item>
        <Link href={{
          pathname: '/management/addstudent/add',
          query: {
            id: '0'
          }
        }}>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add Student
        </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default PageHeader

import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Link from 'next/link';
import withAuth from '@/withAuth';


function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Add Teacher
        </Typography>
      </Grid>
      <Grid item>
        <Link href={{
          pathname: '/management/addteacher/add',
          query: {
            id: '0'
          }
        }}>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add Teacher
        </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

export default withAuth(PageHeader, ['6658219bcfaafbf55271c4ed']);

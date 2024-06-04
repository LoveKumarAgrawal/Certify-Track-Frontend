import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Link from 'next/link';
import {
  Typography,
  Button, 
  Grid
} from '@mui/material';


function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Add File
        </Typography>
      </Grid>
      <Grid item>
        <Link href={{
          pathname: '/management/addfile/add',
        }}>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add File
        </Button>
        </Link>
      </Grid>
    </Grid>
    
  );
}

export default PageHeader;

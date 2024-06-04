import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/AddStudent/PageHeaders';
import PageTitleWrapper from 'pages/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import AllStudentTable from '@/content/AddStudent/AllStudentTable';

function ApplicationsTransactions() {
  return (
    <>
      <Head>
        <title>Transactions - Applications</title>
      </Head>
      <PageTitleWrapper>
        {JSON.parse(localStorage.getItem('user')).userRoleId !== '665b569458c70fe9f7be72d3' ? <PageHeader /> : "" }
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <AllStudentTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;

import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import Add from '@/content/AddFile/AddFileForm';
import PageTitleWrapper from 'pages/components/PageTitleWrapper';

function ApplicationsTransactions() {
  return (
    <>
      <Head>
        <title>Transactions - Applications</title>
      </Head>
      <PageTitleWrapper>
        <Add />
      </PageTitleWrapper>
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;

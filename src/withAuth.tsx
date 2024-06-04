import { useRouter } from "next/router";
import { useEffect } from "react";

function withAuth(Component: any, allowedRoles: string[]) {
  const Auth = (props: any) => {
    const router = useRouter();
    let isAuth: string | null = null;
    let userRole: string | null = null;

    if (typeof window !== 'undefined') {
      isAuth = localStorage.getItem('isAuth');
      userRole = JSON.parse(localStorage.getItem('user'))?.userRoleId;
    }

    useEffect(() => {
      if (!isAuth) {
        router.push('/');
      } else if (!allowedRoles.includes(userRole)) {
        router.push('/management/addfile');
      }
    }, [isAuth, userRole, router]);

    if (!isAuth || (isAuth && !allowedRoles.includes(userRole))) {
      return null;
    }

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;

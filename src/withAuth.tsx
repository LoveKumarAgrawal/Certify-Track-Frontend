import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NEXT_URL } from "./config";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addUserRoleId } from "./redux/features/authSlice";

function withAuth(Component: any, allowedRoles: string[]) {
  const Auth = (props: any) => {
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await fetch(`${NEXT_URL}/auth/verify-token`, {
            method: 'GET',
            credentials: 'include',
          });

          if (res.ok) {
            const data = await res.json();
            setUserRole(data.userRoleId);
            dispatch(addUserRoleId(data))
          } else {
            router.push('/');
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          router.push('/');
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    useEffect(() => {
      if (userRole && !allowedRoles.includes(userRole)) {
        router.push('/management/addfile');
      }
    }, [userRole, allowedRoles, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!userRole || (userRole && !allowedRoles.includes(userRole))) {
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

import { AdminLogin } from '@/components/AdminLogin';

export const metadata = {
  title: 'Admin Login - Gulabi Guiltz',
  description: 'Secure admin panel for Gulabi Guiltz',
  robots: 'noindex, nofollow',
};

export default function AdminPage() {
  return <AdminLogin />;
}

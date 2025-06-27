import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions'; // updated path
import ProductPage from './client'; // your hoodie component

export default async function ProtectedProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <meta httpEquiv="refresh" content="0;url=/" />;
  }

  return <ProductPage />;
}

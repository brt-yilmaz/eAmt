'use client'
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from "@/navigation";

export default function VerifyEmailPage() {
  const t = useTranslations('VerifyEmailPage');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { toast } = useToast();
  const [progress, setProgress] = useState(13);
  const router = useRouter();

  if (!token) {
    return <div> <p>{t('tokenNotFound')}</p></div>;
  }

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // First setTimeout
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProgress(40);

        // API request
        const res = await axios.post('/api/users/verifyEmail', {
          verifyToken: token
        });

        // Second setTimeout
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProgress(60);

        if (res.status === 200) {
          console.log(res.data)
          // Third setTimeout
          await new Promise((resolve) => setTimeout(resolve, 500));
          setProgress(100);
          router.replace(`/dashboard/verifyAccount?email=${res.data.userEmail}`);

          toast({
            title: t('emailVerified'),
            description: t('emailVerifiedDesc'),
            status: 'success',
            duration: 3000,
          });


        }

      } catch (err) {
        const code = err.response.data.errorCode;
        toast({
          title: code === 'AA103' ? t('tokenExpired') : code === 'AA104' ? t('emailAlreadyVerified') : t('emailVerificationFailed'),
          description: code === 'AA103' ? t('tokenExpiredDesc') : code === 'AA104' ? t('emailAlreadyVerifiedDesc') : t('emailVerificationFailedDesc'),
          variant: "destructive",
          status: 'error',
          duration: 7000,
        });
        router.replace('/dashboard');
      }
    };

    verifyEmail();

  }, [token]);

  return (
    <Progress value={progress} className="w-[30%]" />
  );
}
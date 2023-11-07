import LanguageSwitcher from '@/components/header/LanguageSwitcher'
import VerificationForm from '@/components/verify/VerifyIdentityForm'

export default function Home() {
  return (
    <div>
      <LanguageSwitcher />
      <VerificationForm />
    </div>
  )
}

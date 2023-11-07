import LanguageSwitcher from '@/components/header/LanguageSwitcher'
import SignupPage from '@/components/signup/SignUp'

export default function Home() {
  return (
    <div>
      <LanguageSwitcher />
      <SignupPage/>
    </div>
  )
}
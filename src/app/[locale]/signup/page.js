import LanguageSwitcher from '@/components/header/LanguageSwitcher'
import ModeSwitcher from '@/components/header/ModeSwitcher'
import SignupPage from '@/components/signup/SignUp'

export default function SignUp() {
  return (
    <div>
      <div className='m-5'>
        <LanguageSwitcher />
      </div>
      <SignupPage/>
    </div>
  )
}
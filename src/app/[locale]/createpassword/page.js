import CreatePass from '@/components/createPassword/CreatePasswordFrom'
import LanguageSwitcher from '@/components/header/LanguageSwitcher'


export default function Home() {
  return (
    <div>
      <LanguageSwitcher />
      <CreatePass />
    </div>
  )
}
import CreatePasswordForm from "@/components/createPassword/CreatePasswordFrom";
import LanguageSwitcher from "@/components/header/LanguageSwitcher";
import ModeToggle from "@/components/header/ModeToggle";
import NavBar from "@/components/header/NavBar";

function CreatePasswordPage() {
  return (
    <>
      <header
        className={
          "flex items-center justify-between px-10  py-[min(3vh,2rem)] sm:px-[min(3vh,2rem)]"
        }
      >
        <NavBar>
          <ModeToggle />
          
        </NavBar>
      </header>
      <CreatePasswordForm />
    </>
  );
}
export default CreatePasswordPage;
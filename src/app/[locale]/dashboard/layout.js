import Header from "@/components/header/Header";

export const metadata = {
  title: "eAmt",
  description: "Digital Service for citizens of Germany"
};

export default async function MainLayout({ children }) {
  return (
    <div className={
      "min-h-screen  max-w-[1500px] mx-auto flex flex-col gap-10 bg-bgBase "
    }>

      <Header />
      <main className={"min-h-[50vh] flex justify-center items-center"}>

        {children}
      </main>
    </div>
  );
}

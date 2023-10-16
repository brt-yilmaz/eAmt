export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col items-center justify-between p-24 bg-bgBase">
        <div>
          <h1 className={"text-content text-4xl"}> @Amt</h1>
        </div>
        <div>
          <button
            className={
              "bg-bgBut px-8 py-2 rounded-md hover:bg-bgButHov text-butContent"
            }
          >
            Log In
          </button>
        </div>
      </main>
      <div>
        <footer
          className={"flex flex-col items-center justify-center bg-footer p-4"}
        >
          <p className={"text-content text-sm"}>© 2023</p>
          <p className={"text-content text-sm"}>All rights reserved</p>
        </footer>
      </div>
    </>
  );
}

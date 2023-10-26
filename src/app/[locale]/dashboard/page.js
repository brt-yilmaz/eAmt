import SearchPanel from "@/components/searchbar/SearchPanel";

export default function Dashboard() {
  return (
    <>
      <main className="flex flex-1 flex-col items-center justify-between p-24 ">
        <SearchPanel />
      </main>
    </>
  );
}

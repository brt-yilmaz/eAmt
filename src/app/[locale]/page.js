import SearchPanel from "@/components/searchbar/SearchPanel";
import { useTranslations } from "next-intl";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col items-center justify-between p-24 ">
        <SearchPanel />
      </main>
    </>
  );
}
import { useTranslations } from "next-intl";

// You must change pathname to support additional languages

function About() {
  const t = useTranslations("About");
  return (
    <main className="flex flex-1 gap-3 flex-col items-center justify-between p-10 text-justify max-w-lg m-auto">
      <h1 className="text-3xl text-content"  > {t("title")}  </h1>
      <h2 className="text-2xl text-content" id={"introduction"}> {t("content.welcome.title")} </h2>
      <p className=" text-content"> {t("content.welcome.content")} germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany germany</p>

      <h2 className="text-2xl text-content" id={"whoWeAre"}> {t("content.whoWeAre.title")} </h2>
      <p className=" text-content"> {t("content.whoWeAre.content")} Deutschland  Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland Deutschland</p>

      <h2 className="text-2xl text-content" id={"whatWeOffer"}  >
        {" "}
        {t("content.whatWeOffer.title")}{" "}
      </h2>
      <p className=" text-content"> {t("content.whatWeOffer.content")} Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya Almanya</p>
    </main >
  );
}

export default About;

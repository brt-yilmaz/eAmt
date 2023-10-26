import { useTranslations } from "next-intl";

function About() {
  const t = useTranslations("About");
  return (
    <main className="flex flex-1 gap-3 flex-col items-center justify-between p-10 text-justify max-w-lg m-auto">
      <h1 className="text-3xl text-content"> {t("title")} </h1>
      <h2 className="text-2xl text-content"> {t("content.welcome.title")} </h2>
      <p className=" text-content"> {t("content.welcome.content")} </p>

      <h2 className="text-2xl text-content"> {t("content.whoWeAre.title")} </h2>
      <p className=" text-content"> {t("content.whoWeAre.content")} </p>

      <h2 className="text-2xl text-content">
        {" "}
        {t("content.whatWeOffer.title")}{" "}
      </h2>
      <p className=" text-content"> {t("content.whatWeOffer.content")} </p>
    </main>
  );
}

export default About;

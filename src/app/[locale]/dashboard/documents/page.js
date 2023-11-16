
import IdentityCard from "@/components/DocumentCard/identity/IdentityCard";
import IdentityCardWrapper from "@/components/DocumentCard/identity/IdentityCardWrapper";

function Documents() {

  return (
    <div className="h-[67vh]">
      <IdentityCardWrapper>
        <IdentityCard />
      </IdentityCardWrapper>
    </div>
  );
}

export default Documents;

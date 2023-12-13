import { Card } from "./ui/card";

export default function FormCard({children}) {
  return (
    <Card className="w-[350px] sm:w-[400px] md:w-[450px] lg:w-[500px] bg-muted">
      {children}
    </Card>
  )
}
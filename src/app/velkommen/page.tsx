// Simply redirect to home page
import { redirect } from "next/navigation";
 
export default function Page () {
  redirect("/");
}
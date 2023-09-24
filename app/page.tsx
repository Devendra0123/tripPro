import Image from "next/image";
import TripProForm from "@/components/TripPro/TripProForm";
import { cookies } from "next/headers";
import { createCookie } from "./actions";
export default async function Home() {

  const cookieStore = cookies()

  const name = cookieStore.get('name');
  console.log(name)
  return (
    <main className="">
      <TripProForm />
    </main>
  );
}

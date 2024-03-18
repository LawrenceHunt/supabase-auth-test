import { unstable_noStore as noStore } from "next/cache";
import { ServerSideHeader } from "~/components/Header/ServerSide/ServerSideHeader";
import { ClientSideHeader } from "~/components/Header/ClientSide/ClientSideHeader";

async function Home() {
  noStore();

  return (
    <div className="flex h-full w-full flex-col gap-4 p-8">
      <ServerSideHeader />

      <ClientSideHeader />
    </div>
  );
}

export default Home;

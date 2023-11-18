import { Metadata } from "next";
import Layout from "../../components/Layout";
import BasicMeta, { generateMetadata } from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import TurnamentList from "../../components/TurnamentList";

type Turnament = {
  Name: string;
  Id: number;
  Invitation: boolean;
  Weekend: boolean;
  Youth: boolean;
  EloRatet: boolean;
  Participants: number;
  Started: boolean;
  HovedKreds: number;
  EndDate: string;
  StartDate: string;
  IsBlitz: boolean;
  IsRapid: boolean;
  NationalRated: boolean;
  HasWheelchair: boolean;
  EnrolmentOpen: boolean;
  Description: string;
};


export const metadata: Metadata = {
  title: 'My Page Title',
}
  

async function getTurnaments() {
  const res = await fetch(
    "https://turnering.skak.dk/api/turnering/list?date=Tue, 31 Oct 2023 23:00:00 GMT"
  );
  const events: Turnament[] = (await res.json()).filter(
    (turnament: Turnament) => turnament.HovedKreds == 1
  );
  return events;
}

export default async function Index() {
  const events = await getTurnaments();
  return (
    <Layout>
      <div className="containerr">
        <div style={{ maxHeight: "90vh", marginBottom: "3rem" }}>
          <h2>Her kan du se vores kommende turneringer</h2>
          <TurnamentList turnaments={events} />
        </div>
      </div>
    </Layout>
  );
}
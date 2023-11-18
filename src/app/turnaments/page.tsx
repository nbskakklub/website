import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
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

async function getTurnaments() {
  const theDate = new Date();
  theDate.setDate(1);
  theDate.setDate(0);
  theDate.setHours(23,0,0);
  const theDateString = encodeURI(theDate.toUTCString());
  const res = await fetch(
    `https://turnering.skak.dk/api/turnering/list?date=${theDateString}`
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
      <BasicMeta url={"/turnaments"} />
      <OpenGraphMeta url={"/turnaments"} />
      <TwitterCardMeta url={"/turnaments"} />
      <div className="containerr">
        <div style={{ maxHeight: "90vh", marginBottom: "3rem" }}>
          <h2>Her kan du se vores kommende turneringer</h2>
          <TurnamentList turnaments={events} />
        </div>
      </div>
    </Layout>
  );
}
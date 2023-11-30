import { Metadata } from "next";
import Layout from "../../components/Layout";
import styles from './turnaments.module.scss';
import TurnamentList from "../../components/TurnamentList";
import { makeMetadata } from "../../lib/metadata";

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

export async function generateMetadata({ params }) {
  return await makeMetadata('Turneringer', 'Her kan du se alle nørrebro skakklub kommende turneringer!');
}
  
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
      <div className={styles.container}>
        <div style={{ maxHeight: "90vh", marginBottom: "3rem" }}>
          <h2>Her kan du se vores kommende turneringer</h2>
          <TurnamentList turnaments={events} />
        </div>
      </div>
    </Layout>
  );
}
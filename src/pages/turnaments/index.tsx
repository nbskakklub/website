import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import TurnamentList from "../../components/TurnamentList";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import '@fontsource/inter';

export default function Index({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(events)
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="containerr">
        <div style={{ maxHeight: '80vh' }}>
          <TurnamentList turnaments={events} />
        </div>
      </div>
      <style jsx>{`


        .containerr {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          padding: 0 1.5rem;
        }
        h1 {
          font-size: 2.5rem;
          margin: 0;
          font-weight: 500;
        }
        h2 {
          font-size: 1.75rem;
          font-weight: 400;
          line-height: 1.25;
        }
        .fancy {
          color: #15847d;
        }
        .handle {
          display: inline-block;
          margin-top: 0.275em;
          color: #9b9b9b;
          letter-spacing: 0.05em;
        }

        @media (min-width: 769px) {
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </Layout>
  );
}

type Turnament = {
    Name: string
    Id: number
    Invitation: boolean
    Weekend: boolean
    Youth: boolean
    EloRatet: boolean
    Participants: number
    Started: boolean
    HovedKreds: number
    EndDate: string
    StartDate: string
    IsBlitz: boolean
    IsRapid: boolean
    NationalRated: boolean
    HasWheelchair: boolean
    EnrolmentOpen: boolean
    Description: string
}

export const getStaticProps = (async (context) => {
  const res = await fetch('https://turnering.skak.dk/api/turnering/list?date=Tue, 31 Oct 2023 23:00:00 GMT')
  const events: Turnament[] = (await res.json()).filter((turnament: Turnament) => turnament.HovedKreds == 1)
  return { props: { events } }
}) satisfies GetStaticProps<{
  events: Turnament[]
}>
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import Calendar from '../components/Calendar';
import EventList from "../components/EventList";
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
      <div className="container">
        <div>
          <h1 className="underlined">Hyeheyehyahe testingting ajsdofgjoisjdoiasjd</h1>
          <EventList events={events} />
          <Calendar googleCalendarId="40f26d8f0d77a97ff76d62be4477f2c8f7e72189324f5fd62d2b1434f5aea8f5@group.calendar.google.com" />
        </div>
      </div>
      <style jsx>{`
        .container {
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

export const getStaticProps = (async (context) => {
  const res = await fetch('https://turnering.skak.dk/api/turnering/list\?date\=Thu,%2031%20Aug%202023%2022:00:00%20GMT')
  const events = await res.json()
  return { props: { events } }
}) satisfies GetStaticProps<{
  events
}>
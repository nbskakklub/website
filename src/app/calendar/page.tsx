'use client';

import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import Calendar from "../../components/Calendar";
import { generateMetadata } from "../../components/meta/BasicMeta";

let metadata = generateMetadata({ title: 'Kalender', url: '/calendar'})

export default function Index() {
  return (
    <Layout>
      <OpenGraphMeta url={"/calendar"} />
      <TwitterCardMeta url={"/calendar"} />
      <div className="container">
        <div className="calender">
            <h2>Se hvores kalender:</h2>
            <Calendar googleCalendarId="40f26d8f0d77a97ff76d62be4477f2c8f7e72189324f5fd62d2b1434f5aea8f5@group.calendar.google.com"/>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          flex: 1 1 auto;
          gap: 10rem;
          z-index: 1;
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

        .calender {
            min-width: 40vw;
            min-height: 40vh;
        }
      `}</style>
    </Layout>
  );
}

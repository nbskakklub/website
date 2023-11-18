'use client';

import Layout from "../../components/Layout";
import './calendar.scoped.scss';
import Calendar from "../../components/Calendar";
import { generateMetadata } from "../../components/meta/BasicMeta";

let metadata = generateMetadata({ title: 'Kalender', url: '/calendar'})

export default function Index() {
  return (
    <Layout>
      <div className="container">
        <div className="calender">
            <h2>Se hvores kalender:</h2>
            <Calendar googleCalendarId="40f26d8f0d77a97ff76d62be4477f2c8f7e72189324f5fd62d2b1434f5aea8f5@group.calendar.google.com"/>
        </div>
      </div>
    </Layout>
  );
}

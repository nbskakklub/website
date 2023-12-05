import Layout from "../../components/layout/Layout";
import styles from "./calendar.module.scss";
import Calendar from "../../components/Calendar";
import { makeMetadata } from "../../lib/metadata";

export async function generateMetadata({ params }) {
  return await makeMetadata(
    "Kalender",
    "Her kan du finde vores kalender med en oversigt over vores mødes osv."
  );
}

export default function Index() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.calender}>
          <h2>Se vores kalender:</h2>
          <Calendar googleCalendarId="40f26d8f0d77a97ff76d62be4477f2c8f7e72189324f5fd62d2b1434f5aea8f5@group.calendar.google.com" />
        </div>
      </div>
    </Layout>
  );
}

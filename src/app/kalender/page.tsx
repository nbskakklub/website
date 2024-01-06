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
          <h2>Kalender:</h2>
          <Calendar googleCalendarId="nbskakklub@gmail.com" />
        </div>
      </div>
    </Layout>
  );
}

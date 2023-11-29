import Layout from "../../components/Layout";
import './calendar.module.scss';
import Calendar from "../../components/Calendar";

//let metadata = generateMetadata({ title: 'Kalender', url: '/calendar'})
export const metadata = {
  title: 'Kalender | Nørrebro Skakklub',
  description: 'Her kan du finde vores kalender med en oversigt over vores mødes osv.',
}

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

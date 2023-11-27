import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import MemberList from "../../components/MemberList";
import Papa from 'papaparse';
import './members.module.scss';

type Member = {
  Nummer: string;
  Navn: string;
  Klub: string;
  Titel: string;
  Rating: string;
  Lyn: string;
  Fiderating: string;
  Fide: string;
  K_factor: string;
  Foedtaar: string;
  Hurtig: string;
};

async function getMembers(): Promise<Member[]> {
  try {
    const response = await fetch('https://turnering.skak.dk/ClubAndMembers/ClubMemberReport/201?format=csv', {
      headers: {
        'Content-Type': 'text/csv; charset=ISO-8859-1',
      },
    });
    const buffer = await response.arrayBuffer();
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    const decoder = new TextDecoder('ISO-8859-15');
    const csvText = decoder.decode(buffer);
    const parsedData = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      skipFirstNLines: 1,
      transformHeader: function(h) {
        return h.replace(/\s/g, '').replace(/-/g, "_").replace(/å/g, "aa").replace(/ø/g, "oe");
      }
    });
    if (parsedData.errors.length > 0) {
      throw new Error(`CSV parsing error: ${parsedData.errors}`);
    }
    return parsedData.data;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch and parse data.');
  }
}

export default async function Index() {
  const members: Member[] = await getMembers();
  return (
    <Layout>
      <div className="container">
        <div style={{ maxHeight: "90vh", marginBottom: "3rem" }}>
          <h2>Her kan du se vores medlemmer</h2>
          <MemberList members={ members } />
        </div>
      </div>
    </Layout>
  );
}
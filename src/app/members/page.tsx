import Layout from "../../components/Layout";
import MemberList from "../../components/MemberList";
import Papa from 'papaparse';
import './members.module.scss';

export const metadata = {
  title: 'Medlemmer | Nørrebro Skakklub',
  description: 'Vores medlemsliste kan du se her på siden.',
}

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
  return new Promise(async (resolve, reject) => {
    await fetch('https://turnering.skak.dk/ClubAndMembers/ClubMemberReport/201?format=csv', {
      headers: {
        'Content-Type': 'text/csv; charset=ISO-8859-1',
      },
    }).then(async (response) => {
      const buffer = await response.arrayBuffer();
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      const decoder = new TextDecoder('ISO-8859-15');
      const csvText = decoder.decode(buffer);
      Papa.parse<Member>(csvText,{
        header: true,
        skipEmptyLines: true,
        encoding: 'ISO-8859-15',
        complete: function(results) {
          // Resolve the Promise with the parsed data
          resolve(results.data);
        },
        error: function(error) {
          console.error(error);
          // Reject the Promise with an error message
          reject(new Error('Failed to fetch and parse data.'));
        },
        transformHeader: function(h) {
          return h.replace(/\s/g, '').replace(/-/g, "_").replace(/å/g, "aa").replace(/ø/g, "oe");
        }
      });
    });
  });
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
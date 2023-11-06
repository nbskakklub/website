import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import Card from "../components/Card";
import HSeparator from "../components/HSeparator";
import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import matter from "gray-matter";
import fs from "fs";
import yaml from "js-yaml";

type Props = {
  source: MDXRemoteSerializeResult;
};

const components = { HSeparator };

export default function Index({ source }: Props) {
  return (
    <Layout>
      <div className="bg-img"></div>

      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="container">
        <div className="head">
          <div className="title">
            <h1 className="fancy-font">Nørrebro</h1>
            <h1 className="fancy-font">Skakklub</h1>
          </div>
        </div>
        <div className="more">
          <div className="more-content">
            <p>dette er en meget god skakklub</p>

            <div className="cards">
              <Card
                imagePath={"/images/skakudenfor.jpg"}
                title="Klubaftener:"
                text="vær lørdag holder vi en klub aften for alle hvores medlemmer. Der kommer til at være"
              ></Card>
              <Card
                imagePath={"/images/skakudenfor.jpg"}
                title="skak udenfor:"
                text="her ser i nogle personer som spiller skak uden for. det ser da meget hyggeligt ud. hvis du også"
                url="skakudenfor"
              ></Card>
            </div>

            <div className="practical-information">
              <p>
                <strong>praktisk information</strong>
              </p>
              <HSeparator></HSeparator>
            </div>
            <MDXRemote {...source} components={components} lazy />
            <div>hej</div>
          </div>
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
          font-size: 1.2rem;
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

        .z1 {
          z-index: 1;
        }

        .more {
          background-color: white;
          box-shadow: rgba(0, 0, 0, 0.43) -4px -3px 20px;
          width: 100%;
          min-height: 50rem;
        }

        .more-content {
          margin: 2rem auto;
          padding: 0 2rem;
          max-width: 60rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .head {
          width: 100%;
          height: 50rem;
        }

        .bg-img {
          background-image: url("/images/chess-bg.jpg");
          background-size: cover;

          transform-origin: bottom;
          width: 100%;
          z-index: 0;
          left: 0;
          top: 0;
          aspect-ratio: 1;
          position: absolute;
        }

        .title {
          font-size: 8vw;
          margin-left: 8vw;
        }

        .title h1 {
          font-size: inherit;
        }

        .cards {
          display: flex;
          gap: 5rem;

           {
            /* flex-wrap: wrap */
          }
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const source = fs.readFileSync("content/home.mdx", "utf8");
  const { content, data } = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  const mdxSource = await serialize(content);
  console.log(mdxSource);
  return {
    props: {
      source: mdxSource,
    },
  };
};

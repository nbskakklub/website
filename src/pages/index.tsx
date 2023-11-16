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
import React, {useState, useEffect } from 'react';

type Props = {
  title: string;
  source: MDXRemoteSerializeResult;
};

const components = { HSeparator };

export default function Index({ title, source }: Props) {
  const titles = title.split(" ");

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
      const handleScroll = () => {
          setScrollY(window.scrollY);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);
  return (
    <Layout>
      <div className="bg-img" style={{transform: `translateY(${-scrollY * 0.5}px)`}}></div>

      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="container">
        <div className="head">
          <div className="title">
            {titles.map(element => 
              <h1 key={element} className="fancy-font">{element}</h1>
              )
            }
          </div>
          <button className="fancy-font poly-effect see-more">Se mere</button>
        </div>
        <div className="more">
          <div className="more-content">

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
              <MDXRemote {...source} components={components} lazy />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          {/* gap: 10rem; */}
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
          box-shadow: rgba(0, 0, 0, 0.1) -4px -3px 30px;
          width: 100%;
          min-height: 50rem;
        }

        .more-content {
          margin: 2rem auto;
          padding: 0 5rem;
          max-width: 60rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .head {
          width: calc(100% - 50vw);
          height: calc(100vh - 6vh - 7.5rem);
          max-height: 60vw;
          margin-left: 10vw;
          margin-top: 6vw;
        }
        
        .see-more {
          min-height: 50px;
          min-width: 110px;
          height: 4.5vw;
          width: 15vw;
          outline: none;
          border: none;
          color: white;
          font-weight: 900;
          font-size: calc(15px + 1.2vw);;
          margin-top: 3vw;
        }

        

        {/* custom underline */}
        .see-more::after {
          content: "";
          height: 0.1vw;
          width: 0%;
          margin-left: 24%;
          margin-top: -0.1vw;
          background-color: rgba(255, 255, 255, 0.3);
          display: block;
          position: absolute;
          left: 0;
          transition: width 500ms;
          
        }

        .see-more:hover::after {
          width: 52%;
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
          position: fixed;
          filter: saturate(1.1) brightness(1.05)
        }

        .title {
          font-size: 9vw;
        }

        .title h1 {
          font-size: inherit;
          color: black;
          margin: -2.1vw 0;
          padding: 0 0;
        }

        .cards {
          display: flex;
          gap: 3rem;
          margin-top: 1rem;
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
  const source = fs.readFileSync("content/pages/home.mdx", "utf8");
  const { content, data } = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  const mdxSource = await serialize(content);
  return {
    props: {
      title: data.title,
      source: mdxSource,
    },
  };
};

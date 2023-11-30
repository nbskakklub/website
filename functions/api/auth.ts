import { PagesFunction } from "@cloudflare/workers-types";

interface Env {
  GITHUB_CLIENT_ID: string,
  GITHUB_CLIENT_SECRET: string
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const client_id = context.env.GITHUB_CLIENT_ID;

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`;
  
  return new Response("", {
    status: 302, headers: { 'Location': authUrl }
  });
}
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {

  const client_id = process.env.GITHUB_CLIENT_ID;

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`;
  
  return new Response("", {
    status: 302, headers: { 'Location': authUrl }
  });
}
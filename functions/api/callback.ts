import { PagesFunction } from "@cloudflare/workers-types";

interface Env {
  GITHUB_CLIENT_ID: string,
  GITHUB_CLIENT_SECRET: string
}

interface TokenResponse {
  access_token: string,
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const client_id = context.env.GITHUB_CLIENT_ID;
  const client_secret = context.env.GITHUB_CLIENT_SECRET;

  const tokenUrl = "https://github.com/login/oauth/access_token";
  
  const { searchParams } = new URL(context.request.url);

  const code = searchParams.get("code");

  if(code == null) {return new Response("", { status: 500 })}

  const data = new URLSearchParams(`code=${code}&client_id=${client_id}&client_secret=${client_secret}`)

  try {
    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (tokenResponse.ok) {
	    const tokenData: TokenResponse = await tokenResponse.json();

      const postMsgContent = {
        token: tokenData.access_token,
        provider: "github",
      };

      const script = `
        <script>
          (function() {
            function receiveMessage(e) {
        console.log("receiveMessage %o", e);
            
    window.opener.postMessage('authorization:github:success:${JSON.stringify(postMsgContent)}', e.origin);
            }
            
            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:github", "*");
          })()
        </script>`;

      return new Response(script, { 
        status: 200, 
        headers: {
          'Content-Type': 'text/html' 
        }
      });
    } else {
	    return new Response("", { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return new Response("", { status: 500 });
  }
}
import { serve } from "bun";

serve({
  port: process.env.PORT || 3000,
  fetch(req) {
    const url = new URL(req.url);
    // Serve static files from the dist directory
    return new Response(Bun.file(`dist${url.pathname === "/" ? "/index.html" : url.pathname}`));
  },
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
}); 
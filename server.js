import { serve } from "https://deno.land/std@0.220.1/http/server.ts";
import { serveDir } from "https://deno.land/std@0.220.1/http/file_server.ts";

serve((req) => {
  return serveDir(req, {
    fsRoot: "dist",
    urlRoot: "",
    showDirListing: false,
    enableCors: true,
  });
}, { port: 8000 }); 
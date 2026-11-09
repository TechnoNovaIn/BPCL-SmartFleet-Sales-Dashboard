/*
 * BPCL SmartFleet — local proxy server (fixes the CORS error)
 * ------------------------------------------------------------
 * - Serves BPCL_API_Dashboard.html at http://localhost:3000
 * - Forwards every request starting with /bpcl/... to https://api.cep.bpcl.in/...
 *   (server-to-server calls are NOT blocked by CORS)
 * - Serves October data at /october-data for instant one-click analysis
 *
 * No npm install needed — uses only built-in Node.js modules.
 * Run:  node server.js
 */
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const TARGET_HOST = "api.cep.bpcl.in";
const HTML_FILE = path.join(__dirname, "BPCL_API_Dashboard.html");

const server = http.createServer((req, res) => {
  // 1) Serve the dashboard page
  if (req.url === "/" || req.url.startsWith("/BPCL_API_Dashboard.html")) {
    fs.readFile(HTML_FILE, (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end(
          "Cannot read BPCL_API_Dashboard.html — keep it in the same folder as server.js",
        );
      }
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    });
    return;
  }

  // 2) Serve local October 2026 report file
  if (req.url === "/october-data" || req.url.startsWith("/october-data")) {
    const candidates = [
      path.join(__dirname, "..", "BPCL_Data_FA2000597425_2026-10-01_to_2026-10-31.xlsx"),
      path.join(__dirname, "BPCL_Data_FA2000597425_2026-10-01_to_2026-10-31.xlsx"),
      path.join(__dirname, "..", "BPCL_Vinayaka_October_2026_Report.xlsx")
    ];
    let foundPath = null;
    for (const p of candidates) {
      if (fs.existsSync(p)) {
        foundPath = p;
        break;
      }
    }
    if (foundPath) {
      fs.readFile(foundPath, (err, data) => {
        if (err) { res.writeHead(500); return res.end("Error reading data file"); }
        res.writeHead(200, { 
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `inline; filename="${path.basename(foundPath)}"`
        });
        res.end(data);
      });
      return;
    }
  }

  // 3) Proxy API calls:  /bpcl/xyz  ->  https://api.cep.bpcl.in/xyz
  if (req.url.startsWith("/bpcl/")) {
    const targetPath = req.url.replace(/^\/bpcl/, "");

    // Copy only the headers BPCL needs
    const headers = {};
    ["authorization", "content-type", "accept"].forEach((h) => {
      if (req.headers[h]) headers[h] = req.headers[h];
    });

    const proxyReq = https.request(
      {
        host: TARGET_HOST,
        port: 443,
        path: targetPath,
        method: req.method,
        headers,
      },
      (proxyRes) => {
        console.log(
          `${req.method} ${targetPath.split("?")[0]} -> ${proxyRes.statusCode}`,
        );
        res.writeHead(proxyRes.statusCode, {
          "Content-Type":
            proxyRes.headers["content-type"] || "application/json",
        });
        proxyRes.pipe(res);
      },
    );

    proxyReq.on("error", (err) => {
      console.error("Proxy error:", err.message);
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Proxy could not reach BPCL API",
          detail: err.message,
        }),
      );
    });

    req.pipe(proxyReq); // forward the request body (needed for login POST)
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log("==============================================");
  console.log(` BPCL Dashboard running at http://localhost:${PORT}`);
  console.log(" Keep this window open while using the dashboard.");
  console.log("==============================================");
});

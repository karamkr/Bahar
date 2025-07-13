const fetch = require("node-fetch");
exports.handler = async function(event) {
  const url = event.queryStringParameters.url;
  if (!url) return { statusCode: 400, body: "Missing URL" };
  try {
    const r = await fetch(url);
    const ct = r.headers.get("content-type");
    const buf = await r.buffer();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": ct,
        "Access-Control-Allow-Origin": "*"
      },
      body: buf.toString("base64"),
      isBase64Encoded: true
    };
  } catch (e) {
    return { statusCode: 500, body: "Proxy error: " + e.message };
  }
};

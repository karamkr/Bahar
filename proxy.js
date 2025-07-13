const fetch = require("node-fetch");

exports.handler = async function(event) {
  const targetUrl = event.queryStringParameters.url;
  if (!targetUrl) {
    return { statusCode: 400, body: "Missing URL" };
  }

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get("content-type");
    const buffer = await response.buffer();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*"
      },
      body: buffer.toString("base64"),
      isBase64Encoded: true
    };
  } catch (error) {
    return { statusCode: 500, body: "Proxy error: " + error.message };
  }
};

const express = require("express");
const app = express();

app.use(express.static("."));

app.get("/api/players", async (req, res) => {
  const search = req.query.search || "";

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/players?search=${encodeURIComponent(search)}`,
      {
        headers: {
          "x-apisports-key": process.env.API_FOOTBALL_KEY
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "API request failed" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Review FC server started");
});

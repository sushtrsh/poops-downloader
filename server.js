const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Endpoint untuk memproses URL video
app.post('/download', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        // Gunakan API pihak ketiga untuk mengekstrak video
        const apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        if (response.data.code === 0) {
            const videoUrl = response.data.data.play;
            return res.json({ videoUrl });
        } else {
            throw new Error("Failed to fetch video.");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to process video URL." });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

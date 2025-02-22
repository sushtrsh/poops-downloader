document.getElementById('downloadForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Mencegah form dikirim secara default

    const videoUrl = document.getElementById('video_url').value;

    // Validasi URL video
    if (!videoUrl) {
        alert("Please enter a valid video URL.");
        return;
    }

    // Tampilkan spinner loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('preview').style.display = 'none';

    try {
        // Kirim request ke backend
        const response = await fetch('http://localhost:3000/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: videoUrl }),
        });

        const data = await response.json();

        if (data.videoUrl) {
            const videoPreview = document.getElementById('videoPreview');
            const downloadLink = document.getElementById('downloadLink');

            // Set pratinjau video
            videoPreview.src = data.videoUrl;

            // Set link unduhan
            downloadLink.href = data.videoUrl;
            downloadLink.download = "downloaded_video.mp4";

            // Sembunyikan spinner dan tampilkan preview
            document.getElementById('loading').style.display = 'none';
            document.getElementById('preview').style.display = 'block';
        } else {
            throw new Error(data.error || "Failed to fetch video.");
        }
    } catch (error) {
        console.error(error);
        alert("Failed to download video. Please try again.");
        document.getElementById('loading').style.display = 'none';
    }
});

document.getElementById('downloadForm').addEventListener('submit', function (e) {
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

    // Simulasikan proses pengunduhan (contoh: delay 2 detik)
    setTimeout(function () {
        // Sembunyikan spinner
        document.getElementById('loading').style.display = 'none';

        // Tampilkan preview dan tombol unduhan
        document.getElementById('preview').style.display = 'block';

        // Set pratinjau video
        const videoPreview = document.getElementById('videoPreview');
        videoPreview.src = videoUrl; // Gunakan URL video yang dimasukkan pengguna

        // Set link unduhan
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = videoUrl; // Gunakan URL video yang dimasukkan pengguna
        downloadLink.download = "downloaded_video.mp4"; // Nama file unduhan
    }, 2000);
});

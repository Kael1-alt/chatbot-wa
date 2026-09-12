const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// 1. Inisialisasi Bot WhatsApp
// GANTI KODE CLIENT LAMA ANDA DENGAN KODE DI BAWAH INI:
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // Menggunakan channel 'chrome' agar sistem mencari Google Chrome Anda secara otomatis
        channel: 'chrome', 
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// 2. Memunculkan QR Code di Terminal VS Code
client.on('qr', (qr) => {
    console.log('--- SCAN QR CODE INI DENGAN WHATSAPP ANDA ---');
    qrcode.generate(qr, { small: true });
});

// 3. Notifikasi jika bot berhasil terhubung (setelah di-scan)
client.on('ready', () => {
    console.log('Selesai! Bot WhatsApp Anda sudah aktif dan siap digunakan.');
});

// 4. Membaca dan membalas pesan otomatis
// 4. Membaca dan membalas pesan otomatis (DAPAT DITAMBAH KATA KUNCI LAIN)
client.on('message', async (msg) => {
    // Mengubah semua pesan masuk menjadi huruf kecil agar bot tidak sensitif huruf kapital
    const pesanMasuk = msg.body.toLowerCase();

    if (pesanMasuk === '!ping') {
        // Balasan jika mengetik !ping
        await msg.reply('pong');

    } else if (pesanMasuk === 'halo' || pesanMasuk === 'hai') {
        // Balasan jika mengetik halo atau hai
        await msg.reply('Halo juga! Ada yang bisa saya bantu? 👋');

    } else if (pesanMasuk === 'p') {
        // Balasan jika mengetik p doang
        await msg.reply('Ketik yang jelas ya, jangan cuma P. 🙂');

    } else if (pesanMasuk === 'tes') {
        // Fitur memberi reaksi emoji jempol otomatis (Sama seperti fungsi cURL di gambar Anda)
        await msg.react('👍');
    }
client.on('message', async (msg) => {
    try {
        // MASUKKAN LINK OBROLAN / GRUP YANG INGIN ANDA TARGETKAN DISINI
        const TARGET_LINK = "https://whatsapp.com/channel/0029VasigaNFXUufnreE1Z3x/18969";

        // Mengecek apakah isi pesan mengandung link target yang Anda tentukan
        if (msg.body.includes(TARGET_LINK)) {
            
            // Daftar emoji acak pilihan Anda
            const daftarEmoji = ['👏🏻', '🥳', '🤍'];
            const emojiAcak = daftarEmoji[Math.floor(Math.random() * daftarEmoji.length)];

            // Bot memberikan reaksi emoji otomatis pada pesan yang mengirim tautan tersebut
            await msg.react(emojiAcak);
            console.log(`Berhasil nge-react otomatis dengan emoji: ${emojiAcak}`);
        }
    } catch (error) {
        console.error('Gagal memproses reaksi link:', error);
    }
});
});

// 5. Jalankan program
client.initialize();
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

// 4. Membalas setiap pesan masuk dengan pesan otomatis
client.on('message', async (msg) => {
    try {
        // Abaikan pesan dari grup
        if (msg.from.endsWith('@g.us')) {
            return;
        }

        // Ubah pesan menjadi huruf kecil
        const pesan = msg.body.toLowerCase().trim();

        // Pembuka untuk pesan selain halo
        const pembuka =
            'HALO SAYA ASSISTEN AI NYA ALDI,\n' +
            'Terimakasih sudah menghubungi. Apa yang anda butuhkan?\n' +
            'Tunggu sampai owner ONLINE, UNTUK BERKOMUNIKASI LEBIH LANJUT.\n\n';

        // =========================
        // FILTER PESAN
        // =========================

        // Jika bilang HALO / HAI / HELLO
        if (
            pesan.includes('halo') ||
            pesan.includes('hai') ||
            pesan.includes('hello')
        ) {
            await msg.reply(
                'Halo! 👋 Terima kasih sudah menghubungi saya.\n' +
                'Ada yang bisa saya bantu?'
            );
        }

        // Jika menanyakan harga
        else if (
            pesan.includes('harga') ||
            pesan.includes('berapa')
        ) {
            await msg.reply(
                pembuka +
                'Untuk informasi harga, silakan sebutkan produk yang ingin ditanyakan.'
            );
        }

        // Jika ingin membeli / pesan
        else if (
            pesan.includes('beli') ||
            pesan.includes('pesan') ||
            pesan.includes('order')
        ) {
            await msg.reply(
                pembuka +
                'Baik, silakan sebutkan produk dan jumlah yang ingin dipesan.'
            );
        }

        // Jika menanyakan produk / barang
        else if (
            pesan.includes('produk') ||
            pesan.includes('barang')
        ) {
            await msg.reply(
                pembuka +
                'Silakan tanyakan produk yang ingin Anda ketahui.'
            );
        }

        // Jika menanyakan alamat / lokasi
        else if (
            pesan.includes('alamat') ||
            pesan.includes('lokasi') ||
            pesan.includes('dimana')
        ) {
            await msg.reply(
                pembuka +
                'Untuk informasi alamat atau lokasi, silakan tunggu owner memberikan informasi.'
            );
        }

        // Jika ingin menghubungi admin / owner
        else if (
            pesan.includes('admin') ||
            pesan.includes('owner')
        ) {
            await msg.reply(
                pembuka +
                'Baik, silakan tunggu owner ONLINE untuk melanjutkan komunikasi.'
            );
        }

        // Jika menanyakan pembayaran
        else if (
            pesan.includes('bayar') ||
            pesan.includes('pembayaran') ||
            pesan.includes('transfer')
        ) {
            await msg.reply(
                pembuka +
                'Untuk informasi pembayaran, silakan tunggu arahan dari owner.'
            );
        }

        // Jika menanyakan jam buka
        else if (
            pesan.includes('jam') ||
            pesan.includes('buka') ||
            pesan.includes('tutup')
        ) {
            await msg.reply(
                pembuka +
                'Untuk informasi jam operasional, silakan tunggu konfirmasi dari owner.'
            );
        }

        // Jika mengucapkan terima kasih
        else if (
            pesan.includes('terima kasih') ||
            pesan.includes('makasih') ||
            pesan.includes('thanks')
        ) {
            await msg.reply(
                pembuka +
                'Sama-sama! 😊 Terima kasih sudah menghubungi kami.'
            );
        }

        // Jika meminta bantuan
        else if (
            pesan.includes('bantuan') ||
            pesan.includes('help') ||
            pesan.includes('butuh')
        ) {
            await msg.reply(
                pembuka +
                'Tentu, silakan jelaskan kebutuhan Anda. Nanti akan dibantu oleh owner.'
            );
        }

        // Jika tidak cocok dengan filter apa pun
        else {
            await msg.reply(
                'HALO SAYA ASSISTEN AI NYA ALDI,\n' +
                'Terimakasih sudah menghubungi. Apa yang anda butuhkan?\n' +
                'Tunggu sampai owner ONLINE, UNTUK BERKOMUNIKASI LEBIH LANJUT.'
            );
        }

    } catch (error) {
        console.error('Gagal membalas pesan:', error.message);
    }
});

 

// Memberikan reaksi otomatis pada pesan yang berisi tautan target
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

// 5. Jalankan program
client.initialize();
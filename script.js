document.addEventListener('DOMContentLoaded', () => {

    // --- Efek Header ---
    const header = document.getElementById('main-header');
    if (header) {
        if (!document.getElementById('hero')) {
            header.classList.add('header-solid');
        }
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else if (document.getElementById('hero')) {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Efek Parallax (hanya di halaman utama) ---
    const parallaxLogo = document.getElementById('hero-logo-parallax');
    const heroSection = document.getElementById('hero');
    if (parallaxLogo && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = heroSection;
            const xMove = (clientX / offsetWidth - 0.5) * 30;
            const yMove = (clientY / offsetHeight - 0.5) * 30;
            parallaxLogo.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });
        heroSection.addEventListener('mouseleave', () => {
            parallaxLogo.style.transform = 'translate(0, 0)';
        });
    }

    // --- Animasi Scroll ---
    const hiddenElements = document.querySelectorAll('.hidden');
    if (hiddenElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        hiddenElements.forEach((el) => observer.observe(el));
    }

    // --- Fungsi Salin Alamat IP ---
    const copyIpBtn = document.getElementById('copy-ip-btn');
    if (copyIpBtn) {
        const serverIpText = document.getElementById('server-ip').textContent;
        copyIpBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(serverIpText).then(() => {
                copyIpBtn.textContent = 'Tersalin!';
                setTimeout(() => {
                    copyIpBtn.textContent = 'Salin IP';
                }, 2000);
            }).catch(err => {
                console.error('Gagal menyalin IP: ', err);
                alert('Gagal menyalin IP. Silakan salin secara manual.');
            });
        });
    }

    // ========== FUNGSI STATUS SERVER DAN JUMLAH PEMAIN ==========
    const playerCountElement = document.getElementById('player-count-text');
    const serverStatusSpan = document.getElementById('server-status-text');
    
    if (playerCountElement && serverStatusSpan) {
        // ========== ALAMAT SERVER DIPERBARUI DI SINI ==========
        const serverAddress = 'play.revenge.my.id'; 
        const apiUrl = `https://api.mcstatus.io/v2/status/java/${serverAddress}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.online) {
                    // SERVER ONLINE
                    playerCountElement.textContent = `${data.players.online} Players`;
                    serverStatusSpan.textContent = 'online';
                    serverStatusSpan.className = 'status-online';
                } else {
                    // SERVER OFFLINE
                    playerCountElement.textContent = '0 Players';
                    serverStatusSpan.textContent = 'offline';
                    serverStatusSpan.className = 'status-offline';
                }
            })
            .catch(error => {
                // JIKA TERJADI ERROR
                console.error('Error fetching server status:', error);
                playerCountElement.textContent = 'N/A Players';
                serverStatusSpan.textContent = 'Error';
                serverStatusSpan.className = 'status-error';
            });
    }
    // =============================================================

});

// ========== FUNGSI BARU UNTUK HALAMAN PAYMENT ==========
    const paymentPage = document.getElementById('payment-page');
    if (paymentPage) {
        const params = new URLSearchParams(window.location.search);
        const itemName = params.get('item');
        const itemPrice = params.get('price');

        // Tampilkan detail item
        document.getElementById('item-name-display').textContent = itemName || 'Item tidak ditemukan';
        document.getElementById('item-price-display').textContent = `Rp${itemPrice || '0'}`;

        // Fungsionalitas Tombol Kembali
        const backBtn = document.getElementById('payment-back-btn');
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            history.back();
        });

        // Fungsionalitas Salin Nomor DANA
        const copyDanaBtn = document.getElementById('copy-dana-btn');
        const danaNumber = document.getElementById('dana-number').textContent;
        copyDanaBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(danaNumber).then(() => {
                copyDanaBtn.textContent = 'Tersalin!';
                setTimeout(() => {
                    copyDanaBtn.textContent = 'Salin Nomor';
                }, 2000);
            });
        });
    }

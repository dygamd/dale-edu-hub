// ALERT PERTAMA: Untuk pastikan fail ini dibuka
alert("Sistem sedang dimulakan...");

const SB_URL = 'https://ktfhmqvuhqlzhkotorsi.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0ZmhtcXZ1aHFsemhrb3RvcnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2OTI2MTAsImV4cCI6MjAyNzI2ODYxMH0.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0ZmhtcXZ1aHFsemhrb3RvcnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNTY3NTQsImV4cCI6MjA4ODgzMjc1NH0.yIqlOSSz_40EuFJV2DaLMIaD5Ou6A9ycMQMAxrMohyA';

// Fungsi untuk panggil data
async function initTestimonials() {
    const wrapper = document.getElementById('testimoniWrapper');
    const loading = document.getElementById('testimoniLoading');

    try {
        // Cek jika library Supabase wujud
        const supabase = window.supabase.createClient(SB_URL, SB_KEY);
        
        const { data, error } = await supabase
            .from('testimonials')
            .select('*');

        if (error) {
            alert("Ralat Supabase: " + error.message);
            return;
        }

        if (data && data.length > 0) {
            let content = "";
            data.forEach(t => {
                content += `
                <div class="swiper-slide">
                    <div class="testi-card">
                        <p>"${t.message}"</p>
                        <h4>${t.name}</h4>
                        <small>${t.subject}</small>
                    </div>
                </div>`;
            });
            wrapper.innerHTML = content;
            
            if (loading) loading.style.display = 'none';
            document.getElementById('testimoniSwiper').style.display = 'block';

            // Init Swiper
            new Swiper('.mySwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                pagination: { el: '.swiper-pagination' },
                breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
            });
        } else {
            alert("Berjaya sambung, tapi data kosong.");
        }
    } catch (err) {
        alert("Ralat Kod: " + err.message);
    }
}

// Form WhatsApp
document.getElementById('whatsappForm').onsubmit = async function(e) {
    e.preventDefault();
    alert("Menghantar data...");
    
    // Logik hantar WhatsApp ringkas
    const nama = document.getElementById('stuName').value;
    const msg = `Daftar DALe EduHub: ${nama}`;
    window.location.href = `https://wa.me/60128258869?text=${encodeURIComponent(msg)}`;
};

// Jalankan fungsi
window.onload = initTestimonials;

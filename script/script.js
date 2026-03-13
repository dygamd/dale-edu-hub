// ==================== SUPABASE CONFIG ====================
const SUPABASE_URL = 'https://ktfhmqvuhqlzhkotorsi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kOz2lNp6289X7bajR5qmTw_Q1_Vh1zf';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==================== MOBILE MENU ====================
window.toggleMobileMenu = function() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = '';
    } else {
        navLinks.style.display = 'flex';
    }
};

// ==================== TOAST NOTIFICATION ====================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toast.className = `toast ${type} show`;
    toastMessage.textContent = message;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== LOAD TESTIMONIALS - DUMMY DATA ====================
function loadTestimonials() {
    console.log('Loading testimonials...');
    
    const loading = document.getElementById('testimoniLoading');
    const swiper = document.getElementById('testimoniSwiper');
    const wrapper = document.getElementById('testimoniWrapper');
    
    if (!wrapper) return;
    
    // Dummy data - confirm jalan
    const testimonials = [
        {
            name: "Cik Syuhada",
            subject: "Matematik (Menengah Atas)",
            message: "Kelas dengan cikgu Dayang sangat okay. Cikgu tak berat mulut untuk ulang semula kalau saya tak faham. Cikgu pun ajar perlahan tak terlalu laju."
        },
        {
            name: "Encik Azimy",
            subject: "Sains Komputer",
            message: "Sebelum ini, anak lelaki saya pernah belajar dengan cikgu Dayang bagi kelas intensif sebelum SPM. Kali ini, anak perempuan saya pulak yang menjadi murid kepada cikgu Dayang. Alhamdulilah, kedua-dua anak saya okay dan faham dengan kelas cikgu Dayang."
        },
        {
            name: "Puan Basyirah",
            subject: "Matematik (Menengah Rendah)",
            message: "Terima kasih cikgu Dayang kerana sangat sabar dalam mengajar anak saya yang pendiam."
        }
    ];
    
    wrapper.innerHTML = '';
    
    testimonials.forEach(t => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="testi-card">
                <div class="testi-text">"${t.message}"</div>
                <span class="testi-name">${t.name}</span>
                <span class="testi-subject">${t.subject}</span>
            </div>
        `;
        wrapper.appendChild(slide);
    });
    
    loading.style.display = 'none';
    swiper.style.display = 'block';
    
    // Initialize Swiper
    new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });
}

// ==================== FORM SUBMISSION ====================
document.getElementById('whatsappForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const studentName = document.getElementById('stuName').value;
    const parentPhone = document.getElementById('parentPhone').value;
    
    if (!studentName || !parentPhone) {
        alert('Sila isi Nama Pelajar dan No Telefon');
        return;
    }
    
    const waText = `Salam Cikgu Dayang, saya berminat untuk mendaftar.\nNama: ${studentName}\nTelefon: ${parentPhone}`;
    window.open(`https://wa.me/60128258869?text=${encodeURIComponent(waText)}`, '_blank');
    
    showToast('Pendaftaran dihantar!', 'success');
});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded');
    loadTestimonials();
});

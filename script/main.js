// ==================== SUPABASE CONFIGURATION ====================
const SB_URL = 'https://ktfhmqvuhqlzhkotorsi.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0ZmhtcXZ1aHFsemhrb3RvcnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNTY3NTQsImV4cCI6MjA4ODgzMjc1NH0.yIqlOSSz_40EuFJV2DaLMIaD5Ou6A9ycMQMAxrMohyA';

// Initialize Supabase
const supabase = window.supabase.createClient(SB_URL, SB_KEY.trim());

// ==================== DOM ELEMENTS ====================
const elements = {
    testimoniWrapper: document.getElementById('testimoniWrapper'),
    testimoniLoading: document.getElementById('testimoniLoading'),
    testimoniSwiper: document.getElementById('testimoniSwiper'),
    whatsappForm: document.getElementById('whatsappForm'),
    submitBtn: document.getElementById('submitBtn'),
    toast: document.getElementById('toast')
};

// ==================== TOAST FUNCTION ====================
function showToast(message, type = 'success') {
    const toast = elements.toast;
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== LOAD TESTIMONIALS ====================
async function loadTestimonials() {
    const { testimoniWrapper, testimoniLoading, testimoniSwiper } = elements;
    
    if (!testimoniWrapper) return;

    try {
        if (testimoniLoading) testimoniLoading.style.display = 'block';
        if (testimoniSwiper) testimoniSwiper.style.display = 'none';

        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('active', true);

        if (error) throw error;

        if (testimoniLoading) testimoniLoading.style.display = 'none';

        if (data && data.length > 0) {
            let html = '';
            data.forEach(t => {
                html += `
                <div class="swiper-slide">
                    <div class="testi-card">
                        <div class="testi-text">"${t.message}"</div>
                        <div class="testi-name">${t.name}</div>
                        <div class="testi-subject">${t.subject}</div>
                    </div>
                </div>`;
            });
            
            testimoniWrapper.innerHTML = html;
            if (testimoniSwiper) testimoniSwiper.style.display = 'block';

            new Swiper('.mySwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: data.length > 1,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: { 
                    el: '.swiper-pagination', 
                    clickable: true 
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }
            });
        } else {
            testimoniWrapper.innerHTML = `
                <div class="swiper-slide">
                    <div class="testi-card">Tiada testimoni buat masa ini.</div>
                </div>`;
            if (testimoniSwiper) testimoniSwiper.style.display = 'block';
        }
    } catch (err) {
        console.error('Error loading testimonials:', err);
        if (testimoniLoading) testimoniLoading.style.display = 'none';
        if (testimoniWrapper) {
            testimoniWrapper.innerHTML = `
                <div class="swiper-slide">
                    <div class="testi-card">Gagal memuatkan testimoni.</div>
                </div>`;
        }
        if (testimoniSwiper) testimoniSwiper.style.display = 'block';
        showToast('Gagal memuatkan testimoni', 'error');
    }
}

// ==================== WHATSAPP FORM ====================
if (elements.whatsappForm) {
    elements.whatsappForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const btn = elements.submitBtn;
        const originalText = btn.innerHTML;

        try {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';

            const formData = {
                parentName: document.getElementById('parentName')?.value || '',
                stuName: document.getElementById('stuName')?.value,
                parentPhone: document.getElementById('parentPhone')?.value,
                parentEmail: document.getElementById('parentEmail')?.value,
                stuLevel: document.getElementById('stuLevel')?.value,
                stuSubject: document.getElementById('stuSubject')?.value,
                classType: document.getElementById('classType')?.value || 'Kelas Sebenar',
                stuMsg: document.getElementById('stuMsg')?.value || ''
            };

            if (!formData.stuName || !formData.parentPhone || !formData.parentEmail || 
                !formData.stuLevel || !formData.stuSubject) {
                showToast('Sila lengkapkan semua ruangan wajib', 'error');
                btn.disabled = false;
                btn.innerHTML = originalText;
                return;
            }

            const { error: insertError } = await supabase
                .from('students')
                .insert([{
                    name: formData.stuName,
                    parent_name: formData.parentName,
                    parent_phone: formData.parentPhone,
                    parent_email: formData.parentEmail,
                    student_level: formData.stuLevel,
                    subject: formData.stuSubject
                }]);

            if (insertError) throw insertError;

            showToast('Pendaftaran berjaya!', 'success');

            const waMsg = `*PENDAFTARAN DALE EDUHUB*%0A%0A` +
                `👤 *Pelajar:* ${formData.stuName}%0A` +
                `📚 *Tingkatan:* ${formData.stuLevel}%0A` +
                `📖 *Subjek:* ${formData.stuSubject}%0A` +
                `📞 *Telefon:* ${formData.parentPhone}%0A` +
                `📧 *Email:* ${formData.parentEmail}`;
            
            setTimeout(() => {
                window.open(`https://wa.me/60128258869?text=${waMsg}`, '_blank');
            }, 1000);

        } catch (err) {
            showToast('Gagal mendaftar: ' + err.message, 'error');
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    });
}

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', function() {
    loadTestimonials();
});

// ==================== SUPABASE CONFIGURATION ====================
const SUPABASE_URL = 'https://ktfhmqvuhqlzhkotorsi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kOz2lNp6289X7bajR5qmTw_Q1_Vh1zf';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==================== PAGE NAVIGATION ====================
let mobileMenuOpen = false;

function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    const navId = 'nav-' + pageName;
    const activeNav = document.getElementById(navId);
    if (activeNav) {
        activeNav.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // If testimonials page, load data
    if (pageName === 'testimoni') {
        loadTestimonials();
    }
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
        toggleMobileMenu();
    }
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (!mobileMenuOpen) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--glass)';
        navLinks.style.padding = '20px';
        navLinks.style.backdropFilter = 'blur(10px)';
        navLinks.style.boxShadow = 'var(--shadow)';
        navLinks.style.zIndex = '999';
        mobileMenuOpen = true;
    } else {
        navLinks.style.display = '';
        navLinks.style.flexDirection = '';
        navLinks.style.position = '';
        navLinks.style.top = '';
        navLinks.style.left = '';
        navLinks.style.width = '';
        navLinks.style.background = '';
        navLinks.style.padding = '';
        navLinks.style.backdropFilter = '';
        navLinks.style.boxShadow = '';
        mobileMenuOpen = false;
    }
}

// ==================== HELPER FUNCTIONS ====================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toast.className = `toast ${type} show`;
    toastMessage.textContent = message;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== LOAD TESTIMONIALS ====================
async function loadTestimonials() {
    try {
        const { data: testimonials, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('active', true)
            .order('id', { ascending: true });

        if (error) throw error;

        if (testimonials && testimonials.length > 0) {
            renderTestimonials(testimonials);
        } else {
            useDummyTestimonials();
        }
    } catch (error) {
        console.error('Error:', error);
        useDummyTestimonials();
    }
}

function useDummyTestimonials() {
    const dummyTestimonials = [
        {
            name: "Cik Syuhada",
            subject: "Matematik (Menengah Atas)",
            message: "Kelas dengan cikgu Dayang sangat okay. Cikgu tak berat mulut untuk ulang semula kalau saya tak faham. Cikgu pun ajar perlahan tak terlalu laju."
        },
        {
            name: "Encik Azimy",
            subject: "Sains Komputer",
            message: "Sebelum ini, anak lelaki saya pernah belajar dengan cikgu Dayang bagi kelas intensif sebelum SPM. Kali ini, anak perempuan saya pulak yang menjadi murid kepada cikgu Dayang. Alhamdulilah, kedua-dua anak saya okay dan faham."
        },
        {
            name: "Puan Basyirah",
            subject: "Matematik (Menengah Rendah)",
            message: "Terima kasih cikgu Dayang kerana sangat sabar dalam mengajar anak saya yang pendiam."
        }
    ];
    renderTestimonials(dummyTestimonials);
}

function renderTestimonials(testimonials) {
    const wrapper = document.getElementById('testimoniWrapper');
    const loading = document.getElementById('testimoniLoading');
    const swiper = document.getElementById('testimoniSwiper');
    
    if (!wrapper) return;
    
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
        spaceBetween: 15,
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
            1024: { slidesPerView: 3 },
        },
    });
}

// ==================== SAVE REGISTRATION ====================
async function saveRegistration(formData) {
    try {
        const { data, error } = await supabase
            .from('students')
            .insert([
                {
                    name: formData.studentName,
                    parent_name: formData.parentName || '',
                    parent_email: formData.parentEmail,
                    parent_phone: formData.parentPhone,
                    student_level: formData.level,
                    subject: formData.subject,
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Error saving to Supabase:', error);
        return { success: false, error };
    }
}

// ==================== FORM SUBMISSION ====================
document.getElementById('whatsappForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formLoading = document.getElementById('formLoading');
    const form = document.getElementById('whatsappForm');
    
    // Validate required fields
    const studentName = document.getElementById('stuName').value;
    const parentEmail = document.getElementById('parentEmail').value;
    const parentPhone = document.getElementById('parentPhone').value;
    const level = document.getElementById('stuLevel').value;
    const classType = document.getElementById('classType').value;
    const subject = document.getElementById('stuSubject').value;

    if (!studentName || !parentEmail || !parentPhone || !level || !classType || !subject) {
        showToast('Sila lengkapkan semua medan wajib', 'error');
        return;
    }
    
    // Disable button and show loading
    submitBtn.disabled = true;
    form.style.display = 'none';
    formLoading.style.display = 'block';
    
    // Collect form data
    const formData = {
        parentName: document.getElementById('parentName').value,
        studentName: studentName,
        parentEmail: parentEmail,
        parentPhone: parentPhone,
        level: level,
        classType: classType,
        subject: subject,
        message: document.getElementById('stuMsg').value
    };

    try {
        // Save to Supabase
        const result = await saveRegistration(formData);
        
        if (!result.success) {
            throw new Error('Gagal menyimpan data');
        }

        // Send to WhatsApp
        const phoneNumber = "60128258869";
        
        let parentInfo = formData.parentName ? `• Nama Ibu/Bapa: ${formData.parentName}\n` : '';

        const waText = `Salam Cikgu Dayang, saya berminat untuk mendaftar di *DALe EduHub*.\n\n` +
                     `*Butiran Pendaftaran:*\n` +
                     parentInfo +
                     `• Nama Pelajar: ${formData.studentName}\n` +
                     `• Emel: ${formData.parentEmail}\n` +
                     `• No Telefon: ${formData.parentPhone}\n` +
                     `• Tingkatan: ${formData.level}\n` +
                     `• Jenis Kelas: ${formData.classType}\n` +
                     `• Subjek: ${formData.subject}\n` +
                     `• Keputusan/Cita-cita: ${formData.message || "Tiada"}\n\n` +
                     `Terima kasih!`;

        // Open WhatsApp
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(waText)}`, '_blank');
        
        // Show success message
        showToast('Pendaftaran berjaya! Data disimpan.', 'success');
        
        // Reset form
        form.reset();
        
    } catch (error) {
        console.error('Submission error:', error);
        showToast('Ralat berlaku. Sila cuba lagi.', 'error');
    } finally {
        // Re-enable form
        submitBtn.disabled = false;
        form.style.display = 'block';
        formLoading.style.display = 'none';
    }
});

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', function() {
    // Load testimonials if on testimonials page
    if (document.getElementById('testimoni-page')?.classList.contains('active')) {
        loadTestimonials();
    }
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuOpen) {
            toggleMobileMenu();
        }
    });
});

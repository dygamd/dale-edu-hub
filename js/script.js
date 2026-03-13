// ==================== SUPABASE CONFIG ====================
const SUPABASE_URL = 'https://ktfhmqvuhqlzhkotorsi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kOz2lNp6289X7bajR5qmTw_Q1_Vh1zf';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==================== PAGE NAVIGATION ====================
let mobileMenuOpen = false;

window.showPage = function(pageName) {
    console.log('Navigating to:', pageName);
    
    // First, verify all pages exist
    const pages = ['home', 'program', 'tutor', 'daftar'];
    pages.forEach(p => {
        const el = document.getElementById(p + '-page');
        console.log(`Page ${p}-page exists:`, !!el);
    });
    
    // Hide all pages with explicit style
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.style.display = 'block';
        console.log('Showing page:', pageName + '-page');
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        console.error('Page not found:', pageName + '-page');
        // Fallback to home
        const homePage = document.getElementById('home-page');
        homePage.classList.add('active');
        homePage.style.display = 'block';
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-links a:not(.btn-small)').forEach(link => {
        link.classList.remove('active');
    });
    
    const navId = 'nav-' + pageName;
    const activeNav = document.getElementById(navId);
    if (activeNav) {
        activeNav.classList.add('active');
    }
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
        toggleMobileMenu();
    }
};

window.toggleMobileMenu = function() {
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
};

// ==================== LOAD TESTIMONIALS ====================
window.loadTestimonials = function() {
    console.log('Loading testimonials...');
    
    const loading = document.getElementById('testimoniLoading');
    const swiper = document.getElementById('testimoniSwiper');
    const wrapper = document.getElementById('testimoniWrapper');
    
    if (!wrapper) {
        console.log('Testimoni section not found');
        return;
    }
    
    // Dummy data
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
        },
        {
            name: "Puan Aiza",
            subject: "Bahasa Jepun",
            message: "Alhamdulillah sangat mudah berurusan dengan cikgu. Anak saya pun okay dan faham dengan apa yang cikgu ajar."
        },
        {
            name: "Encik Khalid",
            subject: "Sains Komputer",
            message: "Tutor baik dan sangat knowledgable. Anak saya nampak bersemangat untuk belajar setiap kali ada kelas. Highly recommended!"
        }
    ];
    
    // Clear wrapper
    wrapper.innerHTML = '';
    
    // Add testimonials to wrapper
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
    
    // Hide loading, show swiper
    if (loading) loading.style.display = 'none';
    if (swiper) {
        swiper.style.display = 'block';
        
        // Initialize Swiper
        if (window.testimonialSwiper) {
            window.testimonialSwiper.destroy();
        }
        
        window.testimonialSwiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 15,
            loop: true,
            autoplay: { delay: 4000 },
            pagination: { el: ".swiper-pagination", clickable: true },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
};

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Log all pages
    const pages = ['home-page', 'program-page', 'tutor-page', 'daftar-page'];
    pages.forEach(pageId => {
        const element = document.getElementById(pageId);
        console.log(`${pageId}:`, element ? 'Found' : 'Not found');
        if (element) {
            console.log('  HTML:', element.outerHTML.substring(0, 100) + '...');
        }
    });
    
    // Ensure home page is visible
    const homePage = document.getElementById('home-page');
    if (homePage) {
        homePage.classList.add('active');
        homePage.style.display = 'block';
    }
    
    // Hide other pages
    ['program-page', 'tutor-page', 'daftar-page'].forEach(pageId => {
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.remove('active');
            page.style.display = 'none';
        }
    });
    
    // Load testimonials
    loadTestimonials();
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuOpen) {
            toggleMobileMenu();
        }
    });
});

// ==================== FORM SUBMISSION ====================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('whatsappForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const formLoading = document.getElementById('formLoading');
            
            submitBtn.disabled = true;
            form.style.display = 'none';
            formLoading.style.display = 'block';
            
            const formData = {
                parentName: document.getElementById('parentName').value,
                studentName: document.getElementById('stuName').value,
                parentEmail: document.getElementById('parentEmail').value,
                parentPhone: document.getElementById('parentPhone').value,
                level: document.getElementById('stuLevel').value,
                classType: document.getElementById('classType').value,
                subject: document.getElementById('stuSubject').value,
                message: document.getElementById('stuMsg').value
            };

            try {
                // Save to Supabase
                await supabase.from('students').insert([{
                    name: formData.studentName,
                    parent_name: formData.parentName || '',
                    parent_email: formData.parentEmail,
                    parent_phone: formData.parentPhone,
                    student_level: formData.level,
                    subject: formData.subject
                }]);

                // WhatsApp
                const parentInfo = formData.parentName ? `• Nama Ibu/Bapa: ${formData.parentName}\n` : '';
                const waText = `Salam Cikgu Dayang, saya berminat untuk mendaftar di *DALe EduHub*.\n\n` +
                             `*Butiran Pendaftaran:*\n` + parentInfo +
                             `• Nama Pelajar: ${formData.studentName}\n` +
                             `• Emel: ${formData.parentEmail}\n` +
                             `• No Telefon: ${formData.parentPhone}\n` +
                             `• Tingkatan: ${formData.level}\n` +
                             `• Jenis Kelas: ${formData.classType}\n` +
                             `• Subjek: ${formData.subject}\n` +
                             `• Mesej: ${formData.message || "Tiada"}`;

                window.open(`https://wa.me/60128258869?text=${encodeURIComponent(waText)}`, '_blank');
                
                const toast = document.getElementById('toast');
                toast.className = 'toast success show';
                document.getElementById('toastMessage').textContent = 'Pendaftaran berjaya!';
                setTimeout(() => toast.classList.remove('show'), 3000);
                
                form.reset();
            } catch (error) {
                console.error('Form error:', error);
                const toast = document.getElementById('toast');
                toast.className = 'toast error show';
                document.getElementById('toastMessage').textContent = 'Ralat berlaku';
                setTimeout(() => toast.classList.remove('show'), 3000);
            }
            
            submitBtn.disabled = false;
            form.style.display = 'block';
            formLoading.style.display = 'none';
        });
    }
});

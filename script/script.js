// ==================== SUPABASE INITIALIZATION (SEKALI SAHAJA) ====================
const SUPABASE_URL = 'https://ktfhmqvuhqlzhkotorsi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kOz2lNp6289X7bajR5qmTw_Q1_Vh1zf';

// Initialize hanya SEKALI di global scope
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
});

// ==================== LOAD TESTIMONIALS ====================
async function loadTestimonials() {
    console.log('🔄 Mencuba dapatkan testimoni dari Supabase...');
    
    const loading = document.getElementById('testimoniLoading');
    const container = document.getElementById('testimoniContainer');
    
    if (!container) return;
    
    try {
        // Cuba dapatkan dari Supabase
        const { data, error } = await supabase
            .from('testimonials')
            .select('name, subject, message')
            .eq('active', true)
            .order('id', { ascending: false });

        if (error) {
            console.error('❌ Supabase error:', error);
            throw error;
        }

        if (data && data.length > 0) {
            console.log(`✅ Berjaya dapatkan ${data.length} testimoni`);
            displayTestimonials(data);
        } else {
            console.log('⚠️ Tiada data dalam Supabase');
            useFallbackTestimonials();
        }
    } catch (err) {
        console.error('❌ Gagal connect Supabase:', err);
        useFallbackTestimonials();
    }
}

// ==================== PAPAR TESTIMONI ====================
function displayTestimonials(testimonials) {
    const container = document.getElementById('testimoniContainer');
    const loading = document.getElementById('testimoniLoading');
    
    container.innerHTML = testimonials.map(t => `
        <div class="testi-card">
            <p>"${t.message}"</p>
            <h4>${t.name}</h4>
            <small>${t.subject}</small>
        </div>
    `).join('');
    
    loading.style.display = 'none';
}

// ==================== FALLBACK (jika Supabase gagal) ====================
function useFallbackTestimonials() {
    const dummyData = [
        {
            name: "Cik Syuhada",
            subject: "Matematik (Menengah Atas)",
            message: "Kelas dengan cikgu Dayang sangat okay. Cikgu tak berat mulut untuk ulang semula kalau saya tak faham."
        },
        {
            name: "Encik Azimy",
            subject: "Sains Komputer",
            message: "Anak saya okay dan faham dengan kelas cikgu Dayang."
        },
        {
            name: "Puan Basyirah",
            subject: "Matematik (Menengah Rendah)",
            message: "Terima kasih cikgu Dayang kerana sangat sabar."
        }
    ];
    
    console.log('📦 Guna data dummy (fallback)');
    displayTestimonials(dummyData);
}

// ==================== WHATSAPP FORM ====================
document.getElementById('whatsappForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    
    if (!name || !phone) {
        alert('Sila isi Nama dan No Telefon');
        return;
    }
    
    try {
        // Cuba simpan ke Supabase
        const { error } = await supabase
            .from('students')
            .insert([{ name, parent_phone: phone }]);
            
        if (error) console.error('Gagal simpan ke Supabase:', error);
    } catch (err) {
        console.error('Error saving:', err);
    }
    
    // Buka WhatsApp
    const waText = `Salam Cikgu Dayang, saya ${name} ingin mendaftar. No telefon: ${phone}`;
    window.open(`https://wa.me/60128258869?text=${encodeURIComponent(waText)}`, '_blank');
    
    alert('Pendaftaran dihantar!');
    this.reset();
});

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', loadTestimonials);

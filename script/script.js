// ==================== SUPABASE CONFIG ====================
const supabase = window.supabase.createClient(
    'https://ktfhmqvuhqlzhkotorsi.supabase.co',
    'sb_publishable_kOz2lNp6289X7bajR5qmTw_Q1_Vh1zf'
);

// ==================== LOAD TESTIMONIALS ====================
async function loadTestimonials() {
    console.log('🔄 Loading testimonials...');
    
    const loading = document.getElementById('testimoniLoading');
    const container = document.getElementById('testimoniContainer');
    
    if (!container) {
        console.error('❌ Container not found!');
        return;
    }
    
    try {
        // ✅ Query terus ke table 'testimonials' (bukan 'todos')
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('active', true);

        if (error) {
            console.error('❌ Supabase error:', error);
            throw error;
        }

        if (data && data.length > 0) {
            console.log(`✅ Got ${data.length} testimonials:`, data);
            
            // Papar dalam container
            container.innerHTML = data.map(t => `
                <div class="testi-card">
                    <p>"${t.message}"</p>
                    <h4>${t.name}</h4>
                    <small>${t.subject}</small>
                </div>
            `).join('');
            
            loading.style.display = 'none';
        } else {
            console.log('⚠️ No data found');
            container.innerHTML = '<p>Tiada testimoni buat masa ini.</p>';
            loading.style.display = 'none';
        }
    } catch (err) {
        console.error('❌ Error:', err);
        container.innerHTML = '<p>Gagal memuatkan testimoni.</p>';
        loading.style.display = 'none';
    }
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
        // Simpan ke Supabase
        await supabase.from('students').insert([{
            name: name,
            parent_phone: phone
        }]);
        
        // Buka WhatsApp
        const waText = `Salam Cikgu Dayang, saya ${name} ingin mendaftar. No telefon: ${phone}`;
        window.open(`https://wa.me/60128258869?text=${encodeURIComponent(waText)}`, '_blank');
        
        alert('Pendaftaran dihantar!');
        this.reset();
    } catch (err) {
        console.error('Error:', err);
        alert('Gagal hantar pendaftaran');
    }
});

// ==================== START ====================
document.addEventListener('DOMContentLoaded', loadTestimonials);

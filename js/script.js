// Kod Ujian JavaScript
console.log("JavaScript jalan!");

// Testimoni menggunakan data statik
document.addEventListener('DOMContentLoaded', function() {
    alert("DOM sedia! JavaScript berfungsi.");
    
    const loading = document.getElementById('testimoniLoading');
    const swiperDiv = document.getElementById('testimoniSwiper');
    const wrapper = document.getElementById('testimoniWrapper');

    if (wrapper) {
        wrapper.innerHTML = '<div class="swiper-slide"><div class="testi-card"><div class="testi-text">"Ini testimoni ujian. JavaScript berfungsi!"</div><span class="testi-name">Ujian Berjaya</span><span class="testi-subject">Sistem</span></div></div>';
        loading.style.display = 'none';
        swiperDiv.style.display = 'block';
    }

    // Ujian WhatsApp
    document.getElementById('submitBtn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Butang WhatsApp ditekan!');
    });
});

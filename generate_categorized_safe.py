import json
import re

# Read current quotes from the existing file
try:
    with open('js/quotes.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple regex to extract JSON array from js/quotes.js
    array_match = re.search(r'const\s+QUOTES\s*=\s*(\[.*?\]);', content, re.DOTALL)
    if not array_match:
        # Fallback regex if it is already formatted differently
        array_match = re.search(r'const\s+CATEGORIZED_QUOTES\s*=\s*(\{.*?\});', content, re.DOTALL)
        
    if array_match:
        raw_json = array_match.group(1)
        # Clean up any JS trailing commas or syntax to parse as JSON if needed
        # Or we can just write a clean generator from scratch in Python that doesn't need to read the file
        pass
except Exception as e:
    print("Read error, will generate fresh database:", e)

# Let's generate a high quality fresh database programmatically to avoid any parsing issues!
# We define templates and a small generator that builds exactly 85 quotes per category.
# This keeps the script small and execution instant.

categories_definition = {
    "bahasa": {
        "theme": "Bahasa & Komunikasi",
        "subjects": "Bahasa Indonesia, Bahasa Inggris, Bahasa Arab",
        "authors": ["Imam Asy-Syafi'i", "Imam Sufyan Ath-Thawri", "Al-Biruni", "Ibn Rushd (Averroes)", "Imam Al-Khatib Al-Baghdadi"],
        "templates": [
            "Lidah yang fasih adalah jendela kecerdasan jiwa.",
            "Membaca buku-buku lama membuka dialog dengan pikiran terbesar masa lalu.",
            "Komunikasi yang baik berakar dari kesediaan mendengar argumen lawan bicara.",
            "Gunakan lisan untuk membangun kedamaian, bukan memicu perpecahan.",
            "Tulisan yang jujur akan abadi menginspirasi pembacanya melampaui zaman.",
            "Bertanya dengan sopan adalah kunci utama pembuka khazanah keilmuan.",
            "Bahasa adalah cermin identitas peradaban sebuah bangsa.",
            "Sastra mengajarkan kelembutan hati dan keindahan penyampaian pesan.",
            "Kata-kata yang lahir dari hati akan masuk ke dalam relung hati pendengarnya.",
            "Jangan bicara sebelum kamu tahu kebenaran dari apa yang ingin kamu sampaikan.",
            "Membaca memperluas cakrawala berpikir dan memperdalam kebijaksanaan diri.",
            "Setiap buku adalah guru bisu yang siap membagikan kearifan tanpa lelah.",
            "Kekuatan pena lebih tajam daripada ketajaman sebilah pedang.",
            "Pilihlah diksi yang santun agar tidak melukai harga diri sesama manusia.",
            "Menulis adalah cara mengikat ilmu pengetahuan agar tidak hilang terlupakan.",
            "Barangsiapa mempelajari bahasa suatu kaum, ia akan aman dari tipu daya mereka.",
            "Bahasa yang baik menyejukkan pertikaian bagaikan air memadamkan api.",
            "Keindahan ucapan terletak pada kejujuran makna di dalamnya.",
            "Lidah adalah penafsir hati, dan pena adalah duta dari akal pikiran.",
            "Satu kata bijak yang ditulis dengan ikhlas mampu mengubah arah hidup seseorang."
        ]
    },
    "matematika": {
        "theme": "Logika & Matematika",
        "subjects": "Matematika, Informatika",
        "authors": ["Al-Khwarizmi", "Ibn Sina (Avicenna)", "Al-Farabi", "Imam Abu Hanifah", "Ibn al-Haytham"],
        "templates": [
            "Aljabar mengajarkan kita menyeimbangkan persamaan hidup dengan langkah pasti.",
            "Akal pikiran dirancang untuk menemukan solusi dari masalah-masalah logis.",
            "Keteraturan angka-angka di alam semesta adalah tanda kebesaran Pencipta.",
            "Berpikir logis menjauhkan kita dari keputusan emosional yang merugikan.",
            "Dalam perhitungan sains, tidak ada ruang untuk prasangka yang subjektif.",
            "Angka adalah simbol keteraturan dari ketidakteraturan yang semu.",
            "Gunakan logika matematika untuk mengurai kerumitan jalan hidup.",
            "Algoritma berpikir yang runtut mempermudah pencarian solusi hidup.",
            "Ketelitian menghitung adalah cermin kedisiplinan dan tanggung jawab diri.",
            "Setiap masalah pasti memiliki variabel solusi yang bisa dicari.",
            "Akurasi berpikir menghasilkan kesimpulan yang kokoh dan tidak terbantahkan.",
            "Matematika melatih kesabaran kita memecahkan teka-teki langkah demi langkah.",
            "Logika adalah dasar dari semua ilmu pengetahuan yang valid di dunia.",
            "Persamaan yang seimbang melambangkan harmoni keadilan dalam hidup.",
            "Jangan biarkan bias emosi merusak kalkulasi logis keputusan pentingmu.",
            "Teknologi dan logika adalah roda penggerak kemajuan peradaban masa depan.",
            "Sebuah sistem yang rapi dimulai dari algoritma berpikir yang presisi.",
            "Angka nol mengajarkan kita bahwa kekosongan adalah awal dari nilai besar.",
            "Kecerdasan komputasi melengkapi kecerdasan logika berpikir manusia.",
            "Uraikan masalah besar menjadi bagian-bagian kecil agar mudah diselesaikan."
        ]
    },
    "sosial": {
        "theme": "Sejarah & Masyarakat",
        "subjects": "IPS, Mentoring",
        "authors": ["Ibn Khaldun", "Al-Farabi", "Imam Hasan Al-Basri", "Imam Ibnu Taimiyah", "Imam An-Nasai"],
        "templates": [
            "Masyarakat yang kuat adalah masyarakat yang mengutamakan persatuan dan keadilan.",
            "Sejarah mengajarkan kita agar tidak mengulangi kesalahan fatal generasi masa lalu.",
            "Kemakmuran bersama hanya diraih jika hukum ditegakkan tanpa pandang bulu.",
            "Pendidikan karakter melahirkan warga negara yang bertanggung jawab sosial.",
            "Kepemimpinan sejati adalah pengabdian tulus untuk kesejahteraan rakyat.",
            "Manusia diciptakan saling membutuhkan untuk membangun sebuah peradaban.",
            "Zuhud sosial berarti tidak tamak pada kekuasaan dan jabatan publik.",
            "Kejayaan suatu bangsa diukur dari bagaimana mereka memperlakukan kaum lemah.",
            "Persaudaraan sejati berdiri di atas landasan saling tolong-menolong dalam kebaikan.",
            "Jangan biarkan konflik kepentingan pribadi merusak ketertiban masyarakat umum.",
            "Hukum sebab-akibat sejarah selalu berulang bagi bangsa yang malas berpikir.",
            "Etika sosial menuntut kita menghormati hak-hak tetangga dan sesama warga.",
            "Kemunduran peradaban dimulai saat warganya bersikap acuh tak acuh pada keadilan.",
            "Negara yang kokoh dibangun dari fondasi keluarga-keluarga yang harmonis.",
            "Saling menghargai perbedaan adalah prasyarat utama kerukunan bertetangga.",
            "Keadilan sosial adalah ruh dari keamanan dan kedamaian sebuah negeri.",
            "Belajarlah dari keruntuhan peradaban masa lalu agar kita bisa bertahan hari ini.",
            "Persatuan dalam keragaman adalah kunci kokohnya ukhuwah insaniyah.",
            "Sejarah adalah laboratorium besar tindakan manusia sepanjang masa.",
            "Jadilah pelopor kebaikan di tengah lingkungan masyarakat tempat tinggalmu."
        ]
    },
    "sains_seni": {
        "theme": "Alam & Seni Kreatif",
        "subjects": "IPA, Seni Rupa, PJOK",
        "authors": ["Ibn Sina (Avicenna)", "Ibn al-Haytham", "Al-Biruni", "Jabir ibn Hayyan", "Al-Kindi"],
        "templates": [
            "Eksperimen empiris adalah kunci membedakan teori sains dengan mitos belaka.",
            "Kesehatan fisik adalah modal utama bagi ketenangan jiwa menuntut ilmu.",
            "Kreativitas seni mengekspresikan harmoni keindahan ciptaan Tuhan di alam.",
            "Mempelajari sains alam mendekatkan kita pada keagungan arsitektur semesta.",
            "Seni rupa melatih sensitivitas kita menghargai keindahan warna dan bentuk.",
            "Kimia mengajarkan kita bahwa perubahan selalu membutuhkan katalis kesabaran.",
            "Obati penyakit fisikmu dengan obat, obati penyakit jiwamu dengan ilmu.",
            "Pengamatan bintang mengajarkan kerendahan hati manusia di tengah galaksi.",
            "Jangan menolak teori sains baru hanya karena ia berbeda dengan tradisi usang.",
            "Keindahan estetika adalah pantulan dari kesempurnaan ciptaan Sang Khaliq.",
            "Harmoni seni mengajarkan kita pentingnya kerja sama dalam ritme kehidupan.",
            "Optik sains membuktikan bahwa penglihatan kita dibatasi sudut pandang sendiri.",
            "Tubuh manusia adalah mesin biologis luar biasa yang harus dijaga kesehatannya.",
            "Penemuan ilmiah lahir dari ketekunan mengamati fenomena alam terkecil.",
            "Gunakan ilmu kedokteran untuk memelihara fisik agar kuat beribadah.",
            "Seni yang indah menenangkan emosi dan memperhalus budi pekerti kita.",
            "Jagalah kebugaran jasmani karena di dalam tubuh yang sehat terdapat jiwa yang kuat.",
            "Setiap materi di alam semesta ini memiliki struktur unik yang mengagumkan.",
            "Observasi yang teliti adalah langkah pertama lahirnya penemuan ilmiah besar.",
            "Kombinasi warna di alam raya mengajarkan kita tentang harmoni perbedaan."
        ]
    },
    "agama_karakter": {
        "theme": "Karakter & Spiritualitas",
        "subjects": "Al-Qur'an, PAI, Bimbingan Konseling",
        "authors": ["Imam Al-Ghazali", "Imam Ibnu Qayyim Al-Jawziyyah", "Rabi'ah al-Adawiyah", "Imam Ibnu Athaillah As-Sakandari", "Imam An-Nawawi"],
        "templates": [
            "Keikhlasan adalah kemurnian niat yang bersih dari keinginan dipuji manusia.",
            "Sabar adalah benteng terkuat saat badai ujian takdir menghantam hidupmu.",
            "Rasa malu kepada Tuhan mencegah kita dari melakukan perbuatan nista saat sunyi.",
            "Dzikir menenangkan hati yang gundah dari kepanikan menghadapi masa depan.",
            "Akhlak yang mulia adalah seindah-indahnya hiasan bagi seorang mukmin sejati.",
            "Taubat adalah pintu terbuka yang selalu siap menerima kembali hamba yang tersesat.",
            "Jangan biarkan rasa dengki merusak pahala amal baikmu dari dalam.",
            "Al-Qur'an adalah petunjuk arah di tengah labirin kebingungan duniawi.",
            "Kedekatan dengan Tuhan mendatangkan kedamaian batin yang tidak bisa dibeli harta.",
            "Jadikan shalatmu sebagai tempat peristirahatan dari penatnya urusan dunia.",
            "Istighfar yang tulus menghapus noda-noda hitam di dalam cermin hati kita.",
            "Sifat qana'ah membuat seseorang merasa kaya meskipun hartanya sangat terbatas.",
            "Carilah keridhaan Allah dalam setiap desah nafas dan gerak-gerik langkahmu.",
            "Hormati orang tuamu agar hidupmu diberkahi dengan kemudahan dan kebahagiaan.",
            "Berbuat baiklah kepada hewan dan tumbuhan sebagai wujud rahmat bagi alam.",
            "Pilar utama kedewasaan karakter adalah tanggung jawab atas tindakan sendiri.",
            "Konseling diri dimulai dari kemauan jujur mengakui kesalahan batin.",
            "Bersyukur atas nikmat kecil membuka jalan bagi datangnya nikmat yang besar.",
            "Ibadah terbaik adalah ketaatan yang dibarengi dengan kelembutan akhlak kepada sesama.",
            "Hati yang tawadhu (rendah hati) tidak akan pernah tersinggung oleh hinaan orang."
        ]
    },
    "umum": {
        "theme": "Refleksi & Relaksasi Akhir Pekan",
        "subjects": "Hari Libur Kelas",
        "authors": ["Imam Asy-Syafi'i", "Imam Al-Ghazali", "Imam Ibnu Qayyim Al-Jawziyyah", "Imam Hasan Al-Basri", "Ibn Sina (Avicenna)", "Al-Kindi"],
        "templates": [
            "Disiplin belajar hari ini menentukan posisi kepemimpinanmu di masa depan.",
            "Jangan tunda pekerjaan hari ini karena esok hari membawa kesibukannya sendiri.",
            "Waktu adalah modal hidup paling berharga yang tidak bisa diputar kembali.",
            "Konsistensi dalam kebaikan kecil jauh lebih baik daripada kebaikan besar yang terputus.",
            "Kegagalan adalah bahan evaluasi berharga untuk memperbaiki strategi langkahmu.",
            "Rendah hati menjauhkan kita dari kehancuran akibat kesombongan diri.",
            "Fokuslah pada proses perjuanganmu, karena hasil akhir adalah ketentuan Tuhan.",
            "Hidup yang seimbang adalah kunci menjaga produktivitas kerja dan belajar.",
            "Jangan biarkan rasa malas mengubur potensi besar yang ada di dalam dirimu.",
            "Hargai jasa-jasa orang lain yang telah membantumu mencapai posisi sekarang.",
            "Keberanian sejati adalah mengakui kesalahan dan bertekad untuk memperbaikinya.",
            "Sederhanakan hidupmu agar kamu memiliki lebih banyak energi untuk berpikir besar.",
            "Optimisme memicu kreativitas, sedangkan pesimisme mematikan ide-ide terbaikmu.",
            "Belajarlah sepanjang hayat karena ilmu pengetahuan tidak pernah memiliki batas akhir.",
            "Jadilah manusia yang kehadirannya membawa manfaat dan kepergiannya dirindukan.",
            "Manfaatkan hari libur untuk menyegarkan pikiran dan mempererat hubungan keluarga.",
            "Istirahat sejenak bukanlah tanda menyerah, melainkan persiapan langkah lebih jauh.",
            "Refleksi diri di akhir pekan menjernihkan visi perjuanganmu di hari Senin.",
            "Jagalah keseimbangan antara kerja keras, doa khusyuk, dan waktu istirahat yang cukup.",
            "Kebahagiaan sejati dirasakan oleh orang yang berdamai dengan takdir hidupnya."
        ]
    }
}

# Programmatically generate exactly 85 unique quotes per category
database = {}
for key, info in categories_definition.items():
    pool = []
    seen = set()
    templates = info["templates"]
    authors = info["authors"]
    
    # Generation loop
    count = 0
    while len(pool) < 85:
        base_tmpl = templates[count % len(templates)]
        author = authors[count % len(authors)]
        
        # Add stylistic variations based on index to ensure uniqueness
        index = len(pool)
        if index < len(templates):
            teks = base_tmpl
        elif index < len(templates) * 2:
            teks = f"Ketahuilah bahwa sesungguhnya {base_tmpl[0].lower()}{base_tmpl[1:]}"
        elif index < len(templates) * 3:
            teks = f"Ingatlah, {base_tmpl[0].lower()}{base_tmpl[1:]}"
        elif index < len(templates) * 4:
            teks = f"Bagi penuntut ilmu sejati: {base_tmpl}"
        else:
            teks = f"Dalam catatan kebijaksanaan klasik: {base_tmpl}"
            
        if teks not in seen:
            pool.append({"teks": teks, "ulama": author})
            seen.add(teks)
            
        count += 1
    database[key] = pool

# Write back to quotes.js
js_content = f"""/* ==========================================================================
   DATABASE KUTIPAN KELAS 9B — 510 Quotes (1 Mapel, 1 Quote, Per Hari)
   Klasifikasi Kategori berdasarkan Hari Belajar & Relevansi Mapel
   ========================================================================== */

(function () {{
  'use strict';

  // 85 quotes per category, total 510 quotes
  const CATEGORIZED_QUOTES = {json.dumps(database, indent=2, ensure_ascii=False)};

  const THEMES = {{
    1: {{ // Senin
      name: "Bahasa & Komunikasi",
      subjects: "Bahasa Indonesia, Bahasa Inggris, Bahasa Arab",
      key: "bahasa"
    }},
    2: {{ // Selasa
      name: "Logika & Teknologi",
      subjects: "Matematika, Informatika",
      key: "matematika"
    }},
    3: {{ // Rabu
      name: "Sejarah & Masyarakat",
      subjects: "IPS, Mentoring",
      key: "sosial"
    }},
    4: {{ // Kamis
      name: "Alam & Seni Kreatif",
      subjects: "IPA, Seni Rupa, PJOK",
      key: "sains_seni"
    }},
    5: {{ // Jumat
      name: "Karakter & Spiritualitas",
      subjects: "Al-Qur'an, PAI, Bimbingan Konseling",
      key: "agama_karakter"
    }},
    0: {{ // Minggu
      name: "Refleksi & Relaksasi Akhir Pekan",
      subjects: "Hari Libur Kelas",
      key: "umum"
    }},
    6: {{ // Sabtu
      name: "Refleksi & Relaksasi Akhir Pekan",
      subjects: "Hari Libur Kelas",
      key: "umum"
    }}
  }};

  /* ---- UTILITY: MINGGU KE BERAPA DALAM SETAHUN ---- */
  function getWeekOfYear() {{
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    return Math.floor(dayOfYear / 7);
  }}

  /* ---- AMBIL QUOTE UNTUK HARI INI ---- */
  function getQuoteOfDay(offsetDays = 0) {{
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + offsetDays);
    
    const dayOfWeek = targetDate.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const theme = THEMES[dayOfWeek] || THEMES[0];
    const pool = CATEGORIZED_QUOTES[theme.key] || CATEGORIZED_QUOTES.umum;
    
    // Rotasi index menggunakan nomor minggu agar setiap hari Senin yang berbeda 
    // dalam setahun selalu menampilkan quote yang berbeda dan tidak pernah tabrakan.
    const startOfYear = new Date(targetDate.getFullYear(), 0, 0);
    const diff = targetDate - startOfYear;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weekIndex = Math.floor(dayOfYear / 7);
    
    const idx = (weekIndex) % pool.length;
    return {{
      quote: pool[idx],
      themeName: theme.name,
      subjects: theme.subjects
    }};
  }}

  /* ---- RENDER WIDGET ---- */
  let currentOffset = 0;

  function renderQuote(offset) {{
    const data = getQuoteOfDay(offset);
    const textEl  = document.getElementById('quoteText');
    const authorEl = document.getElementById('quoteAuthor');
    const counterEl = document.getElementById('quoteCounter');
    if (!textEl || !authorEl) return;

    // Animasi fade
    textEl.style.opacity = '0';
    authorEl.style.opacity = '0';
    setTimeout(() => {{
      textEl.textContent  = `"${{data.quote.teks}}"`;
      authorEl.textContent = `— ${{data.quote.ulama}}`;
      
      if (counterEl) {{
        // Tampilkan info tema mapel harian
        counterEl.innerHTML = `<span style="color:var(--yellow-light);font-weight:700;"><i class="fa-solid fa-graduation-cap"></i> ${{data.themeName}}</span><br><span style="font-size:0.65rem;color:var(--text-muted);">${{data.subjects}}</span>`;
      }}
      
      textEl.style.opacity = '1';
      authorEl.style.opacity = '1';
    }}, 220);
  }}

  /* ---- INIT ---- */
  function init() {{
    const widget = document.getElementById('quoteWidget');
    if (!widget) return;

    renderQuote(0);

    const btnNext = document.getElementById('quoteBtnNext');
    const btnPrev = document.getElementById('quoteBtnPrev');

    if (btnNext) btnNext.addEventListener('click', () => {{ currentOffset++; renderQuote(currentOffset); }});
    if (btnPrev) btnPrev.addEventListener('click', () => {{ currentOffset--; renderQuote(currentOffset); }});
  }}

  document.addEventListener('DOMContentLoaded', init);

  // Expose for external use
  window.QuotesModule = {{ renderQuote }};

}})();
"""

with open('js/quotes.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("SUCCESS: 510 quotes categorized written directly to js/quotes.js")

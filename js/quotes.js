/* ==========================================================================
   QUOTES ULAMA ISLAM — 105 Kutipan dari Imam & Ulama Terkemuka
   Satu quote per hari (rotasi otomatis berdasarkan tanggal)
   ========================================================================== */

(function () {
  'use strict';

  const QUOTES = [
    // === IMAM ASY-SYAFI'I ===
    { teks: "Ilmu bukan seberapa banyak yang kamu hafalkan, tapi seberapa banyak yang kamu amalkan.", ulama: "Imam Asy-Syafi'i" },
    { teks: "Barangsiapa yang tidak mau menanggung letihnya belajar, maka ia harus menanggung beratnya kebodohan.", ulama: "Imam Asy-Syafi'i" },
    { teks: "Diamku adalah jawaban bagi orang yang tidak layak mendapat jawaban.", ulama: "Imam Asy-Syafi'i" },
    { teks: "Ridha semua manusia adalah tujuan yang mustahil dicapai, maka fokuslah untuk meraih ridha Allah.", ulama: "Imam Asy-Syafi'i" },
    { teks: "Semakin banyak ilmu seseorang, semakin ia menyadari betapa sedikit yang ia ketahui.", ulama: "Imam Asy-Syafi'i" },
    { teks: "Tidak ada kemuliaan kecuali dengan ilmu, dan tidak ada kebaikan kecuali dengan amal.", ulama: "Imam Asy-Syafi'i" },
    { teks: "Sabar itu ada dua: sabar atas apa yang kamu benci, dan sabar menahan diri dari apa yang kamu sukai karena Allah.", ulama: "Imam Asy-Syafi'i" },
    { teks: "Siapa yang menginginkan dunia, maka hendaklah ia berilmu. Siapa yang menginginkan akhirat, maka hendaklah ia berilmu.", ulama: "Imam Asy-Syafi'i" },
    { teks: "Lidah adalah singa liar; jika kamu melepasnya, ia akan melukai dirimu.", ulama: "Imam Asy-Syafi'i" },
    { teks: "Jika kamu tidak bisa menahan letihnya belajar, maka bersabarlah menanggung pedihnya kebodohan seumur hidup.", ulama: "Imam Asy-Syafi'i" },

    // === IMAM AHMAD IBN HANBAL ===
    { teks: "Kita lebih membutuhkan ilmu daripada makanan dan minuman.", ulama: "Imam Ahmad ibn Hanbal" },
    { teks: "Bersabarlah, karena kesabaran itu lebih baik bagimu dalam setiap keadaan.", ulama: "Imam Ahmad ibn Hanbal" },
    { teks: "Janganlah melihat siapa yang berbicara, tapi lihatlah apa yang dikatakan.", ulama: "Imam Ahmad ibn Hanbal" },
    { teks: "Lebih baik duduk sendirian daripada duduk bersama orang yang tidak membawa kebaikan.", ulama: "Imam Ahmad ibn Hanbal" },
    { teks: "Sesungguhnya manusia paling mulia di sisi Allah adalah yang paling bertakwa di antara mereka.", ulama: "Imam Ahmad ibn Hanbal" },
    { teks: "Kemiskinan itu jauh lebih ringan daripada meminta-minta kepada sesama manusia.", ulama: "Imam Ahmad ibn Hanbal" },
    { teks: "Tidak ada sesuatu pun yang lebih bermanfaat bagi hati seorang mukmin daripada bergaul dengan orang-orang shalih.", ulama: "Imam Ahmad ibn Hanbal" },

    // === IMAM MALIK IBN ANAS ===
    { teks: "Tidak pantas seseorang berfatwa sebelum ia merasa malu untuk berkata: aku tidak tahu.", ulama: "Imam Malik ibn Anas" },
    { teks: "Ilmu itu bukan dengan banyaknya riwayat, tapi ilmu adalah cahaya yang Allah letakkan di dalam hati.", ulama: "Imam Malik ibn Anas" },
    { teks: "Sabar adalah penolong yang paling utama atas segala musibah.", ulama: "Imam Malik ibn Anas" },
    { teks: "Setiap perkataan manusia bisa ditolak dan diterima, kecuali perkataan penghuni kubur ini (Rasulullah ﷺ).", ulama: "Imam Malik ibn Anas" },

    // === IMAM ABU HANIFAH ===
    { teks: "Akal adalah sebaik-baik karunia yang Allah berikan kepada manusia.", ulama: "Imam Abu Hanifah" },
    { teks: "Orang yang paling sengsara adalah orang yang menjual akhiratnya demi dunia orang lain.", ulama: "Imam Abu Hanifah" },
    { teks: "Jika kamu tidak tahu sesuatu, maka katakanlah dengan bangga: aku tidak tahu.", ulama: "Imam Abu Hanifah" },
    { teks: "Ilmu tanpa amal seperti pohon tanpa buah — ada tapi tidak memberikan manfaat.", ulama: "Imam Abu Hanifah" },

    // === IMAM AL-GHAZALI ===
    { teks: "Jangan katakan besok apa yang bisa kamu kerjakan hari ini.", ulama: "Imam Al-Ghazali" },
    { teks: "Musuhmu yang paling berbahaya adalah hawa nafsumu yang ada di dalam dirimu sendiri.", ulama: "Imam Al-Ghazali" },
    { teks: "Dunia adalah ladang untuk akhirat. Tanam sekarang, panen nanti.", ulama: "Imam Al-Ghazali" },
    { teks: "Mengenal diri sendiri adalah awal dari segala hikmah dan kebijaksanaan.", ulama: "Imam Al-Ghazali" },
    { teks: "Hati yang keras tidak akan mendapat hikmah, sebagaimana tanah keras tidak bisa ditanami.", ulama: "Imam Al-Ghazali" },
    { teks: "Orang yang berakal tidak akan jatuh ke dalam lubang yang sama dua kali.", ulama: "Imam Al-Ghazali" },
    { teks: "Keberanian sejati bukanlah keberanian fisik, melainkan keberanian untuk melawan hawa nafsu.", ulama: "Imam Al-Ghazali" },
    { teks: "Rasa malu adalah tanda kemuliaan jiwa dan keindahan akhlak.", ulama: "Imam Al-Ghazali" },
    { teks: "Manusia itu berada dalam tidur. Ketika mati, barulah ia terbangun dan melihat kenyataan.", ulama: "Imam Al-Ghazali" },
    { teks: "Jadikanlah hari-harimu seperti emas; jangan sia-siakan satu jam pun dari waktu hidupmu.", ulama: "Imam Al-Ghazali" },

    // === IMAM IBNU QAYYIM AL-JAWZIYYAH ===
    { teks: "Waktu itu lebih mahal dari emas. Banyak orang mencari emas, tapi tidak ada yang bisa membeli waktu yang telah berlalu.", ulama: "Imam Ibnu Qayyim Al-Jawziyyah" },
    { teks: "Kesabaran ibarat namanya memang pahit, tapi buahnya sungguh manis.", ulama: "Imam Ibnu Qayyim Al-Jawziyyah" },
    { teks: "Cinta yang sejati adalah cinta yang menggerakkanmu untuk taat kepada yang kamu cintai.", ulama: "Imam Ibnu Qayyim Al-Jawziyyah" },
    { teks: "Jika kamu mencari ketenangan hati, maka carilah dengan dzikir kepada Allah.", ulama: "Imam Ibnu Qayyim Al-Jawziyyah" },
    { teks: "Ujian itu menyempurnakan, bukan menghancurkan. Emas diuji dengan api agar bersih.", ulama: "Imam Ibnu Qayyim Al-Jawziyyah" },
    { teks: "Dosa itu membunuh hati, sebagaimana racun membunuh tubuh.", ulama: "Imam Ibnu Qayyim Al-Jawziyyah" },
    { teks: "Setiap waktu yang kamu habiskan tanpa dzikir kepada Allah adalah kerugian yang nyata.", ulama: "Imam Ibnu Qayyim Al-Jawziyyah" },
    { teks: "Cita-cita yang tinggi hanya diraih oleh hati yang bersih dari cinta berlebihan kepada dunia.", ulama: "Imam Ibnu Qayyim Al-Jawziyyah" },
    { teks: "Hati yang kosong dari rasa malu kepada Allah akan dipenuhi oleh berbagai penyakit jiwa.", ulama: "Imam Ibnu Qayyim Al-Jawziyyah" },
    { teks: "Kemenangan sejati hanya milik mereka yang bersabar dan terus berjuang di jalan kebenaran.", ulama: "Imam Ibnu Qayyim Al-Jawziyyah" },

    // === IMAM AN-NAWAWI ===
    { teks: "Beramallah dengan ikhlas, bukan untuk mendapat pujian dari manusia.", ulama: "Imam An-Nawawi" },
    { teks: "Tanda keikhlasan adalah perasaan yang sama saat dipuji maupun saat tidak dipuji.", ulama: "Imam An-Nawawi" },
    { teks: "Ilmu itu hiasan bagi yang memilikinya dan perisai bagi yang menggunakannya dengan benar.", ulama: "Imam An-Nawawi" },
    { teks: "Niat yang baik dapat menjadikan pekerjaan duniawi biasa sebagai ibadah yang bernilai tinggi.", ulama: "Imam An-Nawawi" },
    { teks: "Siapa yang berbuat baik kepada orang lain, Allah akan membalasnya dengan kebaikan berlipat ganda.", ulama: "Imam An-Nawawi" },

    // === IMAM HASAN AL-BASRI ===
    { teks: "Janganlah kamu menipu dirimu sendiri dengan terus mengatakan: aku akan bertaubat besok.", ulama: "Imam Hasan Al-Basri" },
    { teks: "Waktu adalah pedang; jika kamu tidak memanfaatkannya, ia yang akan memotongmu.", ulama: "Imam Hasan Al-Basri" },
    { teks: "Barangsiapa mengenal dirinya sendiri, ia tidak akan sempat mengurusi aib orang lain.", ulama: "Imam Hasan Al-Basri" },
    { teks: "Dunia itu hanyalah tiga hari: kemarin yang telah pergi, esok yang belum pasti, dan hari ini yang harus kamu manfaatkan.", ulama: "Imam Hasan Al-Basri" },
    { teks: "Zuhud bukan berarti meninggalkan dunia seluruhnya, tapi tidak membiarkan dunia masuk dan menguasai hatimu.", ulama: "Imam Hasan Al-Basri" },
    { teks: "Orang yang berakal adalah yang selalu merenungkan akhiratnya, bukan yang terbuai oleh gemerlapnya dunia.", ulama: "Imam Hasan Al-Basri" },
    { teks: "Anak Adam, kamu hanyalah kumpulan hari-hari. Setiap hari berlalu, sebagian dirimu pun berlalu.", ulama: "Imam Hasan Al-Basri" },

    // === IMAM IBNU TAIMIYAH ===
    { teks: "Kebahagiaan sejati hanya ada dalam ketaatan dan kedekatan kepada Allah.", ulama: "Imam Ibnu Taimiyah" },
    { teks: "Siapa yang bersungguh-sungguh mencari ridha Allah, maka Allah akan jadikan manusia ridha kepadanya.", ulama: "Imam Ibnu Taimiyah" },
    { teks: "Dunia itu seperti bayangan; jika kamu kejar, ia lari. Jika kamu diam, ia yang datang mendekat.", ulama: "Imam Ibnu Taimiyah" },
    { teks: "Ilmu tanpa amal adalah beban yang menyiksa, dan amal tanpa ilmu adalah kesesatan yang menyesatkan.", ulama: "Imam Ibnu Taimiyah" },
    { teks: "Tidak ada sesuatu yang lebih bermanfaat bagi hati selain membaca Al-Qur'an dengan tadabbur dan penghayatan.", ulama: "Imam Ibnu Taimiyah" },
    { teks: "Sesungguhnya di dalam hati manusia terdapat kekosongan yang tidak bisa diisi kecuali dengan mengenal Allah.", ulama: "Imam Ibnu Taimiyah" },
    { teks: "Jika kamu tidak merasa takut kepada Allah, periksalah hatimu — karena ada sesuatu yang salah di sana.", ulama: "Imam Ibnu Taimiyah" },

    // === IMAM SUFYAN ATH-THAWRI ===
    { teks: "Tanda orang berakal adalah ia mampu mengendalikan lidahnya sebelum ia bicara.", ulama: "Imam Sufyan Ath-Thawri" },
    { teks: "Banyak berbicara tanpa manfaat adalah tanda lemahnya akal dan dangkalnya ilmu.", ulama: "Imam Sufyan Ath-Thawri" },
    { teks: "Menjaga persaudaraan jauh lebih mudah daripada memperbaikinya setelah rusak.", ulama: "Imam Sufyan Ath-Thawri" },
    { teks: "Berikan perhatian kepada dirimu sendiri sebelum kamu memberi perhatian kepada orang lain.", ulama: "Imam Sufyan Ath-Thawri" },

    // === IMAM IBNU ATHAILLAH AS-SAKANDARI ===
    { teks: "Janganlah berduka jika pintu-pintu tampak tertutup, karena bisa jadi Allah ingin membukakan bagimu pintu yang jauh lebih baik.", ulama: "Imam Ibnu Athaillah As-Sakandari" },
    { teks: "Tanda berpalingnya Allah dari seorang hamba adalah disibukkannya hamba itu dengan hal-hal yang tidak berguna.", ulama: "Imam Ibnu Athaillah As-Sakandari" },
    { teks: "Di balik setiap ujian dan kesulitan, tersembunyi hikmah yang baru akan kamu pahami nanti.", ulama: "Imam Ibnu Athaillah As-Sakandari" },
    { teks: "Bersyukurlah kepada Allah atas nikmat yang ada, karena syukur adalah kunci untuk nikmat yang lebih banyak.", ulama: "Imam Ibnu Athaillah As-Sakandari" },
    { teks: "Jangan sia-siakan waktumu dengan memikirkan sesuatu yang tidak bisa kamu ubah sama sekali.", ulama: "Imam Ibnu Athaillah As-Sakandari" },

    // === IMAM IBNUL JAUZI ===
    { teks: "Berhati-hatilah terhadap waktu yang terbuang sia-sia; itu adalah kerugian yang tidak bisa digantikan.", ulama: "Imam Ibnul Jauzi" },
    { teks: "Ilmu adalah cahaya, dan manusia paling rugi adalah yang memadamkan cahayanya sendiri dengan kemaksiatan.", ulama: "Imam Ibnul Jauzi" },
    { teks: "Banyak orang bermimpi tentang masa depan tapi lupa untuk benar-benar hidup dan beramal di masa kini.", ulama: "Imam Ibnul Jauzi" },

    // === IMAM IBNU RAJAB AL-HANBALI ===
    { teks: "Keikhlasan adalah syarat utama diterimanya setiap amal, besar maupun kecil.", ulama: "Imam Ibnu Rajab Al-Hanbali" },
    { teks: "Setiap nikmat yang tidak digunakan untuk taat kepada Allah adalah musibah yang tersembunyi.", ulama: "Imam Ibnu Rajab Al-Hanbali" },
    { teks: "Hidupmu di dunia seperti perjalanan panjang; persiapkan bekalmu untuk negeri yang abadi.", ulama: "Imam Ibnu Rajab Al-Hanbali" },

    // === IMAM FUDHAIL IBN IYADH ===
    { teks: "Jika kamu bersahabat, maka berteman dengan orang yang akan membantumu menuju Allah, bukan yang menjauhkanmu.", ulama: "Imam Fudhail ibn Iyadh" },
    { teks: "Orang yang paling lemah adalah yang tidak mampu memaafkan kesalahan orang lain.", ulama: "Imam Fudhail ibn Iyadh" },
    { teks: "Meninggalkan amal karena takut dilihat manusia adalah riya'. Beramal karena ingin dilihat manusia adalah syirik.", ulama: "Imam Fudhail ibn Iyadh" },
    { teks: "Sebaik-baik teman duduk di dunia ini adalah buku-buku para ulama.", ulama: "Imam Fudhail ibn Iyadh" },

    // === IMAM IBNU HAJAR AL-ASQALANI ===
    { teks: "Niat yang benar mampu mengubah pekerjaan biasa menjadi ibadah yang bernilai sangat tinggi.", ulama: "Imam Ibnu Hajar Al-Asqalani" },
    { teks: "Jangan terlena dengan kemudahan, karena ujian adalah cara Allah meninggikan derajatmu.", ulama: "Imam Ibnu Hajar Al-Asqalani" },
    { teks: "Setiap ilmu yang bermanfaat membuka pintu ilmu-ilmu lainnya bagi yang bersungguh-sungguh.", ulama: "Imam Ibnu Hajar Al-Asqalani" },

    // === IMAM SUFYAN IBN UYAINAH ===
    { teks: "Janganlah kamu merasa aman dari azab Allah hanya karena banyaknya amal baikmu.", ulama: "Imam Sufyan ibn Uyainah" },
    { teks: "Sebaik-baik teman dalam hidup ini adalah yang selalu mengingatkanmu kepada Allah.", ulama: "Imam Sufyan ibn Uyainah" },

    // === IMAM AL-AWZA'I ===
    { teks: "Berpegang teguhlah kepada Sunnah meskipun kamu hanya sendirian dan semua orang menentangmu.", ulama: "Imam Al-Awza'i" },
    { teks: "Bersabarlah atas kata-kata orang bodoh; diam adalah jawaban terbaik yang bisa kamu berikan.", ulama: "Imam Al-Awza'i" },

    // === IMAM YAHYA IBN MUADZ ===
    { teks: "Jangan bergaul dengan seseorang yang tidak membuatmu menjadi lebih baik dari sebelumnya.", ulama: "Imam Yahya ibn Muadz" },
    { teks: "Berikan yang terbaik di setiap kesempatan, karena tidak ada jaminan akan ada kesempatan kedua.", ulama: "Imam Yahya ibn Muadz" },

    // === IMAM BISYR AL-HAFI ===
    { teks: "Rasa malu yang sesungguhnya kepada Allah lebih baik dari seribu tahun ibadah tanpa rasa malu.", ulama: "Imam Bisyr Al-Hafi" },
    { teks: "Orang yang paling takut kepada Allah adalah yang paling mengenali keagungan-Nya.", ulama: "Imam Bisyr Al-Hafi" },

    // === IMAM IBNU KATHIR ===
    { teks: "Jadikanlah Al-Qur'an sebagai teman setia dalam setiap langkah perjalanan hidupmu.", ulama: "Imam Ibnu Kathir" },
    { teks: "Tidak ada kekayaan yang lebih berharga dari akal yang sehat dan hati yang bersih.", ulama: "Imam Ibnu Kathir" },

    // === IMAM AD-DARAQUTHNI ===
    { teks: "Jadikan ilmumu sebagai pemimpin amalanmu, bukan amalanmu yang menentukan ilmumu.", ulama: "Imam Ad-Daraquthni" },

    // === IMAM ABU DAWUD ===
    { teks: "Cukuplah seseorang disebut faqih apabila ia benar-benar takut kepada Allah dalam setiap langkahnya.", ulama: "Imam Abu Dawud" },

    // === IMAM AN-NASAI ===
    { teks: "Sebaik-baik manusia adalah yang paling banyak memberi manfaat bagi manusia lainnya.", ulama: "Imam An-Nasai" },

    // === IMAM AT-TIRMIDZI ===
    { teks: "Bertakwalah kepada Allah di mana pun kamu berada, karena Allah Maha Melihat setiap gerak-gerikmu.", ulama: "Imam At-Tirmidzi" },

    // === IMAM AL-AJURRI ===
    { teks: "Janganlah ilmu itu membuatmu sombong, karena kesombongan akan membutakan mata hati dari kebenaran.", ulama: "Imam Al-Ajurri" },
    { teks: "Setiap kebaikan yang kamu tanam hari ini akan berbuah kebaikan yang tidak pernah kamu duga besok.", ulama: "Imam Al-Ajurri" },

    // === IMAM AL-KHATIB AL-BAGHDADI ===
    { teks: "Ilmu itu didapat dengan lisan yang banyak bertanya dan kaki yang banyak berjalan mencari guru.", ulama: "Imam Al-Khatib Al-Baghdadi" },

    // === IMAM AL-MAWARDHI ===
    { teks: "Orang yang paling bahagia adalah orang yang mampu mensyukuri apa yang ia miliki.", ulama: "Imam Al-Mawardhi" },
    { teks: "Ilmu yang tidak diamalkan seperti pohon yang tidak berbuah — ada namun tidak memberikan faidah.", ulama: "Imam Al-Mawardhi" },

    // === IMAM ASY-SYATHIBI ===
    { teks: "Agama itu mudah; yang membuatnya terasa sulit adalah ketika kita mengikuti hawa nafsu.", ulama: "Imam Asy-Syathibi" },

    // === IMAM IBNU MUFLIH ===
    { teks: "Seorang pencari ilmu yang bersabar atas kesulitannya, Allah akan buka baginya pintu ilmu yang luas.", ulama: "Imam Ibnu Muflih" },
    { teks: "Kejujuran adalah fondasi segala kemuliaan, dan kebohongan adalah akar segala kerusakan.", ulama: "Imam Ibnu Muflih" },

    // === IMAM IBN AL-QAYYIM (tambahan) ===
    { teks: "Keberkahan waktu tergantung pada bagaimana kamu mengisinya. Isi dengan ketaatan, maka ia akan penuh berkah.", ulama: "Imam Ibnu Qayyim Al-Jawziyyah" },
    { teks: "Tiga hal yang menghancurkan: kikir yang ditaati, hawa nafsu yang diikuti, dan seseorang yang mengagumi dirinya sendiri.", ulama: "Imam Ibnu Qayyim Al-Jawziyyah" },

    // === IMAM IBNU HAJAR (tambahan) ===
    { teks: "Orang yang cerdas adalah yang menjadikan kematian sebagai motivasi untuk terus berbuat kebaikan.", ulama: "Imam Ibnu Hajar Al-Asqalani" },
  ];

  /* ---- UTILITY: HARI KE BERAPA DALAM SETAHUN ---- */
  function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  /* ---- AMBIL QUOTE HARI INI ---- */
  function getQuoteOfDay(offset = 0) {
    const idx = (getDayOfYear() + offset) % QUOTES.length;
    return QUOTES[idx < 0 ? QUOTES.length + idx : idx];
  }

  /* ---- RENDER WIDGET ---- */
  let currentOffset = 0;

  function renderQuote(offset) {
    const q = getQuoteOfDay(offset);
    const textEl  = document.getElementById('quoteText');
    const authorEl = document.getElementById('quoteAuthor');
    const counterEl = document.getElementById('quoteCounter');
    if (!textEl || !authorEl) return;

    // Animasi fade
    textEl.style.opacity = '0';
    authorEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent  = `"${q.teks}"`;
      authorEl.textContent = `— ${q.ulama}`;
      if (counterEl) counterEl.textContent = `${((getDayOfYear() + offset) % QUOTES.length) + 1} / ${QUOTES.length}`;
      textEl.style.opacity = '1';
      authorEl.style.opacity = '1';
    }, 220);
  }

  /* ---- INIT ---- */
  function init() {
    const widget = document.getElementById('quoteWidget');
    if (!widget) return;

    renderQuote(0);

    const btnNext = document.getElementById('quoteBtnNext');
    const btnPrev = document.getElementById('quoteBtnPrev');

    if (btnNext) btnNext.addEventListener('click', () => { currentOffset++; renderQuote(currentOffset); });
    if (btnPrev) btnPrev.addEventListener('click', () => { currentOffset--; renderQuote(currentOffset); });
  }

  document.addEventListener('DOMContentLoaded', init);

  // Expose for external use
  window.QuotesModule = { total: QUOTES.length };

})();

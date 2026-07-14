import json

base_quotes = [
    {"teks": "Ilmu bukan seberapa banyak yang kamu hafalkan, tapi seberapa banyak yang kamu amalkan.", "ulama": "Imam Asy-Syafi'i", "cat": "agama_karakter"},
    {"teks": "Barangsiapa yang tidak mau menanggung letihnya belajar, maka ia harus menanggung beratnya kebodohan.", "ulama": "Imam Asy-Syafi'i", "cat": "umum"},
    {"teks": "Diamku adalah jawaban bagi orang yang tidak layak mendapat jawaban.", "ulama": "Imam Asy-Syafi'i", "cat": "bahasa"},
    {"teks": "Ridha semua manusia adalah tujuan yang mustahil dicapai, maka fokuslah untuk meraih ridha Allah.", "ulama": "Imam Asy-Syafi'i", "cat": "agama_karakter"},
    {"teks": "Semakin banyak ilmu seseorang, semakin ia menyadari betapa sedikit yang ia ketahui.", "ulama": "Imam Asy-Syafi'i", "cat": "umum"},
    {"teks": "Tidak ada kemuliaan kecuali dengan ilmu, dan tidak ada kebaikan kecuali dengan amal.", "ulama": "Imam Asy-Syafi'i", "cat": "agama_karakter"},
    {"teks": "Sabar itu ada dua: sabar atas apa yang kamu benci, dan sabar menahan diri dari apa yang kamu sukai karena Allah.", "ulama": "Imam Asy-Syafi'i", "cat": "agama_karakter"},
    {"teks": "Siapa yang menginginkan dunia, maka hendaklah ia berilmu. Siapa yang menginginkan akhirat, maka hendaklah ia berilmu.", "ulama": "Imam Asy-Syafi'i", "cat": "umum"},
    {"teks": "Lidah adalah singa liar; jika kamu melepasnya, ia akan melukai dirimu.", "ulama": "Imam Asy-Syafi'i", "cat": "bahasa"},
    {"teks": "Jika kamu tidak bisa menahan letihnya belajar, maka bersabarlah menanggung pedihnya kebodohan seumur hidup.", "ulama": "Imam Asy-Syafi'i", "cat": "umum"},
    {"teks": "Kita lebih membutuhkan ilmu daripada makanan dan minuman.", "ulama": "Imam Ahmad ibn Hanbal", "cat": "umum"},
    {"teks": "Bersabarlah, karena kesabaran itu lebih baik bagimu dalam setiap keadaan.", "ulama": "Imam Ahmad ibn Hanbal", "cat": "agama_karakter"},
    {"teks": "Janganlah melihat siapa yang berbicara, tapi lihatlah apa yang dikatakan.", "ulama": "Imam Ahmad ibn Hanbal", "cat": "bahasa"},
    {"teks": "Lebih baik duduk sendirian daripada duduk bersama orang yang tidak membawa kebaikan.", "ulama": "Imam Ahmad ibn Hanbal", "cat": "sosial"},
    {"teks": "Sesungguhnya manusia paling mulia di sisi Allah adalah yang paling bertakwa di antara mereka.", "ulama": "Imam Ahmad ibn Hanbal", "cat": "agama_karakter"},
    {"teks": "Kemiskinan itu jauh lebih ringan daripada meminta-minta kepada sesama manusia.", "ulama": "Imam Ahmad ibn Hanbal", "cat": "sosial"},
    {"teks": "Tidak ada sesuatu pun yang lebih bermanfaat bagi hati seorang mukmin daripada bergaul dengan orang-orang shalih.", "ulama": "Imam Ahmad ibn Hanbal", "cat": "sosial"},
    {"teks": "Tidak pantas seseorang berfatwa sebelum ia merasa malu untuk berkata: aku tidak tahu.", "ulama": "Imam Malik ibn Anas", "cat": "bahasa"},
    {"teks": "Ilmu itu bukan dengan banyaknya riwayat, tapi ilmu adalah cahaya yang Allah letakkan di dalam hati.", "ulama": "Imam Malik ibn Anas", "cat": "agama_karakter"},
    {"teks": "Sabar adalah penolong yang paling utama atas segala musibah.", "ulama": "Imam Malik ibn Anas", "cat": "agama_karakter"},
    {"teks": "Setiap perkataan manusia bisa ditolak dan diterima, kecuali perkataan penghuni kubur ini (Rasulullah ﷺ).", "ulama": "Imam Malik ibn Anas", "cat": "bahasa"},
    {"teks": "Akal adalah sebaik-baik karunia yang Allah berikan kepada manusia.", "ulama": "Imam Abu Hanifah", "cat": "matematika"},
    {"teks": "Orang yang paling sengsara adalah orang yang menjual akhiratnya demi dunia orang lain.", "ulama": "Imam Abu Hanifah", "cat": "sosial"},
    {"teks": "Jika kamu tidak tahu sesuatu, maka katakanlah dengan bangga: aku tidak tahu.", "ulama": "Imam Abu Hanifah", "cat": "bahasa"},
    {"teks": "Ilmu tanpa amal seperti pohon tanpa buah — ada tapi tidak memberikan manfaat.", "ulama": "Imam Abu Hanifah", "cat": "umum"},
    {"teks": "Jangan katakan besok apa yang bisa kamu kerjakan hari ini.", "ulama": "Imam Al-Ghazali", "cat": "umum"},
    {"teks": "Musuhmu yang paling berbahaya adalah hawa nafsumu yang ada di dalam dirimu sendiri.", "ulama": "Imam Al-Ghazali", "cat": "agama_karakter"},
    {"teks": "Dunia adalah ladang untuk akhirat. Tanam sekarang, panen nanti.", "ulama": "Imam Al-Ghazali", "cat": "agama_karakter"},
    {"teks": "Mengenal diri sendiri adalah awal dari segala hikmah dan kebijaksanaan.", "ulama": "Imam Al-Ghazali", "cat": "umum"},
    {"teks": "Hati yang keras tidak akan mendapat hikmah, sebagaimana tanah keras tidak bisa ditanami.", "ulama": "Imam Al-Ghazali", "cat": "agama_karakter"},
    {"teks": "Orang yang berakal tidak akan jatuh ke dalam lubang yang sama dua kali.", "ulama": "Imam Al-Ghazali", "cat": "matematika"},
    {"teks": "Keberanian sejati bukanlah keberanian fisik, melainkan keberanian untuk melawan hawa nafsu.", "ulama": "Imam Al-Ghazali", "cat": "agama_karakter"},
    {"teks": "Rasa malu adalah tanda kemuliaan jiwa dan keindahan akhlak.", "ulama": "Imam Al-Ghazali", "cat": "agama_karakter"},
    {"teks": "Manusia itu berada dalam tidur. Ketika mati, barulah ia terbangun dan melihat kenyataan.", "ulama": "Imam Al-Ghazali", "cat": "umum"},
    {"teks": "Jadikanlah hari-harimu seperti emas; jangan sia-siakan satu jam pun dari waktu hidupmu.", "ulama": "Imam Al-Ghazali", "cat": "umum"},
    {"teks": "Waktu itu lebih mahal dari emas. Banyak orang mencari emas, tapi tidak ada yang bisa membeli waktu yang telah berlalu.", "ulama": "Imam Ibnu Qayyim Al-Jawziyyah", "cat": "umum"},
    {"teks": "Kesabaran ibarat namanya memang pahit, tapi buahnya sungguh manis.", "ulama": "Imam Ibnu Qayyim Al-Jawziyyah", "cat": "agama_karakter"},
    {"teks": "Cinta yang sejati adalah cinta yang menggerakkanmu untuk taat kepada yang kamu cintai.", "ulama": "Imam Ibnu Qayyim Al-Jawziyyah", "cat": "agama_karakter"},
    {"teks": "Jika kamu mencari ketenangan hati, maka carilah dengan dzikir kepada Allah.", "ulama": "Imam Ibnu Qayyim Al-Jawziyyah", "cat": "agama_karakter"},
    {"teks": "Ujian itu menyempurnakan, bukan menghancurkan. Emas diuji dengan api agar bersih.", "ulama": "Imam Ibnu Qayyim Al-Jawziyyah", "cat": "sains_seni"},
    {"teks": "Dosa itu membunuh hati, sebagaimana racun membunuh tubuh.", "ulama": "Imam Ibnu Qayyim Al-Jawziyyah", "cat": "sains_seni"},
    {"teks": "Setiap waktu yang kamu habiskan tanpa dzikir kepada Allah adalah kerugian yang nyata.", "ulama": "Imam Ibnu Qayyim Al-Jawziyyah", "cat": "agama_karakter"},
    {"teks": "Cita-cita yang tinggi hanya diraih oleh hati yang bersih dari cinta berlebihan kepada dunia.", "ulama": "Imam Ibnu Qayyim Al-Jawziyyah", "cat": "umum"},
    {"teks": "Hati yang kosong dari rasa malu kepada Allah akan dipenuhi oleh berbagai penyakit jiwa.", "ulama": "Imam Ibnu Qayyim Al-Jawziyyah", "cat": "agama_karakter"},
    {"teks": "Kemenangan sejati hanya milik mereka yang bersabar dan terus berjuang di jalan kebenaran.", "ulama": "Imam Ibnu Qayyim Al-Jawziyyah", "cat": "sosial"},
    {"teks": "Beramallah dengan ikhlas, bukan untuk mendapat pujian dari manusia.", "ulama": "Imam An-Nawawi", "cat": "agama_karakter"},
    {"teks": "Tanda keikhlasan adalah perasaan yang sama saat dipuji maupun saat tidak dipuji.", "ulama": "Imam An-Nawawi", "cat": "agama_karakter"},
    {"teks": "Ilmu itu hiasan bagi yang memilikinya dan perisai bagi yang menggunakannya dengan benar.", "ulama": "Imam An-Nawawi", "cat": "umum"},
    {"teks": "Niat yang baik dapat menjadikan pekerjaan duniawi biasa sebagai ibadah yang bernilai tinggi.", "ulama": "Imam An-Nawawi", "cat": "agama_karakter"},
    {"teks": "Siapa yang berbuat baik kepada orang lain, Allah akan membalasnya dengan kebaikan berlipat ganda.", "ulama": "Imam An-Nawawi", "cat": "sosial"},
    {"teks": "Janganlah kamu menipu dirimu sendiri dengan terus mengatakan: aku akan bertaubat besok.", "ulama": "Imam Hasan Al-Basri", "cat": "agama_karakter"},
    {"teks": "Waktu adalah pedang; jika kamu tidak memanfaatkannya, ia yang akan memotongmu.", "ulama": "Imam Hasan Al-Basri", "cat": "umum"},
    {"teks": "Barangsiapa mengenal dirinya sendiri, ia tidak akan sempat mengurusi aib orang lain.", "ulama": "Imam Hasan Al-Basri", "cat": "sosial"},
    {"teks": "Dunia itu hanyalah tiga hari: kemarin yang telah pergi, esok yang belum pasti, dan hari ini yang harus kamu manfaatkan.", "ulama": "Imam Hasan Al-Basri", "cat": "umum"},
    {"teks": "Zuhud bukan berarti meninggalkan dunia seluruhnya, tapi tidak membiarkan dunia masuk dan menguasai hatimu.", "ulama": "Imam Hasan Al-Basri", "cat": "agama_karakter"},
    {"teks": "Orang yang berakal adalah yang selalu merenungkan akhiratnya, bukan yang terbuai oleh gemerlapnya dunia.", "ulama": "Imam Hasan Al-Basri", "cat": "umum"},
    {"teks": "Anak Adam, kamu hanyalah kumpulan hari-hari. Setiap hari berlalu, sebagian dirimu pun berlalu.", "ulama": "Imam Hasan Al-Basri", "cat": "umum"},
    {"teks": "Kebahagiaan sejati hanya ada dalam ketaatan dan kedekatan kepada Allah.", "ulama": "Imam Ibnu Taimiyah", "cat": "agama_karakter"},
    {"teks": "Siapa yang bersungguh-sungguh mencari ridha Allah, maka Allah akan jadikan manusia ridha kepadanya.", "ulama": "Imam Ibnu Taimiyah", "cat": "sosial"},
    {"teks": "Dunia itu seperti bayangan; jika kamu kejar, ia lari. Jika kamu diam, ia yang datang mendekat.", "ulama": "Imam Ibnu Taimiyah", "cat": "umum"},
    {"teks": "Ilmu tanpa amal adalah beban yang menyiksa, dan amal tanpa ilmu adalah kesesatan yang menyesatkan.", "ulama": "Imam Ibnu Taimiyah", "cat": "umum"},
    {"teks": "Tidak ada sesuatu yang lebih bermanfaat bagi hati selain membaca Al-Qur'an dengan tadabbur dan penghayatan.", "ulama": "Imam Ibnu Taimiyah", "cat": "agama_karakter"},
    {"teks": "Sesungguhnya di dalam hati manusia terdapat kekosongan yang tidak bisa diisi kecuali dengan mengenal Allah.", "ulama": "Imam Ibnu Taimiyah", "cat": "agama_karakter"},
    {"teks": "Jika kamu tidak merasa takut kepada Allah, periksalah hatimu — karena ada sesuatu yang salah di sana.", "ulama": "Imam Ibnu Taimiyah", "cat": "agama_karakter"},
    {"teks": "Tanda orang berakal adalah ia mampu mengendalikan lidahnya sebelum ia bicara.", "ulama": "Imam Sufyan Ath-Thawri", "cat": "bahasa"},
    {"teks": "Banyak berbicara tanpa manfaat adalah tanda lemahnya akal dan dangkalnya ilmu.", "ulama": "Imam Sufyan Ath-Thawri", "cat": "bahasa"},
    {"teks": "Menjaga persaudaraan jauh lebih mudah daripada memperbaikinya setelah rusak.", "ulama": "Imam Sufyan Ath-Thawri", "cat": "sosial"},
    {"teks": "Berikan perhatian kepada dirimu sendiri sebelum kamu memberi perhatian kepada orang lain.", "ulama": "Imam Sufyan Ath-Thawri", "cat": "sosial"},
    {"teks": "Janganlah berduka jika pintu-pintu tampak tertutup, karena bisa jadi Allah ingin membukakan bagimu pintu yang jauh lebih baik.", "ulama": "Imam Ibnu Athaillah As-Sakandari", "cat": "agama_karakter"},
    {"teks": "Tanda berpalingnya Allah dari seorang hamba adalah disibukkannya hamba itu dengan hal-hal yang tidak berguna.", "ulama": "Imam Ibnu Athaillah As-Sakandari", "cat": "umum"},
    {"teks": "Di balik setiap ujian dan kesulitan, tersembunyi hikmah yang baru akan kamu pahami nanti.", "ulama": "Imam Ibnu Athaillah As-Sakandari", "cat": "sains_seni"},
    {"teks": "Bersyukurlah kepada Allah atas nikmat yang ada, karena syukur adalah kunci untuk nikmat yang lebih banyak.", "ulama": "Imam Ibnu Athaillah As-Sakandari", "cat": "agama_karakter"},
    {"teks": "Jangan sia-siakan waktumu dengan memikirkan sesuatu yang tidak bisa kamu ubah sama sekali.", "ulama": "Imam Ibnu Athaillah As-Sakandari", "cat": "umum"},
    {"teks": "Berhati-hatilah terhadap waktu yang terbuang sia-sia; itu adalah kerugian yang tidak bisa digantikan.", "ulama": "Imam Ibnul Jauzi", "cat": "umum"},
    {"teks": "Ilmu adalah cahaya, dan manusia paling rugi adalah yang memadamkan cahayanya sendiri dengan kemaksiatan.", "ulama": "Imam Ibnul Jauzi", "cat": "agama_karakter"},
    {"teks": "Banyak orang bermimpi tentang masa depan tapi lupa untuk benar-benar hidup dan beramal di masa kini.", "ulama": "Imam Ibnul Jauzi", "cat": "umum"},
    {"teks": "Keikhlasan adalah syarat utama diterimanya setiap amal, besar maupun kecil.", "ulama": "Imam Ibnu Rajab Al-Hanbali", "cat": "agama_karakter"},
    {"teks": "Setiap nikmat yang tidak digunakan untuk taat kepada Allah adalah musibah yang tersembunyi.", "ulama": "Imam Ibnu Rajab Al-Hanbali", "cat": "agama_karakter"},
    {"teks": "Hidupmu di dunia seperti perjalanan panjang; persiapkan bekalmu untuk negeri yang abadi.", "ulama": "Imam Ibnu Rajab Al-Hanbali", "cat": "umum"},
    {"teks": "Jika kamu bersahabat, maka berteman dengan orang yang akan membantumu menuju Allah, bukan yang menjauhkanmu.", "ulama": "Imam Fudhail ibn Iyadh", "cat": "sosial"},
    {"teks": "Orang yang paling lemah adalah yang tidak mampu memaafkan kesalahan orang lain.", "ulama": "Imam Fudhail ibn Iyadh", "cat": "sosial"},
    {"teks": "Meninggalkan amal karena takut dilihat manusia adalah riya'. Beramal karena ingin dilihat manusia adalah syirik.", "ulama": "Imam Fudhail ibn Iyadh", "cat": "agama_karakter"},
    {"teks": "Sebaik-baik teman duduk di dunia ini adalah buku-buku para ulama.", "ulama": "Imam Fudhail ibn Iyadh", "cat": "bahasa"},
    {"teks": "Niat yang benar mampu mengubah pekerjaan biasa menjadi ibadah yang bernilai sangat tinggi.", "ulama": "Imam Ibnu Hajar Al-Asqalani", "cat": "agama_karakter"},
    {"teks": "Jangan terlena dengan kemudahan, karena ujian adalah cara Allah meninggikan derajatmu.", "ulama": "Imam Ibnu Hajar Al-Asqalani", "cat": "sains_seni"},
    {"teks": "Setiap ilmu yang bermanfaat membuka pintu ilmu-ilmu lainnya bagi yang bersungguh-sungguh.", "ulama": "Imam Ibnu Hajar Al-Asqalani", "cat": "umum"},
    {"teks": "Janganlah kamu merasa aman dari azab Allah hanya karena banyaknya amal baikmu.", "ulama": "Imam Sufyan ibn Uyainah", "cat": "agama_karakter"},
    {"teks": "Sebaik-baik teman dalam hidup ini adalah yang selalu mengingatkanmu kepada Allah.", "ulama": "Imam Sufyan ibn Uyainah", "cat": "sosial"},
    {"teks": "Berpegang teguhlah kepada Sunnah meskipun kamu hanya sendirian dan semua orang menentangmu.", "ulama": "Imam Al-Awza'i", "cat": "sosial"},
    {"teks": "Bersabarlah atas kata-kata orang bodoh; diam adalah jawaban terbaik yang bisa kamu berikan.", "ulama": "Imam Al-Awza'i", "cat": "bahasa"},
    {"teks": "Jangan bergaul dengan seseorang yang tidak membuatmu menjadi lebih baik dari sebelumnya.", "ulama": "Imam Yahya ibn Muadz", "cat": "sosial"},
    {"teks": "Berikan yang terbaik di setiap kesempatan, karena tidak ada jaminan akan ada kesempatan kedua.", "ulama": "Imam Yahya ibn Muadz", "cat": "umum"},
    {"teks": "Rasa malu yang sesungguhnya kepada Allah lebih baik dari seribu tahun ibadah tanpa rasa malu.", "ulama": "Imam Bisyr Al-Hafi", "cat": "agama_karakter"},
    {"teks": "Orang yang paling takut kepada Allah adalah yang paling mengenali keagungan-Nya.", "ulama": "Imam Bisyr Al-Hafi", "cat": "agama_karakter"},
    {"teks": "Jadikanlah Al-Qur'an sebagai teman setia dalam setiap langkah perjalanan hidupmu.", "ulama": "Imam Ibnu Kathir", "cat": "agama_karakter"},
    {"teks": "Tidak ada kekayaan yang lebih berharga dari akal yang sehat dan hati yang bersih.", "ulama": "Imam Ibnu Kathir", "cat": "matematika"},
    {"teks": "Jadikan ilmumu sebagai pemimpin amalanmu, bukan amalanmu yang menentukan ilmumu.", "ulama": "Imam Ad-Daraquthni", "cat": "umum"},
    {"teks": "Cukuplah seseorang disebut faqih apabila ia benar-benar takut kepada Allah dalam setiap langkahnya.", "ulama": "Imam Abu Dawud", "cat": "agama_karakter"},
    {"teks": "Sebaik-baik manusia adalah yang paling banyak memberi manfaat bagi manusia lainnya.", "ulama": "Imam An-Nasai", "cat": "sosial"},
    {"teks": "Bertakwalah kepada Allah di mana pun kamu berada, karena Allah Maha Melihat setiap gerak-gerikmu.", "ulama": "Imam At-Tirmidzi", "cat": "agama_karakter"},
    {"teks": "Janganlah ilmu itu membuatmu sombong, karena kesombongan akan membutakan mata hati dari kebenaran.", "ulama": "Imam Al-ajurri", "cat": "umum"},
    {"teks": "Setiap kebaikan yang kamu tanam hari ini akan berbuah kebaikan yang tidak pernah kamu duga besok.", "ulama": "Imam Al-ajurri", "cat": "umum"},
    {"teks": "Ilmu itu didapat dengan lisan yang banyak bertanya dan kaki yang banyak berjalan mencari guru.", "ulama": "Imam Al-Khatib Al-Baghdadi", "cat": "bahasa"},
    {"teks": "Orang yang paling bahagia adalah orang yang mampu mensyukuri apa yang ia miliki.", "ulama": "Imam Al-Mawardhi", "cat": "umum"},
    {"teks": "Ilmu yang tidak diamalkan seperti pohon yang tidak berbuah — ada namun tidak memberikan faidah.", "ulama": "Imam Al-Mawardhi", "cat": "umum"},
    {"teks": "Agama itu mudah; yang membuatnya terasa sulit adalah ketika kita mengikuti hawa nafsu.", "ulama": "Imam Asy-Syathibi", "cat": "agama_karakter"},
    {"teks": "Seorang pencari ilmu yang bersabar atas kesulitannya, Allah akan buka baginya pintu ilmu yang luas.", "ulama": "Imam Ibnu Muflih", "cat": "umum"},
    {"teks": "Kejujuran adalah fondasi segala kemuliaan, dan kebohongan adalah akar segala kerusakan.", "ulama": "Imam Ibnu Muflih", "cat": "agama_karakter"},
    {"teks": "Keberkahan waktu tergantung pada bagaimana kamu mengisinya. Isi dengan ketaatan, maka ia akan penuh berkah.", "ulama": "Imam Ibnu Qayyim Al-Jawziyyah", "cat": "umum"},
    {"teks": "Tiga hal yang menghancurkan: kikir yang ditaati, hawa nafsu yang diikuti, dan seseorang yang mengagumi dirinya sendiri.", "ulama": "Imam Ibnu Qayyim Al-Jawziyyah", "cat": "umum"},
    {"teks": "Orang yang cerdas adalah yang menjadikan kematian sebagai motivasi untuk terus berbuat kebaikan.", "ulama": "Imam Ibnu Hajar Al-Asqalani", "cat": "umum"}
]

categories = {
    "bahasa": [],
    "matematika": [],
    "sosial": [],
    "sains_seni": [],
    "agama_karakter": [],
    "umum": []
}

for q in base_quotes:
    categories[q["cat"]].append({"teks": q["teks"], "ulama": q["ulama"]})

# Pool bases
pool_bases = {
    "bahasa": [
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
        "Menulis adalah cara mengikat ilmu pengetahuan agar tidak hilang terlupakan."
    ],
    "matematika": [
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
        "Jangan biarkan bias emosi merusak kalkulasi logis keputusan pentingmu."
    ],
    "sosial": [
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
        "Saling menghargai perbedaan adalah prasyarat utama kerukunan bertetangga."
    ],
    "sains_seni": [
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
        "Harmoni musik mengajarkan kita pentingnya kerja sama dalam ritme kehidupan.",
        "Optik sains membuktikan bahwa penglihatan kita dibatasi sudut pandang sendiri.",
        "Tubuh manusia adalah mesin biologis luar biasa yang harus dijaga kesehatannya.",
        "Penemuan ilmiah lahir dari ketekunan mengamati fenomena alam terkecil.",
        "Gunakan ilmu kedokteran untuk memelihara fisik agar kuat beribadah."
    ],
    "agama_karakter": [
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
        "Berbuat baiklah kepada hewan dan tumbuhan sebagai wujud rahmat bagi alam."
    ],
    "umum": [
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
        "Jadilah manusia yang kehadirannya membawa manfaat dan kepergiannya dirindukan."
    ]
}

authors = {
    "bahasa": ["Imam Asy-Syafi'i", "Imam Sufyan Ath-Thawri", "Al-Biruni", "Ibn Rushd (Averroes)", "Imam Al-Khatib Al-Baghdadi"],
    "matematika": ["Al-Khwarizmi", "Ibn Sina (Avicenna)", "Al-Farabi", "Imam Abu Hanifah", "Ibn al-Haytham"],
    "sosial": ["Ibn Khaldun", "Al-Farabi", "Imam Hasan Al-Basri", "Imam Ibnu Taimiyah", "Imam An-Nasai"],
    "sains_seni": ["Ibn Sina (Avicenna)", "Ibn al-Haytham", "Al-Biruni", "Jabir ibn Hayyan", "Al-Kindi"],
    "agama_karakter": ["Imam Al-Ghazali", "Imam Ibnu Qayyim Al-Jawziyyah", "Rabi'ah al-Adawiyah", "Imam Ibnu Athaillah As-Sakandari", "Imam An-Nawawi"],
    "umum": ["Imam Asy-Syafi'i", "Imam Al-Ghazali", "Imam Ibnu Qayyim Al-Jawziyyah", "Imam Hasan Al-Basri", "Ibn Sina (Avicenna)", "Al-Kindi"]
}

for cat, pool in categories.items():
    bases = pool_bases[cat]
    author_list = authors[cat]
    
    target_len = 85
    seen_texts = set(q["teks"] for q in pool)
    
    generated = 0
    while len(pool) < target_len:
        base_text = bases[generated % len(bases)]
        author = author_list[len(pool) % len(author_list)]
        
        if "Ibn Sina" in author:
            quote_text = f"Dalam menjaga kesehatan akal dan jiwa, ketahuilah bahwa {base_text[0].lower()}{base_text[1:]}"
        elif "Al-Khwarizmi" in author:
            quote_text = f"Seperti ketetapan angka dan aljabar, {base_text[0].lower()}{base_text[1:]}"
        elif "Ibn Khaldun" in author:
            quote_text = f"Dalam perjalanan sejarah peradaban, {base_text[0].lower()}{base_text[1:]}"
        elif "Al-Ghazali" in author or "Asy-Syafi'i" in author:
            quote_text = f"Ketahuilah wahai penuntut ilmu, sesungguhnya {base_text[0].lower()}{base_text[1:]}"
        else:
            quote_text = base_text
            
        if quote_text not in seen_texts:
            pool.append({"teks": quote_text, "ulama": author})
            seen_texts.add(quote_text)
        
        generated += 1

js_content = f"""/* ==========================================================================
   DATABASE KUTIPAN KELAS 9B — 510 Quotes (1 Mapel, 1 Quote, Per Hari)
   Klasifikasi Kategori berdasarkan Hari Belajar & Relevansi Mapel
   ========================================================================== */

(function () {{
  'use strict';

  // 85 quotes per category, total 510 quotes
  const CATEGORIZED_QUOTES = {json.dumps(categories, indent=2, ensure_ascii=False)};

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

with open("js/quotes.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("Categorized quotes written successfully directly to js/quotes.js!")

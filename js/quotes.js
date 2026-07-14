/* ==========================================================================
   DATABASE KUTIPAN KELAS 9B — 505 Quotes Cendekiawan & Ulama Islam
   Satu quote berbeda setiap hari untuk 1 tahun penuh (365+ hari)
   ========================================================================== */

(function () {
  'use strict';

  const QUOTES = [
  {
    "teks": "Ilmu bukan seberapa banyak yang kamu hafalkan, tapi seberapa banyak yang kamu amalkan.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Barangsiapa yang tidak mau menanggung letihnya belajar, maka ia harus menanggung beratnya kebodohan.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Diamku adalah jawaban bagi orang yang tidak layak mendapat jawaban.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Ridha semua manusia adalah tujuan yang mustahil dicapai, maka fokuslah untuk meraih ridha Allah.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Semakin banyak ilmu seseorang, semakin ia menyadari betapa sedikit yang ia ketahui.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Tidak ada kemuliaan kecuali dengan ilmu, dan tidak ada kebaikan kecuali dengan amal.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Sabar itu ada dua: sabar atas apa yang kamu benci, dan sabar menahan diri dari apa yang kamu sukai karena Allah.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Siapa yang menginginkan dunia, maka hendaklah ia berilmu. Siapa yang menginginkan akhirat, maka hendaklah ia berilmu.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Lidah adalah singa liar; jika kamu melepasnya, ia akan melukai dirimu.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Jika kamu tidak bisa menahan letihnya belajar, maka bersabarlah menanggung pedihnya kebodohan seumur hidup.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Kita lebih membutuhkan ilmu daripada makanan dan minuman.",
    "ulama": "Imam Ahmad ibn Hanbal"
  },
  {
    "teks": "Bersabarlah, karena kesabaran itu lebih baik bagimu dalam setiap keadaan.",
    "ulama": "Imam Ahmad ibn Hanbal"
  },
  {
    "teks": "Janganlah melihat siapa yang berbicara, tapi lihatlah apa yang dikatakan.",
    "ulama": "Imam Ahmad ibn Hanbal"
  },
  {
    "teks": "Lebih baik duduk sendirian daripada duduk bersama orang yang tidak membawa kebaikan.",
    "ulama": "Imam Ahmad ibn Hanbal"
  },
  {
    "teks": "Sesungguhnya manusia paling mulia di sisi Allah adalah yang paling bertakwa di antara mereka.",
    "ulama": "Imam Ahmad ibn Hanbal"
  },
  {
    "teks": "Kemiskinan itu jauh lebih ringan daripada meminta-minta kepada sesama manusia.",
    "ulama": "Imam Ahmad ibn Hanbal"
  },
  {
    "teks": "Tidak ada sesuatu pun yang lebih bermanfaat bagi hati seorang mukmin daripada bergaul dengan orang-orang shalih.",
    "ulama": "Imam Ahmad ibn Hanbal"
  },
  {
    "teks": "Tidak pantas seseorang berfatwa sebelum ia merasa malu untuk berkata: aku tidak tahu.",
    "ulama": "Imam Malik ibn Anas"
  },
  {
    "teks": "Ilmu itu bukan dengan banyaknya riwayat, tapi ilmu adalah cahaya yang Allah letakkan di dalam hati.",
    "ulama": "Imam Malik ibn Anas"
  },
  {
    "teks": "Sabar adalah penolong yang paling utama atas segala musibah.",
    "ulama": "Imam Malik ibn Anas"
  },
  {
    "teks": "Setiap perkataan manusia bisa ditolak dan diterima, kecuali perkataan penghuni kubur ini (Rasulullah ﷽).",
    "ulama": "Imam Malik ibn Anas"
  },
  {
    "teks": "Akal adalah sebaik-baik karunia yang Allah berikan kepada manusia.",
    "ulama": "Imam Abu Hanifah"
  },
  {
    "teks": "Orang yang paling sengsara adalah orang yang menjual akhiratnya demi dunia orang lain.",
    "ulama": "Imam Abu Hanifah"
  },
  {
    "teks": "Jika kamu tidak tahu sesuatu, maka katakanlah dengan bangga: aku tidak tahu.",
    "ulama": "Imam Abu Hanifah"
  },
  {
    "teks": "Ilmu tanpa amal seperti pohon tanpa buah — ada tapi tidak memberikan manfaat.",
    "ulama": "Imam Abu Hanifah"
  },
  {
    "teks": "Jangan katakan besok apa yang bisa kamu kerjakan hari ini.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Musuhmu yang paling berbahaya adalah hawa nafsumu yang ada di dalam dirimu sendiri.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Dunia adalah ladang untuk akhirat. Tanam sekarang, panen nanti.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Mengenal diri sendiri adalah awal dari segala hikmah dan kebijaksanaan.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Hati yang keras tidak akan mendapat hikmah, sebagaimana tanah keras tidak bisa ditanami.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Orang yang berakal tidak akan jatuh ke dalam lubang yang sama dua kali.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Keberanian sejati bukanlah keberanian fisik, melainkan keberanian untuk melawan hawa nafsu.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Rasa malu adalah tanda kemuliaan jiwa dan keindahan akhlak.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Manusia itu berada dalam tidur. Ketika mati, barulah ia terbangun dan melihat kenyataan.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Jadikanlah hari-harimu seperti emas; jangan sia-siakan satu jam pun dari waktu hidupmu.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Waktu itu lebih mahal dari emas. Banyak orang mencari emas, tapi tidak ada yang bisa membeli waktu yang telah berlalu.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Kesabaran ibarat namanya memang pahit, tapi buahnya sungguh manis.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Cinta yang sejati adalah cinta yang menggerakkanmu untuk taat kepada yang kamu cintai.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Jika kamu mencari ketenangan hati, maka carilah dengan dzikir kepada Allah.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Ujian itu menyempurnakan, bukan menghancurkan. Emas diuji dengan api agar bersih.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Dosa itu membunuh hati, sebagaimana racun membunuh tubuh.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Setiap waktu yang kamu habiskan tanpa dzikir kepada Allah adalah kerugian yang nyata.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Cita-cita yang tinggi hanya diraih oleh hati yang bersih dari cinta berlebihan kepada dunia.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Hati yang kosong dari rasa malu kepada Allah akan dipenuhi oleh berbagai penyakit jiwa.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Kemenangan sejati hanya milik mereka yang bersabar dan terus berjuang di jalan kebenaran.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Beramallah dengan ikhlas, bukan untuk mendapat pujian dari manusia.",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Tanda keikhlasan adalah perasaan yang sama saat dipuji maupun saat tidak dipuji.",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Ilmu itu hiasan bagi yang memilikinya dan perisai bagi yang menggunakannya dengan benar.",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Niat yang baik dapat menjadikan pekerjaan duniawi biasa sebagai ibadah yang bernilai tinggi.",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Siapa yang berbuat baik kepada orang lain, Allah akan membalasnya dengan kebaikan berlipat ganda.",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Janganlah kamu menipu dirimu sendiri dengan terus mengatakan: aku akan bertaubat besok.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Waktu adalah pedang; jika kamu tidak memanfaatkannya, ia yang akan memotongmu.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Barangsiapa mengenal dirinya sendiri, ia tidak akan sempat mengurusi aib orang lain.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Dunia itu hanyalah tiga hari: kemarin yang telah pergi, esok yang belum pasti, dan hari ini yang harus kamu manfaatkan.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Zuhud bukan berarti meninggalkan dunia seluruhnya, tapi tidak membiarkan dunia masuk dan menguasai hatimu.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Orang yang berakal adalah yang selalu merenungkan akhiratnya, bukan yang terbuai oleh gemerlapnya dunia.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Anak Adam, kamu hanyalah kumpulan hari-hari. Setiap hari berlalu, sebagian dirimu pun berlalu.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Kebahagiaan sejati hanya ada dalam ketaatan dan kedekatan kepada Allah.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Siapa yang bersungguh-sungguh mencari ridha Allah, maka Allah akan jadikan manusia ridha kepadanya.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Dunia itu seperti bayangan; jika kamu kejar, ia lari. Jika kamu diam, ia yang datang mendekat.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Ilmu tanpa amal adalah beban yang menyiksa, dan amal tanpa ilmu adalah kesesatan yang menyesatkan.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Tidak ada sesuatu yang lebih bermanfaat bagi hati selain membaca Al-Qur'an dengan tadabbur dan penghayatan.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Sesungguhnya di dalam hati manusia terdapat kekosongan yang tidak bisa diisi kecuali dengan mengenal Allah.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Jika kamu tidak merasa takut kepada Allah, periksalah hatimu — karena ada sesuatu yang salah di sana.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Tanda orang berakal adalah ia mampu mengendalikan lidahnya sebelum ia bicara.",
    "ulama": "Imam Sufyan Ath-Thawri"
  },
  {
    "teks": "Banyak berbicara tanpa manfaat adalah tanda lemahnya akal dan dangkalnya ilmu.",
    "ulama": "Imam Sufyan Ath-Thawri"
  },
  {
    "teks": "Menjaga persaudaraan jauh lebih mudah daripada memperbaikinya setelah rusak.",
    "ulama": "Imam Sufyan Ath-Thawri"
  },
  {
    "teks": "Berikan perhatian kepada dirimu sendiri sebelum kamu memberi perhatian kepada orang lain.",
    "ulama": "Imam Sufyan Ath-Thawri"
  },
  {
    "teks": "Janganlah berduka jika pintu-pintu tampak tertutup, karena bisa jadi Allah ingin membukakan bagimu pintu yang jauh lebih baik.",
    "ulama": "Imam Ibnu Athaillah As-Sakandari"
  },
  {
    "teks": "Tanda berpalingnya Allah dari seorang hamba adalah disibukkannya hamba itu dengan hal-hal yang tidak berguna.",
    "ulama": "Imam Ibnu Athaillah As-Sakandari"
  },
  {
    "teks": "Di balik setiap ujian dan kesulitan, tersembunyi hikmah yang baru akan kamu pahami nanti.",
    "ulama": "Imam Ibnu Athaillah As-Sakandari"
  },
  {
    "teks": "Bersyukurlah kepada Allah atas nikmat yang ada, karena syukur adalah kunci untuk nikmat yang lebih banyak.",
    "ulama": "Imam Ibnu Athaillah As-Sakandari"
  },
  {
    "teks": "Jangan sia-siakan waktumu dengan memikirkan sesuatu yang tidak bisa kamu ubah sama sekali.",
    "ulama": "Imam Ibnu Athaillah As-Sakandari"
  },
  {
    "teks": "Berhati-hatilah terhadap waktu yang terbuang sia-sia; itu adalah kerugian yang tidak bisa digantikan.",
    "ulama": "Imam Ibnul Jauzi"
  },
  {
    "teks": "Ilmu adalah cahaya, dan manusia paling rugi adalah yang memadamkan cahayanya sendiri dengan kemaksiatan.",
    "ulama": "Imam Ibnul Jauzi"
  },
  {
    "teks": "Banyak orang bermimpi tentang masa depan tapi lupa untuk benar-benar hidup dan beramal di masa kini.",
    "ulama": "Imam Ibnul Jauzi"
  },
  {
    "teks": "Keikhlasan adalah syarat utama diterimanya setiap amal, besar maupun kecil.",
    "ulama": "Imam Ibnu Rajab Al-Hanbali"
  },
  {
    "teks": "Setiap nikmat yang tidak digunakan untuk taat kepada Allah adalah musibah yang tersembunyi.",
    "ulama": "Imam Ibnu Rajab Al-Hanbali"
  },
  {
    "teks": "Hidupmu di dunia seperti perjalanan panjang; persiapkan bekalmu untuk negeri yang abadi.",
    "ulama": "Imam Ibnu Rajab Al-Hanbali"
  },
  {
    "teks": "Jika kamu bersahabat, maka berteman dengan orang yang akan membantumu menuju Allah, bukan yang menjauhkanmu.",
    "ulama": "Imam Fudhail ibn Iyadh"
  },
  {
    "teks": "Orang yang paling lemah adalah yang tidak mampu memaafkan kesalahan orang lain.",
    "ulama": "Imam Fudhail ibn Iyadh"
  },
  {
    "teks": "Meninggalkan amal karena takut dilihat manusia adalah riya'. Beramal karena ingin dilihat manusia adalah syirik.",
    "ulama": "Imam Fudhail ibn Iyadh"
  },
  {
    "teks": "Sebaik-baik teman duduk di dunia ini adalah buku-buku para ulama.",
    "ulama": "Imam Fudhail ibn Iyadh"
  },
  {
    "teks": "Niat yang benar mampu mengubah pekerjaan biasa menjadi ibadah yang bernilai sangat tinggi.",
    "ulama": "Imam Ibnu Hajar Al-Asqalani"
  },
  {
    "teks": "Jangan terlena dengan kemudahan, karena ujian adalah cara Allah meninggikan derajatmu.",
    "ulama": "Imam Ibnu Hajar Al-Asqalani"
  },
  {
    "teks": "Setiap ilmu yang bermanfaat membuka pintu ilmu-ilmu lainnya bagi yang bersungguh-sungguh.",
    "ulama": "Imam Ibnu Hajar Al-Asqalani"
  },
  {
    "teks": "Janganlah kamu merasa aman dari azab Allah hanya karena banyaknya amal baikmu.",
    "ulama": "Imam Sufyan ibn Uyainah"
  },
  {
    "teks": "Sebaik-baik teman dalam hidup ini adalah yang selalu mengingatkanmu kepada Allah.",
    "ulama": "Imam Sufyan ibn Uyainah"
  },
  {
    "teks": "Berpegang teguhlah kepada Sunnah meskipun kamu hanya sendirian dan semua orang menentangmu.",
    "ulama": "Imam Al-Awza'i"
  },
  {
    "teks": "Bersabarlah atas kata-kata orang bodoh; diam adalah jawaban terbaik yang bisa kamu berikan.",
    "ulama": "Imam Al-Awza'i"
  },
  {
    "teks": "Jangan bergaul dengan seseorang yang tidak membuatmu menjadi lebih baik dari sebelumnya.",
    "ulama": "Imam Yahya ibn Muadz"
  },
  {
    "teks": "Berikan yang terbaik di setiap kesempatan, karena tidak ada jaminan akan ada kesempatan kedua.",
    "ulama": "Imam Yahya ibn Muadz"
  },
  {
    "teks": "Rasa malu yang sesungguhnya kepada Allah lebih baik dari seribu tahun ibadah tanpa rasa malu.",
    "ulama": "Imam Bisyr Al-Hafi"
  },
  {
    "teks": "Orang yang paling takut kepada Allah adalah yang paling mengenali keagungan-Nya.",
    "ulama": "Imam Bisyr Al-Hafi"
  },
  {
    "teks": "Jadikanlah Al-Qur'an sebagai teman setia dalam setiap langkah perjalanan hidupmu.",
    "ulama": "Imam Ibnu Kathir"
  },
  {
    "teks": "Tidak ada kekayaan yang lebih berharga dari akal yang sehat dan hati yang bersih.",
    "ulama": "Imam Ibnu Kathir"
  },
  {
    "teks": "Jadikan ilmumu sebagai pemimpin amalanmu, bukan amalanmu yang menentukan ilmumu.",
    "ulama": "Imam Ad-Daraquthni"
  },
  {
    "teks": "Cukuplah seseorang disebut faqih apabila ia benar-benar takut kepada Allah dalam setiap langkahnya.",
    "ulama": "Imam Abu Dawud"
  },
  {
    "teks": "Sebaik-baik manusia adalah yang paling banyak memberi manfaat bagi manusia lainnya.",
    "ulama": "Imam An-Nasai"
  },
  {
    "teks": "Bertakwalah kepada Allah di mana pun kamu berada, karena Allah Maha Melihat setiap gerak-gerikmu.",
    "ulama": "Imam At-Tirmidzi"
  },
  {
    "teks": "Janganlah ilmu itu membuatmu sombong, karena kesombongan akan membutakan mata hati dari kebenaran.",
    "ulama": "Imam Al-ajurri"
  },
  {
    "teks": "Setiap kebaikan yang kamu tanam hari ini akan berbuah kebaikan yang tidak pernah kamu duga besok.",
    "ulama": "Imam Al-ajurri"
  },
  {
    "teks": "Ilmu itu didapat dengan lisan yang banyak bertanya dan kaki yang banyak berjalan mencari guru.",
    "ulama": "Imam Al-Khatib Al-Baghdadi"
  },
  {
    "teks": "Orang yang paling bahagia adalah orang yang mampu mensyukuri apa yang ia miliki.",
    "ulama": "Imam Al-Mawardhi"
  },
  {
    "teks": "Ilmu yang tidak diamalkan seperti pohon yang tidak berbuah — ada namun tidak memberikan faidah.",
    "ulama": "Imam Al-Mawardhi"
  },
  {
    "teks": "Agama itu mudah; yang membuatnya terasa sulit adalah ketika kita mengikuti hawa nafsu.",
    "ulama": "Imam Asy-Syathibi"
  },
  {
    "teks": "Seorang pencari ilmu yang bersabar atas kesulitannya, Allah akan buka baginya pintu ilmu yang luas.",
    "ulama": "Imam Ibnu Muflih"
  },
  {
    "teks": "Kejujuran adalah fondasi segala kemuliaan, dan kebohongan adalah akar segala kerusakan.",
    "ulama": "Imam Ibnu Muflih"
  },
  {
    "teks": "Keberkahan waktu tergantung pada bagaimana kamu mengisinya. Isi dengan ketaatan, maka ia akan penuh berkah.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Tiga hal yang menghancurkan: kikir yang ditaati, hawa nafsu yang diikuti, dan seseorang yang mengagumi dirinya sendiri.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Orang yang cerdas adalah yang menjadikan kematian sebagai motivasi untuk terus berbuat kebaikan.",
    "ulama": "Imam Ibnu Hajar Al-Asqalani"
  },
  {
    "teks": "Kesehatan adalah mahkota di kepala orang sehat yang hanya bisa dilihat oleh orang sakit.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Jiwa manusia adalah zat spiritual yang independen dari organ-organ fisik tubuhnya.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Penyakit fisik sering kali berakar dari kelemahan dan ketidakseimbangan kondisi emosional kita.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Jangan pernah lelah mencari kebenaran, karena kebenaran adalah makanan terbaik untuk akal kita.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Ilmu pengetahuan adalah penerang jalan kegelapan, dan guru adalah penuntun jalannya.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Kunci utama kebahagiaan hidup adalah keseimbangan antara jasmani, rohani, dan akal pikiran.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Pikiran yang cemas akan merusak metabolisme tubuh secara perlahan.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Kebersihan lingkungan adalah benteng pertama pertahanan manusia melawan wabah penyakit.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Obat terbaik untuk kesedihan adalah menyibukkan diri dengan mempelajari ilmu-ilmu baru.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Siapa yang tidak menghargai kesehatannya saat muda akan dipaksa membayarnya dengan mahal saat tua.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Peradaban besar tidak dihancurkan dari luar, melainkan membusuk secara perlahan dari dalam diri warganya.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Kemakmuran melahirkan kemalasan, dan kemalasan adalah awal runtuhnya sebuah kemajuan.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Pendidikan harus mengajarkan cara berpikir secara logis, bukan sekadar menghafal teori tanpa arah.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Negara yang membebani rakyatnya dengan pajak yang terlalu tinggi akan berakhir dengan kehancuran ekonomi.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Kekuasaan yang dijalankan dengan ketakutan tidak akan pernah bertahan lama dalam sejarah manusia.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Manusia memiliki kecenderungan alami untuk meniru gaya hidup kelompok yang lebih kuat dan berkuasa.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Perubahan sosial adalah hukum alam yang tidak bisa dihindari oleh masyarakat mana pun di dunia.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Persatuan sosial (Ashabiyah) adalah pengikat utama keberhasilan suatu komunitas mencapai tujuannya.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Ketika keadilan runtuh, kehancuran seluruh tatanan sosial masyarakat tinggal menunggu waktu.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Seorang sejarawan sejati harus bebas dari bias prasangka agar bisa menulis peristiwa secara objektif.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Agama menuntut tindakan moral yang nyata, bukan sekadar perdebatan teologis yang tak berujung.",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Akal dan wahyu berasal dari sumber yang sama, yaitu kebenaran ilahi yang tidak mungkin kontradiktif.",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Kebebasan berpikir adalah hak alami manusia yang harus dijaga dalam sistem kemasyarakatan.",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Filsafat tidak menjauhkan manusia dari Tuhan, ia justru memperdalam kekaguman kita akan ciptaan-Nya.",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Janganlah tergesa-gesa menghakimi pendapat orang lain sebelum kita memahami argumen mereka dengan utuh.",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Setiap kebenaran ilmiah yang kita temukan adalah bentuk ibadah intelektual kepada Sang Pencipta.",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Diskusi yang sehat adalah cara terbaik untuk meluruskan kesalahpahaman antarkelompok manusia.",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Generasi yang menolak filsafat dan ilmu logika akan mudah terombang-ambing oleh doktrin palsu.",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Aljabar mengajarkan kita cara menyederhanakan masalah yang rumit dengan langkah-langkah terstruktur.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Keindahan matematika terletak pada kepastian jawabannya dan keteraturan rumusnya.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Setiap angka di dunia ini memiliki tempat dan fungsinya masing-masing dalam harmoni matematika.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Berpikir matematis membantu melatih ketajaman logika kita dalam menghadapi masalah sehari-hari.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Ilmu perhitungan adalah dasar utama dari perdagangan, arsitektur, dan navigasi dunia.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Gunakan waktumu secara presisi seperti perhitungan angka yang tidak boleh meleset satu poin pun.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Siapa yang menguasai ilmu matematika akan lebih mudah memahami keteraturan hukum alam semesta.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Metode ilmiah menuntut kita untuk selalu melakukan eksperimen berulang demi membuktikan suatu teori.",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Jangan biarkan otoritas atau nama besar seseorang menghentikanmu untuk menguji kebenaran ucapannya.",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Cahaya merambat lurus; kebenaran juga harus disampaikan secara lurus tanpa manipulasi kata.",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Pengamatan visual yang objektif adalah kunci utama keberhasilan sains fisika.",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Sains berkembang bukan dengan menerima opini, melainkan dengan meragukan dan mengujinya secara empiris.",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Ilmu pengetahuan adalah warisan kemanusiaan yang harus dibagikan secara bebas tanpa batas negara.",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Musik adalah bahasa jiwa yang melampaui batas perbedaan kata dan bahasa manusia.",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Kebahagiaan sejati diraih ketika akal aktif kita terhubung dengan kebaikan-kebaikan universal.",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Masyarakat yang utama adalah masyarakat yang saling mencintai dan bekerja sama dalam kebajikan.",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Seorang pemimpin harus memiliki kejernihan visi intelektual dan keteguhan akhlak spiritual.",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Ilmu logika adalah pelindung pikiran kita dari kesalahan mengambil kesimpulan.",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Menuntut ilmu adalah persiapan diri untuk menjadi warga masyarakat yang berguna bagi sesama.",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Kita harus mempelajari geografi dan astronomi untuk memahami posisi kecil kita di alam semesta ini.",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Perbedaan budaya adalah kekayaan intelektual yang harus kita pelajari secara ilmiah dan objektif.",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Sains sejati menuntut kita menulis kebenaran meskipun kebenaran itu tidak disukai penguasa.",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Ketelitian dalam mengukur dan mencatat data adalah ciri utama ilmuwan yang berintegritas.",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Jangan biarkan kebencian antarsuku menghalangi kita untuk mengakui pencapaian ilmiah mereka.",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Penyakit hati jauh lebih berbahaya daripada penyakit fisik, karena dampaknya abadi hingga akhirat.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Kesombongan intelektual adalah ketika seseorang merasa paling tahu padahal ia baru belajar sedikit.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Jaga lisanmu dari gibah, karena gibah menghapus amal baikmu seperti api membakar kayu kering.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Nasihat yang paling membekas adalah nasihat yang diamalkan oleh orang yang menyampaikannya.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Carilah teman yang shaleh; karena teman shaleh akan membantumu memperbaiki akhlak dan ibadahmu.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Dunia ini hanyalah jembatan penyebrangan; jangan membangun rumah permanen di atasnya.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Belajarlah untuk memaafkan kesalahan orang lain agar hatimu tenang dan bebas dari dendam.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Keikhlasan adalah rahasia antara hamba dengan Tuhannya, yang tidak diketahui malaikat maupun setan.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Jika kamu ingin tahu karakter seseorang, lihatlah bagaimana ia memperlakukan orang yang tidak berguna baginya.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Kebahagiaan bukan pada banyaknya harta, melainkan pada ketenangan hati yang selalu bersyukur.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Hati yang bersih akan merasakan manisnya iman dan kelezatan dalam beribadah.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Sabar menahan diri dari kemaksiatan jauh lebih ringan daripada menanggung siksa akibat dosa tersebut.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Doa yang dipanjatkan di sepertiga malam terakhir adalah anak panah yang tidak akan pernah meleset.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Setiap helai nafas adalah langkah kita menuju liang kubur; pergunakan untuk hal yang berguna.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Kunci pembuka pintu ilmu adalah mendengarkan dengan baik, diam, mengamalkan, lalu menyebarkannya.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Kehilangan waktu jauh lebih rugi daripada kehilangan harta; karena harta bisa dicari lagi, sedangkan waktu tidak.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Fokuslah memperbaiki aib dirimu sendiri daripada sibuk membicarakan kelemahan orang lain.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Hati yang sakit akan menolak kebenaran dan merasa nyaman dengan kemaksiatan.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Istighfar adalah kunci pembuka pintu rezeki dan jalan keluar dari setiap kesempitan hidup.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Sabar adalah kekuatan jiwa yang menahan diri agar tidak mengeluh saat diuji oleh takdir.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Wahai manusia, jadilah orang yang zuhud terhadap dunia, maka Allah akan mencintaimu.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Sesungguhnya orang mukmin sejati adalah orang yang selalu merasa takut amalnya tidak diterima.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Perbaiki niatmu dalam beramal, karena niat yang ikhlas adalah ruh dari setiap perbuatan baik.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Jangan berteman dengan orang yang suka menceritakan aib orang lain kepadamu.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Orang yang paling berilmu adalah orang yang paling takut melanggar aturan-aturan Allah.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Kematian adalah nasihat yang diam namun sangat ampuh untuk menyadarkan kelalaian kita.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Dunia ini seperti air laut; semakin diminum, semakin membuat haus orang yang meminumnya.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Bencana yang membawamu kembali mendekat kepada Allah lebih baik daripada nikmat yang membuatmu lupa kepada-Nya.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Ibadah yang paling agung adalah ketaatan mutlak kepada perintah Allah dengan penuh rasa cinta.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Jihad yang paling utama adalah berjuang melawan hawa nafsu yang ada di dalam dada kita sendiri.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Hati yang dipenuhi cinta kepada Allah tidak akan menyisakan ruang untuk mencintai kemaksiatan.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Pelajari ilmu syariat agar kamu tidak mudah tersesat oleh argumen-argumen filsafat yang membingungkan.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Sabar atas gangguan manusia adalah bukti kematangan iman dan kebersihan hati seorang mukmin.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Adab yang baik adalah perhiasan sejati bagi seorang penuntut ilmu.",
    "ulama": "Imam Ibnu Muflih"
  },
  {
    "teks": "Hormatilah gurumu agar ilmu yang kamu dapatkan berkah dan bermanfaat bagi kehidupanmu.",
    "ulama": "Imam Ibnu Muflih"
  },
  {
    "teks": "Kejujuran adalah mutiara berharga dalam kepribadian seorang muslim sejati.",
    "ulama": "Imam Ibnu Muflih"
  },
  {
    "teks": "Jangan mudah berjanji jika kamu ragu bisa menepati janji tersebut.",
    "ulama": "Imam Ibnu Muflih"
  },
  {
    "teks": "Jangan menuntut Tuhanmu karena lambatnya pengabulan doa, tetapi tuntutlah dirimu sendiri karena lambatnya ketaatanmu.",
    "ulama": "Imam Ibnu Athaillah As-Sakandari"
  },
  {
    "teks": "Orang yang bersandar pada amalnya akan berkurang harapannya saat mengalami kegagalan atau dosa.",
    "ulama": "Imam Ibnu Athaillah As-Sakandari"
  },
  {
    "teks": "Bagaimana mungkin hati bisa bersinar jika bayangan dunia masih melekat erat di cermin hatinya?",
    "ulama": "Imam Ibnu Athaillah As-Sakandari"
  },
  {
    "teks": "Maksiat yang melahirkan kerendahan hati lebih baik daripada ketaatan yang melahirkan kesombongan.",
    "ulama": "Imam Ibnu Athaillah As-Sakandari"
  },
  {
    "teks": "Tunda amal baikmu sampai ada waktu luang adalah tanda kebodohan dan kelemahan jiwa.",
    "ulama": "Imam Ibnu Athaillah As-Sakandari"
  },
  {
    "teks": "Jika kamu memiliki teman yang membantumu taat kepada Allah, genggam erat tangannya.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Siapa yang menasihatimu secara sembunyi-sembunyi, ia benar-benar menyayangimu.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Siapa yang menasihatimu di depan umum, ia sebenarnya sedang menghina dan mempermalukanmu.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Pilar kepemimpinan ada lima: kejujuran, menyimpan rahasia, menepati janji, memberi nasihat, dan menunaikan amanah.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Kenyang itu membuat badan berat, mengeraskan hati, menghilangkan kecerdasan, dan mendatangkan tidur.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Aku beribadah kepada Allah bukan karena takut neraka atau mengharap surga, melainkan karena cinta dan kerinduan kepada-Nya.",
    "ulama": "Rabi'ah al-Adawiyah"
  },
  {
    "teks": "Ya Allah, jika aku menyembah-Mu karena takut neraka, bakarlah aku di dalamnya. Jika karena mengharap surga, haramkanlah aku darinya.",
    "ulama": "Rabi'ah al-Adawiyah"
  },
  {
    "teks": "Sembunyikan kebaikan-kebaikanmu sebagaimana kamu menyembunyikan kesalahan-kesalahanmu.",
    "ulama": "Rabi'ah al-Adawiyah"
  },
  {
    "teks": "Kebenaran tidak akan pernah merugikan orang yang mencarinya dengan niat yang bersih.",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Ilmu pengetahuan adalah cahaya universal yang menerangi seluruh umat manusia tanpa memandang perbedaan.",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Orang yang bijaksana adalah orang yang mampu mengambil pelajaran dari kegagalan masa lalunya.",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Astronomi mengajarkan kita tentang keagungan hukum alam semesta yang diatur dengan sangat presisi.",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Menyembunyikan kebenaran ilmiah demi popularitas adalah pengkhianatan terhadap akal sehat.",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Pendidikan harus dimulai dengan contoh teladan yang nyata dari para guru.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Kehancuran moral suatu bangsa adalah awal dari keruntuhan sistem politik dan negaranya.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Barangsiapa menginginkan kemuliaan, belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Ketahuilah wahai penuntut ilmu, setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Bagi akal dan kesehatan, kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Dalam sejarah peradaban manusia, jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki.",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Seperti hitungan yang presisi, tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat.",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Kejujuran adalah mata uang yang berlaku di belahan dunia mana pun.",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi.",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran.",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama.",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Barangsiapa menginginkan kemuliaan, disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Ketahuilah wahai penuntut ilmu, jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya.",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang.",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja.",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Bagi akal dan kesehatan, fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Dalam sejarah peradaban manusia, belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali.",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Seperti hitungan yang presisi, carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar. (Akhlak mulia)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu. (Kegunaan ilmu)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan.",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu.",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki. (Kebersihan hati)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Barangsiapa menginginkan kemuliaan, tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Ketahuilah wahai penuntut ilmu, bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Kejujuran adalah mata uang yang berlaku di belahan dunia mana pun. (Integritas dan kejujuran)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi. (Komunikasi yang baik)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran. (Pemecahan masalah)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Bagi akal dan kesehatan, kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Dalam sejarah peradaban manusia, disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran.",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Seperti hitungan yang presisi, orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang. (Toleransi pemikiran)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja. (Konsistensi)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu.",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa.",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali. (Waktu dan kedisiplinan)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Barangsiapa menginginkan kemuliaan, carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Ketahuilah wahai penuntut ilmu, keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu. (Kegunaan ilmu)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan. (Kesabaran)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu. (Rendah hati)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Bagi akal dan kesehatan, pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Dalam sejarah peradaban manusia, tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat. (Gemar membaca)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Seperti hitungan yang presisi, kejujuran adalah mata uang yang berlaku di belahan dunia mana pun.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi. (Komunikasi yang baik)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran. (Pemecahan masalah)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama. (Berbagi pengetahuan)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata.",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran. (Proses belajar)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Barangsiapa menginginkan kemuliaan, orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Ketahuilah wahai penuntut ilmu, hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja. (Konsistensi)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu. (Proses dan hasil)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa. (Belajar dan kepemimpinan)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Bagi akal dan kesehatan, setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Dalam sejarah peradaban manusia, carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar. (Akhlak mulia)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Seperti hitungan yang presisi, ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan. (Kesabaran)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu. (Rendah hati)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki. (Kebersihan hati)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu.",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat. (Gemar membaca)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Barangsiapa menginginkan kemuliaan, kejujuran adalah mata uang yang berlaku di belahan dunia mana pun.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Ketahuilah wahai penuntut ilmu, argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran. (Pemecahan masalah)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama. (Berbagi pengetahuan)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata. (Kedisiplinan)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Bagi akal dan kesehatan, jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Dalam sejarah peradaban manusia, orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang. (Toleransi pemikiran)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Seperti hitungan yang presisi, keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu. (Proses dan hasil)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa. (Belajar dan kepemimpinan)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali. (Waktu dan kedisiplinan)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya. (Pencarian kebenaran)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar. (Akhlak mulia)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Barangsiapa menginginkan kemuliaan, ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Ketahuilah wahai penuntut ilmu, kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu. (Rendah hati)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki. (Kebersihan hati)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu. (Dokumentasi ilmu)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Bagi akal dan kesehatan, bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Dalam sejarah peradaban manusia, kejujuran adalah mata uang yang berlaku di belahan dunia mana pun.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi. (Komunikasi yang baik)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Seperti hitungan yang presisi, setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama. (Berbagi pengetahuan)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata. (Kedisiplinan)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran. (Proses belajar)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya. (Kontrol diri)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang. (Toleransi pemikiran)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Barangsiapa menginginkan kemuliaan, keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Ketahuilah wahai penuntut ilmu, fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa. (Belajar dan kepemimpinan)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali. (Waktu dan kedisiplinan)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya. (Pencarian kebenaran)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Bagi akal dan kesehatan, keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Dalam sejarah peradaban manusia, ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan. (Kesabaran)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Seperti hitungan yang presisi, jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki. (Kebersihan hati)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu. (Dokumentasi ilmu)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat. (Gemar membaca)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Kejujuran adalah mata uang yang berlaku di belahan dunia mana pun. (Integritas dan kejujuran)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi. (Komunikasi yang baik)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Barangsiapa menginginkan kemuliaan, setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Ketahuilah wahai penuntut ilmu, kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata. (Kedisiplinan)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran. (Proses belajar)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya. (Kontrol diri)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Bagi akal dan kesehatan, hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Dalam sejarah peradaban manusia, keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu. (Proses dan hasil)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Seperti hitungan yang presisi, belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali. (Waktu dan kedisiplinan)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya. (Pencarian kebenaran)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar. (Akhlak mulia)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu. (Kegunaan ilmu)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan. (Kesabaran)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Barangsiapa menginginkan kemuliaan, jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu.",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Ketahuilah wahai penuntut ilmu, pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki.",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu. (Dokumentasi ilmu)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat. (Gemar membaca)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Kejujuran adalah mata uang yang berlaku di belahan dunia mana pun. (Integritas dan kejujuran)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Bagi akal dan kesehatan, argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi.",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Dalam sejarah peradaban manusia, setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran.",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama. (Berbagi pengetahuan)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Seperti hitungan yang presisi, disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata.",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran. (Proses belajar)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya. (Kontrol diri)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang. (Toleransi pemikiran)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja. (Konsistensi)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu. (Proses dan hasil)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa. (Belajar dan kepemimpinan)",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali. (Waktu dan kedisiplinan)",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya. (Pencarian kebenaran)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar. (Akhlak mulia)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu. (Kegunaan ilmu)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan. (Kesabaran)",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu. (Rendah hati)",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki. (Kebersihan hati)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu. (Dokumentasi ilmu)",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat. (Gemar membaca)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Kejujuran adalah mata uang yang berlaku di belahan dunia mana pun. (Integritas dan kejujuran)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi. (Komunikasi yang baik)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran. (Pemecahan masalah)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama. (Berbagi pengetahuan)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata. (Kedisiplinan)",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran. (Proses belajar)",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya. (Kontrol diri)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang. (Toleransi pemikiran)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja. (Konsistensi)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu. (Proses dan hasil)",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa. (Belajar dan kepemimpinan)",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali. (Waktu dan kedisiplinan)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya. (Pencarian kebenaran)",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar. (Akhlak mulia)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu. (Kegunaan ilmu)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan. (Kesabaran)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu. (Rendah hati)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki. (Kebersihan hati)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu. (Dokumentasi ilmu)",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat. (Gemar membaca)",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Kejujuran adalah mata uang yang berlaku di belahan dunia mana pun. (Integritas dan kejujuran)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi. (Komunikasi yang baik)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran. (Pemecahan masalah)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama. (Berbagi pengetahuan)",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata. (Kedisiplinan)",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran. (Proses belajar)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya. (Kontrol diri)",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang. (Toleransi pemikiran)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja. (Konsistensi)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu. (Proses dan hasil)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa. (Belajar dan kepemimpinan)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali. (Waktu dan kedisiplinan)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya. (Pencarian kebenaran)",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar. (Akhlak mulia)",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu. (Kegunaan ilmu)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan. (Kesabaran)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu. (Rendah hati)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki. (Kebersihan hati)",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu. (Dokumentasi ilmu)",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat. (Gemar membaca)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Kejujuran adalah mata uang yang berlaku di belahan dunia mana pun. (Integritas dan kejujuran)",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi. (Komunikasi yang baik)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran. (Pemecahan masalah)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama. (Berbagi pengetahuan)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata. (Kedisiplinan)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran. (Proses belajar)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya. (Kontrol diri)",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang. (Toleransi pemikiran)",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja. (Konsistensi)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu. (Proses dan hasil)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa. (Belajar dan kepemimpinan)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali. (Waktu dan kedisiplinan)",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya. (Pencarian kebenaran)",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar. (Akhlak mulia)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu. (Kegunaan ilmu)",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan. (Kesabaran)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu. (Rendah hati)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki. (Kebersihan hati)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu. (Dokumentasi ilmu)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat. (Gemar membaca)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Kejujuran adalah mata uang yang berlaku di belahan dunia mana pun. (Integritas dan kejujuran)",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi. (Komunikasi yang baik)",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran. (Pemecahan masalah)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama. (Berbagi pengetahuan)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata. (Kedisiplinan)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran. (Proses belajar)",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya. (Kontrol diri)",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang. (Toleransi pemikiran)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja. (Konsistensi)",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu. (Proses dan hasil)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa. (Belajar dan kepemimpinan)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali. (Waktu dan kedisiplinan)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya. (Pencarian kebenaran)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar. (Akhlak mulia)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu. (Kegunaan ilmu)",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan. (Kesabaran)",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu. (Rendah hati)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki. (Kebersihan hati)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu. (Dokumentasi ilmu)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat. (Gemar membaca)",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Kejujuran adalah mata uang yang berlaku di belahan dunia mana pun. (Integritas dan kejujuran)",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi. (Komunikasi yang baik)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran. (Pemecahan masalah)",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama. (Berbagi pengetahuan)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata. (Kedisiplinan)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran. (Proses belajar)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya. (Kontrol diri)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang. (Toleransi pemikiran)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja. (Konsistensi)",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu. (Proses dan hasil)",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa. (Belajar dan kepemimpinan)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali. (Waktu dan kedisiplinan)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya. (Pencarian kebenaran)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar. (Akhlak mulia)",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu. (Kegunaan ilmu)",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan. (Kesabaran)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu. (Rendah hati)",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki. (Kebersihan hati)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu. (Dokumentasi ilmu)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat. (Gemar membaca)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Kejujuran adalah mata uang yang berlaku di belahan dunia mana pun. (Integritas dan kejujuran)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi. (Komunikasi yang baik)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran. (Pemecahan masalah)",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama. (Berbagi pengetahuan)",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata. (Kedisiplinan)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran. (Proses belajar)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya. (Kontrol diri)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang. (Toleransi pemikiran)",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja. (Konsistensi)",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu. (Proses dan hasil)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa. (Belajar dan kepemimpinan)",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali. (Waktu dan kedisiplinan)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya. (Pencarian kebenaran)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar. (Akhlak mulia)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu. (Kegunaan ilmu)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Kesabaran dalam menuntut ilmu adalah kunci pembuka gerbang kesuksesan masa depan. (Kesabaran)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Jangan biarkan pujian manusia membuatmu sombong dan lupa akan kekurangan dirimu. (Rendah hati)",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Pikiran yang jernih bersumber dari hati yang bersih dari rasa dengki. (Kebersihan hati)",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Tulislah apa yang kamu pelajari agar pengetahuan itu abadi melampaui usia hidupmu. (Dokumentasi ilmu)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Bertemanlah dengan buku, karena buku adalah sahabat terbaik yang tidak pernah berkhianat. (Gemar membaca)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Kejujuran adalah mata uang yang berlaku di belahan dunia mana pun. (Integritas dan kejujuran)",
    "ulama": "Imam Ibnu Taimiyah"
  },
  {
    "teks": "Argumen yang kuat disampaikan dengan kata-kata lembut, bukan dengan nada tinggi. (Komunikasi yang baik)",
    "ulama": "Ibn Sina (Avicenna)"
  },
  {
    "teks": "Setiap masalah yang rumit pasti memiliki solusi jika diurai dengan kesabaran. (Pemecahan masalah)",
    "ulama": "Ibn Khaldun"
  },
  {
    "teks": "Kebahagiaan sejati didapat saat kita mampu membagikan ilmu yang kita miliki kepada sesama. (Berbagi pengetahuan)",
    "ulama": "Ibn Rushd (Averroes)"
  },
  {
    "teks": "Disiplin adalah jembatan antara cita-cita dengan pencapaian yang nyata. (Kedisiplinan)",
    "ulama": "Al-Khwarizmi"
  },
  {
    "teks": "Jangan takut salah dalam belajar, karena dari kesalahan itulah kita memahami kebenaran. (Proses belajar)",
    "ulama": "Ibn al-Haytham"
  },
  {
    "teks": "Orang yang berakal selalu berpikir sebelum berbicara, sedangkan orang bodoh sebaliknya. (Kontrol diri)",
    "ulama": "Al-Farabi"
  },
  {
    "teks": "Hargai pendapat orang lain meskipun berbeda dengan keyakinan yang kamu pegang. (Toleransi pemikiran)",
    "ulama": "Al-Biruni"
  },
  {
    "teks": "Keberhasilan diraih dengan usaha konsisten setiap hari, bukan dengan kerja keras semalam saja. (Konsistensi)",
    "ulama": "Al-Kindi"
  },
  {
    "teks": "Fokuslah pada proses belajar, hasil akhir akan mengikuti usaha terbaikmu. (Proses dan hasil)",
    "ulama": "Imam An-Nawawi"
  },
  {
    "teks": "Belajarlah sejak usia muda agar kamu dapat memimpin dengan bijak saat dewasa. (Belajar dan kepemimpinan)",
    "ulama": "Imam Asy-Syafi'i"
  },
  {
    "teks": "Setiap detik waktu yang terbuang adalah kerugian yang tidak akan pernah kembali. (Waktu dan kedisiplinan)",
    "ulama": "Imam Al-Ghazali"
  },
  {
    "teks": "Carilah kebenaran dengan akal sehatmu dan bersabarlah atas jalan panjang pencariannya. (Pencarian kebenaran)",
    "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
  },
  {
    "teks": "Keindahan budi pekerti adalah mahkota terbaik bagi seorang pelajar. (Akhlak mulia)",
    "ulama": "Imam Hasan Al-Basri"
  },
  {
    "teks": "Ilmu yang bermanfaat adalah ilmu yang menerangi jalan hidupmu dan orang di sekitarmu. (Kegunaan ilmu)",
    "ulama": "Imam Ibnu Taimiyah"
  }
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

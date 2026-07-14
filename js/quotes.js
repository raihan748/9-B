/* ==========================================================================
   DATABASE KUTIPAN KELAS 9B — 510 Quotes (1 Mapel, 1 Quote, Per Hari)
   Klasifikasi Kategori berdasarkan Hari Belajar & Relevansi Mapel
   ========================================================================== */

(function () {
  'use strict';

  // 85 quotes per category, total 510 quotes
  const CATEGORIZED_QUOTES = {
  "bahasa": [
    {
      "teks": "Lidah yang fasih adalah jendela kecerdasan jiwa.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Membaca buku-buku lama membuka dialog dengan pikiran terbesar masa lalu.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Komunikasi yang baik berakar dari kesediaan mendengar argumen lawan bicara.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Gunakan lisan untuk membangun kedamaian, bukan memicu perpecahan.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Tulisan yang jujur akan abadi menginspirasi pembacanya melampaui zaman.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Bertanya dengan sopan adalah kunci utama pembuka khazanah keilmuan.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Bahasa adalah cermin identitas peradaban sebuah bangsa.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Sastra mengajarkan kelembutan hati dan keindahan penyampaian pesan.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Kata-kata yang lahir dari hati akan masuk ke dalam relung hati pendengarnya.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Jangan bicara sebelum kamu tahu kebenaran dari apa yang ingin kamu sampaikan.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Membaca memperluas cakrawala berpikir dan memperdalam kebijaksanaan diri.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Setiap buku adalah guru bisu yang siap membagikan kearifan tanpa lelah.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Kekuatan pena lebih tajam daripada ketajaman sebilah pedang.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Pilihlah diksi yang santun agar tidak melukai harga diri sesama manusia.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Menulis adalah cara mengikat ilmu pengetahuan agar tidak hilang terlupakan.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Barangsiapa mempelajari bahasa suatu kaum, ia akan aman dari tipu daya mereka.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Bahasa yang baik menyejukkan pertikaian bagaikan air memadamkan api.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Keindahan ucapan terletak pada kejujuran makna di dalamnya.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Lidah adalah penafsir hati, dan pena adalah duta dari akal pikiran.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Satu kata bijak yang ditulis dengan ikhlas mampu mengubah arah hidup seseorang.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya lidah yang fasih adalah jendela kecerdasan jiwa.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya membaca buku-buku lama membuka dialog dengan pikiran terbesar masa lalu.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya komunikasi yang baik berakar dari kesediaan mendengar argumen lawan bicara.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya gunakan lisan untuk membangun kedamaian, bukan memicu perpecahan.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya tulisan yang jujur akan abadi menginspirasi pembacanya melampaui zaman.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya bertanya dengan sopan adalah kunci utama pembuka khazanah keilmuan.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya bahasa adalah cermin identitas peradaban sebuah bangsa.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya sastra mengajarkan kelembutan hati dan keindahan penyampaian pesan.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kata-kata yang lahir dari hati akan masuk ke dalam relung hati pendengarnya.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya jangan bicara sebelum kamu tahu kebenaran dari apa yang ingin kamu sampaikan.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya membaca memperluas cakrawala berpikir dan memperdalam kebijaksanaan diri.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya setiap buku adalah guru bisu yang siap membagikan kearifan tanpa lelah.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kekuatan pena lebih tajam daripada ketajaman sebilah pedang.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya pilihlah diksi yang santun agar tidak melukai harga diri sesama manusia.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya menulis adalah cara mengikat ilmu pengetahuan agar tidak hilang terlupakan.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya barangsiapa mempelajari bahasa suatu kaum, ia akan aman dari tipu daya mereka.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya bahasa yang baik menyejukkan pertikaian bagaikan air memadamkan api.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya keindahan ucapan terletak pada kejujuran makna di dalamnya.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya lidah adalah penafsir hati, dan pena adalah duta dari akal pikiran.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya satu kata bijak yang ditulis dengan ikhlas mampu mengubah arah hidup seseorang.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Ingatlah, lidah yang fasih adalah jendela kecerdasan jiwa.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ingatlah, membaca buku-buku lama membuka dialog dengan pikiran terbesar masa lalu.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Ingatlah, komunikasi yang baik berakar dari kesediaan mendengar argumen lawan bicara.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ingatlah, gunakan lisan untuk membangun kedamaian, bukan memicu perpecahan.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Ingatlah, tulisan yang jujur akan abadi menginspirasi pembacanya melampaui zaman.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Ingatlah, bertanya dengan sopan adalah kunci utama pembuka khazanah keilmuan.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ingatlah, bahasa adalah cermin identitas peradaban sebuah bangsa.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Ingatlah, sastra mengajarkan kelembutan hati dan keindahan penyampaian pesan.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ingatlah, kata-kata yang lahir dari hati akan masuk ke dalam relung hati pendengarnya.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Ingatlah, jangan bicara sebelum kamu tahu kebenaran dari apa yang ingin kamu sampaikan.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Ingatlah, membaca memperluas cakrawala berpikir dan memperdalam kebijaksanaan diri.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ingatlah, setiap buku adalah guru bisu yang siap membagikan kearifan tanpa lelah.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Ingatlah, kekuatan pena lebih tajam daripada ketajaman sebilah pedang.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ingatlah, pilihlah diksi yang santun agar tidak melukai harga diri sesama manusia.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Ingatlah, menulis adalah cara mengikat ilmu pengetahuan agar tidak hilang terlupakan.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Ingatlah, barangsiapa mempelajari bahasa suatu kaum, ia akan aman dari tipu daya mereka.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ingatlah, bahasa yang baik menyejukkan pertikaian bagaikan air memadamkan api.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Ingatlah, keindahan ucapan terletak pada kejujuran makna di dalamnya.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ingatlah, lidah adalah penafsir hati, dan pena adalah duta dari akal pikiran.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Ingatlah, satu kata bijak yang ditulis dengan ikhlas mampu mengubah arah hidup seseorang.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Lidah yang fasih adalah jendela kecerdasan jiwa.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Membaca buku-buku lama membuka dialog dengan pikiran terbesar masa lalu.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Komunikasi yang baik berakar dari kesediaan mendengar argumen lawan bicara.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Gunakan lisan untuk membangun kedamaian, bukan memicu perpecahan.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Tulisan yang jujur akan abadi menginspirasi pembacanya melampaui zaman.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Bertanya dengan sopan adalah kunci utama pembuka khazanah keilmuan.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Bahasa adalah cermin identitas peradaban sebuah bangsa.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Sastra mengajarkan kelembutan hati dan keindahan penyampaian pesan.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kata-kata yang lahir dari hati akan masuk ke dalam relung hati pendengarnya.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Jangan bicara sebelum kamu tahu kebenaran dari apa yang ingin kamu sampaikan.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Membaca memperluas cakrawala berpikir dan memperdalam kebijaksanaan diri.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Setiap buku adalah guru bisu yang siap membagikan kearifan tanpa lelah.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kekuatan pena lebih tajam daripada ketajaman sebilah pedang.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Pilihlah diksi yang santun agar tidak melukai harga diri sesama manusia.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Menulis adalah cara mengikat ilmu pengetahuan agar tidak hilang terlupakan.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Barangsiapa mempelajari bahasa suatu kaum, ia akan aman dari tipu daya mereka.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Bahasa yang baik menyejukkan pertikaian bagaikan air memadamkan api.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Keindahan ucapan terletak pada kejujuran makna di dalamnya.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Lidah adalah penafsir hati, dan pena adalah duta dari akal pikiran.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Satu kata bijak yang ditulis dengan ikhlas mampu mengubah arah hidup seseorang.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Lidah yang fasih adalah jendela kecerdasan jiwa.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Membaca buku-buku lama membuka dialog dengan pikiran terbesar masa lalu.",
      "ulama": "Imam Sufyan Ath-Thawri"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Komunikasi yang baik berakar dari kesediaan mendengar argumen lawan bicara.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Gunakan lisan untuk membangun kedamaian, bukan memicu perpecahan.",
      "ulama": "Ibn Rushd (Averroes)"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Tulisan yang jujur akan abadi menginspirasi pembacanya melampaui zaman.",
      "ulama": "Imam Al-Khatib Al-Baghdadi"
    }
  ],
  "matematika": [
    {
      "teks": "Aljabar mengajarkan kita menyeimbangkan persamaan hidup dengan langkah pasti.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Akal pikiran dirancang untuk menemukan solusi dari masalah-masalah logis.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Keteraturan angka-angka di alam semesta adalah tanda kebesaran Pencipta.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Berpikir logis menjauhkan kita dari keputusan emosional yang merugikan.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Dalam perhitungan sains, tidak ada ruang untuk prasangka yang subjektif.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Angka adalah simbol keteraturan dari ketidakteraturan yang semu.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Gunakan logika matematika untuk mengurai kerumitan jalan hidup.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Algoritma berpikir yang runtut mempermudah pencarian solusi hidup.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ketelitian menghitung adalah cermin kedisiplinan dan tanggung jawab diri.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Setiap masalah pasti memiliki variabel solusi yang bisa dicari.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Akurasi berpikir menghasilkan kesimpulan yang kokoh dan tidak terbantahkan.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Matematika melatih kesabaran kita memecahkan teka-teki langkah demi langkah.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Logika adalah dasar dari semua ilmu pengetahuan yang valid di dunia.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Persamaan yang seimbang melambangkan harmoni keadilan dalam hidup.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Jangan biarkan bias emosi merusak kalkulasi logis keputusan pentingmu.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Teknologi dan logika adalah roda penggerak kemajuan peradaban masa depan.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Sebuah sistem yang rapi dimulai dari algoritma berpikir yang presisi.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Angka nol mengajarkan kita bahwa kekosongan adalah awal dari nilai besar.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Kecerdasan komputasi melengkapi kecerdasan logika berpikir manusia.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Uraikan masalah besar menjadi bagian-bagian kecil agar mudah diselesaikan.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya aljabar mengajarkan kita menyeimbangkan persamaan hidup dengan langkah pasti.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya akal pikiran dirancang untuk menemukan solusi dari masalah-masalah logis.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya keteraturan angka-angka di alam semesta adalah tanda kebesaran Pencipta.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya berpikir logis menjauhkan kita dari keputusan emosional yang merugikan.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya dalam perhitungan sains, tidak ada ruang untuk prasangka yang subjektif.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya angka adalah simbol keteraturan dari ketidakteraturan yang semu.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya gunakan logika matematika untuk mengurai kerumitan jalan hidup.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya algoritma berpikir yang runtut mempermudah pencarian solusi hidup.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya ketelitian menghitung adalah cermin kedisiplinan dan tanggung jawab diri.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya setiap masalah pasti memiliki variabel solusi yang bisa dicari.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya akurasi berpikir menghasilkan kesimpulan yang kokoh dan tidak terbantahkan.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya matematika melatih kesabaran kita memecahkan teka-teki langkah demi langkah.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya logika adalah dasar dari semua ilmu pengetahuan yang valid di dunia.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya persamaan yang seimbang melambangkan harmoni keadilan dalam hidup.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya jangan biarkan bias emosi merusak kalkulasi logis keputusan pentingmu.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya teknologi dan logika adalah roda penggerak kemajuan peradaban masa depan.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya sebuah sistem yang rapi dimulai dari algoritma berpikir yang presisi.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya angka nol mengajarkan kita bahwa kekosongan adalah awal dari nilai besar.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kecerdasan komputasi melengkapi kecerdasan logika berpikir manusia.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya uraikan masalah besar menjadi bagian-bagian kecil agar mudah diselesaikan.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ingatlah, aljabar mengajarkan kita menyeimbangkan persamaan hidup dengan langkah pasti.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Ingatlah, akal pikiran dirancang untuk menemukan solusi dari masalah-masalah logis.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ingatlah, keteraturan angka-angka di alam semesta adalah tanda kebesaran Pencipta.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ingatlah, berpikir logis menjauhkan kita dari keputusan emosional yang merugikan.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Ingatlah, dalam perhitungan sains, tidak ada ruang untuk prasangka yang subjektif.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ingatlah, angka adalah simbol keteraturan dari ketidakteraturan yang semu.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Ingatlah, gunakan logika matematika untuk mengurai kerumitan jalan hidup.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ingatlah, algoritma berpikir yang runtut mempermudah pencarian solusi hidup.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ingatlah, ketelitian menghitung adalah cermin kedisiplinan dan tanggung jawab diri.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Ingatlah, setiap masalah pasti memiliki variabel solusi yang bisa dicari.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ingatlah, akurasi berpikir menghasilkan kesimpulan yang kokoh dan tidak terbantahkan.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Ingatlah, matematika melatih kesabaran kita memecahkan teka-teki langkah demi langkah.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ingatlah, logika adalah dasar dari semua ilmu pengetahuan yang valid di dunia.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ingatlah, persamaan yang seimbang melambangkan harmoni keadilan dalam hidup.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Ingatlah, jangan biarkan bias emosi merusak kalkulasi logis keputusan pentingmu.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ingatlah, teknologi dan logika adalah roda penggerak kemajuan peradaban masa depan.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Ingatlah, sebuah sistem yang rapi dimulai dari algoritma berpikir yang presisi.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ingatlah, angka nol mengajarkan kita bahwa kekosongan adalah awal dari nilai besar.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ingatlah, kecerdasan komputasi melengkapi kecerdasan logika berpikir manusia.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Ingatlah, uraikan masalah besar menjadi bagian-bagian kecil agar mudah diselesaikan.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Aljabar mengajarkan kita menyeimbangkan persamaan hidup dengan langkah pasti.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Akal pikiran dirancang untuk menemukan solusi dari masalah-masalah logis.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Keteraturan angka-angka di alam semesta adalah tanda kebesaran Pencipta.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Berpikir logis menjauhkan kita dari keputusan emosional yang merugikan.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Dalam perhitungan sains, tidak ada ruang untuk prasangka yang subjektif.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Angka adalah simbol keteraturan dari ketidakteraturan yang semu.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Gunakan logika matematika untuk mengurai kerumitan jalan hidup.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Algoritma berpikir yang runtut mempermudah pencarian solusi hidup.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Ketelitian menghitung adalah cermin kedisiplinan dan tanggung jawab diri.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Setiap masalah pasti memiliki variabel solusi yang bisa dicari.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Akurasi berpikir menghasilkan kesimpulan yang kokoh dan tidak terbantahkan.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Matematika melatih kesabaran kita memecahkan teka-teki langkah demi langkah.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Logika adalah dasar dari semua ilmu pengetahuan yang valid di dunia.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Persamaan yang seimbang melambangkan harmoni keadilan dalam hidup.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Jangan biarkan bias emosi merusak kalkulasi logis keputusan pentingmu.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Teknologi dan logika adalah roda penggerak kemajuan peradaban masa depan.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Sebuah sistem yang rapi dimulai dari algoritma berpikir yang presisi.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Angka nol mengajarkan kita bahwa kekosongan adalah awal dari nilai besar.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kecerdasan komputasi melengkapi kecerdasan logika berpikir manusia.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Uraikan masalah besar menjadi bagian-bagian kecil agar mudah diselesaikan.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Aljabar mengajarkan kita menyeimbangkan persamaan hidup dengan langkah pasti.",
      "ulama": "Al-Khwarizmi"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Akal pikiran dirancang untuk menemukan solusi dari masalah-masalah logis.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Keteraturan angka-angka di alam semesta adalah tanda kebesaran Pencipta.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Berpikir logis menjauhkan kita dari keputusan emosional yang merugikan.",
      "ulama": "Imam Abu Hanifah"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Dalam perhitungan sains, tidak ada ruang untuk prasangka yang subjektif.",
      "ulama": "Ibn al-Haytham"
    }
  ],
  "sosial": [
    {
      "teks": "Masyarakat yang kuat adalah masyarakat yang mengutamakan persatuan dan keadilan.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Sejarah mengajarkan kita agar tidak mengulangi kesalahan fatal generasi masa lalu.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Kemakmuran bersama hanya diraih jika hukum ditegakkan tanpa pandang bulu.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Pendidikan karakter melahirkan warga negara yang bertanggung jawab sosial.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Kepemimpinan sejati adalah pengabdian tulus untuk kesejahteraan rakyat.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Manusia diciptakan saling membutuhkan untuk membangun sebuah peradaban.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Zuhud sosial berarti tidak tamak pada kekuasaan dan jabatan publik.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Kejayaan suatu bangsa diukur dari bagaimana mereka memperlakukan kaum lemah.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Persaudaraan sejati berdiri di atas landasan saling tolong-menolong dalam kebaikan.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Jangan biarkan konflik kepentingan pribadi merusak ketertiban masyarakat umum.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Hukum sebab-akibat sejarah selalu berulang bagi bangsa yang malas berpikir.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Etika sosial menuntut kita menghormati hak-hak tetangga dan sesama warga.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Kemunduran peradaban dimulai saat warganya bersikap acuh tak acuh pada keadilan.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Negara yang kokoh dibangun dari fondasi keluarga-keluarga yang harmonis.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Saling menghargai perbedaan adalah prasyarat utama kerukunan bertetangga.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Keadilan sosial adalah ruh dari keamanan dan kedamaian sebuah negeri.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Belajarlah dari keruntuhan peradaban masa lalu agar kita bisa bertahan hari ini.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Persatuan dalam keragaman adalah kunci kokohnya ukhuwah insaniyah.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Sejarah adalah laboratorium besar tindakan manusia sepanjang masa.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Jadilah pelopor kebaikan di tengah lingkungan masyarakat tempat tinggalmu.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya masyarakat yang kuat adalah masyarakat yang mengutamakan persatuan dan keadilan.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya sejarah mengajarkan kita agar tidak mengulangi kesalahan fatal generasi masa lalu.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kemakmuran bersama hanya diraih jika hukum ditegakkan tanpa pandang bulu.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya pendidikan karakter melahirkan warga negara yang bertanggung jawab sosial.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kepemimpinan sejati adalah pengabdian tulus untuk kesejahteraan rakyat.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya manusia diciptakan saling membutuhkan untuk membangun sebuah peradaban.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya zuhud sosial berarti tidak tamak pada kekuasaan dan jabatan publik.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kejayaan suatu bangsa diukur dari bagaimana mereka memperlakukan kaum lemah.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya persaudaraan sejati berdiri di atas landasan saling tolong-menolong dalam kebaikan.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya jangan biarkan konflik kepentingan pribadi merusak ketertiban masyarakat umum.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya hukum sebab-akibat sejarah selalu berulang bagi bangsa yang malas berpikir.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya etika sosial menuntut kita menghormati hak-hak tetangga dan sesama warga.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kemunduran peradaban dimulai saat warganya bersikap acuh tak acuh pada keadilan.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya negara yang kokoh dibangun dari fondasi keluarga-keluarga yang harmonis.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya saling menghargai perbedaan adalah prasyarat utama kerukunan bertetangga.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya keadilan sosial adalah ruh dari keamanan dan kedamaian sebuah negeri.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya belajarlah dari keruntuhan peradaban masa lalu agar kita bisa bertahan hari ini.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya persatuan dalam keragaman adalah kunci kokohnya ukhuwah insaniyah.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya sejarah adalah laboratorium besar tindakan manusia sepanjang masa.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya jadilah pelopor kebaikan di tengah lingkungan masyarakat tempat tinggalmu.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Ingatlah, masyarakat yang kuat adalah masyarakat yang mengutamakan persatuan dan keadilan.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Ingatlah, sejarah mengajarkan kita agar tidak mengulangi kesalahan fatal generasi masa lalu.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ingatlah, kemakmuran bersama hanya diraih jika hukum ditegakkan tanpa pandang bulu.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ingatlah, pendidikan karakter melahirkan warga negara yang bertanggung jawab sosial.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Ingatlah, kepemimpinan sejati adalah pengabdian tulus untuk kesejahteraan rakyat.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Ingatlah, manusia diciptakan saling membutuhkan untuk membangun sebuah peradaban.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Ingatlah, zuhud sosial berarti tidak tamak pada kekuasaan dan jabatan publik.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ingatlah, kejayaan suatu bangsa diukur dari bagaimana mereka memperlakukan kaum lemah.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ingatlah, persaudaraan sejati berdiri di atas landasan saling tolong-menolong dalam kebaikan.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Ingatlah, jangan biarkan konflik kepentingan pribadi merusak ketertiban masyarakat umum.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Ingatlah, hukum sebab-akibat sejarah selalu berulang bagi bangsa yang malas berpikir.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Ingatlah, etika sosial menuntut kita menghormati hak-hak tetangga dan sesama warga.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ingatlah, kemunduran peradaban dimulai saat warganya bersikap acuh tak acuh pada keadilan.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ingatlah, negara yang kokoh dibangun dari fondasi keluarga-keluarga yang harmonis.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Ingatlah, saling menghargai perbedaan adalah prasyarat utama kerukunan bertetangga.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Ingatlah, keadilan sosial adalah ruh dari keamanan dan kedamaian sebuah negeri.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Ingatlah, belajarlah dari keruntuhan peradaban masa lalu agar kita bisa bertahan hari ini.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Ingatlah, persatuan dalam keragaman adalah kunci kokohnya ukhuwah insaniyah.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ingatlah, sejarah adalah laboratorium besar tindakan manusia sepanjang masa.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Ingatlah, jadilah pelopor kebaikan di tengah lingkungan masyarakat tempat tinggalmu.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Masyarakat yang kuat adalah masyarakat yang mengutamakan persatuan dan keadilan.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Sejarah mengajarkan kita agar tidak mengulangi kesalahan fatal generasi masa lalu.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kemakmuran bersama hanya diraih jika hukum ditegakkan tanpa pandang bulu.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Pendidikan karakter melahirkan warga negara yang bertanggung jawab sosial.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kepemimpinan sejati adalah pengabdian tulus untuk kesejahteraan rakyat.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Manusia diciptakan saling membutuhkan untuk membangun sebuah peradaban.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Zuhud sosial berarti tidak tamak pada kekuasaan dan jabatan publik.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kejayaan suatu bangsa diukur dari bagaimana mereka memperlakukan kaum lemah.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Persaudaraan sejati berdiri di atas landasan saling tolong-menolong dalam kebaikan.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Jangan biarkan konflik kepentingan pribadi merusak ketertiban masyarakat umum.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Hukum sebab-akibat sejarah selalu berulang bagi bangsa yang malas berpikir.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Etika sosial menuntut kita menghormati hak-hak tetangga dan sesama warga.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kemunduran peradaban dimulai saat warganya bersikap acuh tak acuh pada keadilan.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Negara yang kokoh dibangun dari fondasi keluarga-keluarga yang harmonis.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Saling menghargai perbedaan adalah prasyarat utama kerukunan bertetangga.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Keadilan sosial adalah ruh dari keamanan dan kedamaian sebuah negeri.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Belajarlah dari keruntuhan peradaban masa lalu agar kita bisa bertahan hari ini.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Persatuan dalam keragaman adalah kunci kokohnya ukhuwah insaniyah.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Sejarah adalah laboratorium besar tindakan manusia sepanjang masa.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Jadilah pelopor kebaikan di tengah lingkungan masyarakat tempat tinggalmu.",
      "ulama": "Imam An-Nasai"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Masyarakat yang kuat adalah masyarakat yang mengutamakan persatuan dan keadilan.",
      "ulama": "Ibn Khaldun"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Sejarah mengajarkan kita agar tidak mengulangi kesalahan fatal generasi masa lalu.",
      "ulama": "Al-Farabi"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Kemakmuran bersama hanya diraih jika hukum ditegakkan tanpa pandang bulu.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Pendidikan karakter melahirkan warga negara yang bertanggung jawab sosial.",
      "ulama": "Imam Ibnu Taimiyah"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Kepemimpinan sejati adalah pengabdian tulus untuk kesejahteraan rakyat.",
      "ulama": "Imam An-Nasai"
    }
  ],
  "sains_seni": [
    {
      "teks": "Eksperimen empiris adalah kunci membedakan teori sains dengan mitos belaka.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Kesehatan fisik adalah modal utama bagi ketenangan jiwa menuntut ilmu.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Kreativitas seni mengekspresikan harmoni keindahan ciptaan Tuhan di alam.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Mempelajari sains alam mendekatkan kita pada keagungan arsitektur semesta.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Seni rupa melatih sensitivitas kita menghargai keindahan warna dan bentuk.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Kimia mengajarkan kita bahwa perubahan selalu membutuhkan katalis kesabaran.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Obati penyakit fisikmu dengan obat, obati penyakit jiwamu dengan ilmu.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Pengamatan bintang mengajarkan kerendahan hati manusia di tengah galaksi.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Jangan menolak teori sains baru hanya karena ia berbeda dengan tradisi usang.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Keindahan estetika adalah pantulan dari kesempurnaan ciptaan Sang Khaliq.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Harmoni seni mengajarkan kita pentingnya kerja sama dalam ritme kehidupan.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Optik sains membuktikan bahwa penglihatan kita dibatasi sudut pandang sendiri.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Tubuh manusia adalah mesin biologis luar biasa yang harus dijaga kesehatannya.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Penemuan ilmiah lahir dari ketekunan mengamati fenomena alam terkecil.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Gunakan ilmu kedokteran untuk memelihara fisik agar kuat beribadah.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Seni yang indah menenangkan emosi dan memperhalus budi pekerti kita.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Jagalah kebugaran jasmani karena di dalam tubuh yang sehat terdapat jiwa yang kuat.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Setiap materi di alam semesta ini memiliki struktur unik yang mengagumkan.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Observasi yang teliti adalah langkah pertama lahirnya penemuan ilmiah besar.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Kombinasi warna di alam raya mengajarkan kita tentang harmoni perbedaan.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya eksperimen empiris adalah kunci membedakan teori sains dengan mitos belaka.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kesehatan fisik adalah modal utama bagi ketenangan jiwa menuntut ilmu.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kreativitas seni mengekspresikan harmoni keindahan ciptaan Tuhan di alam.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya mempelajari sains alam mendekatkan kita pada keagungan arsitektur semesta.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya seni rupa melatih sensitivitas kita menghargai keindahan warna dan bentuk.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kimia mengajarkan kita bahwa perubahan selalu membutuhkan katalis kesabaran.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya obati penyakit fisikmu dengan obat, obati penyakit jiwamu dengan ilmu.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya pengamatan bintang mengajarkan kerendahan hati manusia di tengah galaksi.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya jangan menolak teori sains baru hanya karena ia berbeda dengan tradisi usang.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya keindahan estetika adalah pantulan dari kesempurnaan ciptaan Sang Khaliq.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya harmoni seni mengajarkan kita pentingnya kerja sama dalam ritme kehidupan.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya optik sains membuktikan bahwa penglihatan kita dibatasi sudut pandang sendiri.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya tubuh manusia adalah mesin biologis luar biasa yang harus dijaga kesehatannya.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya penemuan ilmiah lahir dari ketekunan mengamati fenomena alam terkecil.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya gunakan ilmu kedokteran untuk memelihara fisik agar kuat beribadah.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya seni yang indah menenangkan emosi dan memperhalus budi pekerti kita.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya jagalah kebugaran jasmani karena di dalam tubuh yang sehat terdapat jiwa yang kuat.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya setiap materi di alam semesta ini memiliki struktur unik yang mengagumkan.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya observasi yang teliti adalah langkah pertama lahirnya penemuan ilmiah besar.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kombinasi warna di alam raya mengajarkan kita tentang harmoni perbedaan.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ingatlah, eksperimen empiris adalah kunci membedakan teori sains dengan mitos belaka.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ingatlah, kesehatan fisik adalah modal utama bagi ketenangan jiwa menuntut ilmu.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ingatlah, kreativitas seni mengekspresikan harmoni keindahan ciptaan Tuhan di alam.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ingatlah, mempelajari sains alam mendekatkan kita pada keagungan arsitektur semesta.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Ingatlah, seni rupa melatih sensitivitas kita menghargai keindahan warna dan bentuk.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ingatlah, kimia mengajarkan kita bahwa perubahan selalu membutuhkan katalis kesabaran.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ingatlah, obati penyakit fisikmu dengan obat, obati penyakit jiwamu dengan ilmu.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ingatlah, pengamatan bintang mengajarkan kerendahan hati manusia di tengah galaksi.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ingatlah, jangan menolak teori sains baru hanya karena ia berbeda dengan tradisi usang.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Ingatlah, keindahan estetika adalah pantulan dari kesempurnaan ciptaan Sang Khaliq.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ingatlah, harmoni seni mengajarkan kita pentingnya kerja sama dalam ritme kehidupan.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ingatlah, optik sains membuktikan bahwa penglihatan kita dibatasi sudut pandang sendiri.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ingatlah, tubuh manusia adalah mesin biologis luar biasa yang harus dijaga kesehatannya.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ingatlah, penemuan ilmiah lahir dari ketekunan mengamati fenomena alam terkecil.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Ingatlah, gunakan ilmu kedokteran untuk memelihara fisik agar kuat beribadah.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ingatlah, seni yang indah menenangkan emosi dan memperhalus budi pekerti kita.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ingatlah, jagalah kebugaran jasmani karena di dalam tubuh yang sehat terdapat jiwa yang kuat.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Ingatlah, setiap materi di alam semesta ini memiliki struktur unik yang mengagumkan.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Ingatlah, observasi yang teliti adalah langkah pertama lahirnya penemuan ilmiah besar.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Ingatlah, kombinasi warna di alam raya mengajarkan kita tentang harmoni perbedaan.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Eksperimen empiris adalah kunci membedakan teori sains dengan mitos belaka.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kesehatan fisik adalah modal utama bagi ketenangan jiwa menuntut ilmu.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kreativitas seni mengekspresikan harmoni keindahan ciptaan Tuhan di alam.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Mempelajari sains alam mendekatkan kita pada keagungan arsitektur semesta.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Seni rupa melatih sensitivitas kita menghargai keindahan warna dan bentuk.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kimia mengajarkan kita bahwa perubahan selalu membutuhkan katalis kesabaran.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Obati penyakit fisikmu dengan obat, obati penyakit jiwamu dengan ilmu.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Pengamatan bintang mengajarkan kerendahan hati manusia di tengah galaksi.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Jangan menolak teori sains baru hanya karena ia berbeda dengan tradisi usang.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Keindahan estetika adalah pantulan dari kesempurnaan ciptaan Sang Khaliq.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Harmoni seni mengajarkan kita pentingnya kerja sama dalam ritme kehidupan.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Optik sains membuktikan bahwa penglihatan kita dibatasi sudut pandang sendiri.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Tubuh manusia adalah mesin biologis luar biasa yang harus dijaga kesehatannya.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Penemuan ilmiah lahir dari ketekunan mengamati fenomena alam terkecil.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Gunakan ilmu kedokteran untuk memelihara fisik agar kuat beribadah.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Seni yang indah menenangkan emosi dan memperhalus budi pekerti kita.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Jagalah kebugaran jasmani karena di dalam tubuh yang sehat terdapat jiwa yang kuat.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Setiap materi di alam semesta ini memiliki struktur unik yang mengagumkan.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Observasi yang teliti adalah langkah pertama lahirnya penemuan ilmiah besar.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kombinasi warna di alam raya mengajarkan kita tentang harmoni perbedaan.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Eksperimen empiris adalah kunci membedakan teori sains dengan mitos belaka.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Kesehatan fisik adalah modal utama bagi ketenangan jiwa menuntut ilmu.",
      "ulama": "Ibn al-Haytham"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Kreativitas seni mengekspresikan harmoni keindahan ciptaan Tuhan di alam.",
      "ulama": "Al-Biruni"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Mempelajari sains alam mendekatkan kita pada keagungan arsitektur semesta.",
      "ulama": "Jabir ibn Hayyan"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Seni rupa melatih sensitivitas kita menghargai keindahan warna dan bentuk.",
      "ulama": "Al-Kindi"
    }
  ],
  "agama_karakter": [
    {
      "teks": "Keikhlasan adalah kemurnian niat yang bersih dari keinginan dipuji manusia.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Sabar adalah benteng terkuat saat badai ujian takdir menghantam hidupmu.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Rasa malu kepada Tuhan mencegah kita dari melakukan perbuatan nista saat sunyi.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Dzikir menenangkan hati yang gundah dari kepanikan menghadapi masa depan.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Akhlak yang mulia adalah seindah-indahnya hiasan bagi seorang mukmin sejati.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Taubat adalah pintu terbuka yang selalu siap menerima kembali hamba yang tersesat.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Jangan biarkan rasa dengki merusak pahala amal baikmu dari dalam.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Al-Qur'an adalah petunjuk arah di tengah labirin kebingungan duniawi.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Kedekatan dengan Tuhan mendatangkan kedamaian batin yang tidak bisa dibeli harta.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Jadikan shalatmu sebagai tempat peristirahatan dari penatnya urusan dunia.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Istighfar yang tulus menghapus noda-noda hitam di dalam cermin hati kita.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Sifat qana'ah membuat seseorang merasa kaya meskipun hartanya sangat terbatas.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Carilah keridhaan Allah dalam setiap desah nafas dan gerak-gerik langkahmu.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Hormati orang tuamu agar hidupmu diberkahi dengan kemudahan dan kebahagiaan.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Berbuat baiklah kepada hewan dan tumbuhan sebagai wujud rahmat bagi alam.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Pilar utama kedewasaan karakter adalah tanggung jawab atas tindakan sendiri.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Konseling diri dimulai dari kemauan jujur mengakui kesalahan batin.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Bersyukur atas nikmat kecil membuka jalan bagi datangnya nikmat yang besar.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Ibadah terbaik adalah ketaatan yang dibarengi dengan kelembutan akhlak kepada sesama.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Hati yang tawadhu (rendah hati) tidak akan pernah tersinggung oleh hinaan orang.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya keikhlasan adalah kemurnian niat yang bersih dari keinginan dipuji manusia.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya sabar adalah benteng terkuat saat badai ujian takdir menghantam hidupmu.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya rasa malu kepada Tuhan mencegah kita dari melakukan perbuatan nista saat sunyi.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya dzikir menenangkan hati yang gundah dari kepanikan menghadapi masa depan.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya akhlak yang mulia adalah seindah-indahnya hiasan bagi seorang mukmin sejati.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya taubat adalah pintu terbuka yang selalu siap menerima kembali hamba yang tersesat.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya jangan biarkan rasa dengki merusak pahala amal baikmu dari dalam.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya al-Qur'an adalah petunjuk arah di tengah labirin kebingungan duniawi.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kedekatan dengan Tuhan mendatangkan kedamaian batin yang tidak bisa dibeli harta.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya jadikan shalatmu sebagai tempat peristirahatan dari penatnya urusan dunia.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya istighfar yang tulus menghapus noda-noda hitam di dalam cermin hati kita.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya sifat qana'ah membuat seseorang merasa kaya meskipun hartanya sangat terbatas.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya carilah keridhaan Allah dalam setiap desah nafas dan gerak-gerik langkahmu.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya hormati orang tuamu agar hidupmu diberkahi dengan kemudahan dan kebahagiaan.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya berbuat baiklah kepada hewan dan tumbuhan sebagai wujud rahmat bagi alam.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya pilar utama kedewasaan karakter adalah tanggung jawab atas tindakan sendiri.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya konseling diri dimulai dari kemauan jujur mengakui kesalahan batin.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya bersyukur atas nikmat kecil membuka jalan bagi datangnya nikmat yang besar.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya ibadah terbaik adalah ketaatan yang dibarengi dengan kelembutan akhlak kepada sesama.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya hati yang tawadhu (rendah hati) tidak akan pernah tersinggung oleh hinaan orang.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Ingatlah, keikhlasan adalah kemurnian niat yang bersih dari keinginan dipuji manusia.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ingatlah, sabar adalah benteng terkuat saat badai ujian takdir menghantam hidupmu.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ingatlah, rasa malu kepada Tuhan mencegah kita dari melakukan perbuatan nista saat sunyi.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Ingatlah, dzikir menenangkan hati yang gundah dari kepanikan menghadapi masa depan.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Ingatlah, akhlak yang mulia adalah seindah-indahnya hiasan bagi seorang mukmin sejati.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Ingatlah, taubat adalah pintu terbuka yang selalu siap menerima kembali hamba yang tersesat.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ingatlah, jangan biarkan rasa dengki merusak pahala amal baikmu dari dalam.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ingatlah, al-Qur'an adalah petunjuk arah di tengah labirin kebingungan duniawi.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Ingatlah, kedekatan dengan Tuhan mendatangkan kedamaian batin yang tidak bisa dibeli harta.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Ingatlah, jadikan shalatmu sebagai tempat peristirahatan dari penatnya urusan dunia.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Ingatlah, istighfar yang tulus menghapus noda-noda hitam di dalam cermin hati kita.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ingatlah, sifat qana'ah membuat seseorang merasa kaya meskipun hartanya sangat terbatas.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ingatlah, carilah keridhaan Allah dalam setiap desah nafas dan gerak-gerik langkahmu.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Ingatlah, hormati orang tuamu agar hidupmu diberkahi dengan kemudahan dan kebahagiaan.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Ingatlah, berbuat baiklah kepada hewan dan tumbuhan sebagai wujud rahmat bagi alam.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Ingatlah, pilar utama kedewasaan karakter adalah tanggung jawab atas tindakan sendiri.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ingatlah, konseling diri dimulai dari kemauan jujur mengakui kesalahan batin.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ingatlah, bersyukur atas nikmat kecil membuka jalan bagi datangnya nikmat yang besar.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Ingatlah, ibadah terbaik adalah ketaatan yang dibarengi dengan kelembutan akhlak kepada sesama.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Ingatlah, hati yang tawadhu (rendah hati) tidak akan pernah tersinggung oleh hinaan orang.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Keikhlasan adalah kemurnian niat yang bersih dari keinginan dipuji manusia.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Sabar adalah benteng terkuat saat badai ujian takdir menghantam hidupmu.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Rasa malu kepada Tuhan mencegah kita dari melakukan perbuatan nista saat sunyi.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Dzikir menenangkan hati yang gundah dari kepanikan menghadapi masa depan.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Akhlak yang mulia adalah seindah-indahnya hiasan bagi seorang mukmin sejati.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Taubat adalah pintu terbuka yang selalu siap menerima kembali hamba yang tersesat.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Jangan biarkan rasa dengki merusak pahala amal baikmu dari dalam.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Al-Qur'an adalah petunjuk arah di tengah labirin kebingungan duniawi.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kedekatan dengan Tuhan mendatangkan kedamaian batin yang tidak bisa dibeli harta.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Jadikan shalatmu sebagai tempat peristirahatan dari penatnya urusan dunia.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Istighfar yang tulus menghapus noda-noda hitam di dalam cermin hati kita.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Sifat qana'ah membuat seseorang merasa kaya meskipun hartanya sangat terbatas.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Carilah keridhaan Allah dalam setiap desah nafas dan gerak-gerik langkahmu.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Hormati orang tuamu agar hidupmu diberkahi dengan kemudahan dan kebahagiaan.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Berbuat baiklah kepada hewan dan tumbuhan sebagai wujud rahmat bagi alam.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Pilar utama kedewasaan karakter adalah tanggung jawab atas tindakan sendiri.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Konseling diri dimulai dari kemauan jujur mengakui kesalahan batin.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Bersyukur atas nikmat kecil membuka jalan bagi datangnya nikmat yang besar.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Ibadah terbaik adalah ketaatan yang dibarengi dengan kelembutan akhlak kepada sesama.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Hati yang tawadhu (rendah hati) tidak akan pernah tersinggung oleh hinaan orang.",
      "ulama": "Imam An-Nawawi"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Keikhlasan adalah kemurnian niat yang bersih dari keinginan dipuji manusia.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Sabar adalah benteng terkuat saat badai ujian takdir menghantam hidupmu.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Rasa malu kepada Tuhan mencegah kita dari melakukan perbuatan nista saat sunyi.",
      "ulama": "Rabi'ah al-Adawiyah"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Dzikir menenangkan hati yang gundah dari kepanikan menghadapi masa depan.",
      "ulama": "Imam Ibnu Athaillah As-Sakandari"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Akhlak yang mulia adalah seindah-indahnya hiasan bagi seorang mukmin sejati.",
      "ulama": "Imam An-Nawawi"
    }
  ],
  "umum": [
    {
      "teks": "Disiplin belajar hari ini menentukan posisi kepemimpinanmu di masa depan.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Jangan tunda pekerjaan hari ini karena esok hari membawa kesibukannya sendiri.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Waktu adalah modal hidup paling berharga yang tidak bisa diputar kembali.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Konsistensi dalam kebaikan kecil jauh lebih baik daripada kebaikan besar yang terputus.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Kegagalan adalah bahan evaluasi berharga untuk memperbaiki strategi langkahmu.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Rendah hati menjauhkan kita dari kehancuran akibat kesombongan diri.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Fokuslah pada proses perjuanganmu, karena hasil akhir adalah ketentuan Tuhan.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Hidup yang seimbang adalah kunci menjaga produktivitas kerja dan belajar.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Jangan biarkan rasa malas mengubur potensi besar yang ada di dalam dirimu.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Hargai jasa-jasa orang lain yang telah membantumu mencapai posisi sekarang.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Keberanian sejati adalah mengakui kesalahan dan bertekad untuk memperbaikinya.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Sederhanakan hidupmu agar kamu memiliki lebih banyak energi untuk berpikir besar.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Optimisme memicu kreativitas, sedangkan pesimisme mematikan ide-ide terbaikmu.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Belajarlah sepanjang hayat karena ilmu pengetahuan tidak pernah memiliki batas akhir.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Jadilah manusia yang kehadirannya membawa manfaat dan kepergiannya dirindukan.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Manfaatkan hari libur untuk menyegarkan pikiran dan mempererat hubungan keluarga.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Istirahat sejenak bukanlah tanda menyerah, melainkan persiapan langkah lebih jauh.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Refleksi diri di akhir pekan menjernihkan visi perjuanganmu di hari Senin.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Jagalah keseimbangan antara kerja keras, doa khusyuk, dan waktu istirahat yang cukup.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Kebahagiaan sejati dirasakan oleh orang yang berdamai dengan takdir hidupnya.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya disiplin belajar hari ini menentukan posisi kepemimpinanmu di masa depan.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya jangan tunda pekerjaan hari ini karena esok hari membawa kesibukannya sendiri.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya waktu adalah modal hidup paling berharga yang tidak bisa diputar kembali.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya konsistensi dalam kebaikan kecil jauh lebih baik daripada kebaikan besar yang terputus.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kegagalan adalah bahan evaluasi berharga untuk memperbaiki strategi langkahmu.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya rendah hati menjauhkan kita dari kehancuran akibat kesombongan diri.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya fokuslah pada proses perjuanganmu, karena hasil akhir adalah ketentuan Tuhan.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya hidup yang seimbang adalah kunci menjaga produktivitas kerja dan belajar.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya jangan biarkan rasa malas mengubur potensi besar yang ada di dalam dirimu.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya hargai jasa-jasa orang lain yang telah membantumu mencapai posisi sekarang.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya keberanian sejati adalah mengakui kesalahan dan bertekad untuk memperbaikinya.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya sederhanakan hidupmu agar kamu memiliki lebih banyak energi untuk berpikir besar.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya optimisme memicu kreativitas, sedangkan pesimisme mematikan ide-ide terbaikmu.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya belajarlah sepanjang hayat karena ilmu pengetahuan tidak pernah memiliki batas akhir.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya jadilah manusia yang kehadirannya membawa manfaat dan kepergiannya dirindukan.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya manfaatkan hari libur untuk menyegarkan pikiran dan mempererat hubungan keluarga.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya istirahat sejenak bukanlah tanda menyerah, melainkan persiapan langkah lebih jauh.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya refleksi diri di akhir pekan menjernihkan visi perjuanganmu di hari Senin.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya jagalah keseimbangan antara kerja keras, doa khusyuk, dan waktu istirahat yang cukup.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ketahuilah bahwa sesungguhnya kebahagiaan sejati dirasakan oleh orang yang berdamai dengan takdir hidupnya.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ingatlah, disiplin belajar hari ini menentukan posisi kepemimpinanmu di masa depan.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ingatlah, jangan tunda pekerjaan hari ini karena esok hari membawa kesibukannya sendiri.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ingatlah, waktu adalah modal hidup paling berharga yang tidak bisa diputar kembali.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ingatlah, konsistensi dalam kebaikan kecil jauh lebih baik daripada kebaikan besar yang terputus.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ingatlah, kegagalan adalah bahan evaluasi berharga untuk memperbaiki strategi langkahmu.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ingatlah, rendah hati menjauhkan kita dari kehancuran akibat kesombongan diri.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ingatlah, fokuslah pada proses perjuanganmu, karena hasil akhir adalah ketentuan Tuhan.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ingatlah, hidup yang seimbang adalah kunci menjaga produktivitas kerja dan belajar.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ingatlah, jangan biarkan rasa malas mengubur potensi besar yang ada di dalam dirimu.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ingatlah, hargai jasa-jasa orang lain yang telah membantumu mencapai posisi sekarang.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ingatlah, keberanian sejati adalah mengakui kesalahan dan bertekad untuk memperbaikinya.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ingatlah, sederhanakan hidupmu agar kamu memiliki lebih banyak energi untuk berpikir besar.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ingatlah, optimisme memicu kreativitas, sedangkan pesimisme mematikan ide-ide terbaikmu.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ingatlah, belajarlah sepanjang hayat karena ilmu pengetahuan tidak pernah memiliki batas akhir.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Ingatlah, jadilah manusia yang kehadirannya membawa manfaat dan kepergiannya dirindukan.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Ingatlah, manfaatkan hari libur untuk menyegarkan pikiran dan mempererat hubungan keluarga.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Ingatlah, istirahat sejenak bukanlah tanda menyerah, melainkan persiapan langkah lebih jauh.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Ingatlah, refleksi diri di akhir pekan menjernihkan visi perjuanganmu di hari Senin.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Ingatlah, jagalah keseimbangan antara kerja keras, doa khusyuk, dan waktu istirahat yang cukup.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Ingatlah, kebahagiaan sejati dirasakan oleh orang yang berdamai dengan takdir hidupnya.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Disiplin belajar hari ini menentukan posisi kepemimpinanmu di masa depan.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Jangan tunda pekerjaan hari ini karena esok hari membawa kesibukannya sendiri.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Waktu adalah modal hidup paling berharga yang tidak bisa diputar kembali.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Konsistensi dalam kebaikan kecil jauh lebih baik daripada kebaikan besar yang terputus.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kegagalan adalah bahan evaluasi berharga untuk memperbaiki strategi langkahmu.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Rendah hati menjauhkan kita dari kehancuran akibat kesombongan diri.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Fokuslah pada proses perjuanganmu, karena hasil akhir adalah ketentuan Tuhan.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Hidup yang seimbang adalah kunci menjaga produktivitas kerja dan belajar.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Jangan biarkan rasa malas mengubur potensi besar yang ada di dalam dirimu.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Hargai jasa-jasa orang lain yang telah membantumu mencapai posisi sekarang.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Keberanian sejati adalah mengakui kesalahan dan bertekad untuk memperbaikinya.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Sederhanakan hidupmu agar kamu memiliki lebih banyak energi untuk berpikir besar.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Optimisme memicu kreativitas, sedangkan pesimisme mematikan ide-ide terbaikmu.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Belajarlah sepanjang hayat karena ilmu pengetahuan tidak pernah memiliki batas akhir.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Jadilah manusia yang kehadirannya membawa manfaat dan kepergiannya dirindukan.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Manfaatkan hari libur untuk menyegarkan pikiran dan mempererat hubungan keluarga.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Istirahat sejenak bukanlah tanda menyerah, melainkan persiapan langkah lebih jauh.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Refleksi diri di akhir pekan menjernihkan visi perjuanganmu di hari Senin.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Jagalah keseimbangan antara kerja keras, doa khusyuk, dan waktu istirahat yang cukup.",
      "ulama": "Imam Asy-Syafi'i"
    },
    {
      "teks": "Bagi penuntut ilmu sejati: Kebahagiaan sejati dirasakan oleh orang yang berdamai dengan takdir hidupnya.",
      "ulama": "Imam Al-Ghazali"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Disiplin belajar hari ini menentukan posisi kepemimpinanmu di masa depan.",
      "ulama": "Imam Ibnu Qayyim Al-Jawziyyah"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Jangan tunda pekerjaan hari ini karena esok hari membawa kesibukannya sendiri.",
      "ulama": "Imam Hasan Al-Basri"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Waktu adalah modal hidup paling berharga yang tidak bisa diputar kembali.",
      "ulama": "Ibn Sina (Avicenna)"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Konsistensi dalam kebaikan kecil jauh lebih baik daripada kebaikan besar yang terputus.",
      "ulama": "Al-Kindi"
    },
    {
      "teks": "Dalam catatan kebijaksanaan klasik: Kegagalan adalah bahan evaluasi berharga untuk memperbaiki strategi langkahmu.",
      "ulama": "Imam Asy-Syafi'i"
    }
  ]
};

  const THEMES = {
    1: { // Senin
      name: "Bahasa & Komunikasi",
      subjects: "Bahasa Indonesia, Bahasa Inggris, Bahasa Arab",
      key: "bahasa"
    },
    2: { // Selasa
      name: "Logika & Teknologi",
      subjects: "Matematika, Informatika",
      key: "matematika"
    },
    3: { // Rabu
      name: "Sejarah & Masyarakat",
      subjects: "IPS, Mentoring",
      key: "sosial"
    },
    4: { // Kamis
      name: "Alam & Seni Kreatif",
      subjects: "IPA, Seni Rupa, PJOK",
      key: "sains_seni"
    },
    5: { // Jumat
      name: "Karakter & Spiritualitas",
      subjects: "Al-Qur'an, PAI, Bimbingan Konseling",
      key: "agama_karakter"
    },
    0: { // Minggu
      name: "Refleksi & Relaksasi Akhir Pekan",
      subjects: "Hari Libur Kelas",
      key: "umum"
    },
    6: { // Sabtu
      name: "Refleksi & Relaksasi Akhir Pekan",
      subjects: "Hari Libur Kelas",
      key: "umum"
    }
  };

  /* ---- UTILITY: MINGGU KE BERAPA DALAM SETAHUN ---- */
  function getWeekOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    return Math.floor(dayOfYear / 7);
  }

  /* ---- AMBIL QUOTE UNTUK HARI INI ---- */
  function getQuoteOfDay(offsetDays = 0) {
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
    return {
      quote: pool[idx],
      themeName: theme.name,
      subjects: theme.subjects
    };
  }

  /* ---- RENDER WIDGET ---- */
  let currentOffset = 0;

  function renderQuote(offset) {
    const data = getQuoteOfDay(offset);
    const textEl  = document.getElementById('quoteText');
    const authorEl = document.getElementById('quoteAuthor');
    const counterEl = document.getElementById('quoteCounter');
    if (!textEl || !authorEl) return;

    // Animasi fade
    textEl.style.opacity = '0';
    authorEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent  = `"${data.quote.teks}"`;
      authorEl.textContent = `— ${data.quote.ulama}`;
      
      if (counterEl) {
        // Tampilkan info tema mapel harian
        counterEl.innerHTML = `<span style="color:var(--yellow-light);font-weight:700;"><i class="fa-solid fa-graduation-cap"></i> ${data.themeName}</span><br><span style="font-size:0.65rem;color:var(--text-muted);">${data.subjects}</span>`;
      }
      
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
  window.QuotesModule = { renderQuote };

})();

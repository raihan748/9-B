// Konfigurasi Kredensial Admin & Database Gun.js (Non-Module Global Scope)
window.ADMIN_PASSWORDS = {
  HEAD_ADMIN: "rehan1135",
  WALI_KELAS: "wali_kelas_9b",
  SEKRETARIS: "admin9b_keren",
  TEMAN: "tugas_menumpuk"
};

// Daftar relay peer publik Gun.js
window.gunPeers = [
  'https://gun-manhattan.herokuapp.com/gun',
  'https://peer.wall.social/gun',
  'https://gun-us.herokuapp.com/gun',
];

// SINGLETON: Satu instance Gun.js global untuk SEMUA modul
// Ini kunci utama agar sinkronisasi P2P berjalan andal antar perangkat
window.gunDB = Gun(window.gunPeers);


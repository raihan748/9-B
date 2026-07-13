// Konfigurasi Firebase & Kredensial Admin Kelas 9B
window.ADMIN_PASSWORDS = {
  HEAD_ADMIN: "rehan1135",
  WALI_KELAS: "wali_kelas_9b",
  SEKRETARIS: "admin9b_keren",
  TEMAN: "tugas_menumpuk"
};

const firebaseConfig = {
  apiKey: "AIzaSyCjhkRfJ_CnEXyIPjwY-G6EYNBqJF6s4eA",
  authDomain: "kelas-9-b.firebaseapp.com",
  databaseURL: "https://kelas-9-b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kelas-9-b",
  storageBucket: "kelas-9-b.firebasestorage.app",
  messagingSenderId: "40209898093",
  appId: "1:40209898093:web:ca851e9225189b041bfd64"
};

// Inisialisasi Firebase & expose database global
firebase.initializeApp(firebaseConfig);
window.db = firebase.database();

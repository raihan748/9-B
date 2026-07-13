// Konfigurasi Kredensial Admin & Database Firebase
export const ADMIN_PASSWORDS = {
  HEAD_ADMIN: "rehan1135",         // Akses penuh & kontrol sesi
  WALI_KELAS: "wali_kelas_9b",     // Akses reguler
  SEKRETARIS: "admin9b_keren",     // Akses reguler
  TEMAN: "tugas_menumpuk"          // Akses reguler
};

// Firebase Configuration
// Database ini diset open read-write untuk sandbox demo awal agar web 100% langsung berfungsi.
// Anda sangat disarankan untuk membuat proyek Firebase sendiri di console.firebase.google.com
// dan mengganti kredensial di bawah ini dengan milik Anda agar data chat & tugas lebih aman.
export const firebaseConfig = {
  apiKey: "AIzaSyD79N_V1tS0e-4A8bC9dEfGhiJklMnOpQr",
  authDomain: "kelaskuh-9b-demo.firebaseapp.com",
  databaseURL: "https://kelaskuh-9b-demo-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "kelaskuh-9b-demo",
  storageBucket: "kelaskuh-9b-demo.appspot.com",
  messagingSenderId: "987654321098",
  appId: "1:987654321098:web:a1b2c3d4e5f6g7h8i9j0k"
};

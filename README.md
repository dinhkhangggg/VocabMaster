# 🚀 VocabMaster
VocabMaster là một ứng dụng web trò chơi từ vựng tương tác, được trang bị AI thông minh giúp người chơi rèn luyện Tiếng Anh qua các chế độ chơi đa dạng.

## 🌟 Các Tính Năng Nổi Bật

- **Chế độ Nối Từ (Word Chain):** Đối đầu trực tiếp với Bot AI. Bot được trang bị cây Trie (Trie Tree) và hàng trăm từ vựng, tự động loại trừ từ đã dùng và sẽ "đầu hàng" nếu cạn kiệt từ.
- **Mini-Games Giải Trí:** 
  - *Sắp Xếp Từ (Scramble):* Sắp xếp lại các chữ cái bị xáo trộn.
  - *Điền Chữ (Fill-in-the-blank):* Khôi phục các chữ cái bị che khuất.
- **Hệ Thống Tiền Tệ & Cửa Hàng (Store & Inventory):** 
  - Kiếm V-Coins sau mỗi trận đấu.
  - Mua sắm vật phẩm: 🔍 Kính lúp (Gợi ý), ❤️ Bùa hồi sinh (Thêm lượt/thời gian), và 👑 Gói VIP (Hiệu ứng Avatar hoàng kim).
- **Học Tập Tiếng Anh:** Tích hợp bộ từ điển chuẩn, hiển thị phiên âm IPA Quốc tế, Nghĩa tiếng Anh và Nghĩa tiếng Việt. Flashcard tự động lưu các từ mới học.

## 🏗 Cấu trúc 

Dự án được chia làm 2 phần (thích hợp để đẩy lên GitHub và Deploy Internet):

1. **/client (Giao diện React - Vite):** 
   - Đảm nhiệm toàn bộ phần UI/UX, âm thanh và hiệu ứng (Glassmorphism).
   - Tương tác với Backend qua biến môi trường `VITE_API_URL`.
   - Phù hợp để Deploy lên **Firebase Hosting**, Vercel, Netlify...

2. **/server (Máy chủ Node.js - Express):** 
   - Đảm nhiệm xử lý Logic trò chơi, AI nội suy từ vựng và API.
   - Phù hợp để Deploy lên **Render**, Railway, Heroku, hoặc Firebase Cloud Functions.

## 💻 Hướng Dẫn 

1. **Khởi động Máy chủ (Backend):**
   ```bash
   cd server
   npm install
   npm start
   ```
   *Máy chủ chạy ở: `http://localhost:5000`*

2. **Khởi động Giao diện (Frontend):**
   Mở một Terminal khác:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   *Truy cập game tại: `http://localhost:5173`*
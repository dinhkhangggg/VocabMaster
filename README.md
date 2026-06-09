# 🚀 Hướng dẫn Khởi động WordChain AI

Để chạy trò chơi trên máy tính của bạn, bạn cần mở **2 cửa sổ Terminal (Command Prompt / PowerShell)** riêng biệt: một cái cho Máy chủ (Backend) và một cái cho Giao diện (Frontend).

## Bước 1: Khởi động Máy chủ (Backend)
Máy chủ chịu trách nhiệm xử lý logic AI và đọc dữ liệu Từ điển.
1. Mở Terminal mới.
2. Di chuyển vào thư mục `server`:
   ```bash
   cd server
   ```
3. Chạy lệnh khởi động:
   ```bash
   npm start
   ```
> Máy chủ sẽ chạy ở địa chỉ `http://localhost:5000` và kết nối với Frontend.

## Bước 2: Khởi động Giao diện Game (Frontend)
Giao diện React Vite sẽ hiển thị trò chơi trên trình duyệt.
1. Mở một Terminal khác (Giữ nguyên Terminal ở Bước 1).
2. Di chuyển vào thư mục `client`:
   ```bash
   cd client
   ```
3. Chạy lệnh khởi động:
   ```bash
   npm run dev
   ```
> Trình duyệt sẽ hiển thị link (thường là `http://localhost:5173`). Bạn bấm `Ctrl + Click` vào link đó để mở Game.

---

**Lưu ý Tiến độ:** 
Hiện tại AI đang Code API cho 2 Mini-game mới (Sắp xếp từ & Điền từ). Nếu bạn chạy ngay bây giờ, bạn sẽ thấy game nối từ cũ với giao diện Full-screen mới nhất.

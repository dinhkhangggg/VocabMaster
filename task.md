# Kế hoạch Thực thi (VocabMaster Web Fullstack)

## 1. Giai đoạn Khởi tạo (Bootstrapping)
- [x] Khởi tạo thư mục Monorepo (Tạo repo Git)
- [x] Cài đặt Frontend (Vite + React) vào thư mục `client/`
- [x] Cài đặt Backend (Express.js) vào thư mục `server/`
- [x] Thiết lập hệ thống CSS (index.css) với các token Glassmorphism và Dark Mode

## 1. Giao diện & Setting
- [x] Thiết kế `LobbyScreen` cho phép chọn Độ Khó (Dễ/Khó) và Thời gian (5s, 10s, 15s).
- [x] Cập nhật App.jsx để điều hướng Sảnh Chờ -> Game.

## 2. API & Cốt lõi Game
- [x] Cập nhật `GameScreen.jsx` dùng `timeLimit` tuỳ chỉnh.
- [x] Cập nhật `gameController.js` để nhận tham số `difficulty`.

## 3. Flashcard Động & LocalStorage
- [x] Tích hợp LocalStorage vào App.jsx.
- [x] Tự động lưu từ vựng của Bot vào Flashcard khi Bot đánh trả.
- [x] Cập nhật `FlashcardScreen` hiển thị dữ liệu thật.

## 4. Hệ thống Âm thanh (SFX)
- [x] Code bộ tổng hợp âm thanh `SoundManager.js` (AudioContext) chống vỡ tiếng.
- [x] Gắn âm thanh vào lúc Gõ chữ, Submit, Error, Game Over.
- [x] Thêm hiệu ứng Rung lắc (Lỗi) và Pháo hoa (Chiến thắng)
- [x] Code UI Cửa hàng (Mua Avatar/Boosters)
- [x] Code UI Thư viện Flashcard (Hiệu ứng lật thẻ 3D)

## 4. Giai đoạn Đại Tu (Anti-Phèn & Fix Bugs)
- [x] Fix Bug Nối từ: Bổ sung hàm `trim()` và sửa lỗi Regex chữ hoa.
- [x] Bơm vũ khí: Mở rộng `dictionary.json` thêm hàng trăm vần cơ bản để bot không bị "bí".
- [ ] Xóa `alert()`: Tích hợp hệ thống Custom Modal siêu đẹp khi Game Over.
- [ ] Luồng Game (Flow): Xóa bỏ việc bị văng ra `Login` khi thua trận. Thêm màn hình Thống kê.

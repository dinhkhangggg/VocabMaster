# Hướng Dẫn Đưa Game Lên Mạng (Deploy) Từng Bước Một

Để đưa toàn bộ dự án lên Internet miễn phí, chúng ta sẽ chia làm 2 giai đoạn:
1. Đưa **Backend (Máy chủ)** lên `Render.com`.
2. Đưa **Frontend (Giao diện)** lên `Firebase Hosting`.

> [!IMPORTANT]
> TRƯỚC KHI BẮT ĐẦU: Đảm bảo bạn đã đẩy toàn bộ mã nguồn hiện tại lên GitHub (bằng 3 lệnh `git add .`, `git commit -m "..."`, `git push`).

---

## GIAI ĐOẠN 1: TẠO MÁY CHỦ TRÊN RENDER.COM

Render.com sẽ giúp bạn chạy thư mục `server` (Node.js) 24/7 hoàn toàn miễn phí.

1. **Đăng nhập:** Truy cập [Render.com](https://render.com/) và đăng nhập bằng tài khoản GitHub của bạn.
2. **Tạo Web Service mới:** Bấm nút **New +** ở góc phải màn hình, chọn **Web Service**.
3. **Kết nối GitHub:** Render sẽ hiện danh sách các kho code GitHub của bạn. Hãy tìm và chọn Kho (Repository) chứa dự án VocabMaster.
4. **Cấu hình máy chủ:**
   - **Name:** Đặt tên tùy ý (Ví dụ: `vocabmaster-api`)
   - **Region:** Chọn khu vực gần Việt Nam nhất (Ví dụ: `Singapore` hoặc `Frankfurt`).
   - **Branch:** `main`
   - **Root Directory:** Điền `server` (Rất quan trọng, để báo cho Render biết code backend nằm ở đâu).
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Khởi tạo:** Kéo xuống dưới cùng, chọn gói **Free** và bấm nút **Create Web Service**.
6. **Đợi lấy Link:** Quá trình khởi tạo mất khoảng 5-10 phút. Sau khi chạy xong, góc trên bên trái sẽ hiện một đường link (Ví dụ: `https://vocabmaster-api.onrender.com`). Hãy COPY đường link này lại!

---

## GIAI ĐOẠN 2: THIẾT LẬP VÀ ĐƯA GIAO DIỆN LÊN FIREBASE

Bây giờ bạn cần trỏ Giao diện về đường link Render bạn vừa copy, sau đó bắn lên Firebase.

### Bước 1: Nối Giao Diện với Render
1. Mở file `client/.env` trong máy tính của bạn.
2. Sửa lại dòng chữ bên trong thành đường link Render vừa copy (Nhớ không để dấu `/` ở cuối link):
   ```env
   VITE_API_URL=https://vocabmaster-api.onrender.com
   ```

### Bước 2: Khởi tạo Firebase Hosting
Mở Terminal ở máy tính, di chuyển vào thư mục `client` của bạn:
```bash
cd c:\KhangLab\OOP\FinalProject\client
```
Gõ LẦN LƯỢT các lệnh sau:

**1. Đăng nhập Firebase (nếu chưa):**
```bash
firebase login
```
*(Nó sẽ mở trình duyệt để bạn chọn tài khoản Google).*

**2. Khởi tạo dự án Firebase:**
```bash
firebase init hosting
```
Lúc này Terminal sẽ hỏi bạn một số câu, hãy trả lời chính xác như sau:
- *Please select an option:* Dùng phím mũi tên chọn `Use an existing project` và chọn dự án `vocabmaster-hcmute` của bạn.
- *What do you want to use as your public directory?* -> Gõ chữ **`dist`** rồi Enter.
- *Configure as a single-page app (rewrite all urls to /index.html)?* -> Bấm chữ **`y`** (Yes).
- *Set up automatic builds and deploys with GitHub?* -> Bấm chữ **`n`** (No).

### Bước 3: Đóng gói và Phóng lên Internet!
**1. Đóng gói code (Build):**
Vẫn ở trong thư mục `client`, gõ:
```bash
npm run build
```

**2. Đẩy lên Firebase:**
```bash
firebase deploy --only hosting
```

> [!TIP]
> Tèn ten! 🎉 Khi chạy xong, Firebase sẽ in ra một đường link (thường có đuôi là `.web.app`). Bạn hãy copy link đó gửi cho bạn bè chơi bằng điện thoại hay máy tính đều được rồi đấy!

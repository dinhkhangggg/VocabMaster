# 📘 CẨM NANG VẬN HÀNH & TRIỂN KHAI VOCABMASTER AI (SIÊU CHI TIẾT TỪNG BƯỚC)

Tài liệu này được viết dành cho người bắt đầu. Hãy đọc thật kỹ và gõ đúng từng phím một nhé!

---

## PHẦN 1: CÁCH KHỞI TẠO FIREBASE HOSTING (CHỈ LÀM LẦN ĐẦU TIÊN)

Quy trình này dùng để khai báo với Google Firebase rằng máy tính của bạn sẽ quản lý trang web này. **BẠN CHỈ CẦN LÀM QUY TRÌNH NÀY 1 LẦN DUY NHẤT TRONG ĐỜI DỰ ÁN.**

### Bước 1: Mở Terminal (Command Prompt / PowerShell)
Mở một cửa sổ Terminal hoàn toàn mới. 

### Bước 2: Di chuyển BẮT BUỘC vào thư mục `client`
Mọi thao tác liên quan đến Firebase Giao Diện đều phải nằm trong thư mục `client`. Hãy gõ chính xác lệnh sau rồi ấn Enter:
```bash
cd C:\KhangLab\OOP\FinalProject\client
```

### Bước 3: Đăng nhập Firebase
```bash
firebase login
```
*(Nếu nó hỏi "Allow Firebase to collect CLI and Emulator Suite usage...", gõ **Y** rồi Enter. Trình duyệt sẽ bật lên, bạn chọn tài khoản Google của bạn và bấm "Cho phép / Allow").*

### Bước 4: Khởi tạo Hosting (ĐẶC BIỆT CHÚ Ý TỪNG NÚT BẤM)
Tiếp tục gõ lệnh:
```bash
firebase init hosting
```
Lúc này trên màn hình Terminal sẽ hiện ra một loạt các câu hỏi tiếng Anh y hệt như hình bạn vừa chụp. Hãy thao tác CHÍNH XÁC như sau:

1. **Are you ready to proceed?**
   - Gõ chữ **`y`** (Yes).
   - Ấn phím `Enter`.
2. **Please select an option / Project Setup:** 
   - Dùng phím ⬇️ Mũi Tên Xuống để trỏ vào dòng `Use an existing project`.
   - Ấn phím `Enter`.
   - Chọn tiếp `vocabmaster-hcmute` (hoặc tên dự án của bạn). Ấn `Enter`.
3. **What do you want to use as your public directory?**
   - Lệnh này hỏi bạn thư mục nào chứa file web.
   - BẠN BẮT BUỘC PHẢI GÕ CHỮ: **`dist`** (D - I - S - T).
   - Ấn phím `Enter`.
4. **Configure as a single-page app (rewrite all urls to /index.html)?**
   - Gõ chữ **`y`** (Yes).
   - Ấn phím `Enter`.
5. **Set up automatic builds and deploys with GitHub?**
   - Gõ chữ **`n`** (No).
   - Ấn phím `Enter`.
6. **File dist/index.html already exists. Overwrite?** (Chỉ hiện ra nếu bạn đã từng chạy lệnh build).
   - Gõ chữ **`n`** (No).
   - Ấn phím `Enter`.
7. **Would you like to install agent skills for Firebase?**
   - Gõ chữ **`n`** (No).
   - Ấn phím `Enter`.

👉 *Terminal báo "Firebase initialization complete!" kèm dấu cộng màu xanh lá là bạn đã thành công 100%. Lúc này bạn có thể gõ lệnh `npm run build` được rồi!*

---

## PHẦN 2: CÁCH ĐƯA CODE LÊN MẠNG (LÀM MỖI KHI CÓ CẬP NHẬT MỚI)

Mỗi khi bạn sửa một dòng code, một cái ảnh, hay thêm từ vựng mới... Bạn BẮT BUỘC phải làm quy trình 2 phần dưới đây để mạng Internet được cập nhật.

### BƯỚC 2A: Đẩy Máy chủ (Backend) lên Render.com qua GitHub
Mở Terminal, truy cập vào **THƯ MỤC GỐC**:
```bash
cd C:\KhangLab\OOP\FinalProject
```

Gõ LẦN LƯỢT 3 lệnh sau (Ấn Enter sau mỗi lệnh):
```bash
git add .
git commit -m "Cập nhật tính năng mới"
git push
```
> **Chú ý:** Ngay khi gõ xong lệnh `git push`, máy chủ Render.com sẽ tự động "đánh hơi" thấy code mới. Nó sẽ mất tầm 2-5 phút để tải code về và khởi động lại. Trong 2-5 phút này, game có thể báo lỗi mất kết nối, hãy kiên nhẫn đợi nhé!

### BƯỚC 2B: Đóng gói và đẩy Giao Diện lên Firebase
Mở Terminal, truy cập vào **THƯ MỤC CLIENT**:
```bash
cd C:\KhangLab\OOP\FinalProject\client
```

Gõ LẦN LƯỢT 2 lệnh sau:
**Lệnh 1: Nén code lại thành file siêu nhẹ**
```bash
npm run build
```
*(Đợi máy tính chạy xong, nó sẽ báo "built in ...ms")*

**Lệnh 2: Bắn file đã nén lên Google Firebase**
```bash
firebase deploy --only hosting
```
*(Chạy xong nó sẽ báo "Deploy complete!" và cấp cho bạn đường link Web để chơi).*

---

## PHẦN 3: CÁCH CHẠY THỬ NGHIỆM TẠI NHÀ (LOCAL DEV)

Đây là khi bạn chỉ muốn mở game lên xem thử ở máy mình (Localhost) chứ chưa muốn đẩy lên Internet.

**1. Mở Cửa Sổ Terminal 1 (Dành cho Máy chủ):**
```bash
cd C:\KhangLab\OOP\FinalProject\server
npm run dev
```
> **CHÚ Ý:** Lúc này bạn sẽ thấy dòng chữ `Server is running on port 5000`. 
> - TUYỆT ĐỐI KHÔNG tắt cửa sổ đen (Terminal) này đi. Cứ để nó thu nhỏ xuống thanh Taskbar.
> - Nếu nó hiện dòng chữ đỏ chót báo lỗi `Error: listen EADDRINUSE: address already in use :::5000`, nghĩa là cổng 5000 đã bị chiếm. Hãy khởi động lại máy tính, hoặc mở file `server/src/index.js` đổi số `5000` thành `5001`.

**2. Mở Cửa Sổ Terminal 2 (Dành cho Giao Diện):**
```bash
cd C:\KhangLab\OOP\FinalProject\client
npm run dev
```
> **CHÚ Ý:** Lúc này bạn sẽ thấy dòng chữ `http://localhost:5173`. Bạn nhấn giữ phím `Ctrl` trên bàn phím và ấn Chuột Trái vào dòng chữ đó để mở trình duyệt web lên chơi!

---

## PHẦN 5: CƠ CHẾ TỰ ĐỘNG CHUYỂN ĐỔI ONLINE / OFFLINE (BÍ MẬT CỦA .ENV)

Bạn thắc mắc làm sao Giao diện biết lúc nào kết nối vào `localhost` lúc nào kết nối vào `Render.com` đúng không? Tôi vừa cài đặt cho bạn một "Phép thuật" có sẵn của Vite.

Trong thư mục `client`, thay vì dùng chung 1 file `.env`, tôi đã tách ra làm 2 file cho 2 chế độ riêng biệt:

1. **File `client/.env.development` (Dành cho chế độ Offline tại nhà):**
   - Chứa dòng: `VITE_API_URL=http://localhost:5000`
   - **Cách kích hoạt:** Bất cứ khi nào bạn gõ lệnh `npm run dev`, hệ thống sẽ **tự động** lấy link trong file này để kết nối vào máy tính của bạn.

2. **File `client/.env.production` (Dành cho chế độ Online lên mạng):**
   - Chứa dòng: `VITE_API_URL=https://vocabmaster-bwxy.onrender.com`
   - **Cách kích hoạt:** Bất cứ khi nào bạn gõ lệnh `npm run build` để ném lên Firebase, hệ thống sẽ **tự động** lấy link trong file này để gắn vào bản cài đặt.
   - **Lưu ý:** Nếu sau này bạn có tạo lại Máy chủ mới trên Render, nhớ mở file này ra thay lại đường link mới nhé!

Nhờ cách tách biệt này, từ nay về sau bạn KHÔNG BAO GIỜ cần sửa đi sửa lại link kết nối nữa. Code ở nhà tự chạy ở nhà, đẩy lên mạng tự động thành code mạng! Quá nhàn hạ phải không!

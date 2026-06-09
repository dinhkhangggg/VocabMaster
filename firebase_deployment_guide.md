# Hướng Dẫn Triển Khai (Deploy) Game Lên Internet Từ A - Z

Lý do bản web bạn vừa đẩy lên Firebase "lỏ" và không chạy được là vì: **Giao diện Web thì đã nằm trên mạng (Firebase), nhưng nó lại đang tìm Máy chủ Backend ở địa chỉ `http://localhost:5000` (tức là máy tính ở nhà của bạn)!** Khi người khác hoặc bạn truy cập bằng điện thoại, điện thoại không có chạy cái Backend đó, nên Game bị liệt hoàn toàn.

Để Game hoạt động thực sự trên Internet, bạn phải làm **2 việc**:
1. Đưa cái **Backend (Server)** lên mạng.
2. Sửa lại code giao diện (Client) để nó gọi tới địa chỉ của cái Backend trên mạng (chứ không gọi `localhost` nữa), sau đó mới đẩy lại giao diện lên **Firebase Hosting**.

Dưới đây là hướng dẫn từ A-Z dễ nhất và HOÀN TOÀN MIỄN PHÍ.

---

## PHẦN 1: ĐƯA BACKEND LÊN MẠNG (Dùng Render.com vì Firebase Functions bắt nhập thẻ Visa)
*Firebase có hỗ trợ chạy Backend (Cloud Functions), nhưng nó BẮT BUỘC bạn phải có thẻ Visa/Mastercard để nâng cấp gói Blaze. Nên để miễn phí 100%, ta sẽ đẩy Backend lên **Render**.*

1. **Chuẩn bị code Backend:**
   - Đảm bảo bạn đã đưa toàn bộ thư mục code `FinalProject` của bạn lên **GitHub**.
2. **Triển khai lên Render:**
   - Truy cập trang web [Render.com](https://render.com/) và đăng nhập bằng GitHub.
   - Bấm nút **New +** -> Chọn **Web Service**.
   - Trỏ tới kho lưu trữ (Repository) GitHub chứa code của bạn.
   - Ở phần cấu hình:
     - **Root Directory:** Gõ vào `server` (Vì backend của bạn nằm trong thư mục server).
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - Kéo xuống chọn bản **Free** và bấm **Create Web Service**.
3. **Lấy địa chỉ Máy Chủ Mới:**
   - Đợi khoảng 5-10 phút cho Render khởi động máy chủ.
   - Khi xong, Render sẽ cấp cho bạn một đường link, ví dụ: `https://vocabmaster-backend.onrender.com`. Hãy copy đường link này lại!

---

## PHẦN 2: CẬP NHẬT GIAO DIỆN CLIENT & ĐẨY LÊN FIREBASE HOSTING

Bây giờ giao diện phải được "chỉ đường" để kết nối với cái Backend mới trên Render.

### Bước 1: Sửa lại tất cả chữ `localhost` trong Client
Bạn cần mở code trong thư mục `client/src/components/GameScreen.jsx` và các file khác nếu có.
- Thay thế toàn bộ chữ `http://localhost:5000` thành cái link Render bạn vừa copy ở trên.
- **Ví dụ:** 
  Từ: `fetch('http://localhost:5000/api/game/minigame?mode=...')`
  Thành: `fetch('https://vocabmaster-backend.onrender.com/api/game/minigame?mode=...')`
 *(Sửa ở tất cả các hàm: `fetchMiniGameWord`, `handleUseHint`, `handleSubmit`)*

### Bước 2: Build (Đóng gói) lại giao diện
Mở Terminal, trỏ vào thư mục `client` của bạn:
```bash
cd c:\KhangLab\OOP\FinalProject\client
npm run build
```
Lệnh này sẽ tạo ra một thư mục `dist` chứa code đã được tối ưu hóa cùng đường link Backend mới.

### Bước 3: Đẩy lên Firebase Hosting
Bây giờ thì bạn đẩy lên Firebase như cũ:
1. Đăng nhập Firebase (nếu chưa đăng nhập):
   ```bash
   firebase login
   ```
2. Khởi tạo (nếu máy hỏi cấu hình):
   ```bash
   firebase init hosting
   ```
   - *What do you want to use as your public directory?* -> Gõ `dist`
   - *Configure as a single-page app?* -> Bấm `y` (Yes)
   - *Set up automatic builds?* -> Bấm `n` (No)
   - *File dist/index.html already exists. Overwrite?* -> Bấm `n` (Không ghi đè)

3. **Bắn lên vũ trụ:**
   ```bash
   firebase deploy --only hosting
   ```

Tèn ten! Firebase sẽ cấp cho bạn đường link website (Ví dụ: `https://vocabmaster-hcmute.web.app`). Bây giờ game của bạn đã chính thức Live trên mạng, ai dùng điện thoại hay máy tính bấm vào link cũng đều chơi được hết!

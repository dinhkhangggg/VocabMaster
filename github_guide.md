# Hướng Dẫn Đưa Code Lên GitHub Từ A - Z

Tôi đã tạo sẵn file `.gitignore` ở thư mục gốc của dự án để đảm bảo bạn sẽ không lỡ đẩy những thư mục rác (như `node_modules`) hoặc các thông tin bảo mật (file `.env`) lên mạng.

Bây giờ bạn chỉ cần làm theo các bước sau để đưa toàn bộ dự án lên GitHub.

## Bước 1: Tạo kho lưu trữ (Repository) trên GitHub
1. Truy cập trang web [GitHub.com](https://github.com/) và đăng nhập tài khoản của bạn.
2. Bấm vào nút dấu **+** ở góc trên cùng bên phải và chọn **New repository**.
3. Đặt tên cho Repository (Ví dụ: `VocabMaster`).
4. Phần "Public/Private" tùy bạn chọn (Public thì ai cũng xem code được, Private thì chỉ mình bạn).
5. Để trống hoàn toàn các tùy chọn (Không tick vào Add a README, không chọn Add .gitignore).
6. Bấm **Create repository**.

## Bước 2: Liên kết code dưới máy tính với GitHub
Mở Terminal / Command Prompt tại thư mục gốc của dự án (`c:\KhangLab\OOP\FinalProject`) và gõ LẦN LƯỢT các lệnh sau:

**1. Khởi tạo Git (nếu chưa có)**
```bash
git init
```

**2. Gom tất cả các file lại**
```bash
git add .
```

**3. Đóng gói (Commit) những thay đổi này**
```bash
git commit -m "Khởi tạo dự án VocabMaster"
```

**4. Thiết lập nhánh chính là `main`**
```bash
git branch -M main
```

**5. Kết nối với kho lưu trữ GitHub của bạn**
*(Lưu ý: Bạn phải copy đường link mà GitHub vừa tạo cho bạn ở Bước 1 để thay vào dòng dưới. Dưới đây là ví dụ minh họa)*
```bash
git remote add origin https://github.com/TenCuaBan/VocabMaster.git
```

**6. Bắn toàn bộ code lên Vũ Trụ (GitHub)**
```bash
git push -u origin main
```

*(Nếu nó yêu cầu đăng nhập, bạn cứ nhập tài khoản GitHub hoặc đăng nhập qua trình duyệt là xong)*.

## Bước 3: Hoàn tất
Lên lại trang GitHub lúc nãy và F5. Bạn sẽ thấy toàn bộ code (cả client và server) của bạn đã nằm an toàn trên đó! 

Từ nay về sau, nếu bạn có sửa code thêm gì mới, bạn chỉ cần gõ đúng 3 lệnh này là nó tự cập nhật lên GitHub:
```bash
git add .
git commit -m "Ghi chú sửa lỗi..."
git push
```

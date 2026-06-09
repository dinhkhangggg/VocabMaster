import os
import json

def doc_du_lieu_tu_dien(file_dict_txt):
    dict_data = {}
    if not os.path.exists(file_dict_txt):
        print(f"Lỗi: Không tìm thấy file từ điển gốc '{file_dict_txt}'!")
        return dict_data
        
    current_word = None
    current_content = []
    
    print("Đang nạp từ điển Anh-Việt vào bộ nhớ, vui lòng đợi...")
    with open(file_dict_txt, 'r', encoding='utf-8') as f:
        for line in f:
            line_str = line.strip()
            if not line_str:
                continue
            if line_str.startswith('@'):
                if current_word:
                    dict_data[current_word] = " | ".join(current_content).strip()
                parts = line_str[1:].split(' ', 1)
                current_word = parts[0].lower()
                current_content = [parts[1]] if len(parts) > 1 else []
            else:
                if current_word:
                    current_content.append(line_str)
                    
        if current_word:
            dict_data[current_word] = " | ".join(current_content).strip()
            
    print(f"Nạp thành công {len(dict_data)} từ vào bộ nhớ.")
    return dict_data

def tao_json_game_noi_tu(file_dau_vao, file_dict_txt, file_json_dau_ra):
    tu_dien_nen = doc_du_lieu_tu_dien(file_dict_txt)
    if not tu_dien_nen:
        return

    if not os.path.exists(file_dau_vao):
        print(f"Lỗi: Không tìm thấy file '{file_dau_vao}'!")
        return
        
    print(f"Đang đọc file {file_dau_vao}...")
    with open(file_dau_vao, 'r', encoding='utf-8') as f:
        cac_tu = [line.strip().lower() for line in f if line.strip()]

    print("Đang cấu trúc lại dữ liệu sang dạng JSON nhóm theo chữ cái đầu...")
    
    json_data = {}
    
    for tu in cac_tu:
        if not tu:
            continue
        chu_cai_dau = tu[0] 
        
        if tu in tu_dien_nen:
            thong_tin = tu_dien_nen[tu]
        else:
            thong_tin = "[Chưa tìm thấy nghĩa hoặc IPA]"
            
        if chu_cai_dau not in json_data:
            json_data[chu_cai_dau] = {}
            
        json_data[chu_cai_dau][tu] = thong_tin

    print(f"Đang ghi dữ liệu ra file JSON '{file_json_dau_ra}'...")
    with open(file_json_dau_ra, 'w', encoding='utf-8') as f:

        json.dump(json_data, f, ensure_ascii=False, indent=4)
        
    print("=== HOÀN THÀNH TẠO FILE JSON CHƠI GAME NỐI TỪ! ===")

if __name__ == "__main__":
    tao_json_game_noi_tu('words.txt', 'anhviet109K.txt', 'dictionary.json')
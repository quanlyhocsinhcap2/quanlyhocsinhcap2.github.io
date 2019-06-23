//var Dia_chi_Dich_vu = "http://localhost:1000"
var Dia_chi_Dich_vu = "https://dv-dulieu-quanlyhocsinh.herokuapp.com/"
var Dia_chi_Media = "https://dv-media-vietanh.herokuapp.com/"

function Doc_Danh_sach_Hoc_sinh() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_Hoc_sinh`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Doc_Nhat_ky_Diem_danh() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Doc_Danh_sach_Nhat_ky`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Ghi_Danh_sach_Vang(Danh_sach_Vang) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Ghi_danh_sach_Vang`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(Danh_sach_Vang)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}

function Ghi_Nhat_ky_Diem_danh(noi_dung) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Ghi_Nhat_ky`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = JSON.stringify(noi_dung)
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}

function Xuat_Danh_sach_Hoc_sinh(Danh_sach, Th_Cha) {
    Th_Cha.innerHTML = ""
    Danh_sach.forEach(Hoc_sinh => {
            var The_hien = document.createElement("div")
            var text_css = ""
            var dsDaChon;
            if (sessionStorage.getItem("Danh_sach_Chon") != undefined) {
                var dsChon = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"))
                var vt = dsChon.indexOf(Hoc_sinh.Ma_so)
                if (vt != -1) {
                    The_hien.className = "CHON "
                }
            }
            if (sessionStorage.getItem("Danh_sach_Da_Chon") != undefined) {
                var dsChon = JSON.parse(sessionStorage.getItem("Danh_sach_Da_Chon"))
                dsDaChon = dsChon;
                var vt = dsChon.indexOf(Hoc_sinh.Ma_so)
                if (vt != -1) {
                    The_hien.className = "CHON Da_Chon "
                    The_hien.style.cssText = "background-color: gray;"
                    text_css = "color_ten"
                }
            }
            The_hien.className += "card m-1"
            The_hien.style.cssText = "float:left;display: block;width:10rem;height:7rem"
            The_hien.setAttribute("Ma_so", Hoc_sinh.Ma_so)

            var Noi_dung_HTML = `
        
        <div class="card-body">
        <img class="card-img-top" src="${Dia_chi_Media}/HS_1.png" style="width:30px" alt="">
            <p class="card-title text-primary ${text_css}">${Hoc_sinh.Ho_ten}</p>
        </div>
        `
            The_hien.innerHTML = Noi_dung_HTML
            Th_Cha.appendChild(The_hien)
            var flag = 0;
            The_hien.onclick = () => {
                if (dsDaChon != undefined) {
                    dsDaChon.forEach(x => {
                        if (Hoc_sinh.Ma_so == x) {
                            Th_ThongBao.innerHTML = `<div class="alert alert-warning alert-dismissible fade show">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>Cảnh báo!</strong> Bạn không thể bỏ chọn học sinh đã được lưu
      </div>`
                            flag++;
                        }
                    })
                }


                if (flag == 0) {
                    The_hien.classList.toggle("CHON")

                    // Lưu Session HTML5
                    var ds = []
                    if (sessionStorage.getItem("Danh_sach_Chon") != undefined) {
                        ds = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"))
                    }
                    var vt = ds.indexOf(Hoc_sinh.Ma_so)
                    if (vt == -1) {
                        ds.push(Hoc_sinh.Ma_so) // Thêm
                    } else {
                        ds.splice(vt, 1) // Xóa
                    }

                    if (ds.length > 0) {
                        sessionStorage.setItem("Danh_sach_Chon", JSON.stringify(ds))
                    } else {
                        sessionStorage.removeItem("Danh_sach_Chon")
                    }
                    var ds_da_Chon = []
                    if (sessionStorage.getItem("Danh_sach_Da_Chon") != undefined) {
                        ds_da_Chon = JSON.parse(sessionStorage.getItem("Danh_sach_Da_Chon"))
                    }

                    Th_Gio_hang.innerHTML = `<u><span style="font-weight: bold;"> ${ds.length + ds_da_Chon.length} </span> học sinh</u>`
                }
            }
        })
        // Th_Thong_bao.innerHTML = `Tổng số học sinh: ${Danh_sach.length}`;
}

function Gui_email_Hoc_sinh_Vang(noi_dung) {
    var Kq = ""
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=Thong_bao_Hoc_sinh_Vang_Email`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    var Chuoi_goi = noi_dung
    Xu_ly_HTTP.send(Chuoi_goi)
    Kq = Xu_ly_HTTP.responseText
    return Kq
}
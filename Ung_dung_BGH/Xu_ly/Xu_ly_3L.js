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
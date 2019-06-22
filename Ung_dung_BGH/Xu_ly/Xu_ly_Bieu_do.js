function Bieu_Do(Th_bieu_do, dsDT, du_Lieu, ngay, lop) {
    Highcharts.setOptions({
        lang: {
            numericSymbols: [` buổi `],
            //numericSymbolMagnitude: 1000,
            decimalPoint: ',', ///phân cách thập phân
            thousandsSep: '.' ///hàng ngàn
        },
        chart: {
            style: {
                fontFamily: `tahoma`, /// chỉnh font cho chữ thống dc đúng
                fontSize: 16
            }
        }
    })


    Highcharts.chart(Th_bieu_do, {
        chart: {
            type: 'column' // column, bar, line
        },
        title: {
            text: `Thống kê số học sinh nghỉ học ${ngay}`
        },
        subtitle: {
            text: `Học sinh lớp ${lop}`
        },
        xAxis: {
            categories: dsDT
        },
        yAxis: {
            title: {
                text: 'Số lần nghỉ học'
            }
        },

        series: du_Lieu
    });
}
const form = document.getElementById('myForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const soThe = document.getElementById('SoThe').value;
    const ngayBatDau = document.getElementById('NgayBatDau').value;
    const ngayKetThuc = document.getElementById('NgayKetThuc').value;
    const ghiChu = document.getElementById('GhiChu').value;

    const data = {
        SoThe: soThe,
        NgayBatDau: ngayBatDau,
        NgayKetThuc: ngayKetThuc,
        GhiChu: ghiChu
    };

    fetch('http://localhost:3003/api/thethuvien', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(() => {
            alert('Tạo thành công');
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
let Api = 'http://codeduo.click/api/sach'

function start() {
    getBooks(renderBooks);
    handleCreateForm();
}

start()

function getBooks(callback) {
    fetch(Api)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}

function renderBooks(books) {
    let listBooks = document.querySelector('.list-books');
    let htmls = books.map(function (book) {
        return `
          <tr class="book-item-${book.MaSach} list-item">
              <td class ="book-item-MaSach-${book.MaSach}">${book.MaSach}</td>
              <td class ="book-item-TenSach-${book.MaSach}">${book.TenSach}</td>
              <td class ="book-item-MaTacGia-${book.MaSach}">${book.MaTacGia[1]}</td>
              <td class ="book-item-MaTheLoai-${book.MaSach}">${book.MaTheLoai[1]}</td>
              <td class ="book-item-MaNXB-${book.MaSach}">${book.MaNXB[1]}</td>
              <td class ="book-item-NamXB-${book.MaSach}">${book.NamXB}</td>
              <td class = "">
                <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"">Xóa</button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Bạn chắc chắn muốn xóa trường này?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="handleDelete('${book.MaSach}')">Xóa</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="handleUpdate('${book.MaSach}')">Sửa</button>
              </td>
          </tr>`
    })
    htmls.reverse();
    listBooks.innerHTML = htmls.join('');
}

function createBook(data, callback) {
    let options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    fetch(Api, options)
        .then(callback)
}
function handleCreateForm() {
    let createBtn = document.querySelector('.create')
    createBtn.onclick = function () {
        let MaSach = document.querySelector('input[name="MaSach"]').value
        let TenSach = document.querySelector('input[name="TenSach"]').value
        let MaTacGia = document.querySelector('input[name="MaTacGia"]').value
        let MaTheLoai = document.querySelector('input[name="MaTheLoai"]').value
        let MaNXB = document.querySelector('input[name="MaNXB"]').value
        let NamXB = document.querySelector('input[name="NamXB"]').value
        const formData = { MaSach, TenSach, MaTacGia, MaTheLoai, MaNXB, NamXB }
        console.log(formData)
        createBook(formData, getBooks(renderBooks))
        getBooks(renderBooks)
    }
}


function handleDelete(MaSach) {
    let options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }

    fetch(Api + MaSach, options)
        .then(function () {
            document.querySelector(`.book-item-${MaSach}`).remove();
        })
}

function handleUpdate(MaSach) {
    updateBtn = document.querySelector('.update');
    document.querySelector('.update').style.display = 'inline-block';
    document.querySelector('.create').style.display = 'none';
    let TenSach = document.querySelector(`.book-item-TenSach-${MaSach}`).innerText;
    let MaTacGia = document.querySelector(`.book-item-MaTacGia-${MaSach}`).innerText;
    let MaTheLoai = document.querySelector(`.book-item-MaTheLoai-${MaSach}`).innerText;
    let MaNXB = document.querySelector(`.book-item-MaNXB-${MaSach}`).innerText;
    let NamXB = document.querySelector(`.book-item-NamXB-${MaSach}`).innerText;
    document.querySelector('input[name="MaSach"]').value = MaSach;
    document.querySelector('input[name="TenSach"]').value = TenSach;
    document.querySelector('input[name="MaTacGia"]').value = MaTacGia;
    document.querySelector('input[name="MaTheLoai"]').value = MaTheLoai;
    document.querySelector('input[name="MaNXB"]').value = MaNXB;
    document.querySelector('input[name="NamXB"]').value = NamXB;
    updateBtn.onclick = () => {
        let TenSach = document.querySelector('input[name="TenSach"]').value;
        let MaTacGia = document.querySelector('input[name="MaTacGia"]').value;
        let MaTheLoai = document.querySelector('input[name="MaTheLoai"]').value;
        let MaNXB = document.querySelector('input[name="MaNXB"]').value;
        let NamXB = document.querySelector('input[name="NamXB"]').value;
        editBook({ MaSach, TenSach, MaTacGia, MaTheLoai, MaNXB, NamXB });
        console.log({ MaSach, TenSach, MaTacGia, MaTheLoai, MaNXB, NamXB });
    };
}

function editBook(book) {
    console.log(Api + book.MaSach)
    fetch(Api + book.MaSach, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })

        .then(function () {
            document.querySelector('input[name="MaSach"]').value = '';
            document.querySelector('input[name="TenSach"]').value = '';
            document.querySelector('input[name="MaTacGia"]').value = '';
            document.querySelector('input[name="MaTheLoai"]').value = '';
            document.querySelector('input[name="MaNXB"]').value = '';
            document.querySelector('input[name="NamXB"]').value = '';
            getBooks(renderBooks);
        })
}


document.querySelector('.add-book').onclick = function () {
    document.querySelector('.update').style.display = 'none'
    document.querySelector('.create').style.display = 'inline-block'
    document.querySelector('input[name="MaSach"]').value = ""
    document.querySelector('input[name="TenSach"]').value = ""
    document.querySelector('input[name="MaTacGia"]').value = "";
    document.querySelector('input[name="MaTheLoai"]').value = "";
    document.querySelector('input[name="MaNXB"]').value = "";
    document.querySelector('input[name="NamXB"]').value = "";
}

function logout() {
    // Xoá thông tin đăng nhập trong session storage
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('accessToken');

    // Chuyển hướng đến trang đăng nhập
    window.location.href = 'login.html';
}


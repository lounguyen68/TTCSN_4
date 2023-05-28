let Api = 'http://localhost:3003/api/docgia/'

function start() {
    getUsers(renderUsers);
    handleCreateForm();
}

start()

function getUsers(callback) {
    fetch(Api)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Có lỗi xảy ra khi lấy user.');
            }
            return response.json();
        })
        .then(callback)
}

function renderUsers(users) {
    let listUsers = document.querySelector('.list-users');
    let htmls = users.map(function (user) {
        return `
          <tr class="user-item-${user.MaDocGia} list-item">
              <td class ="user-item-MaDocGia-${user.MaDocGia}">${user.MaDocGia}</td>
              <td class ="user-item-TenDocGia-${user.MaDocGia}">${user.TenDocGia}</td>
              <td class ="user-item-DiaChi-${user.MaDocGia}">${user.DiaChi}</td>
              <td class ="user-item-SoThe-${user.MaDocGia}">${user.SoThe}</td>
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
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="handleDelete('${user.MaDocGia}')">Xóa</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="handleUpdate('${user.MaDocGia}')">Sửa</button>
              </td>
          </tr>`
    })
    htmls.reverse();
    listUsers.innerHTML = htmls.join('');
}

function createUser(data, callback) {
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
        let MaDocGia = document.querySelector('input[name="MaDocGia"]').value
        let TenDocGia = document.querySelector('input[name="TenDocGia"]').value
        let DiaChi = document.querySelector('input[name="DiaChi"]').value
        let SoThe = document.querySelector('input[name="SoThe"]').value
        const formData = { MaDocGia, TenDocGia, DiaChi, SoThe }
        console.log(formData)
        createUser(formData, getUsers(renderUsers))
        getUsers(renderUsers)
    }
}


function handleDelete(MaDocGia) {
    let options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(Api + MaDocGia, options)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Có lỗi xảy ra khi xóa user.');
            }
            document.querySelector(`.user-item-${MaDocGia}`).remove();
        })
}

function handleUpdate(MaDocGia) {
    updateBtn = document.querySelector('.update');
    document.querySelector('.update').style.display = 'inline-block';
    document.querySelector('.create').style.display = 'none';
    let TenDocGia = document.querySelector(`.user-item-TenDocGia-${MaDocGia}`).innerText;
    let DiaChi = document.querySelector(`.user-item-DiaChi-${MaDocGia}`).innerText;
    let SoThe = document.querySelector(`.user-item-SoThe-${MaDocGia}`).innerText;
    document.querySelector('input[name="MaDocGia"]').value = MaDocGia;
    document.querySelector('input[name="TenDocGia"]').value = TenDocGia;
    document.querySelector('input[name="DiaChi"]').value = DiaChi;
    document.querySelector('input[name="SoThe"]').value = SoThe;
    updateBtn.onclick = () => {
        let TenDocGia = document.querySelector('input[name="TenDocGia"]').value;
        let DiaChi = document.querySelector('input[name="DiaChi"]').value;
        let SoThe = document.querySelector('input[name="SoThe"]').value;
        editUser({ MaDocGia, TenDocGia, DiaChi, SoThe });
    };
}

function editUser(user) {
    console.log(Api + user.MaDocGia)
    fetch(Api + user.MaDocGia, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

        .then(function () {
            document.querySelector('input[name="MaDocGia"]').value = '';
            document.querySelector('input[name="TenDocGia"]').value = '';
            document.querySelector('input[name="DiaChi"]').value = '';
            document.querySelector('input[name="SoThe"]').value = '';
            getUsers(renderUsers);
        })
}


document.querySelector('.add-user').onclick = function () {
    document.querySelector('.update').style.display = 'none'
    document.querySelector('.create').style.display = 'inline-block'
    document.querySelector('input[name="MaDocGia"]').value = '';
    document.querySelector('input[name="TenDocGia"]').value = '';
    document.querySelector('input[name="DiaChi"]').value = '';
    document.querySelector('input[name="SoThe"]').value = '';
}

function logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('accessToken');
    window.location.href = 'login.html';
}

document.getElementById('searchBtn').addEventListener('click', function (event) {
    event.preventDefault();
    searchUsers();
});

function searchUsers() {
    let searchValue = document.getElementById('searchInput').value;
    getUsers(function (users) {
        let filteredUsers = users.filter(function (user) {
            return user.TenDocGia.toLowerCase().includes(searchValue.toLowerCase());
        });
        renderUsers(filteredUsers);
    });
}





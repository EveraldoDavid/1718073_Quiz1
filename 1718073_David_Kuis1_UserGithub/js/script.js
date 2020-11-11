function CariFilm() {
    $('#list-movie').html('');
    $.ajax({
        url: "https://api.github.com/search/users?q="+$('#text-cari').val(),
        type: "get",
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        headers: {
            "Authorization":
              "token 8d0e7cd46f5fa00cd52733dda676a419e6de3e8d",
          },
        success: function (response) {
            var item = response.items;
            var html = "";
            console.log(response.items);
            item.forEach(element => {
                html += `<div class="col-md-4 mb-3">
                            <div class="card">
                                <img src="` + element.avatar_url + `" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">` + element.login + `</h5> 
                                    <input type="hidden" id="userUrl${element.id}" value="${element.url}">
                                    <a href="#" class="card-link" data-toggle="modal" data-target="#exampleModal" iduser="${element.id}">Detail User</a>
                                </div>
                            </div>
                        </div>`;
            });
            $('#list-movie').html(html);
                    
        }
    })

}


$('#btnCari').on('click', function () {
    CariFilm();
});

$('#text-cari').on('keyup', function (e) {
    if (e.keyCode == 13) {
        CariFilm();
    }
});

$('#list-movie').on('click', '.card-link', function () {
    $('#movie-detil').html('');
    var id = $(this).attr('iduser');
    var detail = $(`#userUrl${id}`).val();
    console.log(detail);
    $.ajax({
        type: "GET",
        url: detail,
        dataType: "JSON",
        success: function (response) {
            var html = "";
            console.log(response);
            html = `<div class="col-md-4">
                        <img src="` + response.avatar_url + `" class="img-fluid" alt="Responsive image">
                    </div>
                    <div class="col-md-8">
                        <ul class="list-group">
                            <li class="list-group-item active">` + response.login + `</li>
                            <li class="list-group-item">Nama: ` + response.name + `</li>
                            <li class="list-group-item">Followers: ` + response.followers + `</li>
                            <li class="list-group-item">Following: ` + response.following + `</li>
                        </ul>
                    </div>`;
            $('#movie-detil').html(html);
        }
    });




                
})
function searchData() {
	$('#list-movie').html('')

	$.ajax({

		type: 'get',
		url: 'http://www.omdbapi.com',
		dataType: 'json',
		data: {
			'apikey' : '57082564',
			's' : $('#search-input').val()
		},

		success: function (result) {
			
			if (result.Response == "True") {

				let data = result.Search;

				$.each(data, function (i, listData) {

					$('#list-movie').append(`
						<div class="col-md-4">
							
							<div class="card mb-3 ">
								<img src="`+listData.Poster+`" class="card-img-top img-thumbnail ">
								<div class="card-body">
								<h5 class="card-title">`+listData.Title+`</h5>
								<h6 class="card-subtitle">`+listData.Year+`</h6>
								<div class="d-flex justify-content-end mt-3">
								<a href="#" id="details" class="card-link" data-toggle="modal" data-id="`+listData.imdbID+`" data-target="#exampleModal">Detail</a>
								</div>
								</div>
							</div> 
							
						</div>
					`)

				})
			
				
			} 
			else {
				$('#list-movie').html(`
					<div class="col">
					<h2>Not Found!</h2>
					</div>
				`)
			}

			$('#search-input').val('')


		}
	})

}

$('#search-button').on('click', function () {
	searchData();
})

$('#search-input').on('keyup', function (e) {
	if(e.keyCode === 13) {
		searchData()
	}
})

$('#list-movie').on('click', '#details', function() {
	
	$.ajax({
		type: 'get',
		url: 'http://www.omdbapi.com',
		dataType: 'json',
		data: {
			'apikey' : '57082564',
			'i' : $(this).data('id')
		},

		success: function (result) {
			if (result.Response == "True") {

				$('#modal-body').html(`
					<div class="d-flex justify-content-center mb-2">
						<img src="`+result.Poster+`" class="img-thumbnail">
					</div>
					<h5 class="text-center"><strong>`+result.Title+`</strong></h6><br>
					<p><strong>Released</strong></p>
					<p>`+result.Released+`</p>
					<p><strong>Genre</strong></p>
					<p>`+result.Genre+`</p>
					<p><strong>Writer</strong></p>
					<p>`+result.Writer+`</p>
					<p><strong>Director</strong></p>
					<p>`+result.Director+`</p>
					<p><strong>Actors</strong></p>
					<p>`+result.Actors+`</p>
					<p><strong>Rating</strong></p>
					<p>`+result.imdbRating+`</p>
					<p><strong>Synopsis</strong></p>
					<p>`+result.Plot+`</p>

				`)
			}
		}

	})
})


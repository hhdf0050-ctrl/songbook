var header  = document.querySelector('header');
var section = document.querySelector('section');
var genre = document.querySelector('genre');
var category = document.querySelector('category');
var random = document.querySelector('random');

let noCover = `https://i.namu.wiki/i/66evJzSR1h2ooOwjrx9RPaxSnWRvSsecGuzmXAymJ5RwfjxnUUcjcT-QNwLnxQK-uc6IMqQKoXeZOa9NNWBbOnwuToNshqcgwUbJmfqI-RA6HW6-4VOpadDnksFmHHYvYpqLTWUPrF8W87_3PjXlww.webp`;

var musicbook;
var addOrdered;
var artistOrdered;
var songOrdered;

var category_selected;
var categories;
var genre_selected;

// CSV 파일을 로드하는 함수
function loadCSV() {
	fetch('music_data.csv')
		.then(response => response.text())
		.then(data => {
			// CSV 데이터를 파싱
			const lines = data.split('\n');
			const headers = lines[0].split(',');
			
			// 데이터 행들을 파싱
			musicbook = [];
			for (let i = 1; i < lines.length; i++) {
				if (lines[i].trim() === '') continue; // 빈 줄 건너뛰기
				
				const values = lines[i].split(',');
				if (values.length >= 6) {
					const row = {
						order: i,
						artist: values[0].trim(),
						song: values[1].trim(),
						cheeze: values[2].trim(),
						genre: values[3].trim(),
						cover_link: values[4].trim(),
						category: values[5].trim()
					};
					musicbook.push(row);
				}
			}

			// 정렬된 배열들 생성
			addOrdered = JSON.parse(JSON.stringify(musicbook));

			musicbook.sort((a, b) => {
				a = a.song.toLowerCase();
				b = b.song.toLowerCase();
				if (a > b) return 1;
				if (a < b) return -1;
				return 0;
			});
			songOrdered = JSON.parse(JSON.stringify(musicbook));

			musicbook.sort((a, b) => {
				a = a.artist.toLowerCase();
				b = b.artist.toLowerCase();
				if (a > b) return 1;
				if (a < b) return -1;
				return 0;
			});
			artistOrdered = JSON.parse(JSON.stringify(musicbook));

			// 카테고리와 장르 초기화
			category_populate(musicbook);
			genre_populate(musicbook);
			random_select(musicbook, 6);

			category_selected = "";
			genre_selected = "";
			sortAdded();
		})
		.catch(error => {
			console.error('CSV 파일을 로드하는 중 오류가 발생했습니다:', error);
		});
}

// 페이지 로드 시 CSV 파일 로드
document.addEventListener('DOMContentLoaded', function() {
	loadCSV();
});


function genre_populate(jsonObj) {

	categories = Array.from(new Set(jsonObj.map(item => item.genre)));

	var cateDiv = document.createElement('div');
	cateDiv.classList.add("genre-select");
	genre.appendChild(cateDiv);

	for (var i = 0; i < categories.length; i++) {
		var cateName = document.createElement('button');
		var cateString = document.createElement('formatted-string');

		cateString.textContent = categories[i];
		cateString.classList.add("genre-text");
		cateName.appendChild(cateString);

		cateName.classList.add("genre-button");
		cateName.classList.add("clickable");
		cateName.setAttribute("id", "genre-" + i);

		cateName.addEventListener('click', function () {
			var prev_sel = document.getElementsByClassName("genre-button");
			if ( this.classList.contains("button-selected") ) {
				for( var i = 0; i < prev_sel.length; i++ ){
					prev_sel.item(i).classList.remove("button-selected");
				}
				genre_selected = "";
				populateSection(musicbook, 1);
			}
			else {
				for( var i = 0; i < prev_sel.length; i++ ){
					prev_sel.item(i).classList.remove("button-selected");
				}
				this.classList.add("button-selected");
				genre_selected = this.textContent;
				populateSection(musicbook, 1);
			}
		});

		cateDiv.appendChild(cateName);
	}
}



function category_populate(jsonObj) {

	categories = Array.from(new Set(jsonObj.map(item => item.category)));

	var cateDiv = document.createElement('div');
	cateDiv.classList.add("category-select");
	category.appendChild(cateDiv);

	for (var i = 0; i < categories.length; i++) {
		var cateName = document.createElement('button');
		var cateString = document.createElement('formatted-string');

		cateString.textContent = categories[i];
		cateString.classList.add("category-text");
		cateName.appendChild(cateString);

		cateName.classList.add("category-button");
		cateName.classList.add("clickable");
		cateName.setAttribute("id", "category-" + i);

		cateName.addEventListener('click', function () {
			var prev_sel = document.getElementsByClassName("category-button");
			if ( this.classList.contains("button-selected") ) {
				for( var i = 0; i < prev_sel.length; i++ ){
					prev_sel.item(i).classList.remove("button-selected");
				}
				category_selected = "";
				populateSection(musicbook, 1);
			}
			else {
				for( var i = 0; i < prev_sel.length; i++ ){
					prev_sel.item(i).classList.remove("button-selected");
				}
				this.classList.add("button-selected");
				category_selected = this.textContent;
				populateSection(musicbook, 1);
			}
		});

		cateDiv.appendChild(cateName);
	}
}


function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}
function random_select(jsonObj, num) {

	var musiclist = jsonObj;

	/* 기존 노래들 클리어 */
	const myNode = document.getElementsByClassName("random-music-list");
	while (myNode.lastElementChild) {
		myNode.removeChild(myNode.lastElementChild);
	}

	var dup = [];
	dup[0] = 0;
	var i = 0;

	for (i; i < num; i = i + 1) {

		var rnd = getRndInteger(1, musiclist.length);

		
		for (var j = 0; j < i; j = j + 1) { 
			while (dup[j] == rnd) {
				rnd = rnd + 1;
				if (rnd == musiclist.length) { rnd = 1; }
				j = 0;
				console.log("Random Colide!");
			}
		}
		dup[i] = rnd; 

		var myDiv = document.createElement('div');

		var coverDiv = document.createElement('div');
		var coverImg = document.createElement('img');

		var infoDiv = document.createElement('div');
		var infoSong = document.createElement('formatted-string');
		var infoArtist = document.createElement('formatted-string');

		myDiv.classList.add("random-song");
		
		coverDiv.classList.add("random-cover-div");
		coverImg.classList.add("random-cover-img");
		if (musiclist[rnd].cover_link == null) coverImg.src = noCover;
		else coverImg.src = musiclist[rnd].cover_link;

		infoDiv.classList.add("random-info-div");
		infoArtist.classList.add("random-artist-name");
		infoSong.classList.add("random-song-name");
		infoArtist.textContent = musiclist[rnd].artist;
		infoSong.textContent = musiclist[rnd].song;

		coverDiv.appendChild(coverImg);
		infoDiv.appendChild(infoSong);
		infoDiv.appendChild(infoArtist);
		myDiv.appendChild(coverDiv);
		myDiv.appendChild(infoDiv);

		myDiv.classList.add("clickable");
		myDiv.addEventListener('click', function () {
			var song = this.childNodes[1].childNodes[0];
			var artist = this.childNodes[1].childNodes[1];
			var text = song.textContent + " - " + artist.textContent;
			window.navigator.clipboard.writeText(text).then(() => {
				toast("복사완료");
			});
		});
		
		random.appendChild(myDiv);
	}

}

function populateSection(jsonObj, direction) {

	var musiclist = jsonObj;
	console.log("populateSection", musiclist);
	/* 기존 노래들 클리어 */
	const myNode = document.getElementById("musicList");
	while (myNode.lastElementChild) {
		myNode.removeChild(myNode.lastElementChild);
	}

	/* 검색 입력창에 들어와있는거 저장 */
	const search_value = document.getElementById("inputsearch").value;

	var i, end;
	if (direction == 1) {
		i = 0;
		end = musiclist.length;
	}
	else {
		i = musiclist.length - 1;
		end = -1;
	}

	for (i; i != end; i = i + direction) {
		if ( search_value != "" ) {
			if (musiclist[i].artist.indexOf(search_value)==-1 && 
				musiclist[i].song.indexOf(search_value)==-1 ) {
				continue; 
			}
		}
		if ( (category_selected != "") && (musiclist[i].category != category_selected) ) {
			continue;
		}
		if ( (genre_selected != "") && (musiclist[i].genre != genre_selected) ) {
			continue;
		}

		var myDiv = document.createElement('div');

		var coverDiv = document.createElement('div');
		var coverImg = document.createElement('img');

		var infoDiv = document.createElement('div');
		var infoSong = document.createElement('formatted-string');
		var infoArtist = document.createElement('formatted-string');

		myDiv.classList.add("song-div");
		
		coverDiv.classList.add("album-cover-div");
		coverImg.classList.add("album-cover-img");
		if (musiclist[i].cover_link == null) coverImg.src = noCover;
		else coverImg.src = musiclist[i].cover_link;

		infoDiv.classList.add("info-div");
		infoArtist.classList.add("artist-name");
		infoSong.classList.add("song-name");
		infoArtist.textContent = musiclist[i].artist;
		infoSong.textContent = musiclist[i].song;

		coverDiv.appendChild(coverImg);
		infoDiv.appendChild(infoSong);
		infoDiv.appendChild(infoArtist);
		myDiv.appendChild(coverDiv);
		myDiv.appendChild(infoDiv);

		myDiv.classList.add("clickable");
		myDiv.addEventListener('click', function () {
			var song = this.childNodes[1].childNodes[0];
			var artist = this.childNodes[1].childNodes[1];
			var text = song.textContent + " - " + artist.textContent;
			window.navigator.clipboard.writeText(text).then(() => {
				toast("복사완료");
			});
		});

		section.appendChild(myDiv);
	}
}




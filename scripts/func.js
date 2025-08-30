
var sort_selected = "byAdd";

function searchEnter() {
	if (window.event.keyCode==13) {               
		populateSection(musicbook, 1);
	}
}
function searchUpdate() {
	const search_update = document.getElementById("inputsearch");
	search_update.setAttribute("value", search_update.value);
}

function sortSinger() {
	document.getElementById(sort_selected).classList.remove("button-selected");
	document.getElementById("bySinger").classList.add("button-selected");
	sort_selected = "bySinger";
	musicbook = artistOrdered;
	populateSection(musicbook, 1);
}
function sortSong() {
	document.getElementById(sort_selected).classList.remove("button-selected");
	document.getElementById("bySong").classList.add("button-selected");
	sort_selected = "bySong";
	musicbook = songOrdered;
	populateSection(musicbook, 1);
}
function sortAdded() {
	document.getElementById(sort_selected).classList.remove("button-selected");
	document.getElementById("byAdd").classList.add("button-selected");
	sort_selected = "byAdd";
	musicbook = addOrdered;
	populateSection(musicbook, 1);
}





function refreshRandom() {
	if (typeof musicbook !== 'undefined' && musicbook.length > 0) {
		random_select(musicbook, 6);
		toast("랜덤 리스트 새로고침!");
	}
}

let removeToast;

function toast(string) {
    const toast = document.getElementById("toast");

    toast.classList.contains("reveal") ?
        (clearTimeout(removeToast), removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
        }, 1000)) :
        removeToast = setTimeout(function () {
            document.getElementById("toast").classList.remove("reveal")
        }, 3000)
    toast.classList.add("reveal"),
        toast.innerText = string
}
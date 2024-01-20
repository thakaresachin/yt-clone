
//Sidebar toggle code started
let menuIcon = document.querySelector(".menu-icon");
let sidebar = document.querySelector(".sidebar");
let container = document.querySelector(".container");

menuIcon.onclick = function () {
  sidebar.classList.toggle("small-sidebar");
  container.classList.toggle("large-container");
};
//Sidebar toggle code ended

const videoCardContainer = document.querySelector(".list-container");

let api_key = "AIzaSyC2d1n0Agbn1ZUjZ0c2WB1XScHl3nvWC04";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
})).then(res => res.json()).then(data => {
    // console.log("video_http",data);
    data.items.forEach(item => {
        getChannelIcon(item);
    })
}).catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        // console.log("video");
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="vid-list" >
    <a onclick="location.href = 'https://youtube.com/watch?v=${data.id}'"><img src="${data.snippet.thumbnails.high.url}" class="thumbnail" /></a>

    <div class="flex-div" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
      <a> <img src="${data.channelThumbnail}" alt="" /></a>
      <div class="vid-info">
        <a href="">${data.snippet.title}</a>
        <p>${data.snippet.channelTitle}</p>
        <p>15k views &bull; 2 days ago</p>
      </div>
    </div>
  </div>
    `;
}

// search bar

const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=song";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
      console.log("clicked zala rai boa");
        location.href = searchLink + searchInput.value;
    }
})
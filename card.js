var info = [];
var img = `resources/avt_1.jpg`
$('.card-img-top').attr('src', img);
let questionIndexs = []

const dirFile = 'resources/info.json';

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const no = params.no; 


const GetInfo = async () => {
    let rs = null;
    try {
        const response = await fetch(dirFile)
        const infos = await response.json()
        rs = infos.find(x=>x.no==no)

    } catch (e) {
        console.log(e)
    }
    return rs;
}

const click = async (e) => {
    if (e !== null)
        e.preventDefault();
    const info = await GetInfo();

    let text = `
    <div class="card">
    <h4 class="card-title">${info.name}</h4>
    <img class="card-img-top img-fluid" src="${info.image}" alt="Card image" style="max-height:35vh;">
    <ul class="list-group list-group-flush content-data">
        <li class="list-group-item">${info.no}</li>
        <li class="list-group-item">${info.gender}</li>
        <li class="list-group-item">${info.phone}</li>
        
    </ul>
    <h6 class="card-subtitle" style="margin-top: 10px; margin-bottom: 10px;" id='indexs'>😂❤️👌💕</h6>
  </div>`

    $('.content-data').html(text)
}


$('#load-button').click(click);
click(null)
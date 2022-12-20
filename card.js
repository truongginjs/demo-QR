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
    <h4 class="card-title">Name: ${info.name}</h4>
    <img class="card-img-top img-fluid" src="${info.image}" alt="${info.name}" style="max-height:35vh;">
    <ul class="list-group list-group-flush content-data">
        <li class="list-group-item">No: ${info.no}</li>
        <li class="list-group-item">Gender: ${info.gender}</li>
        <li class="list-group-item">Phone: ${info.phone}</li>
        
    </ul>
    <h6 class="card-subtitle" style="margin-top: 10px; margin-bottom: 10px;">${info.youtube ?
        `<iframe width="100%" height="315" src="${info.youtube}" title="${info.name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` 
        : 
        info.name
    
    }
    </h6>
  </div>`

    $('.content-data').html(text)
}


$('#load-button').click(click);
click(null)
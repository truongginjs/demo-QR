const dirFile = './resources/data.json';

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});



const GetInfo = async () => {
    let rs = null;
    try {
        const index = params.index ?? 'dvhung';
        const response = await fetch(dirFile)
        const infos = await response.json()
        rs = infos.find(x => x.index == index)

    } catch (e) {
        console.log(e)
    }
    return rs;
}

const Do = async () => {
    const data = await GetInfo();
    const {
        index,
        fullname,
        description,
        image,
        contact

    } = data

    const styleCard = `background: -webkit-linear-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 40%, rgba(35, 69, 130, 1) 50%, rgba(35, 69, 130, 1) 100%), url("${image}") round no-repeat, #bababa;
    background: linear-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 40%, rgba(35, 69, 130, 1) 50%, rgba(35, 69, 130, 1) 100%), 
        url("${image}") round no-repeat, #bababa;`;

    $('.container#card').attr('style', styleCard)
    $('#info h1').html(fullname)
    $('#info h2').html(description)

    $('.icon-container #phone').click(function (e) { 
        e.preventDefault();
        window.open(`tel:${contact.phone}`)
        
    });
    $('.icon-container #mail').click(function (e) { 
        e.preventDefault();
        window.open(`mailto:${contact.mail}`)
        
    });
    $('.icon-container #whatsapp').click(function (e) { 
        e.preventDefault();
        window.open(`whatsapp:${contact.whatsapp}`)
    });
}

Do()

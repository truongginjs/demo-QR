const dirFile = 'resources/info.json';

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const no = params.no ?? 1; 


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

const Do = async ()=>{
    const info = await GetInfo();
    $('.front h1').html(info.name)
    
    $('.back img').attr('src',info.image)
    
    $('.back h1').html(info.name)
    $('.back p').html(`${info.gender}<span> - </span> ${info.phone}`)




}

Do()
var qrcode = new QRCode("qrcode", {
    text: "http://jindo.dev.naver.com/collie",
    width: 256,
    height: 256,
    colorDark : "#007bff",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});
const dirFile = './resources/data.json';

const url = window.location.href

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

// const makeQR = (url) => {
//     var qrcode = new QRCode("qrcode", {
//       text: url,
//       width: 128,
//       height: 128,
//       colorDark: "#000000",
//       colorLight: "#ffffff",
//       correctLevel: QRCode.CorrectLevel.H
//     });
// }


function makeCode(query) {
    const path = params.url ?? "superidol.hehe"
  
    qrcode.makeCode(path);
  }


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
    makeCode();
    $('.cardbody>img').attr('src', image)
    $('.cardbody .nametitle').html(fullname)
    $('.cardbody .vitri').html(description)

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

    $('.cum3button .save').click(function(e){

    })

    $('.cum3button .share').click(function (e) { 
        e.preventDefault();
        navigator.share(url)
    });


}

Do()

var qrcode = new QRCode("qrcode");
const dirFile = 'resources/info.json';

const GetInfos = async () => {
  let rs = null;
  try {
    const response = await fetch(dirFile)
    const infos = await response.json()
    rs = infos;
  } catch (e) {
    console.log(e)
  }
  return rs;
}

function makeCode(query) {
  query = query ?? `#text`
  var elText = $(query)

  if (!elText.val()) {
    alert("Input a text");
    elText.focus();
    return;
  }

  qrcode.makeCode(elText.val());
}

const demo = async () => {
  let container = $('#example')
  const url = "https://truongginjs.github.io/demo-QR/card.html?no="
  var infos = await GetInfos()
  const text =  infos.map(x=>`<>`).join('')
  container.html()

infos.foreach(x=>{
  qrcode.makeCode($(`#qr-${x.no}`).val())

})}

$("#text").
  on("blur", function () {
    makeCode();
  }).
  on("keydown", function (e) {
    if (e.keyCode == 13) {
      makeCode();
    }
  });

makeCode();
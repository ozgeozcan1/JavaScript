let kaydedilenler = [];
//Proje açıldığında ya da yapılacak hiçbir iş bırakmadığınızda tazelenen Yapılacaklar Listesi.
const ilkElemanlar = [
    "3 Litre Su İç",
    "Ödevleri Yap",
    "En Az 3 Saat Kodlama Yap",
    "Yemek Yap",
    "50 Sayfa Kitap Oku"
]
const ulDOM = document.querySelector("#list");
let task = document.querySelector("#task");
let lili = document.querySelector('li');

const kapat = `<span class="close" onclick="sil(parentNode)" aria-label="Close" aria-hidden="true">&times;</span>`;

//Local Storage boş ise yapılacak işlem (Yukarıda tanımladığımız ilk elemanları ekleme)
if (localStorage.getItem('kaydedilenler') === null || localStorage.getItem('kaydedilenler').length === 2) {
    ilkElemanlar.forEach(a => {
        let lilili = document.createElement('li');
        lilili.innerHTML = `${a}${kapat}`;
        lilili.addEventListener("click", tiklandi);
        kaydedilenler.push(lilili.innerHTML);
        ulDOM.append(lilili);
        localStorage.setItem('kaydedilenler', JSON.stringify(kaydedilenler));
    });
}
//Local Storage zaten tanımlıysa pull işlemi
else {
    kaydedilenler = JSON.parse(localStorage.getItem('kaydedilenler'));
    kaydedilenler.forEach(a => {
        let lilili = document.createElement('li');
        lilili.innerHTML = `${a}`;
        lilili.addEventListener("click", tiklandi);
        ulDOM.append(lilili);
    })
}
//Tıklanan elemanın işaretlenme işlemi
function tiklandi() {
    this.classList.toggle("checked");
}
//Yeni eleman ekleme fonksiyonu
function newElement() {
    //Burada Boş eleman veya Boş karakter eklemeyi engelliyoruz
    if (task.value.length > 0 && !(task.value.trim().length === 0)) {
        let liDOM = document.createElement('li');
        liDOM.innerHTML = `${task.value}${kapat}`;
        liDOM.addEventListener("click", tiklandi);
        ulDOM.append(liDOM);
        kaydedilenler.push(liDOM.innerHTML);
        localStorage.setItem('kaydedilenler', JSON.stringify(kaydedilenler));
        $('.success').toast('show');
        task.value = "";
    } else {
        $('.error').toast('show');
        task.value = "";
    }
}
//Local Storage ile beraber çalışan silme fonksiyonu
function sil(parentNode) {
    kaydedilenler.splice(kaydedilenler.indexOf(parentNode.innerHTML), 1);
    localStorage.setItem("kaydedilenler", JSON.stringify(kaydedilenler));
    parentNode.remove();
}
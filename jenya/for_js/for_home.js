// function getImage(inf, fn) {
//     return function (...args) {
//         fn.apply(inf, args)
//     }
// }
// function imageInfo() {
//     console.log(`Image:${this.name}, ${this.url}, ${this.alt}`);
//     var imgContainer = document.querySelector('#image');
//     var img = document.createElement("img");
//     img.setAttribute("src", `${this.url}`);
//     img.setAttribute("alt", `${this.alt}`);
//     imgContainer.appendChild(img);
// }
// const img1 = { name: 'Img1', url: '../images/image_1.jpg', alt: 'img1' }
// getImage(img1, imageInfo)();
// console.log(getImage(img1, imageInfo)());
// ------------------------------------------------
// function createImage() {
//     var arr = [];
//     return function (src, alt) {
//         var imgContainer = document.querySelector('#image');
//         var img = document.createElement("img");
//         img.setAttribute("src", src);
//         img.setAttribute("alt", alt);
//         imgContainer.appendChild(img);
//         console.log(img);
//         arr.push(img);
//         return arr;
//     }
// }

// const img1 = createImage();
// console.log(img1(prompt("src"), prompt("alt")));
// ----------------------------------------------
function createImage() {
    var arr = [];
    return function (src, id, bool) {
        if (!bool) {
            alert("you didn't create img element");
        } else {
            var imgContainer = document.querySelector('#image');
            var img = document.createElement("img");
            img.setAttribute("src", src);
            img.setAttribute("id", id);
            imgContainer.appendChild(img);
            console.log(img);
            arr.push(img);
            console.log(arr);
            document.querySelector("#buttonCrt").onclick = function () {
                img1(prompt("src"), prompt("id"));
            }
            return arr;
        }
    }
}
document.querySelector("#buttonDel").onclick = function () {
    var forDelete = prompt("id for delete");
    var checkImg = document.querySelectorAll("img").length;
    if (forDelete === '' || forDelete === 'null' || !checkImg) {
        console.log("havent images");
        alert("You haven`t images on page");
    } else {
        console.log("delete ok!");
        document.getElementById(forDelete).parentNode.removeChild(document.getElementById(forDelete));
    }
}

var img1 = createImage();
img1(confirm("want to create"), prompt("src"), prompt("id"));

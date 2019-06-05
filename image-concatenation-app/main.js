const canvas = document.getElementById("drawingCanvas");
let context = canvas.getContext("2d");
const h = canvas.height;
let arr = [
    { img: 'img1', id: '', width: '' },
    { img: 'img2', id: '', width: '' }
];

createImage = (index, input) => {
    if (input.files[0]) {
        var reader = new FileReader();

        reader.onload = (e) => {
            arr[index].img = new Image();
            arr[index].img.onload = () => {
                const w = h * arr[index].img.naturalWidth / arr[index].img.naturalHeight;
                arr[index].width = w;

                if (arr[0].id === '' || arr[1].id === '') { canvas.width = w; context.drawImage(arr[index].img, 0, 0, w, h); }
                else { canvas.width = arr[0].width + arr[1].width; context.drawImage(arr[0].img, 0, 0, arr[0].width, h); context.drawImage(arr[1].img, arr[0].width, 0, arr[1].width, h); }
            };

            arr[index].id = input.id;

            arr[index].img.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

readFirstImg = (input) => {
    createImage(0, input);
}

readSecondImg = (input) => {
    createImage(1, input)
}
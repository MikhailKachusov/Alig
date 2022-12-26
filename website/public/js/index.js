
/////////////////////////////////// Задний фон  канваса


const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 1047,
        height: 582,
        selection: false,
    });
}

const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url, (img) => {
        canvas.backgroundImage = img
        canvas.renderAll()
    })
}

const canvas = initCanvas('canvas')


/////////////////////////////////// Удаление ресурсов с канваса (не сделано)


const clearCanvas = (canvas, state) => {
    state.val = canvas.toSVG()
    canvas.getObjects().forEach((o) => {
        if(o !== canvas.backgroundImage) {
            canvas.remove(o)
        }
    })
}

const restoreCanvas = (canvas, state, bgUrl) => {
    if (state.val) {
        fabric.loadSVGFromString(state.val, objects => {
            objects = objects.filter(o => o['xlink:href'] !== bgUrl)
            canvas.add(...objects)
            canvas.requestRenderAll()
        })
    }
}


const svgState = {}


/////////////////////////////////// вызов заднего фона

const bgUrl = 'https://awdee.ru/wp-content/uploads/2017/08/M6UNqimVTSw.jpg'
setBackground(bgUrl, canvas)

/////////////////////////////////// импорт фото


const readerI = new FileReader()

const imgAdded = (e) => {
    const inputElem = document.getElementById('myImg')//Считывает с кнопки файл
    const file = inputElem.files[0];
    readerI.readAsDataURL(file)//дает URL файла
    console.log(readerI)
}

const inputFileI = document.getElementById('myImg');
if (inputFileI != null){
    inputFileI.addEventListener('change', imgAdded)
}


readerI.addEventListener("load", () => {
    fabric.Image.fromURL(readerI.result, img => {
        console.log("импорт картинки")
        canvas.add(img)
        img.scaleToWidth(200); 
		img.scaleToHeight(200);
		canvas.centerObject(img)
        canvas.requestRenderAll()
    })
})



/////////////////////////////////// Импорт видео


document.getElementById("myVideo").addEventListener("change", function() {
    var media = URL.createObjectURL(this.files[0]);
    var video = document.getElementById("video");
    video.src = media;  


    var video1El1 = new fabric.Image(video, { originX: 'center', originY: 'center', objectCaching: false });

    canvas.add(video1El1);
    video1El1.scaleToWidth(200); 
    video1El1.scaleToHeight(200);
    canvas.centerObject(video1El1)
    video.play();  


  });
  fabric.util.requestAnimFrame(function render() { canvas.renderAll(); fabric.util.requestAnimFrame(render); });
    

///////////////////////////////////






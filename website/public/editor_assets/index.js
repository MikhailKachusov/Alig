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


/////////////////////////////////// импорт фото


const readerI = new FileReader()

const imgAdded = (e) => {
    const inputElem = document.getElementById('myImg')//Считывает с кнопки файл
    const file = inputElem.files[0];
    readerI.readAsDataURL(file)//дает URL файла
}

const inputFileI = document.getElementById('myImg');
if (inputFileI != null){
    inputFileI.addEventListener('change', imgAdded)
}


readerI.addEventListener("load", () => {
    fabric.Image.fromURL(readerI.result, img => {
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

    document.getElementById('stopVideoCycle').onclick = function() {
        video.preload = 'auto';
        video.loop = false;
      };

    document.getElementById('startVideoCycle').onclick = function() {
        video.preload = 'auto';
        video.loop = true;

        video.play();  
    };
    document.getElementById('startVideo').onclick = function() {
        video.preload = 'auto';
        video.loop = false;

        video.play(); 
    };

    document.getElementById('pauseVideo').onclick = function() {
        video.pause();
    };


  });
  fabric.util.requestAnimFrame(function render() { canvas.renderAll(); fabric.util.requestAnimFrame(render); });
    

/////////////////////////////////// импорт аудио

document.getElementById("myAudio").addEventListener("change", function() {
    var media = URL.createObjectURL(this.files[0]);
    var audio = document.getElementById("audio");
    var playAudio = document.getElementById("Audio");
    audio.src = media;  


    var audioEl1 = new fabric.Image(playAudio, { originX: 'center', originY: 'center', objectCaching: false });

    canvas.add(audioEl1);
    audioEl1.scaleToWidth(50); 
    audioEl1.scaleToHeight(50);
    canvas.centerObject(audioEl1)
    audio.volume = 0.03;
    audio.play();

    document.getElementById('stopAudioCycle').onclick = function() {
        audio.preload = 'auto';
        audio.loop = false;
      };

    document.getElementById('startAudioCycle').onclick = function() {
        audio.preload = 'auto';
        audio.loop = true;

        audio.play();  
    };
    document.getElementById('startAudio').onclick = function() {
        audio.preload = 'auto';
        audio.loop = false;

        audio.play(); 
    };
    document.getElementById('pauseAudio').onclick = function() {
        audio.pause();
    };
  });
  fabric.util.requestAnimFrame(function render() { canvas.renderAll(); fabric.util.requestAnimFrame(render); });
    

//////////////////////////////////////////////////// удаление фото


document.getElementById('delite').onclick = function() {
   canvas.getActiveObjects().forEach((obj) => {
       canvas.remove(obj)
     });
     canvas.discardActiveObject().renderAll()
};


//////////////////////////////////////////////////// удаление видео


document.getElementById('deliteVideo').onclick = function() {
   canvas.getActiveObjects().forEach((obj) => {
       canvas.remove(obj)
     });
     video.src = null;
     video.pause();
     canvas.discardActiveObject().renderAll()
};


//////////////////////////////////////////////////// удаление аудио


document.getElementById('deliteAudio').onclick = function() {
   canvas.getActiveObjects().forEach((obj) => {
       canvas.remove(obj)
     });
     audio.src = null;
     audio.pause();
     canvas.discardActiveObject().renderAll()
};


///////////////////////////////////////////// отдаление и перемещение холста


canvas.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.1) zoom = 0.1;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });

canvas.on('mouse:down', function(opt) {
var evt = opt.e;
if (evt.altKey === true) {
    this.isDragging = true;
    this.selection = false;
    this.lastPosX = evt.clientX;
    this.lastPosY = evt.clientY;
}
});

canvas.on('mouse:move', function(opt) {
if (this.isDragging) {
    var e = opt.e;
    var vpt = this.viewportTransform;
    vpt[4] += e.clientX - this.lastPosX;
    vpt[5] += e.clientY - this.lastPosY;
    this.requestRenderAll();
    this.lastPosX = e.clientX;
    this.lastPosY = e.clientY;
}
});
canvas.on('mouse:up', function(opt) {
this.setViewportTransform(this.viewportTransform);
this.isDragging = false;
this.selection = true;
});



/////////////////////////////////// вызов заднего фона
const readerB = new FileReader()

document.getElementById('input__file').addEventListener('change', function(){
    if( this.value ){

        var URLbackground = URL.createObjectURL(this.files[0]);
        var background = document.getElementById("Background");
        background.src = URLbackground;

        const bgUrl = URLbackground;
        console.log(bgUrl)
        setBackground( bgUrl, canvas);
    } else { 
      console.log( "Файл не выбран" ); 
    }
  });
  

     


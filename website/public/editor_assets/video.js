

const readerI = new FileReader()

const imgAdded = (e) => {
    const inputElem = document.getElementById('myImg')//Считывает с кнопки файл
    const file = inputElem.files[0];
    readerI.readAsDataURL(file)//дает URL файла
}

const inputFileI = document.getElementById('myImg');
if (inputFileI != null){
    inputFileI.addEventListener('change', imgAdded)
    console.log(readerI.result)
}


readerI.addEventListener("load", () => {
    fabric.Image.fromURL(readerI.result, img => {
        canvas.add(img)
        img.scaleToWidth(200); 
		img.scaleToHeight(200);
		canvas.centerObject(img)
        img.getElement().play();
        canvas.requestRenderAll()
    })
})

function createGUI() {
    const gui = new dat.GUI()
    let folder = gui

    add(window, 'r', 1, 500, 1).name('r').listen()
    add(window, 'R', 1, 500, 1).name('R').listen()
    add(window, 'step', 0, maxStep, 1).name('Step').listen()
    add(window, 'animate').name('Animate').listen()
    add(window, 'drawUp').name('Up').listen()
    add(window, 'drawCenter').name('Center').listen()
    add(window, 'drawDown').name('Down').listen()

    setFolder('Stats')
    add(window, 'showStats').name('Show Stats').onChange(() => stats.domElement.style.display = showStats ? 'block' : 'none')

    setFolder('Recording')
    gui.recordingLabel = addPlainText('Status: Inactive')
    gui.onChangeIsRecording = () => {
        if(isRecording) {
            if(gifJs.running) {
                isRecording = false
                return
            }
            gifJs = createGifJs()
            gui.recordingLabel.setText('Status: Recording')
            return
        }
        gifJs.render()
        gui.recordingCheckBox.__li.hidden = true
        gui.abortRenderingController.__li.hidden = false
    }
    gui.recordingCheckBox = add(window, 'isRecording').name('Recording (Alt+S)').onChange(gui.onChangeIsRecording).listen()
    gui.abortRenderingController = add(window, 'abortRendering').name('Abort Rendering')
    gui.abortRenderingController.__li.hidden = true
    add(window, 'downloadScreenshot').name('Take Screenshot')

    // gui.close()
    return gui

    function setFolder(name) {
        folder = (name !== undefined) ? gui.addFolder(name) : gui
        folder.close()
    }

    function add() { // obj, prop, [min], [max], [step]
        return folder.add(...arguments)
    }

    function addColor(obj, prop) {
        return folder.addColor(obj, prop)
    }

    function addPlainText(text) {
        const aux = {aux: ''}
        const controller = add(aux, 'aux')
        controller.domElement.remove()
        const span = controller.__li.getElementsByTagName('span')[0]
        span.innerHTML = text
        span.style.overflow = 'visible'
        span.style.whiteSpace = 'pre'
        controller.setText = text => span.innerHTML = text
        return controller
    }
}
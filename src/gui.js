function createGUI() {
    const gui = new dat.GUI()
    let folder = gui

    add(window, 'animate').name('Animate').listen().onChange(() => {if(step == maxStep) step = 0})
    add(window, 'step', 0, maxStep, 1).name('Step').listen()

    setFolder('Params')
    add(window, 'r', 1, 200, 1).name('r').listen()
    add(window, 'R', 1, 200, 1).name('R').listen()
    add(window, 'drawDown').name('Path Down').listen()
    add(window, 'drawCenter').name('Path Center').listen()
    add(window, 'drawUp').name('Path Up').listen()
    add(window, 'drawLeft').name('Path Left').listen()
    add(window, 'drawRight').name('Path Right').listen()
    add(window, 'turns', 1, 30, 1).name('Turns').listen()
    add(window, 'showCircles').name('Show Circles').listen()

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
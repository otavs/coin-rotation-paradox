var R = 0, r = 0, circleA, circleB, angle = 0, step = 0, maxStep = 300, animate = false,
pathDown = [], pathCenter = [], pathUp = [], drawUp = false, drawCenter = false, drawDown = true

function setup_() {
    R = min(width, height)/8
    r = R
    angle = 0
    circleA = createVector(0, 0)
    circleB = createVector(0, R+r)
    computePaths()
}

function computePaths() {
    pathDown = [], pathCenter = [], pathUp = []
    for(let i = 0; i < maxStep; i++) {
        let circleA_ = circleA.copy()
        let angle_ = map(i, 0, maxStep, 0, 2*PI)
        let circleB_ = createVector(0, R+r).setHeading(PI/2 - angle_)
        const rotatedPoint = circleB_.copy().add(circleA_.copy().sub(circleB_).setMag(r).rotate(-angle_ * R/r))
        const rotatedPointUp = circleB_.copy().add(circleA_.copy().sub(circleB_).setMag(-r).rotate(-angle_ * R/r))
        pathDown.push(rotatedPoint)
        pathCenter.push(circleB_)
        pathUp.push(rotatedPointUp)
    }
}

function draw_() {
    update()
    background('#fffdc7')
    translate(width * 0.5, height * 0.5)
    scale(1, -1)
    // rotate(-PI/2)
    fill('#c7eaff')
    drawCircleA()
    drawCircleB()
    drawPoint()
    drawPath()
}

function update() {
    computePaths()
    if(animate) {
        step++
        if(step > maxStep)
            step = maxStep
    }
    angle = map(step, 0, maxStep, 0, 2*PI)
    circleB = createVector(0, R+r).setHeading(PI/2 - angle)
}

function drawPath() {
    for(let i = 1; i < step; i++) {
        if(drawUp)
            line(pathUp[i-1].x, pathUp[i-1].y, pathUp[i].x, pathUp[i].y)
        if(drawCenter)
            line(pathCenter[i-1].x, pathCenter[i-1].y, pathCenter[i].x, pathCenter[i].y)
        if(drawDown)
            line(pathDown[i-1].x, pathDown[i-1].y, pathDown[i].x, pathDown[i].y)
    }
}

function drawCircleA() {
    fill('#c7eaff')
    circle(circleA.x, circleA.y, R*2)
    fill('#0000FF')
    circle(circleA.x, circleA.y, 10)
}

function drawCircleB() {
    fill('#c7eaff')
    circle(circleB.x, circleB.y, r*2)
}

function drawPoint() {
    const point = circleB.copy().add(circleA.copy().sub(circleB).setMag(r))
    fill('#00FF00')
    // circle(rotatedPoint.x, rotatedPoint.y, 10)
    fill('#0000FF')
    if(drawUp)
        drawLine(circleB, circleB.copy().add(circleA.copy().sub(circleB).setMag(-r).rotate(-angle * R/r)))
    if(drawCenter)
        drawLine(circleB, circleB.copy().add(circleA.copy().sub(circleB).setMag(r).rotate(-angle * R/r)))
    if(drawDown)
        drawLine(circleB, circleB.copy().add(circleA.copy().sub(circleB).setMag(r).rotate(-angle * R/r)))
    circle(circleB.x, circleB.y, 10)
}

function drawLine(a, b) {
    line(a.x, a.y, b.x, b.y)
}

function drawFixedLine() {
    const dir = p5.Vector.sub(circleB, circleA).setMag(R)
    fill('#00FF00')
    circle(dir.x, dir.y, 10)
}
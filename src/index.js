var R = 0, r = 0, circleA, circleB, angle = 0, angleB = 0, step = 0, maxStep = 2000, animate = false, turns = 1, showCircles = true
pathDown = [], pathCenter = [], pathUp = [],  pathRight = [],  pathLeft = [],
drawUp = false, drawCenter = false, drawDown = true, drawRight = false, drawLeft = false

function setup_() {
    R = min(width, height) / 8
    r = R
    angle = 0
    circleA = createVector(0, 0)
    circleB = createVector(0, R+r)
    computePaths()
}

function computePaths() {
    pathDown = [], pathCenter = [], pathUp = [], pathRight = [], pathLeft = []
    for(let i = 0; i <= maxStep; i++) {
        const angle_ = map(i, 0, maxStep, 0, turns * TWO_PI)
        const angleB_ = angle_ * R/r
        const circleB_ = createVector(0, R+r).setHeading(HALF_PI - angle_)
        const BA = Vector.sub(circleA, circleB_).setMag(r)
        pathDown.push(Vector.add(circleB_, Vector.rotate(BA, -angleB_)))
        pathUp.push(Vector.add(circleB_, Vector.rotate(BA, -angleB_ + PI)))
        pathRight.push(Vector.add(circleB_, Vector.rotate(BA, -angleB_ + HALF_PI)))
        pathLeft.push(Vector.add(circleB_, Vector.rotate(BA, -angleB_ - HALF_PI)))
        pathCenter.push(circleB_)
    }
}

function draw_() {
    update()
    background('#fffdc7')
    translate(width/2, height/2)
    scale(1, -1)
    fill('#c7eaff')
    if(showCircles) {
        drawCircleA()
        drawCircleB()
        drawDetails()
    }
    drawPaths()
}

function update() {
    computePaths()
    if(animate) {
        step += 4
        if(step >= maxStep) {
            step = maxStep
            animate = false
        }
    }
    angle = map(step, 0, maxStep, 0, turns * TWO_PI)
    angleB = angle * R/r
    circleB = createVector(0, R+r).setHeading(PI/2 - angle)
}

function drawPaths() {
    for(let i = 1; i <= step; i++) {
        if(drawUp)
            line(pathUp[i-1].x, pathUp[i-1].y, pathUp[i].x, pathUp[i].y)
        if(drawCenter)
            line(pathCenter[i-1].x, pathCenter[i-1].y, pathCenter[i].x, pathCenter[i].y)
        if(drawDown)
            line(pathDown[i-1].x, pathDown[i-1].y, pathDown[i].x, pathDown[i].y)
        if(drawLeft)
            line(pathLeft[i-1].x, pathLeft[i-1].y, pathLeft[i].x, pathLeft[i].y)
        if(drawRight)
            line(pathRight[i-1].x, pathRight[i-1].y, pathRight[i].x, pathRight[i].y)
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

function drawDetails() {
    fill('#0000FF')
    circle(circleB.x, circleB.y, 10)
    const BA = Vector.sub(circleA, circleB).setMag(r)
    if(drawDown)
        drawLinePointVector(circleB, Vector.rotate(BA, -angleB))
    if(drawUp)
        drawLinePointVector(circleB, Vector.rotate(BA, -angleB + PI))
    if(drawRight)
        drawLinePointVector(circleB, Vector.rotate(BA, -angleB + HALF_PI))
    if(drawLeft)
        drawLinePointVector(circleB, Vector.rotate(BA, -angleB - HALF_PI))
    if(drawCenter)
        drawLinePointVector(circleB, Vector.rotate(BA, -angleB))
}

function drawLinePointVector(p, v) {
    line(p.x, p.y, p.x + v.x, p.y + v.y)
}

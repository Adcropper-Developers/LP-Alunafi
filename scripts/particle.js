var app, fnAddEventListener, fnRequestAnimationFrame;

// Animation Frame Request
fnRequestAnimationFrame = function(fnCallback) {
    var fnAnimFrame;
    fnAnimFrame = window.requestAnimationFrame || 
                 window.webkitRequestAnimationFrame || 
                 window.mozRequestAnimationFrame || 
                 window.oRequestAnimationFrame || 
                 window.msRequestAnimationFrame || 
                 function(fnCallback) {
                     window.setTimeOut(fnCallback, 1000 / 60);
                 };
    fnAnimFrame(fnCallback);
};

// Add Event Listener
fnAddEventListener = function(o, sEvent, fn) {
    if (o.addEventListener) {
        o.addEventListener(sEvent, fn, false);
    } else {
        o['on' + sEvent] = fn;
    }
};

app = function() {
    var Particle, ctxRender, fAngle, fCosAngle, fMaxAX, fMaxAY, fMaxAZ, fPI, 
        fSinAngle, fStartVX, fStartVY, fStartVZ, fVX, fnACos, fnCos, fnMax, 
        fnMin, fnNextFrame, fnRender, fnRnd, fnRnd2, fnSetSize, fnSin, 
        fnSwapList, gui, h, iProjSphereX, iProjSphereY, iRadiusSphere, 
        nBody, oBuffer, oDoc, oRadGrad, oRender, oStats, w;

    // Create and load center image
    var centerImage = new Image();
    centerImage.src = './assets/home-page/securityPhone.png';


    // General Elements
    oDoc = document;
    nBody = oDoc.body;

    // Shortcuts
    fPI = Math.PI;
    fnMax = Math.max;
    fnMin = Math.min;
    fnRnd = Math.random;
    fnRnd2 = function() {
        return 2.0 * fnRnd() - 1.0;
    };
    fnCos = Math.cos;
    fnACos = Math.acos;
    fnSin = Math.sin;

    // Sphere Settings
    iRadiusSphere = 210;
    iProjSphereX = 0;
    iProjSphereY = 0;

    // Particle Settings
    fMaxAX = 0.1;
    fMaxAY = 0.1;
    fMaxAZ = 0.1;
    fStartVX = 0.001;
    fStartVY = 0.001;
    fStartVZ = 0.001;
    fAngle = 0.0;
    fSinAngle = 0.0;
    fCosAngle = 0.0;

    window.iFramesToRotate = 1000.0;
    window.iPerspective = 300;
    window.iNewParticlePerFrame = 10;
    window.fGrowDuration = 200.0;
    window.fWaitDuration = 50.0;
    window.fShrinkDuration = 10.0;
    window.aColor = [0, 140, 255];
    window.imageScale = 0.3;

    fVX = (2.0 * fPI) / window.iFramesToRotate;
    oRadGrad = null;
    ctxRender = nCanvasRender.getContext('2d');

    oRender = {
        pFirst: null
    };

    oBuffer = {
        pFirst: null
    };

    w = h = 0;

    // gets/sets size
    fnSetSize = function() {
        if (window.innerWidth < 600) {
          nCanvasRender.width = w = window.innerWidth * 2;
          nCanvasRender.height = h = window.innerHeight * 2;
          iProjSphereX = w / 2;
          iProjSphereY = h / 2;
        } else {
          const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
          nCanvasRender.width = w =  70 * remToPx;
          nCanvasRender.height = h = (60 * remToPx) * 2;
          iProjSphereX = w / 2;
          iProjSphereY = h / 2;
        }
        
        return {
            w: w,
            h: h
        };
    };
    fnSetSize();

    // window.onresize
    fnAddEventListener(window, 'resize', fnSetSize);

    fnSwapList = function(p, oSrc, oDst) {
        if (p != null) {
            if (oSrc.pFirst === p) {
                oSrc.pFirst = p.pNext;
                if (p.pNext != null) {
                    p.pNext.pPrev = null;
                }
            } else {
                p.pPrev.pNext = p.pNext;
                if (p.pNext != null) {
                    p.pNext.pPrev = p.pPrev;
                }
            }
        } else {
            p = new Particle();
        }
        p.pNext = oDst.pFirst;
        if (oDst.pFirst != null) {
            oDst.pFirst.pPrev = p;
        }
        oDst.pFirst = p;
        p.pPrev = null;
        return p;
    };

    // Particle class definition
    Particle = class Particle {
        fnInit() {
            this.fAngle = fnRnd() * fPI * 2;
            this.fForce = fnACos(fnRnd2());
            this.fAlpha = 0;
            this.bIsDead = false;
            this.iFramesAlive = 0;
            this.fX = iRadiusSphere * fnSin(this.fForce) * fnCos(this.fAngle);
            this.fY = iRadiusSphere * fnSin(this.fForce) * fnSin(this.fAngle);
            this.fZ = iRadiusSphere * fnCos(this.fForce);
            this.fVX = fStartVX * this.fX;
            this.fVY = fStartVY * this.fY;
            this.fVZ = fStartVZ * this.fZ;
            this.fGrowDuration = window.fGrowDuration + fnRnd2() * (window.fGrowDuration / 4.0);
            this.fWaitDuration = window.fWaitDuration + fnRnd2() * (window.fWaitDuration / 4.0);
            this.fShrinkDuration = window.fShrinkDuration + fnRnd2() * (window.fShrinkDuration / 4.0);
            this.fAX = 0.0;
            this.fAY = 0.0;
            this.fAZ = 0.0;
        }

        fnUpdate() {
            if (this.iFramesAlive > this.fGrowDuration + this.fWaitDuration) {
                this.fVX += this.fAX + fMaxAX * fnRnd2();
                this.fVY += this.fAY + fMaxAY * fnRnd2();
                this.fVZ += this.fAZ + fMaxAZ * fnRnd2();
                this.fX += this.fVX;
                this.fY += this.fVY;
                this.fZ += this.fVZ;
            }
            this.fRotX = fCosAngle * this.fX + fSinAngle * this.fZ;
            this.fRotZ = -fSinAngle * this.fX + fCosAngle * this.fZ;
            this.fRadiusCurrent = Math.max(0.01, window.iPerspective / (window.iPerspective - this.fRotZ));
            this.fProjX = this.fRotX * this.fRadiusCurrent + iProjSphereX;
            this.fProjY = this.fY * this.fRadiusCurrent + iProjSphereY;
            this.iFramesAlive += 1;
            if (this.iFramesAlive < this.fGrowDuration) {
                this.fAlpha = this.iFramesAlive * 1.0 / this.fGrowDuration;
            } else if (this.iFramesAlive < this.fGrowDuration + this.fWaitDuration) {
                this.fAlpha = 1.0;
            } else if (this.iFramesAlive < this.fGrowDuration + this.fWaitDuration + this.fShrinkDuration) {
                this.fAlpha = (this.fGrowDuration + this.fWaitDuration + this.fShrinkDuration - this.iFramesAlive) * 1.0 / this.fShrinkDuration;
            } else {
                this.bIsDead = true;
            }
            if (this.bIsDead === true) {
                fnSwapList(this, oRender, oBuffer);
            }
            this.fAlpha *= fnMin(1.0, fnMax(0.5, this.fRotZ / iRadiusSphere));
            this.fAlpha = fnMin(1.0, fnMax(0.0, this.fAlpha));
        }
    };

    // Particle prototype properties
    Object.assign(Particle.prototype, {
        fX: 0.0,
        fY: 0.0,
        fZ: 0.0,
        fVX: 0.0,
        fVY: 0.0,
        fVZ: 0.0,
        fAX: 0.0,
        fAY: 0.0,
        fAZ: 0.0,
        fProjX: 0.0,
        fProjY: 0.0,
        fRotX: 0.0,
        fRotZ: 0.0,
        pPrev: null,
        pNext: null,
        fAngle: 0.0,
        fForce: 0.0,
        fGrowDuration: 0.0,
        fWaitDuration: 0.0,
        fShrinkDuration: 0.0,
        fRadiusCurrent: 0.0,
        iFramesAlive: 0,
        bIsDead: false
    });

    fnRender = function() {
        // Clear canvas
        ctxRender.fillStyle = "#fff";
        ctxRender.fillRect(0, 0, w, h);

        // First draw particles behind the image (negative Z)
        var p = oRender.pFirst;
        while (p != null) {
            if (p.fRotZ < 0) {  // Only draw particles behind the sphere's center
                ctxRender.fillStyle = "rgba(" + window.aColor.join(',') + ',' + p.fAlpha.toFixed(4) + ")";
                ctxRender.beginPath();
                ctxRender.arc(p.fProjX, p.fProjY, p.fRadiusCurrent, 0, 2 * fPI, false);
                ctxRender.closePath();
                ctxRender.fill();
            }
            p = p.pNext;
        }

        // Draw center image
        const scaledWidth = centerImage.naturalWidth * window.imageScale;
        const scaledHeight = centerImage.naturalHeight * window.imageScale;
        ctxRender.drawImage(
            centerImage,
            iProjSphereX - scaledWidth/2.75,
            iProjSphereY - scaledHeight/2.25,
            scaledWidth,
            scaledHeight
        );

        // Then draw particles in front of the image (positive Z)
        p = oRender.pFirst;
        while (p != null) {
            if (p.fRotZ >= 0) {  // Only draw particles in front of the sphere's center
                ctxRender.fillStyle = "rgba(" + window.aColor.join(',') + ',' + p.fAlpha.toFixed(4) + ")";
                ctxRender.beginPath();
                ctxRender.arc(p.fProjX, p.fProjY, p.fRadiusCurrent, 0, 2 * fPI, false);
                ctxRender.closePath();
                ctxRender.fill();
            }
            p = p.pNext;
        }
    };

    fnNextFrame = function() {
        fAngle = (fAngle + fVX) % (2.0 * fPI);
        fSinAngle = fnSin(fAngle);
        fCosAngle = fnCos(fAngle);

        var iAddParticle = 0;
        while (iAddParticle++ < window.iNewParticlePerFrame) {
            var p = fnSwapList(oBuffer.pFirst, oBuffer, oRender);
            p.fnInit();
        }

        var p = oRender.pFirst;
        while (p != null) {
            var pNext = p.pNext;
            p.fnUpdate();
            p = pNext;
        }

        fnRender();
        fnRequestAnimationFrame(function() {
            return fnNextFrame();
        });
    };

    fnNextFrame();

    // // Setup GUI controls
    // gui = new dat.GUI();
    // gui.add(window, 'fGrowDuration').min(10).max(500).step(1);
    // gui.add(window, 'fWaitDuration').min(10).max(500).step(1);
    // gui.add(window, 'fShrinkDuration').min(10).max(500).step(1);
    // gui.add(window, 'iPerspective').min(150).max(1000).step(1);
    // gui.add(window, 'iNewParticlePerFrame').min(1).max(20).step(1);
    // gui.add(window, 'iFramesToRotate').min(50).max(2500).step(50)
    //     .onChange(function() {
    //         fVX = (2.0 * fPI) / window.iFramesToRotate;
    //     });
    // gui.addColor(window, 'aColor').onChange(function() {
    //     window.aColor[0] = ~~window.aColor[0];
    //     window.aColor[1] = ~~window.aColor[1];
    //     window.aColor[2] = ~~window.aColor[2];
    // });
    // gui.add(window, 'imageScale').min(0.1).max(3).step(0.1)
    //     .name('Image Size');

    // if (window.innerWidth < 1000) {
    //     gui.close();
    //     window.iNewParticlePerFrame = 5;
    // }

    window.app = this;
};

fnAddEventListener(window, 'load', app);
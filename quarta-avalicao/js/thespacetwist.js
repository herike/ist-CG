/*electronic_entertainment_videogame_programmed_with_three.js*/

/*Jogo do Space Invaders com um twist*/

var stats; //FPS counter

// var controls; //TODO: POR EM COMMENT

const FIELD_TOP = -100;
const FIELD_BOTTOM = 100;
const FIELD_SIDES = 100;
const BULLET_SPEED = 70;
const OVNI_SPEED = 30;

var camera, scene, renderer;
var camera1, camera2, camera3;
var cameraAux, cameraPause;
var camGameOver, camYouWin;

var hud;

var clock;

var ship;
var elements = [];
var score = 0;

var theSun;
var stars = [];
var spotLight;

var matManager;

var pause = false;

function render(cam) {
    'use strict';
    renderer.render(scene, cam);

}

function init() {
    'use strict';

    //FPS counter
    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
    ////////////////////////////////////////////

    renderer = new THREE.WebGLRenderer( {
    	antialias : true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.autoClear = false; // Para nao apagar o que esta por baixo ao adicionar um novo viewport

    matManager = new MaterialsManager();

    camera1 = createCamera("orto", 0, 30, 0, FIELD_SIDES, 10, 1000);
    camera2 = createCamera("pres", 0, 100, FIELD_BOTTOM+120, 45, 1, 12000);
    camera3 = createCamera("pres", 0, 30, -70, 45, 1, 12000);

    scene = new THREE.Scene();

    hud = new HUD();

    camera1.lookAt(scene.position);
    camera2.lookAt(scene.position);
    camera3.lookAt(new THREE.Vector3(0,0,0));

    clock = new THREE.Clock();
    clock.start();

    createLights();

    gameInit();

    createPauseMenu();
    createRestartMenu();

    // controls = new THREE.OrbitControls(camera, renderer.domElement); //TODO: POR EM COMMENT

    render(camera);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function gameInit() {
    createGameElements();
    ship.add(camera3); //Adicionamos a camara 3 a nave
    camera = camera2;
    score = 0;
    ship.add( spotLight );
    ship.add(spotLight.target);
}

function onUpdate(delta) {
    'use strict';

    // console.log(elements);
    if(ship.KIA)
        camera = camGameOver;
    if(score==8)
        camera = camYouWin;

    // Tentativa de movimento
    elements.forEach(function(el) {
        el.tryToMoveIt(delta);
    });

    // Testa colisoes com posicao tentativa e caso existam, trata a colisao
    for (var j=0; j<elements.length; j++){
        var jElm = elements[j];
        if(!jElm.KIA){
            if (jElm.collidedLimits()){
                jElm.collisionDealer();
            }
            for(var i=j+1; i<elements.length; i++){
                var iElm = elements[i];
                if(!iElm.KIA && jElm.collidedElement(iElm)){
                    jElm.collisionDealer(iElm);
                    iElm.collisionDealer(jElm);
                    break;
                }
            }
        }
    }

    // Removem-se os elementos que ja morreram ou entao atualiza-se a posicao
    elements.forEach(function(el,index) {
        if(el.KIA) {
            scene.remove(el);
            elements.splice(index,1);
        }
        else
            el.moveItmoveIt(delta);
    });

    //SpotLight

    spotLight.target.updateMatrixWorld();

}

function animate() {
    'use strict';

    stats.begin();
    var delta = clock.getDelta();

    if (!pause) onUpdate(delta);

    renderer.setSize(window.innerWidth, window.innerHeight);

    render(camera);
    // controls.update(); //TODO: POR EM COMMENT

    stats.end();

    renderer.setViewport(0,0,300,170);

    render(hud.camera);

    requestAnimationFrame(animate);
}

function createGameElements() {
    'use strict';

    createBackground();

    ship = createShip(0,0,FIELD_BOTTOM-22);
    ship.rotateY(Math.PI);
    elements.push(ship);

    elements.push(createOVNI(-60,0,-50));  elements.push(createOVNI(-20,0,-50));
    elements.push(createOVNI(20,0,-50));  elements.push(createOVNI(60,0,-50));

    elements.push(createOVNI(-60,0,-5));  elements.push(createOVNI(-20,0,-5));
    elements.push(createOVNI(20,0,-5));   elements.push(createOVNI(60,0,-5));
}

function createBackground() {
    var geom = new THREE.PlaneGeometry(1100,600,1,1);
    var material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "textures/space2.jpg" ) } );
    // space | space2 | green_space | ricky | Chubby_Checker
    var plane = new THREE.Mesh( geom, material );
    plane.position.y = -70;
    plane.position.z = -150;
    plane.rotateX(-2*Math.PI/6);
    scene.add( plane );
}

function createCamera(type, x, y, z, camArg, n, f) {
    'use strict';
    var cc;
    var aspectRatio = window.innerWidth / window.innerHeight;
    if (type == "orto") {
        if (aspectRatio >= 1) {
            cc = new THREE.OrthographicCamera( - camArg * aspectRatio, camArg * aspectRatio, camArg, -camArg, n, f );
            //left, right, top, bottom, near, far
        }
        else{
            cc = new THREE.OrthographicCamera( - camArg, camArg, camArg / aspectRatio, -camArg / aspectRatio, n, f );
        }
        cc.viewSize = camArg;
    }
    if (type == "pres")
         cc = new THREE.PerspectiveCamera(camArg, aspectRatio, n, f);
         // fov, aspect, near, far
    cc.position.x = x;
    cc.position.y = y;
    cc.position.z = z;

    cc.camType = type;

    return cc;
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    var aspectRatio = window.innerWidth / window.innerHeight;

    if (camera.camType == "orto") {

        var viewSize = camera.viewSize;

        if (aspectRatio >= 1) {
            camera.left = - viewSize * aspectRatio;
            camera.right = viewSize * aspectRatio;
            camera.top = viewSize;
            camera.bottom = -viewSize;
        }

        else {
            camera.left = - viewSize;
            camera.right = viewSize;
            camera.top = viewSize / aspectRatio;
            camera.bottom = -viewSize / aspectRatio;
        }
    }

    else if (camera.camType == "pres"){
        if (window.innerHeight > 0 && window.innerWidth > 0) {
            camera.aspect = aspectRatio;
        }
    }

    camera.updateProjectionMatrix();
}

function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {
        case 37: // <-
        case 39: // ->
            ship.accel.x = 0;
            //console.log("Braking!");
            break;
        case 66: //B
            if (!pause) {
                var new_bullet = createBullet();
                elements.push(new_bullet);
            }
            break;
    }
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 37: //   <-
            ship.accel.x = -ship.accelM;
            break;
        case 39: //   ->
            ship.accel.x = ship.accelM;
            break;
        case 49: //1
            if(!pause){
                camera = camera1;
                onResize();
            }
            break;
        case 50: //2
            if(!pause){
                camera = camera2;
                onResize();
            }
            break;
        case 51: //3
            if(!pause){
                camera = camera3;
                onResize();
            }
            break;
        case 65: //A
            if(!pause) matManager.toggleWireframe();
            break;
        case 67: //C
            if(!pause) toggleStars();
            break;
        case 71: //G
            // matManager.switchTo(PHONG);
            if(!pause) matManager.toggleShading()
            break;
        case 72: //H
            if(!pause) spotLight.visible = !spotLight.visible;
            break;
        case 76: //L
            // matManager.switchTo(BASIC);
            if(!pause) matManager.toggleLighting()
            break;
        case 78: //N
            if(!pause) theSun.visible = !theSun.visible;
            break;
        case 82: //R
            if(ship.KIA || score == 8) gameRestart();
            break;
        case 83: //S
            // TODO: clock.stop e clock.start
            pause = !pause;
            if (pause) {
                cameraAux = camera;
                camera = cameraPause;
            }
            else camera = cameraAux;
            onResize();
            break;
    }
}

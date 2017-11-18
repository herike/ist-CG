/*electronic_entertainment_videogame_programmed_with_three.js*/

/*Jogo do Space Invaders com um twist*/

var stats; //FPS counter

const FIELD_TOP = -100;
const FIELD_BOTTOM = 100;
const FIELD_SIDES = 100;
const BULLET_SPEED = 70;
const OVNI_SPEED = 30;

var camera, scene, renderer;
var camera1, camera2, camera3;

var clock;

var ship;
var elements = [];

function render() {
    'use strict';
    renderer.render(scene, camera);
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

    camera1 = createCamera("orto", 0, 30, 0, FIELD_SIDES, 10, 50);
    camera2 = createCamera("pres", 0, 100, FIELD_BOTTOM+170, 45, 1, 500);
    camera3 = createCamera("pres", 0, 30, -70, 45, 1, 500);

    createScene();

    ship.add(camera3); //Adicionamos a camara 3 a nave

    camera1.lookAt(scene.position);
    camera2.lookAt(scene.position);
    camera3.lookAt(new THREE.Vector3(0,0,0));

    camera = camera1;

    clock = new THREE.Clock();
    clock.start();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function onUpdate(delta) {
    'use strict';

    // console.log(elements);

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
                continue;
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

}

function animate() {
    'use strict';

    stats.begin();
    var delta = clock.getDelta();

    onUpdate(delta);

    render();

    stats.end();

    requestAnimationFrame(animate);
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    //Background - TODO: remover -----------------------------------------------
    var background = new THREE.Object3D();
    var geometry = new THREE.CubeGeometry(FIELD_SIDES*2, 2, FIELD_SIDES*2);
    var material = new THREE.MeshBasicMaterial({ color: 0x202020 }); //0xff00b9
    createPart(background, 0, 0, 0, false, false, 1, material, geometry);
    background.position.x = 0;
    background.position.y = -10;
    background.position.z = 0;
    scene.add(background);
    //--------------------------------------------------------------------------

    ship = createShip(0,0,FIELD_BOTTOM-20);
    ship.rotateY(Math.PI);
    elements.push(ship);

    elements.push(createOVNI(-60,0,-50));  elements.push(createOVNI(-20,0,-50));
    elements.push(createOVNI(20,0,-50));  elements.push(createOVNI(60,0,-50));

    elements.push(createOVNI(-60,0,-5));  elements.push(createOVNI(-20,0,-5));
    elements.push(createOVNI(20,0,-5));   elements.push(createOVNI(60,0,-5));
}

function createCamera(type, x, y, z, camArg, n, f) {
    'use strict';
    var cc;
    var aspectRatio = window.innerWidth / window.innerHeight;
    if (type == "orto")
        if (aspectRatio >= 1) {
            cc = new THREE.OrthographicCamera( - camArg * aspectRatio, camArg * aspectRatio, camArg, -camArg, n, f );
            //left, right, top, bottom, near, far
        }
        else{
            cc = new THREE.OrthographicCamera( - camArg, camArg, camArg / aspectRatio, -camArg / aspectRatio, n, f );
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

        var viewSize = FIELD_SIDES;

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
        case 98: //b
            var new_bullet = createBullet();
            elements.push(new_bullet);
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
            camera = camera1;
            onResize();
            break;
        case 50: //2
            camera = camera2;
            onResize();
            break;
        case 51: //3
            camera = camera3;
            onResize();
            break;
        case 65: //A
        case 97: //a
            s_material_orange.wireframe = !s_material_orange.wireframe;
            s_material_grey.wireframe = !s_material_grey.wireframe;
            s_material_bluegreen.wireframe = !s_material_bluegreen.wireframe;
            s_material_darkgrey.wireframe = !s_material_darkgrey.wireframe;
            o_material_green.wireframe = !o_material_green.wireframe;
            o_material_grey.wireframe = !o_material_grey.wireframe;
            o_material_fluorgreen.wireframe = !o_material_fluorgreen.wireframe;
            b_material.wireframe = !b_material.wireframe;
            break;
    }
}

/*electronic_entertainment_videogame_programmed_with_three.js*/

/*Jogo do Space Invaders com um twist*/

var camera, scene, renderer;

//var controls; //TODO: POR EM COMMENT

var geometry, mesh;

var clock;

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer( {
    	antialias : true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera("orto", 0, 30, 0, 80);

    //controls = new THREE.OrbitControls(camera, renderer.domElement); //TODO: POR EM COMMENT

    clock = new THREE.Clock();
    clock.start();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    shipMov();

    render();

    //controls.update(); //TODO: POR EM COMMENT

    requestAnimationFrame(animate);
}

function shipMov() {
    'use strict';

    var accel = ship.userData.accel; //100;

    var speedLimit = 99;

    var deltaT = clock.getDelta();

    if (ship.userData.movright)
        if (ship.userData.speed < speedLimit) ship.userData.speed += accel*deltaT;

    if (ship.userData.movleft)
        if (ship.userData.speed > -speedLimit) ship.userData.speed += -accel*deltaT;

    console.log("Speed: " + ship.userData.speed);

    ship.position.x += ship.userData.speed*deltaT;
}

function createPart(obj, x, y, z, rotX, rotY, minus, material) {
    'use strict';

    mesh = new THREE.Mesh(geometry, material);
    mesh.material.side = THREE.DoubleSide;
    mesh.position.set(x, y, z);
    if(rotX==true) {
      mesh.rotateX(minus*Math.PI/2);
    }
    if(rotY==true) {
      mesh.rotateY(minus*Math.PI/2);
    }
    obj.add(mesh);
}

function createMainBody(obj, x, y, z, mat) {
    'use strict';

    geometry = new THREE.CubeGeometry(6, 6, 10);

    createPart(obj, x, y, z, false, false, 1, mat);
}

function createCockpit(obj, x, y, z, mat) {
    'use strict';

    geometry = new THREE.CubeGeometry(6, 4, 4);

    createPart(obj, x, y - 1, z + 7, false, false, 1, mat);
}

function createCannonBody(obj, x, y, z, mat) {
    'use strict';

    geometry = new THREE.CubeGeometry(2, 2, 8);

    createPart(obj, x, y - 1, z + 13, false, false, 1, mat);
}

function createCannonGun(obj, x, y, z, mat) {
    'use strict';

    geometry = new THREE.CylinderGeometry( 0.2, 0.7, 2, 10, 1, true );

    createPart(obj, x, y - 1, z + 18, true, false, 1, mat);
}

function createThruster(obj, x, y, z, mat) {
    'use strict';

    geometry = new THREE.CylinderGeometry( 2, 2, 10, 30, 1 );

    createPart(obj, x, y + 3, z - 3, true, false, 1, mat);

}

function createExhaust(obj, x, y, z, mat) {
    'use strict';

    geometry = new THREE.CylinderGeometry( 2, 3.5, 3, 30, 1, true );

    createPart(obj, x, y + 3, z - 9.5, true, false, 1, mat);

}

// function createWindshield(obj, x, y, z, mat) {
//     'use strict';

//     var A = new THREE.Vector2( 0, 0);
//     var B = new THREE.Vector2( 0, 2);
//     var C = new THREE.Vector2( 4, 0);

//     geometry = new PrismGeometry( [ A, B, C ], 6 );

//     createPart(obj, x + 3, y + 1, z + 5, false, true, -1, mat);
// }

// function createRightWing(obj, x, y, z, mat) {
//     'use strict';

//     var A = new THREE.Vector2( -10, 0);
//     var B = new THREE.Vector2( 0, -14);
//     var C = new THREE.Vector2( 0, 0);

//     geometry = new PrismGeometry( [ A, B, C ], 1 );

//     createPart(obj, x -3, y - 3, z - 5, true, false, -1, mat);

// }

// function createLeftWing(obj, x, y, z, mat) {
//     'use strict';

//     var A = new THREE.Vector2( 10, 0);
//     var B = new THREE.Vector2( 0, -14);
//     var C = new THREE.Vector2( 0, 0);

//     geometry = new PrismGeometry( [ A, B, C ], 1 );

//     createPart(obj, x +3, y - 3, z - 5, true, false, -1, mat);

// }

function createUglyWing(obj, x, y, z, mat) {
    'use strict';

    geometry = new THREE.CubeGeometry(14, 1, 7);
    // x, y, z
    createPart(obj, x, y - 1, z + 7, false, false, 1, mat);
}

function createWingGun(obj, x, y, z, mat) {
    'use strict';

    geometry = new THREE.CylinderGeometry( 0.5, 0.5, 8, 10, 1 );
    //radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength
    createPart(obj, x, y - 2.5, z - 1, true, false, 1, mat);

}

function createWingLazer(obj, x, y, z, mat) {
    'use strict';

    geometry = new THREE.CylinderGeometry( 0.2, 0.5, 1.5, 10, 1, true );

    createPart(obj, x, y - 2.5, z + 3.75, true, false, 1, mat);

}

var ship;
var s_material_bluegreen;
var s_material_orange;
var s_material_darkgrey;
var s_material_grey;

function createShip() {
    'use strict';

    var ship_aux = new THREE.Object3D();

    var x=0, y=0, z=0;

    s_material_bluegreen = new THREE.MeshBasicMaterial({ color: 0x2f4f4f });
    s_material_orange = new THREE.MeshBasicMaterial({ color: 0xffa500 });
    s_material_darkgrey = new THREE.MeshBasicMaterial({ color: 0x696969 });
    s_material_grey = new THREE.MeshBasicMaterial({ color: 0x808080 });

    ship_aux.userData = { movleft: false, movrigth: false, speed: 0, accel: 100 };

    createMainBody(ship_aux, x, y ,z, s_material_grey);

    createCockpit(ship_aux, x, y, z, s_material_grey);

    //createWindshield(ship_aux, x, y, z, s_material_orange);

    createCannonBody(ship_aux, x, y, z, s_material_bluegreen);

    createCannonGun(ship_aux, x, y, z, s_material_orange);

    createThruster(ship_aux, x + 5, y, z, s_material_darkgrey);
    createThruster(ship_aux, x - 5, y, z, s_material_darkgrey);

    createExhaust(ship_aux, x + 5, y, z, s_material_orange);
    createExhaust(ship_aux, x - 5, y, z, s_material_orange);

    createUglyWing(ship_aux, x - 10, y - 1.5, z - 8.5, s_material_bluegreen);
    createUglyWing(ship_aux, x + 10, y - 1.5, z - 8.5, s_material_bluegreen);
    //createRightWing(ship_aux, x, y, z, s_material_bluegreen);
    //createLeftWing(ship_aux, x, y, z, s_material_bluegreen);

    createWingGun(ship_aux, x + 11.5, y, z + 0.1, s_material_grey);
    createWingGun(ship_aux, x + 9, y, z + 3, s_material_grey);
    createWingGun(ship_aux, x - 11.5, y, z + 0.1, s_material_grey);
    createWingGun(ship_aux, x - 9, y, z + 3, s_material_grey);

    createWingLazer(ship_aux, x + 11.5, y, z, s_material_orange);
    createWingLazer(ship_aux, x + 9, y, z + 3, s_material_orange);
    createWingLazer(ship_aux, x - 11.5, y, z, s_material_orange);
    createWingLazer(ship_aux, x - 9, y, z + 3, s_material_orange);

    ship_aux.position.x = x;
    ship_aux.position.y = y;
    ship_aux.position.z = 60;

    scene.add(ship_aux);

    return ship_aux;
}

function createChassis(obj, x, y, z, mat) {
    'use strict';

    geometry = new THREE.CylinderGeometry( 15, 15, 1, 30, 1);
    //radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength
    createPart(obj, x, y, z, false, false, 1, mat);
}

function createOVNIpit(obj, x, y, z, mat) {
    'use strict';

    geometry = new THREE.SphereGeometry( 6, 30, 20, 0, Math.PI * 2, 0, 1.4 );

    createPart(obj, x, y - 1, z, false, false, 1, mat);
}

function createOVNIbody(obj, x, y, z, mat) {
    'use strict';

    geometry = new THREE.SphereGeometry( 18, 30, 20, 0, Math.PI * 2, 2.3, 1);
    //radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength
    createPart(obj, x, y + 12, z, false, false, 1, mat);
}

var o_material_green = new THREE.MeshBasicMaterial({ color: 0x849f7d });
var o_material_fluorgreen = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var o_material_grey = new THREE.MeshBasicMaterial({ color: 0x757575 });

function createOVNI(x, y, z) {
    'use strict';

    var ovni_aux = new THREE.Object3D();

    createChassis(ovni_aux, x, y, z, o_material_grey);

    createOVNIpit(ovni_aux, x, y, z, o_material_fluorgreen);

    createOVNIbody(ovni_aux, x, y, z, o_material_green);

    ovni_aux.position.x = x;
    ovni_aux.position.y = y;
    ovni_aux.position.z = z;

    scene.add(ovni_aux);
}

var axisXYZ;

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    axisXYZ = new THREE.AxisHelper(10);

    scene.add(axisXYZ);

    axisXYZ.visible = false;

    ship = createShip();

    createOVNI(-30,0,-30);
    createOVNI(-10,0,-30);
    createOVNI(10,0,-30);
    createOVNI(30,0,-30);

    createOVNI(-30,0,-10);
    createOVNI(-10,0,-10);
    createOVNI(10,0,-10);
    createOVNI(30,0,-10);

    ship.rotateY(Math.PI);
}

function createCamera(type, x, y, z, viewSize) {
    'use strict';
    var aspectRatio = window.innerWidth / window.innerHeight;
    if (type == "orto")
        if (aspectRatio >= 1) {
            camera = new THREE.OrthographicCamera( - viewSize * aspectRatio, viewSize * aspectRatio, viewSize, -viewSize, 10, 50 );
            //left, right, top, bottom, near, far
        }
        else{
            camera = new THREE.OrthographicCamera( - viewSize, viewSize, viewSize / aspectRatio, -viewSize / aspectRatio, 10, 50 );
        }
    // if (type == "pres")
    //     camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    camera.lookAt(scene.position);
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    var aspectRatio = window.innerWidth / window.innerHeight;

    var viewSize = 80;

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

    camera.updateProjectionMatrix();
}

function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {
        case 37:
        case 39:
            ship.userData.movleft = false;
            ship.userData.movright = false;
            //console.log("Braking!");
            break;
    }
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 37: //   <-
            ship.userData.movleft = true;
            ship.userData.movright = false;
            //console.log("<- DOWN");
            break;
        case 39: //   ->
            ship.userData.movleft = false;
            ship.userData.movright = true;
            //console.log("-> DOWN");
            break;
        // case 49: //1
        //     createCamera("orto", 0, 80, 0, 80);
        //     break;
        // case 50: //2
        //     createCamera("pres", 120, 120, 120);
        //     //controls = new THREE.OrbitControls(camera, renderer.domElement); //TODO: POR EM COMMENT
        //     break;
        // case 51: //3
        //     createCamera("orto", 80, 0, 0, 50);
        //     break;s
        case 65: //A
        case 97: //a
            s_material_orange.wireframe = !s_material_orange.wireframe
            s_material_grey.wireframe = !s_material_grey.wireframe
            s_material_bluegreen.wireframe = !s_material_bluegreen.wireframe
            s_material_darkgrey.wireframe = !s_material_darkgrey.wireframe
            o_material_green.wireframe = !o_material_green.wireframe
            o_material_grey.wireframe = !o_material_grey.wireframe
            o_material_fluorgreen.wireframe = !o_material_fluorgreen.wireframe
            break;
        case 83:  //S
        case 115: //s
        case 69:  //E
        case 101: //e
            axisXYZ.visible = !axisXYZ.visible;
            break;
    }
}

// PrismGeometry = function ( vertices, height ) {

//     var Shape = new THREE.Shape();

//     ( function f( ctx ) {

//         ctx.moveTo( vertices[0].x, vertices[0].y );
//         for (var i=1; i < vertices.length; i++) {
//             ctx.lineTo( vertices[i].x, vertices[i].y );
//         }
//         ctx.lineTo( vertices[0].x, vertices[0].y );

//     } )( Shape );

//     var settings = { };
//     settings.amount = height;
//     settings.bevelEnabled = false;
//     THREE.ExtrudeGeometry.call( this, Shape, settings );

// };

// PrismGeometry.prototype = Object.create( THREE.ExtrudeGeometry.prototype );

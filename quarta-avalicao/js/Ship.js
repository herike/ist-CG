class Ship extends GameElement {

    constructor() {
    	'use strict';
        super();
        // console.log("Criou bem a nave");
        this.accelM = 99;
        this.speed = new MyVector(0,0,0);
        // this.speedLimit = 99;
        this.volumeRadius = 21;
        this.lives = 3;
    }

    collisionDealer(obj) {
    	'use strict';
        console.log(obj);
        if (obj instanceof OVNI) {
            this.lives--;
            hud.shipDied();
            if (this.lives == 0) this.KIA = true;
        }
    	else if (this.collidedSides) {
    		this.speed.set(0,0,0);
    		if(this.posAttempt.x > 0) this.posAttempt.x = FIELD_SIDES - this.volumeRadius;
            else this.posAttempt.x = -FIELD_SIDES + this.volumeRadius;
    	}
        this.resetCollisions();
    }
}

// NEW SHIP FROM HERE

function poligon_createMainBody(obj, mat){

    var geom = createCubeGeometry(10,5, 30);

    var part = new THREE.Mesh( geom, mat );

    part.position.x = -5;
    part.position.z = -15;
    part.position.y = -2.5;

    obj.add(part);
}
function poligon_createMainWing(obj, mat){

    var geom = createCubeGeometry(40,1, 10);

    var part = new THREE.Mesh( geom, mat );

    part.position.x = -20;
    part.position.z = -15;
    part.position.y = -3;

    obj.add(part);
}
function poligon_createWing(obj, beg, wid, len, mat, height, rotX=0, rotZ=0) {
    var geom = createPrismGeometry(wid, 1, len);

    var part = new THREE.Mesh( geom, mat );

    part.rotateX(rotX*Math.PI);
    part.rotateZ(rotZ*Math.PI);

    part.position.x = beg;
    part.position.z = -5;
    part.position.y = height;

    obj.add(part);
}


function poligon_createWingSpike(obj, beg, wid, len,top, height, mat, rotX=0, rotZ=0) {
    var geom = createPrismGeometry(wid, 1, len);

    var part = new THREE.Mesh( geom, mat );

    part.rotateX(rotX*Math.PI);
    part.rotateZ(rotZ*Math.PI);
    if (top){
      part.position.x = beg;
      part.position.z = -8;
    }
    else {
      part.position.x = beg;
      part.position.z = -5;
    }

    part.position.y = height;

    obj.add(part);
}

function poligon_createCannon(obj, mat) {

    var geom = createPyramidGeometry(10, 5, 7);
    var part = new THREE.Mesh( geom, mat );

    part.position.x = -5;
    part.position.y = -2.5;
    part.position.z = 15;

    obj.add(part);
}

function shipBoundingVolume(ship_obj) {
    var vol_material = matManager.getCurrentMaterial(B_FPINK);
    var geometry = new THREE.SphereGeometry( ship_obj.volumeRadius, 30, 30);
    var volume = new THREE.Object3D();
    createPart(volume, 0, 0, 0, false, false, 1, vol_material, geometry);
    ship_obj.add(volume);
}

function createShip(xi, yi, zi) {
    'use strict';

    var ship_aux = new Ship();

    var x=0, y=0, z=0;

    // var eixo = new THREE.AxisHelper(20);
    // ship_aux.add(eixo);

    var s_material_bluegreen = matManager.getCurrentMaterial(S_BGREEN);
    var s_material_orange = matManager.getCurrentMaterial(S_ORANGE);
    var s_material_darkgrey = matManager.getCurrentMaterial(S_DARKGREY);
    var s_material_grey = matManager.getCurrentMaterial(S_GREY);

    // shipBoundingVolume(ship_aux);

    poligon_createMainBody(ship_aux, s_material_grey);

    poligon_createMainWing(ship_aux, s_material_grey);

    poligon_createWing(ship_aux, -5, -15, -5, s_material_bluegreen, -3);
    poligon_createWing(ship_aux, 5, -15, -5, s_material_bluegreen,-2, 0,1);


    poligon_createWingSpike(ship_aux, -15, -5, -15,false,-3, s_material_orange);
    poligon_createWingSpike(ship_aux, 15, -5, -15,false,-2, s_material_orange,0,1);

    poligon_createWingSpike(ship_aux, -5, -5, -10,true,1, s_material_orange, 1);

    poligon_createWingSpike(ship_aux, 5, -5, -10,true,0, s_material_orange, 1, 1);

    poligon_createWingSpike(ship_aux, -5, -5, -20,true,0, s_material_darkgrey);
    poligon_createWingSpike(ship_aux, 5, -5, -20,true,1, s_material_darkgrey,0,1);

    poligon_createCannon(ship_aux, s_material_orange);

    ship_aux.position.x = xi;
    ship_aux.position.y = yi;
    ship_aux.position.z = zi;

    scene.add(ship_aux);

    return ship_aux;
}

class Ship extends GameElement {

    constructor() {
    	'use strict';
        super();
        // console.log("Criou bem a nave");
        this.accelM = 99;
        this.speed = new MyVector(0,0,0);
        // this.speedLimit = 99;
        this.volumeRadius = 17;
    }

    collisionDealer(obj) {
    	'use strict';
    	if (this.collidedSides) {
    		this.speed.set(0,0,0);
    		if(this.posAttempt.x > 0) this.posAttempt.x = FIELD_SIDES - this.volumeRadius;
            else this.posAttempt.x = -FIELD_SIDES + this.volumeRadius;
    	}
        this.resetCollisions();
    }
}

//Criacao da nave
function createMainBody(obj, x, y, z, mat) {
    'use strict';

    var geometry = new THREE.CubeGeometry(6, 6, 10);

    createPart(obj, x, y, z, false, false, 1, mat, geometry);
}

function createCockpit(obj, x, y, z, mat) {
    'use strict';

    var geometry = new THREE.CubeGeometry(6, 4, 4);

    createPart(obj, x, y - 1, z + 7, false, false, 1, mat, geometry);
}

function createCannonBody(obj, x, y, z, mat) {
    'use strict';

    var geometry = new THREE.CubeGeometry(2, 2, 8);

    createPart(obj, x, y - 1, z + 13, false, false, 1, mat, geometry);
}

function createCannonGun(obj, x, y, z, mat) {
    'use strict';

    var geometry = new THREE.CylinderGeometry( 0.2, 0.7, 2, 10, 1, true );

    createPart(obj, x, y - 1, z + 18, true, false, 1, mat, geometry);
}

function createThruster(obj, x, y, z, mat) {
    'use strict';

    var geometry = new THREE.CylinderGeometry( 2, 2, 10, 30, 1 );

    createPart(obj, x, y + 3, z - 3, true, false, 1, mat, geometry);

}

function createExhaust(obj, x, y, z, mat) {
    'use strict';

    var geometry = new THREE.CylinderGeometry( 2, 3.5, 3, 30, 1, true );

    createPart(obj, x, y + 3, z - 9.5, true, false, 1, mat, geometry);

}

function createUglyWing(obj, x, y, z, mat) {
    'use strict';

    var geometry = new THREE.CubeGeometry(14, 1, 7);
    // x, y, z
    createPart(obj, x, y - 1, z + 7, false, false, 1, mat, geometry);
}

function createWingGun(obj, x, y, z, mat) {
    'use strict';

    var geometry = new THREE.CylinderGeometry( 0.5, 0.5, 8, 10, 1 );
    //radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength
    createPart(obj, x, y - 2.5, z - 1, true, false, 1, mat, geometry);

}

function createWingLazer(obj, x, y, z, mat) {
    'use strict';

    var geometry = new THREE.CylinderGeometry( 0.2, 0.5, 1.5, 10, 1, true );

    createPart(obj, x, y - 2.5, z + 3.75, true, false, 1, mat, geometry);

}

var s_material_bluegreen;
var s_material_orange;
var s_material_darkgrey;
var s_material_grey;

function createShip(xi, yi, zi) {
    'use strict';

    var ship_aux = new Ship();

    var x=0, y=0, z=0;

    //var eixo = new THREE.AxisHelper(17);
    //ship_aux.add(eixo);

    s_material_bluegreen = new THREE.MeshBasicMaterial({ color: 0x2f4f4f });
    s_material_orange = new THREE.MeshBasicMaterial({ color: 0xffa500 });
    s_material_darkgrey = new THREE.MeshBasicMaterial({ color: 0x696969 });
    s_material_grey = new THREE.MeshBasicMaterial({ color: 0x808080 });

    createMainBody(ship_aux, x, y ,z, s_material_grey);

    createCockpit(ship_aux, x, y, z, s_material_grey);

    // createWindshield(ship_aux, x, y, z, s_material_orange);

    createCannonBody(ship_aux, x, y, z, s_material_bluegreen);

    createCannonGun(ship_aux, x, y, z, s_material_orange);

    createThruster(ship_aux, x + 5, y, z, s_material_darkgrey);
    createThruster(ship_aux, x - 5, y, z, s_material_darkgrey);

    createExhaust(ship_aux, x + 5, y, z, s_material_orange);
    createExhaust(ship_aux, x - 5, y, z, s_material_orange);

    createUglyWing(ship_aux, x - 10, y - 1.5, z - 8.5, s_material_bluegreen);
    createUglyWing(ship_aux, x + 10, y - 1.5, z - 8.5, s_material_bluegreen);
    // createRightWing(ship_aux, x, y, z, s_material_bluegreen);
    // createLeftWing(ship_aux, x, y, z, s_material_bluegreen);

    createWingGun(ship_aux, x + 11.5, y, z + 0.1, s_material_grey);
    createWingGun(ship_aux, x + 9, y, z + 3, s_material_grey);
    createWingGun(ship_aux, x - 11.5, y, z + 0.1, s_material_grey);
    createWingGun(ship_aux, x - 9, y, z + 3, s_material_grey);

    createWingLazer(ship_aux, x + 11.5, y, z, s_material_orange);
    createWingLazer(ship_aux, x + 9, y, z + 3, s_material_orange);
    createWingLazer(ship_aux, x - 11.5, y, z, s_material_orange);
    createWingLazer(ship_aux, x - 9, y, z + 3, s_material_orange);

    ship_aux.position.x = xi;
    ship_aux.position.y = yi;
    ship_aux.position.z = zi;

    scene.add(ship_aux);

    return ship_aux;
}

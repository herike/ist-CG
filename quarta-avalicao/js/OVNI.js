class OVNI extends GameElement {

    constructor() {
    	'use strict';
        super();
        // console.log("Criou bem o OVNIzito");
        this.calcSpeed(OVNI_SPEED); // Alterar modulo da velocidade aqui
        // this.speedLimit = OVNI_SPEED;
        this.volumeRadius = 15;
    }

    calcSpeed(factor) {
    	'use strict';
        var sinal = [1,-1]
        var sX = sinal[Math.round(Math.random())] * Math.random();
        var sY = 0;
        var sZ = sinal[Math.round(Math.random())] * Math.random();
        var value = Math.sqrt(sX*sX+sZ*sZ);
        this.speed = new MyVector((sX/value) * factor, sY, (sZ/value) * factor);
    }

    collisionDealer(obj=null) {
    	if (obj instanceof Bullet || obj instanceof Ship) {
            this.KIA = true;
            score++;
        }
        else if (this.collidedSides) {
    		this.speed.x = -this.speed.x;
            this.posAttempt.x = this.position.x;
    	}
    	else if (this.collidedTB) {
    		this.speed.z = -this.speed.z;
            this.posAttempt.z = this.position.z;
    	}
        else if (obj instanceof OVNI) {
            this.speed.x = -this.speed.x;
    		this.speed.z = -this.speed.z;
            this.posAttempt.x = this.position.x;
            this.posAttempt.z = this.position.z;
        }
        this.resetCollisions();
    }
}

function createChassis(obj, x, y, z, mat) {
    'use strict';

    var geometry = new THREE.CylinderGeometry( 15, 15, 1, 30, 1);
    //radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength
    createPart(obj, x, y, z, false, false, 1, mat, geometry);
}

function createOVNIpit(obj, x, y, z, mat) {
    'use strict';

    var geometry = new THREE.SphereGeometry( 6, 30, 20, 0, Math.PI * 2, 0, 1.4 );

    createPart(obj, x, y - 1, z, false, false, 1, mat, geometry);
}

function createOVNIbody(obj, x, y, z, mat) {
    'use strict';

    var geometry = new THREE.SphereGeometry( 18, 30, 20, 0, Math.PI * 2, 2.3, 1);
    //radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength
    createPart(obj, x, y + 12, z, false, false, 1, mat, geometry);
}

function createOVNI(x, y, z) {
    'use strict';

    var ovni_aux = new OVNI();

    var o_material_green = matManager.getCurrentMaterial(O_GREEN);
    var o_material_fluorgreen = matManager.getCurrentMaterial(O_FGREEN);
    var o_material_grey = matManager.getCurrentMaterial(O_GREY);

    createChassis(ovni_aux, 0, 0, 0, o_material_grey);

    createOVNIpit(ovni_aux, 0, 0, 0, o_material_fluorgreen);

    createOVNIbody(ovni_aux, 0, 0, 0, o_material_green);

    //var eixo = new THREE.AxisHelper(15);
    //ovni_aux.add(eixo);

    ovni_aux.position.x = x;
    ovni_aux.position.y = y;
    ovni_aux.position.z = z;

    scene.add(ovni_aux);

    return ovni_aux;
}

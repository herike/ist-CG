class GameElement extends THREE.Object3D {

    constructor() {
    	'use strict';
        super();
        this.accel = new MyVector(0,0,0);
        this.posAttempt = new MyVector(0,0,0);
        this.collidedSides = false;
        this.collidedTB = false;
        this.KIA = false;
        this.volumeCenter = this.posAttempt;
    }

    tryToMoveIt(deltaT) {
    	'use strict';

        this.posAttempt.x = this.position.x;
        this.posAttempt.y = this.position.y;
        this.posAttempt.z = this.position.z;

        this.speed.x += this.accel.x*deltaT;
        this.speed.y += this.accel.y*deltaT;
        this.speed.z += this.accel.z*deltaT;

        this.posAttempt.x += this.speed.x*deltaT;
        this.posAttempt.y += this.speed.y*deltaT;
        this.posAttempt.z += this.speed.z*deltaT;
    }

    collidedLimits() {
        'use strict';
        if ((Math.abs(this.volumeCenter.x) + this.volumeRadius) >= FIELD_SIDES) {
            this.collidedSides = true;
            return true;
        }
        else if ((this.volumeCenter.z + this.volumeRadius) >= FIELD_BOTTOM ||
                    (this.volumeCenter.z - this.volumeRadius) <= FIELD_TOP) {
            this.collidedTB = true;
            return true;
        }
        return false;
    }

    collidedElement(elem) {
        var myPos = this.volumeCenter;
        var iPos = elem.volumeCenter;
        var distance = Math.sqrt(Math.pow(myPos.x-iPos.x,2) + Math.pow(myPos.z-iPos.z,2));
        if (distance <= (this.volumeRadius + elem.volumeRadius)) return true;
        else return false;
    }

    //collisionDealer definido em cada subclasse

    moveItmoveIt(deltaT) {
    	'use strict';

        //Atualizar a posicao com a attempt
        this.position.x = this.posAttempt.x;
        this.position.y = this.posAttempt.y;
        this.position.z = this.posAttempt.z;

        this.resetCollisions();
    }

    resetCollisions() {
        this.collidedSides = false;
        this.collidedTB = false;
    }
}

function createPart(obj, x, y, z, rotX, rotY, minus, material, geometry) {
    'use strict';

    var mesh = new THREE.Mesh(geometry, material);
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

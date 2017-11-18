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
    mesh.position.set(x, y, z);
    if(rotX==true) {
      mesh.rotateX(minus*Math.PI/2);
    }
    if(rotY==true) {
      mesh.rotateY(minus*Math.PI/2);
    }
    obj.add(mesh);
}

function createCubeGeometry(x, y, z) {
    var geom = new THREE.Geometry();

    geom.vertices.push(new THREE.Vector3(0,0,0));
    geom.vertices.push(new THREE.Vector3(0,y,0));
    geom.vertices.push(new THREE.Vector3(x,0,0));
    geom.vertices.push(new THREE.Vector3(x,y,0));

    geom.vertices.push(new THREE.Vector3(0,0,z));
    geom.vertices.push(new THREE.Vector3(0,y,z));
    geom.vertices.push(new THREE.Vector3(x,0,z));
    geom.vertices.push(new THREE.Vector3(x,y,z));

    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 1, 3, 2 ) );

    geom.faces.push( new THREE.Face3( 0, 4, 1 ) );
    geom.faces.push( new THREE.Face3( 4, 5, 1 ) );

    geom.faces.push( new THREE.Face3( 3, 6, 2 ) );
    geom.faces.push( new THREE.Face3( 3, 7, 6 ) );

    geom.faces.push( new THREE.Face3( 1, 7, 3 ) );
    geom.faces.push( new THREE.Face3( 1, 5, 7 ) );

    geom.faces.push( new THREE.Face3( 0, 2, 6 ) );
    geom.faces.push( new THREE.Face3( 0, 6, 4 ) );

    geom.faces.push( new THREE.Face3( 5, 6, 7 ) );
    geom.faces.push( new THREE.Face3( 5, 4, 6 ) );

    geom.computeFaceNormals();

    return geom;
}

function createPrismGeometry(x, y, z) {

    var geom = new THREE.Geometry();

    geom.vertices.push(new THREE.Vector3(0,0,0));
    geom.vertices.push(new THREE.Vector3(0,0,-z));
    geom.vertices.push(new THREE.Vector3(x,0,0));

    geom.vertices.push(new THREE.Vector3(0,y,0));
    geom.vertices.push(new THREE.Vector3(0,y,-z));
    geom.vertices.push(new THREE.Vector3(x,y,0));

    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );

    geom.faces.push( new THREE.Face3( 3, 5, 4 ) );

    geom.faces.push( new THREE.Face3( 0, 2, 3 ) );
    geom.faces.push( new THREE.Face3( 3, 2, 5 ) );

    geom.faces.push( new THREE.Face3( 0, 4, 1 ) );
    geom.faces.push( new THREE.Face3( 0, 3, 4 ) );

    geom.faces.push( new THREE.Face3( 1, 4, 2 ) );
    geom.faces.push( new THREE.Face3( 2, 4, 5 ) );

    geom.computeFaceNormals();

    return geom;
}

function createPyramidGeometry(x, y, z) {
    var geom = new THREE.Geometry();

    geom.vertices.push(new THREE.Vector3(0,0,0));
    geom.vertices.push(new THREE.Vector3(0,y,0));
    geom.vertices.push(new THREE.Vector3(x,0,0));
    geom.vertices.push(new THREE.Vector3(x,y,0));

    geom.vertices.push(new THREE.Vector3(x/2,y/2,z));

    geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom.faces.push( new THREE.Face3( 1, 3, 2 ) );

    geom.faces.push( new THREE.Face3( 0, 4, 1 ) );

    geom.faces.push( new THREE.Face3( 1, 4, 3 ) );

    geom.faces.push( new THREE.Face3( 3, 4, 2 ) );

    geom.faces.push( new THREE.Face3( 0, 2, 4 ) );

    geom.computeFaceNormals();

    return geom;
}

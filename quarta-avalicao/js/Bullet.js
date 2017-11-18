class Bullet extends GameElement {
    //IDEA: Ao carregar mais tempo a bala aparece logo e vai crescendo
    //e so quando se larga a tecla e que sai
    constructor() {
        'use strict';
        super();
        // console.log("Criou bem a bala");
        this.speed = new MyVector(0,0,-BULLET_SPEED);
        // this.speedLimit = BULLET_SPEED;
        this.volumeRadius = 1;
    }

    collisionDealer() {
    	'use strict';
        this.KIA=true;
    }
}

function createBullet() {

    var b_material = matManager.getCurrentMaterial(B_FPINK);
    var bullet_aux = new Bullet();
    var geometry = new THREE.SphereGeometry( 1, 10, 10);
    //radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength
    createPart(bullet_aux, 0, 0, 0, false, false, 1, b_material, geometry);
    bullet_aux.position.x = ship.position.x;
    bullet_aux.position.y = ship.position.y;
    bullet_aux.position.z = ship.position.z - 23;

    scene.add(bullet_aux);

    return bullet_aux;
}

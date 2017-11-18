function createMenu(pos, img) {

    var cam = createCamera("pres", 0, 120, pos, 45, 1, 1200);

    var geom = new THREE.PlaneGeometry(250,200,1,1);
    var material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "textures/"+img ) } );
    // space | space2 | green_space | ricky | Chubby_Checker
    var plane = new THREE.Mesh( geom, material );

    plane.position.set(0,0,pos);

    plane.rotateX(-Math.PI/2);

    scene.add( plane );

    cam.lookAt(plane.position);

    return cam;
}

function createPauseMenu() {

    // cameraPause = createCamera("pres", 0, 120, 1000, 45, 1, 1200);
    //
    // var geom = new THREE.PlaneGeometry(250,200,1,1);
    // var material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( "pause.jpg" ) } );
    // // space | space2 | green_space | ricky | Chubby_Checker
    // var plane = new THREE.Mesh( geom, material );
    //
    // plane.position.set(0,0,1000);
    //
    // plane.rotateX(-Math.PI/2);
    //
    // scene.add( plane );
    //
    // cameraPause.lookAt(plane.position);
    cameraPause = createMenu(1000, "pause.jpg");
}

function createRestartMenu() {
    camGameOver = createMenu(4000, "Game_Over.jpg"); //"DoBomCeu.jpeg"
    camYouWin = createMenu(5000, "You_Twist.jpg");
}

function gameRestart() {
    elements.forEach(function(el) {
        scene.remove(el);
    });
    elements=[];
    gameInit();
    hud.resetLives();
}

class HUD {
    constructor(){
        this.camera = createCamera("orto", 0, 150, 2000, 40, 1, 1200);
        this.shipLives = [];
        this.shipLives.push(createShip(50,0,2000));
        this.shipLives.push(createShip(0,0,2000));
        this.shipLives.push(createShip(-50,0,2000));
        this.camera.lookAt(this.shipLives[1].position);
        this.camera.rotateZ(Math.PI);
    }

    shipDied(){
        this.shipLives[ship.lives].visible = false;
    }

    resetLives() {
        this.shipLives.forEach(function(el) {
            el.visible = true;
        });
    }
}

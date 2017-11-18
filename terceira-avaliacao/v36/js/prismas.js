function createWindshield(obj, x, y, z, mat) {
    'use strict';

    var A = new THREE.Vector2( 0, 0);
    var B = new THREE.Vector2( 0, 2);
    var C = new THREE.Vector2( 4, 0);

    var geometry = new PrismGeometry( [ A, B, C ], 6 );

    createPart(obj, x + 3, y + 1, z + 5, false, true, -1, mat, geometry);
}

function createRightWing(obj, x, y, z, mat) {
    'use strict';

    var A = new THREE.Vector2( -10, 0);
    var B = new THREE.Vector2( 0, -14);
    var C = new THREE.Vector2( 0, 0);

    var geometry = new PrismGeometry( [ A, B, C ], 1 );

    createPart(obj, x -3, y - 3, z - 5, true, false, -1, mat, geometry);

}

function createLeftWing(obj, x, y, z, mat) {
    'use strict';

    var A = new THREE.Vector2( 10, 0);
    var B = new THREE.Vector2( 0, -14);
    var C = new THREE.Vector2( 0, 0);

    var geometry = new PrismGeometry( [ A, B, C ], 1 );

    createPart(obj, x +3, y - 3, z - 5, true, false, -1, mat, geometry);

}

PrismGeometry = function ( vertices, height ) {

    var Shape = new THREE.Shape();

    ( function f( ctx ) {

        ctx.moveTo( vertices[0].x, vertices[0].y );
        for (var i=1; i < vertices.length; i++) {
            ctx.lineTo( vertices[i].x, vertices[i].y );
        }
        ctx.lineTo( vertices[0].x, vertices[0].y );

    } )( Shape );

    var settings = { };
    settings.amount = height;
    settings.bevelEnabled = false;
    THREE.ExtrudeGeometry.call( this, Shape, settings );

};

PrismGeometry.prototype = Object.create( THREE.ExtrudeGeometry.prototype );

function createLights() {

    theSun = createSun(-50,100,-30);

    stars.push(createStar(-100,50,-100,2));
    stars.push(createStar(-100,50,100,2));
    stars.push(createStar(100,50,-100,2));
    stars.push(createStar(100,30,120,2));
    stars.push(createStar(-50,-50,0,2));
    stars.push(createStar(50,50,0,2));

    spotLight = createSpotLight();

}

function createSun(x,y,z) {
    var sunLight = new THREE.DirectionalLight( 0xffffff, 1.2 );
    // color, intensity
    sunLight.position.set( x, y, z );
    scene.add(sunLight);
    return sunLight;
}

function createStar(x,y,z,intensity) {

    var star = new THREE.PointLight( 0xffffff, intensity, 100);
    // color, intensity, distance (range of the light), decay (1)
    star.position.set( x, y, z );
    scene.add(star);

    // scene.add(new THREE.PointLightHelper(star, 3));

    return star;
}

function toggleStars() {
    stars.forEach(function(st) {
        st.visible = !st.visible;
    });
}

function createSpotLight() {
    var spotL = new THREE.SpotLight(0xffffff,5);
    //SpotLight( color, intensity, distance, angle, penumbra, decay )
    spotL.distance = FIELD_BOTTOM+20;


    spotL.angle = Math.PI/6;
    spotL.position.set(0,10,2);

    spotL.penumbra = 0.3;

    spotL.target.position.set(0,0,70);

    return spotL;
}

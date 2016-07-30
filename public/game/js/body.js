var three = require('three.min.js');
var container, scene, camera, renderer, composer;
var direction = "", openDoor = false, level = 1, inPlay=false;
var player, water, door, key, platforms, room, furniture, enemy, ray, rayUp;
var collidableMeshList = [];
var lfHeld = false, rtHeld = false;
var vy = 0, vx = 0, loaded = 0, gravity = 0.3, rise = 0.27, eSpeed =2.5;
var jumping = false, inAir = true, falling = false;
var SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 2048;
var renderPass, copyPass, effectFocus, composer, hblur, vblur;
var animation;
$(function() {
	init();
});


function init() {
	scene = new THREE.Scene();


	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);


	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	renderer.autoClear = false;
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;

	var renderModel = new THREE.RenderPass( scene, camera );
	var effectBloom = new THREE.BloomPass( .8 );
	var effectFilm = new THREE.FilmPass( .3, .3, 1024,false );
	var shaderVignette = THREE.VignetteShader;
	var effectVignette = new THREE.ShaderPass( shaderVignette );
	effectVignette.uniforms[ "offset" ].value = 0.95;
	effectVignette.uniforms[ "darkness" ].value = 1.8;
	effectFilm.renderToScreen = true;

	composer = new THREE.EffectComposer( renderer );
	composer.addPass( renderModel );
	composer.addPass(effectVignette);
	composer.addPass( effectBloom );
	composer.addPass( effectFilm );


	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );

	// LIGHT
	var light = new THREE.SpotLight( 0xd6e2ff, 1, 0, Math.PI, 1 );
	light.position.set( 600, 1000, 1000 );
	light.target.position.set( 0, 0, 0 );

	light.castShadow = true;
	light.shadowCameraNear = 200;
	light.shadowCameraFar = 1800;
	light.shadowCameraFov = 45;

	light.shadowBias = 0.0005;
	light.shadowDarkness = .55;

	light.shadowMapWidth = SHADOW_MAP_WIDTH;
	light.shadowMapHeight = SHADOW_MAP_HEIGHT;
	light.shadowMapSoft = true;
	scene.add( light );

	var specLight = new THREE.PointLight( 0x3a6f90, .1, 0, Math.PI, 1 );
	scene.add(specLight);

	// RAY
	ray = new THREE.Raycaster();
	ray.ray.direction.set( 0, -1, 0 );
	rayUp = new THREE.Raycaster();
	rayUp.ray.direction.set( 0, 1, 0 );

	var waterGeometry = new THREE.PlaneGeometry( 1000, 800, 1, 1, 1 );
	var waterMaterial = new THREE.MeshBasicMaterial( {color: 0xCC6600, transparent: false, opacity: 0.95, blending: THREE.AdditiveBlending} );

	water = new THREE.Mesh(waterGeometry, waterMaterial);
	water.rotation.x = -Math.PI /2;
	water.name="Water";
	scene.add(water);
	collidableMeshList.push(water);

	var cubeGeometry = new THREE.CubeGeometry(60,60,10,1,1,1);
	door = new THREE.Mesh(cubeGeometry, waterMaterial);
	door.position.set(0, 485, -60);
	door.geometry
	scene.add( door );
	//key presses
	document.addEventListener('keydown', function(e){
		switch(e.keyCode){
			case 37: //left
				direction = "left";
				break;
			case 32: //up
				jump();
				break;
			case 39: //right
				direction = "right";
				break;
		};
	}, false);
	document.addEventListener('keyup', function(e){
		switch(e.keyCode){
			case 37: //left
				direction = "";
				break;
			case 39: //right
				direction = "";
				break;
		};
	}, false);
	loadModels();
}




function loadModels(){
    //set up a variable to load the models into
	var loader = new THREE.JSONLoader();
	if (level>1){
        //if we are greater than level 1 then we will remove the platforms and furnituer (scenery) as we'll load new ones
		scene.remove(platforms);
		scene.remove(furniture);
		collidableMeshList.remove(1);
	}

	if (level==2){
        //as it's level 2 load new platforms
		loader.load('models/level2.js', function (geometry, materials) {
             //create a material
			 var material = new THREE.MeshLambertMaterial({ ambient: 0x006600, color: 0x009933, emissive: 0x006600 });
             // create platforms from geometry and material
			 platforms = new THREE.Mesh(geometry, material);
             //scale up and set shadows
			 platforms.scale.multiplyScalar(0.6);
			 platforms.castShadow = true;
			 platforms.receiveShadow = true;
             //add to scene
			 scene.add(platforms);
			 collidableMeshList.insert(1, platforms);
             //wait till preloaded
			 preload();
		 });
		 loader = new THREE.JSONLoader();
         //do the same with furniture (background scenery)
		 loader.load('models/furniture2.js', function (geometry, materials) {
			 var material = new THREE.MeshLambertMaterial({ ambient: 0x000000, color: 0x993333, emissive: 0x000000 });
			 furniture = new THREE.Mesh(geometry, material);
			 furniture.scale.multiplyScalar(0.6);
			 furniture.position.y = 220;
			 furniture.position.x = 180;
			 furniture.position.z = -175;
			 furniture.castShadow = true;
			 furniture.receiveShadow = true;
			 scene.add(furniture);
			 preload();
		 });
	 }

    if (level==1){
        //load the level data for level 1
		loader.load('models/level1.js', function (geometry, materials) {
			 var material = new THREE.MeshLambertMaterial({ ambient: 0x000000, color: 0xCC3333, emissive: 0x000000 });
			 platforms = new THREE.Mesh(geometry, material);
			 platforms.scale.multiplyScalar(0.6);
			 platforms.castShadow = true;
			 platforms.receiveShadow = true;
			 scene.add(platforms);
			 collidableMeshList.push(platforms);
			 preload();
		 });
         //load the hero robot
		 loader = new THREE.JSONLoader();
         loader.load('models/bot.js', function (geometry, materials) {
			 var material = new THREE.MeshLambertMaterial({ ambient: 0x999999, color: 0xFFFF00, emissive: 0x332639 });
			 player = new THREE.Mesh(geometry, material);
			 player.scale.multiplyScalar(0.4);
			 player.castShadow = true;
			 player.receiveShadow = true;
			 scene.add(player);
			 animate(player);
			 preload();
		 });
		 //Animation bot
// 		 function animate(material) {
//     var materials = player.material.materials;
//
//     for (var k in materials) {
//         materials[k].skinning = true;
//     }
//
//     THREE.AnimationHandler.add(player.geometry.animation);
//     animation = new THREE.Animation(player, "ArmatureAction", THREE.AnimationHandler.CATMULLROM);
//     animation.play();
// }
         //load the background scenery
		 loader = new THREE.JSONLoader();
		 loader.load('models/furniture.js', function (geometry, materials) {
			 var material = new THREE.MeshLambertMaterial({ ambient: 0x000000, color: 0x993333, emissive: 0x000000 });
			 furniture = new THREE.Mesh(geometry, material);
			 furniture.scale.multiplyScalar(0.6);
			 furniture.position.y = 293;
			 furniture.position.x = 510;
			 furniture.position.z = 80;
			 furniture.castShadow = true;
			 furniture.receiveShadow = true;
			 scene.add(furniture);
			 preload();
		 });
         //load the background room shape
		 loader = new THREE.JSONLoader();
		 loader.load('models/room-new.js', function (geometry, materials) {
			 var material = new THREE.MeshLambertMaterial({ ambient: 0x000000, color: 0x990066, emissive: 0x000000 });
			 room = new THREE.Mesh(geometry, material);
			 room.scale.multiplyScalar(0.6);
			 room.position.y = 277;
			 room.position.x = 240;
			 room.position.z = -50;
			 room.castShadow = true;
			 room.receiveShadow = true;
			 scene.add(room);
			 preload();
		 });
         //load the key that will be picked up
		 loader = new THREE.JSONLoader();
		 loader.load('models/key.js', function (geometry, materials) {
			 var material = new THREE.MeshPhongMaterial({ ambient: 0x744309, color: 0xDAA13B, emissive: 0x1A150D, specular: 0x674E2C, shininess: 61, blending: THREE.AdditiveBlending });
			 key = new THREE.Mesh(geometry, material);
			 key.scale.multiplyScalar(0.4);
			 key.castShadow = true;
			 key.receiveShadow = true;
			 scene.add(key);
			 preload();
		 });
         //load the enemy
		 loader = new THREE.JSONLoader();
		 loader.load('models/enemy.js', function (geometry, materials) {
			 var material = new THREE.MeshBasicMaterial( {color: 0xFFCC66, transparent: false,
				//  opacity: 0.95,
				 blending: THREE.AdditiveBlending} );
			 enemy = new THREE.Mesh(geometry, material);
			 enemy.scale.multiplyScalar(0.3);
			 enemy.position.x = 200;
             enemy.position.y = 220;

			 enemy.castShadow = true;
			 scene.add(enemy);
			 preload();
		 });
	}
}
function levelUp(newLevel){
    //remove the click event from the play div
	$( "#play" ).unbind("click");
    if (level==3){
        //if level 3 then we've won so display message
        $( '.play' ).replaceWith( "<h3 class='message'>Congratulations Levels Complete</h3>" );
    } else {
        //otherwise display a loading message while level geometery is loaded
        $( '.play' ).replaceWith( "<h3 class='message'>Loading Please Wait</h3>" );
    }
	$( "#blank" ).fadeIn("fast");
	if(newLevel){
        //if we completed level load new models
		loadModels();
	}else{
        //otherwise we died on current level so reset it
		levelSet();
	}
    //game is paused
	inPlay = false;
}

function preload(){
	if (level == 1){
        //every time we load a model increase by 1
		loaded ++;
		if (loaded == 6){
            //when it is all loaded set up the level and start animating
			levelSet();
			animate();
		}
	} else {
        //other levels just set the level
		levelSet();
	}
}

function levelSet(){
	// reset interactive objects such as key and door
	key.traverse( function ( object ) { object.visible = true; } );
	door.scale.y = 1;
	door.traverse( function ( object ) { object.visible = true; } );
	openDoor = false;
    //reset the water at the bottom
	water.position.set(100, -160, -50);
	if (level == 1){
        //level 1 position resets
		platforms.position.y = 300;
		key.position.y = 350;
		key.position.x = 10;
		player.position.set(0, 20, 0);
	}
	if (level == 2){
        //level 2 position resets
		platforms.position.set(280, 262, 5);
		player.position.set(10, 20, 0);
		key.position.set(330, 50, 0);
        enemy.position.y = 320;
	}
    //all ready to go, models loaded so create a play button
	$( '.message' ).replaceWith( "<h3 id='play' class='play'>PLAY</h3>" );
	$( "#play" ).click(function() {
		$( "#blank" ).fadeOut("slow");
		inPlay = true;
        composer.render(0.01);
	});

}

/////////////////STARTING HERE///////////////////
function jump(){
	if (jumping == false && inAir == false){
		player.position.y += 10;
		vy = -8;
		jumping = true;
	}
}
function collisionPlayer (xPos, yPos, Radius){
	var distX = xPos - player.position.x;
	var distY = yPos - player.position.y;
	var distR = Radius + 25;
	if (distX * distX + distY * distY <= distR * distR){
		return true;
	}
}
function render() {
	renderer.clear();
    composer.render(0.01);
}
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

function animate() {
    requestAnimationFrame( animate );
	if (inPlay){
		render();
		update();
	}
}

function update(){
	vy+=gravity;
	if (inAir){
		if (vy>5){
			vy=5;
		}
	}

	if (direction == "left" && player.position.x > -42) {
		player.position.x+=vx;
	}
	if (direction == "right" && player.position.x < 521) {
		player.position.x+=vx;
	}

	//////////////////////////Collision Platforms
	var originPoint = player.position.clone();
	ray.ray.origin.copy( originPoint );
	rayUp.ray.origin.copy( originPoint );
	var intersections2 = rayUp.intersectObjects( collidableMeshList );
	if ( intersections2.length > 0 ) {
		var distance = intersections2[ 0 ].distance;
		if ( falling == false && distance > 0 && distance <= 23 ) {
			vy = 0;
			falling = true;
		}
	}
	var intersections = ray.intersectObjects( collidableMeshList );
	if ( intersections.length > 0 ) {
		var distance = intersections[ 0 ].distance;
		if ( distance > 0 && distance > 23 ) {
			player.position.y -= vy;
			inAir = true;
		}else{
			////If we land on an object with the name 'water' - game over
			if(intersections[ 0 ].object.name == "Water"){
				levelUp(false);
			}
			falling = false;
			inAir = false;
			vy=0; 		// switch gravity off
			jumping = false;
		}
	}
	if (inAir == false && distance < 22.5){
		player.position.y+=1;
	}
	/////////////// Move Left and Right
	if ( direction == "left" ){
		vx = -2;
        player.rotation.y = 3.14;
	}
	if ( direction == "right" ){
		vx = 2;
        player.rotation.y = 0;
	}

	// Camera follow player
	camera.lookAt(player.position)
	camera.position.x += ((player.position.x - camera.position.x))* .02;
	camera.position.y += (((player.position.y+30 ) - camera.position.y)) * .08
	// Increase water height spin the key
	water.position.y += rise;
	key.rotation.y += 0.1;

	// Touch key
	if (collisionPlayer (key.position.x, key.position.y, 30)){
		key.traverse( function ( object ) { object.visible = false; } );
		openDoor = true;
	}
	if (openDoor){
		if (door.scale.y > 0.01){
			door.scale.y -=0.01;
		} else {
			door.traverse( function ( object ) { object.visible = false; } );
		}
	}


	if (collisionPlayer (door.position.x, door.position.y, 20)){
		if (openDoor){
			level++;
			rise += 0.1;
			levelUp(true);
		}
	}

	//yellow enemy
	var time = Date.now() * 0.0006;
	enemy.scale.x = enemy.scale.y = enemy.scale.z = (0.4 + 0.1 * Math.sin( 7*time ) );
	enemy.position.x += eSpeed;

    if (enemy.position.x < 100 || enemy.position.x > 400 ){
        eSpeed=eSpeed * -1;
    }



	if (collisionPlayer (enemy.position.x, enemy.position.y, 4)){
		levelUp(false);
	}
}

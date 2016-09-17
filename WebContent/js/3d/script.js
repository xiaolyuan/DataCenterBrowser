VrmlContent = function(filename) {
	var camera, controls, scene, renderer;
	var init = function(){
		camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1e10 );
		camera.position.z = 6;

		controls = new THREE.OrbitControls( camera );

		controls.rotateSpeed = 5.0;
		controls.zoomSpeed = 5;

		controls.noZoom = false;
		controls.noPan = false;

		scene = new THREE.Scene();
		scene.add( camera );

		// light

		var dirLight = new THREE.DirectionalLight( 0xffffff );
		dirLight.position.set( 200, 200, 1000 ).normalize();

		camera.add( dirLight );
		camera.add( dirLight.target );

		var loader = new THREE.VRMLLoader();
		loader.load( filename, function ( object ) {

			scene.add( object );

		} );

		// renderer

		renderer = new THREE.WebGLRenderer( { antialias: false } );
		renderer.setPixelRatio( window.devicePixelRatio );
		//renderer.setSize( window.innerWidth, window.innerHeight );

		//container = document.createElement( 'div' );
		//document.body.appendChild( container );
		//container.appendChild( renderer.domElement );

		//stats = new Stats();
		//container.appendChild( stats.dom );

		//

		//window.addEventListener( 'resize', onWindowResize, false );
	}
	
	this.getElement = function(){
		return renderer.domElement.innerHTML;
	}
	
	this.setSize = function( width, height ){
		renderer.setSize( width, height );
	}
	
	var onWindowResize = function() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

		controls.handleResize();

	}

	var animate = function() {

		requestAnimationFrame( animate );

		controls.update();
		renderer.render( scene, camera );

		//stats.update();
	}
	
	init();
	animate();
}
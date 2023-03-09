/**
 * Geometria: construye una geometría THREE.js y la retorna
 * ENTRADAS: vx = Arreglo de vértices para la geometría (arreglo de arreglos)
 * SALIDAS: geom = Geometria construida a partir de vx
 */
function Geometria(vx){
    geom=new THREE.Geometry();
    var largoVertice = vx.length;
    for (i = 0; i < largoVertice; i++) {
        x = vx[i][0];
        y = vx[i][1];
        z = vx[i][2];
        vector = new THREE.Vector3(x, y, z);
        geom.vertices.push(vector);
    }
    return geom;
}

/**
 * Traslacion: Construye la matriz de traslacion THREE.js para el vector de traslacion vt y la retorna
 * ENTRADAS: vt = Vector de traslacion (arreglo de enteros)
 * SALIDAS: matrizT = Matriz de traslacion 
 */
function Traslacion(vt){
    var matrizT = new THREE.Matrix4();
    matrizT.set(1, 0, 0, vt[0],
    0, 1, 0, vt[1],
    0, 0, 1, vt[2],
    0, 0, 0, 1);
    
    return matrizT;
}

/**
 * Escalado: Construye la matriz de escalado THREE.js para el vector vs y la retorna
 * ENTRADAS: vs = Vector de Escalado (arreglo de enteros)
 * SALIDAS: matrizS = Matriz de Escalado para el vector 
 */
function Escalado(vs) {
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
    0, vs[1], 0, 0,
    0, 0, vs[2], 0,
    0, 0, 0, 1);
    
    return matrizS;

}

/**
 * EscaladoReal: Aplica el vector de Escalado vs al objeto fig
 * ENTRADAS: fig = objeto tipo THREE.LINE que representa el objeto grafico
 *           posini = posicion inicial de fig
 *           vs = Vector de Escalado (arreglo de enteros)
 * SALIDAS:
 */
function EscaladoReal(fig, posini, vs){
    tr = [-posini[0], -posini[1], -posini[2]]; //vector para llevar al origen
    fig.applyMatrix(Traslacion(tr));//traslacion al origen
    fig.applyMatrix(Escalado(vs)); //escalado de la figura
    fig.applyMatrix(Traslacion(posini));//traslacion a posicion inicial
}

function init() {

    //Escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var size = 700;
    var arrowSize = 40;
    var divisions = 20;
    var origin = new THREE.Vector3( 0, 0, 0 );
    var x = new THREE.Vector3( 1, 0, 0 );
    var y = new THREE.Vector3( 0, 1, 0 );
    var z = new THREE.Vector3( 0, 0, 1 );
    var color2 = new THREE.Color( 0x333333 );  
    var colorR = new THREE.Color( 0xAA0000 );
    var colorG = new THREE.Color( 0x00AA00 );
    var colorB = new THREE.Color( 0x0000AA );

    //Crear la Grilla
    var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

    //Flechas
    var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
    var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
    var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );
        
    //Cámara
    camera.position.x = 200;
    camera.position.y = 200;
    camera.position.z = 400;
    camera.lookAt(scene.position);

    //Creación de las Figuras

    //Piramide #1
    lado = 35; //lado de la base de la piramide
    altura = 45; //altura de la piramide

    [v1, v2, v3, v4, v5]=[  

        [0, 0, 0], 
        [lado, 0, 0], 
        [lado, 0, lado], 
        [0, 0, lado], 
        [lado/2, altura, lado/2]
    ]

    var vertices = [v1, v2, v3, v4, v5, v1, v4, v3, v5, v2];

    geomPiramide = Geometria(vertices);
    var largoVertice = vertices.length;

    //Colores para las piramides
    color = [{color:0xFF0000}, {color:0x00ff00}];

    //material para las piramides
    material = [];
    for(i = 0; i < 2; i++){
        material.push(new THREE.ParticleBasicMaterial(color[i]));
    }

    //Figuras para las piramides
    piramide = [];
    for(i = 0; i < 2; i++){
        piramide.push(new THREE.Line(geomPiramide, material[i]));
    }

    //Girar la segunda piramide
    EscaladoReal(piramide[1], [lado/2, 0, lado/2], [-1, -1, -1])

    //En el documento HTML
    document.body.appendChild(renderer.domElement);
    
    //Agregar elementos al escenario
    scene.add(gridHelperXZ);
    scene.add(arrowX);	
    scene.add(arrowY);	
    scene.add(arrowZ);

    for (i = 0; i < 2; i++){
        scene.add(piramide[i]);
        renderer.render(scene, camera)
    }
    renderer.render(scene, camera)
}

init();

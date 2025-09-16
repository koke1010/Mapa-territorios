// === Territorio 1 ===
// Este archivo define un territorio (grupo de polígonos) + sus etiquetas

// ------------------------------
// 1. Crear un grupo para el territorio
//    Esto sirve para agrupar todos los polígonos y etiquetas
//    Así puedes ocultarlo, mostrarlo o hacer zoom a todo el territorio de una vez
// ------------------------------
var territorio1 = L.featureGroup().addTo(map);

// ------------------------------
// 2. Definir sub-polígonos
//    Cada polígono tiene sus coordenadas y estilo (color, borde, transparencia)
// ------------------------------

// --- Sub-polígono 1 ---
var poligono1 = L.polygon([
  [28.613786, -106.087204], [28.613313, -106.086951], [28.613330, -106.086877],
  [28.613365, -106.086799], [28.613509, -106.086534], [28.613746, -106.086185],
  [28.613808, -106.086110], [28.614037, -106.085906], [28.614046, -106.085894],
  [28.614066, -106.085949], [28.614106, -106.086005], [28.614181, -106.086075],
  [28.614318, -106.086169]
], { color: "red", weight: 2, fillOpacity: 0.2 }).addTo(territorio1);

// --- Sub-polígono 2 ---
var poligono2 = L.polygon([
  [28.614337, -106.086131], [28.614202, -106.086040], [28.614135, -106.085979],
  [28.614097, -106.085924], [28.614066, -106.085837], [28.614537, -106.084814],
  [28.614719, -106.084545], [28.615256, -106.083837], [28.615439, -106.083972],
  [28.614807, -106.085195]
], { color: "red", weight: 2, fillOpacity: 0.2 }).addTo(territorio1);

// --- Sub-polígono 3 ---
var poligono3 = L.polygon([
  [28.615460, -106.083936], [28.615282, -106.083800], [28.615525, -106.083402],
  [28.615715, -106.083038], [28.615803, -106.082794], [28.615987, -106.082904]
], { color: "red", weight: 2, fillOpacity: 0.2 }).addTo(territorio1);

// --- Sub-polígono 4 ---
var poligono4 = L.polygon([
  [28.615996, -106.082892], [28.615807, -106.082779], [28.615849, -106.082640],
  [28.615929, -106.082359], [28.615988, -106.082099], [28.616042, -106.081834],
  [28.616094, -106.081477], [28.617107, -106.080707]
], { color: "gray", weight: 2, fillOpacity: 0.9 }).addTo(territorio1);

// ------------------------------
// 3. Agregar etiquetas personalizadas
//    Cada polígono tiene su propia sección de texto
// ------------------------------
agregarEtiqueta(poligono1, "1");
agregarEtiqueta(poligono2, "2");
agregarEtiqueta(poligono3, "3");
agregarEtiqueta(poligono4, "Escuela");

// ------------------------------
// 4. Guardar el grupo en el array global
//    poligonos[] sirve para poder hacer zoom o manejo de todos los territorios
// ------------------------------
poligonos.push(territorio1);

// =============================
// Función reutilizable: agregarEtiqueta
// Calcula el centro de un polígono con Turf.js y coloca un texto
// =============================
function agregarEtiqueta(poligono, texto) {
  var latlngs = poligono.getLatLngs()[0]; // vértices del polígono
  var coords = latlngs.map(function(ll){ return [ll.lng, ll.lat]; });

  // cerrar el anillo si no está cerrado
  var first = coords[0];
  var last = coords[coords.length-1];
  if (!first || first[0] !== last[0] || first[1] !== last[1]) coords.push([first[0], first[1]]);

  // calcular centroide con Turf.js
  var centroide = turf.centroid(turf.polygon([coords]));
  var cLat = centroide.geometry.coordinates[1];
  var cLng = centroide.geometry.coordinates[0];

  // crear marcador con DIV (tamaño fijo, no se escala con zoom)
  L.marker([cLat, cLng], {
    icon: L.divIcon({
      className: 'etiqueta-poligono', // usa la clase CSS definida en index.html
      html: texto,
      iconSize: [10, 18],   // tamaño fijo
      iconAnchor: [20, 9]   // centro del icono sobre la coordenada
    })
  }).addTo(territorio1);
}
// Define the region of interest (modify as needed)
var region = geometry;

// Function to create monthly mosaics with indices and masks
function createMonthlyMosaic(year, month) {
  var start = ee.Date.fromYMD(year, month, 1);
  var end = start.advance(1, 'month');

  var s2 = ee.ImageCollection("COPERNICUS/S2")
    .filterBounds(region)
    .filterDate(start, end)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)) // Filter low cloud cover
    .map(function(image) {
      var scaled = image.divide(10000);
      
      // Compute NDVI (Vegetation Index)
      var ndvi = scaled.normalizedDifference(['B8', 'B4']).rename('NDVI'); // NDVI = (NIR - Red) / (NIR + Red)

      // Compute NDWI (Water Index)
      var ndwi = scaled.normalizedDifference(['B3', 'B8']).rename('NDWI'); // NDWI = (Green - NIR) / (Green + NIR)

      // Compute NDSInw (Snow Index without Water)
      var ndsi = scaled.normalizedDifference(['B3', 'B11']).rename('NDSI'); // Standard NDSI
      var ndsi_nw = ndsi.updateMask(ndwi.lt(0.2)).rename('NDSInw'); // Mask out water to get NDSI with no water

      // Compute NSDS (Soil Moisture Index)
      var nsds = scaled.normalizedDifference(['B11', 'B12']).rename('NSDS'); // NSDS = (SWIR1 - SWIR2) / (SWIR1 + SWIR2)

      // Apply masks
      var snowMask = ndsi_nw.updateMask(ndsi_nw.gte(0.4)).rename('SnowMask'); // Snow-covered areas (No water)
      var vegetationMask = ndvi.updateMask(ndvi.gte(0.3)).rename('VegetationMask'); // Vegetation coverage
      var soilMoistureMask = nsds.updateMask(nsds.gte(0.2)).rename('SoilMoistureMask'); // Moist soil areas

      return scaled.addBands([ndvi, ndsi_nw, nsds, snowMask, vegetationMask, soilMoistureMask])
        .select(['B4', 'B3', 'B2', 'NDVI', 'NDSInw', 'NSDS', 'SnowMask', 'VegetationMask', 'SoilMoistureMask']);
    });

  var mosaic = s2.median().clip(region);

  // Scale RGB to 8-bit
  var rgbMosaic = mosaic.select(['B4', 'B3', 'B2']).multiply(255 / 0.3).clamp(0, 255).toUint8().rename(['Red', 'Green', 'Blue']);

  // Scale indices to 8-bit
  var ndviScaled = mosaic.select('NDVI').add(1).multiply(127.5).clamp(0, 255).toUint8();
  var ndsiScaled = mosaic.select('NDSInw').add(1).multiply(127.5).clamp(0, 255).toUint8();
  var nsdsScaled = mosaic.select('NSDS').add(1).multiply(127.5).clamp(0, 255).toUint8();

  // Scale masks (0-1 already, just multiply by 255)
  var snowMaskScaled = mosaic.select('SnowMask').multiply(255).toUint8();
  var vegetationMaskScaled = mosaic.select('VegetationMask').multiply(255).toUint8();
  var soilMoistureMaskScaled = mosaic.select('SoilMoistureMask').multiply(255).toUint8();

  return rgbMosaic
    .addBands([ndviScaled, ndsiScaled, nsdsScaled])
    .addBands([snowMaskScaled, vegetationMaskScaled, soilMoistureMaskScaled])
    .set({ 'month': month, 'year': year });
}

// Generate a list of months
var years = ee.List.sequence(2020, 2021);
var months = ee.List.sequence(1, 12);

// Create image collection of monthly mosaics
var monthlyMosaics = ee.ImageCollection.fromImages(
  years.map(function(year) {
    return months.map(function(month) {
      return createMonthlyMosaic(year, month);
    });
  }).flatten()
);

// Fluorescent and High-Contrast Color Palettes
var ndviPalette = ['#ff00ff', '#ff1493', '#ff4500', '#ffcc00', '#adff2f', '#00ff00', '#008000']; // Pink → Orange → Neon Green
var ndsiPalette = ['#0000ff', '#00ffff', '#32cd32', '#adff2f', '#ffff00', '#ff4500']; // Blue → Cyan → Green → Neon Yellow → Red
var nsdsPalette = ['#ff0000', '#ff69b4', '#ffcc00', '#adff2f', '#00ff00', '#00ffff']; // Red → Pink → Yellow → Neon Green → Cyan

// High-contrast mask colors
var maskVegetation = ['#000000', '#ff00ff']; // Black → Magenta for Vegetation Mask
var maskSnow = ['#000000', '#00ffff']; // Black → Cyan for Snow Mask
var maskSoilMoisture = ['#000000', '#ffcc00']; // Black → Neon Yellow for Soil Moisture

// Visualization parameters
var visParamsRGB = { min: 0, max: 255,  bands: ['Red', 'Green', 'Blue'] };
var visParamsNDVI = { min: 0, max: 255, bands: ['NDVI'], palette: ndviPalette };
var visParamsNDSI = { min: 0, max: 255, bands: ['NDSInw'], palette: ndsiPalette };
var visParamsNSDS = { min: 0, max: 255, bands: ['NSDS'], palette: nsdsPalette };

// Masked visualization
var visParamsSnowMask = { min: 0, max: 255, bands: ['SnowMask'], palette: maskSnow };
var visParamsVegetationMask = { min: 0, max: 255, bands: ['VegetationMask'], palette: maskVegetation };
var visParamsSoilMoistureMask = { min: 0, max: 255, bands: ['SoilMoistureMask'], palette: maskSoilMoisture };

// Display in GEE
Map.centerObject(region, 8);
Map.addLayer(monthlyMosaics.first().select(['Red', 'Green', 'Blue']), visParamsRGB, 'RGB Mosaic');
Map.addLayer(monthlyMosaics.first().select(['NDVI']), visParamsNDVI, 'NDVI (Vegetation)');
Map.addLayer(monthlyMosaics.first().select(['NDSInw']), visParamsNDSI, 'NDSI (Snow)');
Map.addLayer(monthlyMosaics.first().select(['NSDS']), visParamsNSDS, 'NSDS (Soil Moisture)');

// Masked layers
Map.addLayer(monthlyMosaics.first().select(['SnowMask']), visParamsSnowMask, 'Snow Mask');
Map.addLayer(monthlyMosaics.first().select(['VegetationMask']), visParamsVegetationMask, 'Vegetation Mask');
Map.addLayer(monthlyMosaics.first().select(['SoilMoistureMask']), visParamsSoilMoistureMask, 'Soil Moisture Mask');


// Function to prepare a grayscale mask for video export
function prepareMaskForVideo(maskCollection, maskName) {
  return maskCollection.map(function(image) {
    var mask = image.select(maskName);
    return ee.Image.cat([mask, mask, mask]).toUint8().rename(['R', 'G', 'B']);
  });
}

// Function to export a selected index/mask as a time-lapse video
function exportTimeLapse(indexName, bands, isMask) {
  var collectionToExport = isMask ? prepareMaskForVideo(monthlyMosaics, bands[0]) : monthlyMosaics.select(bands);

  Export.video.toDrive({
    collection: collectionToExport,  // Select the index/mask
    description: 'Sentinel2_' + indexName + '_Timelapse',  // Name of the video file
    folder: 'EarthEngine',  // Google Drive folder where the video will be saved
    fileNamePrefix: 'Sentinel2_' + indexName + '_Timelapse', // Filename prefix
    dimensions: 800,  // Resolution width (adjust for higher/lower quality)
    framesPerSecond: 5,  // Speed of the time-lapse
    region: region  // Area to export
  });
}

// Export different indices/masks as time-lapse videos
// Uncomment the one you want to export

exportTimeLapse('RGB', ['Red', 'Green', 'Blue'], false); 
// exportTimeLapse('NDVI', ['NDVI'], false);
// exportTimeLapse('NDSInw', ['NDSInw'], false); // Snow Index without water
// exportTimeLapse('NSDS', ['NSDS'], false); // Soil Moisture Index
exportTimeLapse('SnowMask', ['SnowMask'], true); // Now correctly converted to RGB
// exportTimeLapse('VegetationMask', ['VegetationMask'], true);
// exportTimeLapse('SoilMoistureMask', ['SoilMoistureMask'], true);
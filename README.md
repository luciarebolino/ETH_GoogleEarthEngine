

<img width="1459" alt="Screenshot 2025-02-17 at 11 25 56 PM" src="https://github.com/user-attachments/assets/5d14cb4d-9ae7-4a86-8721-f85041c7add6" />


# ETH_GoogleEarthEngine

February 2025 
<br>
<br>
During the semester, resources, references, and tutorials will be shared through Are.na, a collaborative platform where everyone can contribute by adding new blocks with cool GEE examples they discover and would like to share and learn.

At a later stage in the course, Are.na will also become a tool for representation, allowing us to structure and present our findings collectively.

To ensure smooth collaboration, please upload your [Are.na and GitHub handles](https://docs.google.com/spreadsheets/d/1kiHMuyLygtd7X5zzA5On-iKi-u4TDt42nBywRIzKa1U/edit?usp=sharing) so that I can add you as editors on both platforms.


:globe_with_meridians: 🛰️
REMOTE SENSING

The following code snippets are designed as **interactive examples** to be used during the lecture. They will be demonstrated live, and participants will have the opportunity to engage with the code.  

In the **second part of the workshop**, we will **break down and explain each section of the code**

### Step 1: Satellites

- **Pixels** – Understanding how satellite images are composed of discrete units of information.  
- **Orbits and Frequency** – Exploring how satellites capture imagery at different time intervals and resolutions.

<img width="1459" alt="Screenshot 2025-02-17 at 11 25 56 PM" src="https://github.com/user-attachments/assets/445f0b98-6151-428c-9b43-4c5787520884" />
1. https://code.earthengine.google.co.in/2dfe726ae8bf26f016bacb69706db118?hideCode=true


### Step 2: Spectrum and Indexes

- **Light** – When light strikes an object, it can be absorbed, transmitted, or reflected. How this interaction happens and how it depends on the material properties of the surface?  
- **Bands** – Combining bands - specific segments of the electromagnetic spectrum.

<img width="1459" alt="Screenshot 2025-02-18 at 12 50 33 AM" src="https://github.com/user-attachments/assets/bc267961-8586-4f7b-b571-e93e67408faa" />
1. https://code.earthengine.google.co.in/bb2535bca205b0e77576931c5c959295?hideCode=true
   <br>
2. https://code.earthengine.google.co.in/7c6d6cd9411141a4d8c6fa106b7d123d?accept_repo=users%2Fujavalgandhi%2FEnd-to-End-Projects&hideCode=true


### Step 3: Elevation 

- **Height** – Map the vertical dimension of the Earth's surface.


<img width="1459" alt="Screenshot 2025-02-18 at 1 17 38 AM" src="https://github.com/user-attachments/assets/735f6918-6a47-4bc6-aa7f-639a0ed41ac0" />

1. https://code.earthengine.google.com/219e605eec3fb6d1ab816c084f85a237?hideCode=true

  <br>
    <br>
      <br>
        <br>
        


💻
CODING ON GEE
### PLATFORM

<img width="1459" alt="Screenshot 2025-02-18 at 2 01 30 AM" src="https://github.com/user-attachments/assets/1736e108-9530-48f6-ae5f-32a578e28f48" />

[Google Earth Engine requires all users to sign-up for an account](https://code.earthengine.google.com/register). This account is linked with Google Cloud and users must create a Google Cloud Project to use the service. 
- On the Product Registration Page, select Register a Noncommercial or Commercial Cloud project.
- Next, you need to choose How do you want to use Earth Engine?. Choose the Unpaid usage, click Next. Since we are in Academia provider, we have chosen Unpaid usage → Research & Academia.
- In the next dialog, choose Create a new Google Cloud Project. Select No organization for Organization and enter a Project-ID. This id needs to be unique. A standard practice is to use the project-ID in the form of ee-<yourusername>. Click CONTINUE TO SUMMARY. If you have never used Google Cloud before, an error message will be displayed with a note You must accept the Cloud Terms of Service before a Cloud Project can be created.
- Choose your Country and review the Google Cloud Platform Terms of Service and the terms of service of any applicable services and APIs. After reviewing, click AGREE AND CONTINUE.
- You will be presented with a summary in the Confirm your Cloud project information dialog. Review and click CONFIRM.
- The project will be registered and you will be redirected to the Code Editor. If you are not redirected automatically, visit the Earth Engine Code Editor.

### SPECTRUM IDEXES
<img width="1459" alt="Screenshot 2025-02-18 at 1 34 48 AM" src="https://github.com/user-attachments/assets/3d79698a-3d95-478c-a256-c5fad806c621" />

This repository keeps track of classical as well as novel spectral indices for different Remote Sensing applications. All spectral indices in the repository are curated and can be used in different environments and programming languages. 
All spectral indices follow a standard. Each item of the list has the following attributes:

'short_name': Short name of the index (e.g. "NDWI").

'long_name': Long name of the index (e.g. "Normalized Difference Water Index").

'formula': Expression/formula of the index (e.g. "(G - N)/(G + N)").

'bands': List of required bands/parameters for the index computation (e.g. ["N","G"]).

'reference': Link to the index reference/paper/doi (e.g. "https://doi.org/10.1080/01431169608948714").

'type': Type/application of the index (e.g. "water").

'date_of_addition': Date of addition to the list (e.g. "2021-04-07").

'contributor': GitHub user link of the contributor (e.g. "https://github.com/davemlz").

# Select and Download Images GEOTIFF 
<img width="1461" alt="Screenshot 2025-02-18 at 5 15 49 AM" src="https://github.com/user-attachments/assets/a5a752f4-f957-4a80-a07a-222ef980fd59" />
https://code.earthengine.google.co.in/0a0a0c9adc2692abe9f6d55732237ad1?hideCode=true

```javascript
// Define the region of interest (draw an AOI on the GEE map)
var region = geometry;

// Set the target year and month
var year = 2023;
var month = 6; // June

// Filter Sentinel-2 images for the selected month
var start = ee.Date.fromYMD(year, month, 1);
var end = start.advance(1, 'month');

var s2 = ee.ImageCollection("COPERNICUS/S2")
    .filterBounds(region)
    .filterDate(start, end)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)) // Keep only low-cloud images
    .select(['B4', 'B3', 'B2']); // Ensure correct band selection

// Count the number of images
var count = s2.size();
print('Number of Sentinel-2 images in June 2023:', count);

// Extract and print image metadata (ID, date, cloud cover)
var imageInfo = s2.map(function(img) {
  return ee.Feature(null, {
    'ID': img.id(),
    'Date': img.date().format('YYYY-MM-dd'),
    'Cloud Cover': img.get('CLOUDY_PIXEL_PERCENTAGE')
  });
});

print('List of Sentinel-2 Images for June 2023:', imageInfo);

// Enhanced Visualization Parameters for Better Contrast
var visParams = { 
  min: 50,  // Increase from 0 to avoid too much darkness
  max: 5500, // Reduce from 3000 to enhance contrast
  bands: ['B4', 'B3', 'B2'],
  gamma: 0.9
};

// Loop through images and add them as layers on the map
s2.evaluate(function(imageList) {
  imageList.features.forEach(function(image, index) {
    var img = ee.Image(image.id);
    Map.addLayer(img.clip(region), visParams, 'Sentinel-2 Image ' + (index + 1), false);
  });
});

// Center the map on the AOI
Map.centerObject(region, 8);

// ---- EXPORT FUNCTION ----
// Manually select an image ID from the console
var selectedImageID = 'COPERNICUS/S2/20230607T104031_20230607T104654_T32TNS'; // CHANGE THIS ID

// Convert the selected ID to an Image object
var selectedImage = ee.Image(selectedImageID).clip(region);

// Function to export an image to Google Drive
function exportImage(image, name) {
  Export.image.toDrive({
    image: image,
    description: name + '_Sentinel2',
    folder: 'EarthEngine',
    fileNamePrefix: name + '_Sentinel2',
    region: region,
    scale: 10, // Sentinel-2 resolution (10m per pixel)
    maxPixels: 1e13
  });
}

// Uncomment to export the selected image
exportImage(selectedImage, 'June_2023_SelectedImage');
```

# Timelapse Video of Sentinel-2 (1 month)
<img width="1461" alt="Screenshot 2025-02-18 at 1 33 55 PM" src="https://github.com/user-attachments/assets/0c9b9b5c-7f8f-4011-a24b-5e2726420a81" />
https://code.earthengine.google.co.in/2dfd18ac49ba502922b22f500bf0a3b7

```javascript

// Define the region of interest (modify as needed)
var region = geometry;

// Function to create monthly mosaics
function createMonthlyMosaic(year, month) {
  var start = ee.Date.fromYMD(year, month, 1);
  var end = start.advance(1, 'month');

  var s2 = ee.ImageCollection("COPERNICUS/S2")
    .filterBounds(region)
    .filterDate(start, end)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)) // Filter low cloud cover
    .map(function(image) {
      return image.divide(10000) // Scale reflectance values
        .select(['B4', 'B3', 'B2'], ['Red', 'Green', 'Blue']); // Use RGB bands
    });

  // Compute median composite
  var mosaic = s2.median().clip(region);

  // Scale to 8-bit (0-255) and convert to uint8
  return mosaic.multiply(255 / 0.3).clamp(0, 255).toUint8().set({
    'month': month,
    'year': year
  });
}

// Generate a list of months
var years = ee.List.sequence(2020, 2023); // Adjust years as needed
var months = ee.List.sequence(1, 12);

// Create image collection of monthly mosaics
var monthlyMosaics = ee.ImageCollection.fromImages(
  years.map(function(year) {
    return months.map(function(month) {
      return createMonthlyMosaic(year, month);
    });
  }).flatten()
);

// Visualization parameters
var visParams = {
  min: 0,
  max: 255,
  bands: ['Red', 'Green', 'Blue']
};

// Create a time-lapse GIF
var videoArgs = {
  region: region,
  dimensions: 800,
  framesPerSecond: 2,
  min: 0,
  max: 255,
  bands: ['Red', 'Green', 'Blue'],
  format: 'gif'
};

// Export as a GIF
Export.video.toDrive({
  collection: monthlyMosaics,
  description: 'Sentinel2_Timelapse',
  folder: 'EarthEngine',
  fileNamePrefix: 'Sentinel2_Timelapse',
  dimensions: 800,  // Set higher dimensions for better resolution
  framesPerSecond: 5,
  region: region
});

// Display in GEE
Map.centerObject(region, 8);
Map.addLayer(monthlyMosaics.first(), visParams, 'First Monthly Mosaic');



```



# Use Indexes on Mosaic Images and export Video
<img width="1461" alt="Screenshot 2025-02-18 at 5 24 21 AM" src="https://github.com/user-attachments/assets/0657f22f-f738-4e80-9d7b-f830b349cf79" />
[Color Map](https://colorbrewer2.org/#type=diverging&scheme=BrBG&n=3)

https://code.earthengine.google.co.in/23d1c5a40864af4273fa0789a5eb77be?hideCode=true

```javascript
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
```






# Flood Detection and Impact Assessment Using Sentinel-1 SAR on Google Earth Engine
<img width="1459" alt="Screenshot 2025-02-18 at 3 56 35 AM" src="https://github.com/user-attachments/assets/a0f2ca19-6b7b-491e-9c9c-d9f5339299d0" />



This script analyzes flood events using **Sentinel-1 SAR imagery** on **Google Earth Engine (GEE)**. It computes flood extent by comparing **pre-flood and post-flood SAR backscatter** and applies additional datasets for **damage assessment** (e.g., exposed population, affected cropland, and urban areas).

---

## **1. Methodology Overview**

### **Step 1: Define Study Area and Timeframe**
- The script requires an **Area of Interest (AOI)** (replace with your region of study).
- Set the **pre-flood** and **post-flood** time periods to compare Sentinel-1 imagery.

### **Step 2: Load Sentinel-1 SAR Data**
- Filters **Sentinel-1 Ground Range Detected (GRD)** imagery in **Interferometric Wide (IW) mode**.
- Uses **VH polarization** (preferred for flood mapping) and **descending pass**.
- Selects Sentinel-1 images **before and after the flood event**.
- Mosaics and clips images to the AOI.

### **Step 3: Preprocessing**
- Applies **a 50m focal mean filter** to reduce SAR speckle noise.
- Computes the **difference between post- and pre-flood images**.
- Thresholding is applied to detect water-covered areas based on **a predefined change detection threshold** (default: `1.25`).

### **Step 4: Refinement of Flooded Areas**
- **Removes permanent water bodies** using **JRC Global Surface Water** dataset.
- **Filters out small false-positive detections** using **connected pixel count**.
- **Masks out high-slope areas (>5 degrees)** using **HydroSHEDS DEM** to focus on lowland flooding.

### **Step 5: Damage Assessment**
- **Exposed Population:** Uses **JRC GHSL 2015** (250m resolution) to estimate affected people.
- **Affected Cropland:** Uses **MODIS Land Cover (500m resolution)** to detect flooded agricultural areas.
- **Affected Urban Areas:** Extracted from **MODIS Land Cover**.

### **Step 6: Visualization and Export**
- **Visualizes results on the GEE map:**
  - Flood extent (blue)
  - Population density
  - Affected cropland (green)
  - Affected urban areas (grey)
- **Exports results** as GeoTIFFs and shapefiles for further analysis in GIS software.
- **Adds a legend and results panel** displaying estimated impact metrics.

Reference:
https://www.un-spider.org/links-and-resources/data-sources
---

```javascript

/***************************SET SAR PARAMETERS (can be left default)****************************/

// Set the same parameters for BEFORE the flood.
var before_start= '2019-03-01';
var before_end='2019-03-10';

// Now set the same parameters for AFTER the flood.
var after_start='2019-03-10';
var after_end='2019-03-23';


var polarization = "VH"; /*or 'VV' --> VH mostly is the prefered polarization for flood mapping.
                           However, it always depends on your study area, you can select 'VV' 
                           as well.*/ 
var pass_direction = "DESCENDING"; /* or 'ASCENDING'when images are being compared use only one 
                           pass direction. Consider changing this parameter, if your image 
                           collection is empty. In some areas more Ascending images exist than 
                           than descending or the other way around.*/
var difference_threshold = 1.25; /*threshodl to be applied on the difference image (after flood
                           - before flood). It has been chosen by trial and error. In case your
                           flood extent result shows many false-positive or negative signals, 
                           consider changing it! */

//------------------------------- DATA SELECTION & PREPROCESSING --------------------------//

// rename selected geometry feature 
var aoi = ee.FeatureCollection(geometry);

// Load and filter Sentinel-1 GRD data by predefined parameters 
var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.eq('instrumentMode','IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', polarization))
  .filter(ee.Filter.eq('orbitProperties_pass',pass_direction)) 
  .filter(ee.Filter.eq('resolution_meters',10))
  //.filter(ee.Filter.eq('relativeOrbitNumber_start',relative_orbit ))
  .filterBounds(aoi)
  .select(polarization);
  
// Select images by predefined dates
var before_collection = collection.filterDate(before_start, before_end);
var after_collection = collection.filterDate(after_start,after_end);

// Print selected tiles to the console

      // Extract date from meta data
      function dates(imgcol){
        var range = imgcol.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]);
        var printed = ee.String('from ')
          .cat(ee.Date(range.get('min')).format('YYYY-MM-dd'))
          .cat(' to ')
          .cat(ee.Date(range.get('max')).format('YYYY-MM-dd'));
        return printed;
      }
      // print dates of before images to console
      var before_count = before_collection.size();
      print(ee.String('Tiles selected: Before Flood ').cat('(').cat(before_count).cat(')'),
        dates(before_collection), before_collection);
      
      // print dates of after images to console
      var after_count = before_collection.size();
      print(ee.String('Tiles selected: After Flood ').cat('(').cat(after_count).cat(')'),
        dates(after_collection), after_collection);

// Create a mosaic of selected tiles and clip to study area
var before = before_collection.mosaic().clip(aoi);
var after = after_collection.mosaic().clip(aoi);

// Apply reduce the radar speckle by smoothing  
var smoothing_radius = 50;
var before_filtered = before.focal_mean(smoothing_radius, 'circle', 'meters');
var after_filtered = after.focal_mean(smoothing_radius, 'circle', 'meters');


//------------------------------- FLOOD EXTENT CALCULATION -------------------------------//

// Calculate the difference between the before and after images
var difference = after_filtered.divide(before_filtered);

// Apply the predefined difference-threshold and create the flood extent mask 
var threshold = difference_threshold;
var difference_binary = difference.gt(threshold);

// Refine flood result using additional datasets
      
      // Include JRC layer on surface water seasonality to mask flood pixels from areas
      // of "permanent" water (where there is water > 10 months of the year)
      var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('seasonality');
      var swater_mask = swater.gte(10).updateMask(swater.gte(10));
      
      //Flooded layer where perennial water bodies (water > 10 mo/yr) is assigned a 0 value
      var flooded_mask = difference_binary.where(swater_mask,0);
      // final flooded area without pixels in perennial waterbodies
      var flooded = flooded_mask.updateMask(flooded_mask);
      
      // Compute connectivity of pixels to eliminate those connected to 8 or fewer neighbours
      // This operation reduces noise of the flood extent product 
      var connections = flooded.connectedPixelCount();    
      var flooded = flooded.updateMask(connections.gte(8));
      
      // Mask out areas with more than 5 percent slope using a Digital Elevation Model 
      var DEM = ee.Image('WWF/HydroSHEDS/03VFDEM');
      var terrain = ee.Algorithms.Terrain(DEM);
      var slope = terrain.select('slope');
      var flooded = flooded.updateMask(slope.lt(5));

// Calculate flood extent area
// Create a raster layer containing the area information of each pixel 
var flood_pixelarea = flooded.select(polarization)
  .multiply(ee.Image.pixelArea());

// Sum the areas of flooded pixels
// default is set to 'bestEffort: true' in order to reduce compuation time, for a more 
// accurate result set bestEffort to false and increase 'maxPixels'. 
var flood_stats = flood_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(),              
  geometry: aoi,
  scale: 10, // native resolution 
  //maxPixels: 1e9,
  bestEffort: true
  });

// Convert the flood extent to hectares (area calculations are originally given in meters)  
var flood_area_ha = flood_stats
  .getNumber(polarization)
  .divide(10000)
  .round(); 


//------------------------------  DAMAGE ASSSESSMENT  ----------------------------------//

//----------------------------- Exposed population density ----------------------------//

// Load JRC Global Human Settlement Popluation Density layer
// Resolution: 250. Number of people per cell is given.
var population_count = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015').clip(aoi);

// Calculate the amount of exposed population
// get GHSL projection
var GHSLprojection = population_count.projection();

// Reproject flood layer to GHSL scale
var flooded_res1 = flooded
    .reproject({
    crs: GHSLprojection
  });

// Create a raster showing exposed population only using the resampled flood layer
var population_exposed = population_count
  .updateMask(flooded_res1)
  .updateMask(population_count);

//Sum pixel values of exposed population raster 
var stats = population_exposed.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: aoi,
  scale: 250,
  maxPixels:1e9 
});

// get number of exposed people as integer
var number_pp_exposed = stats.getNumber('population_count').round();

//----------------------------- Affected agricultural land ----------------------------//

// using MODIS Land Cover Type Yearly Global 500m
// filter image collection by the most up-to-date MODIS Land Cover product 
var LC = ee.ImageCollection('MODIS/006/MCD12Q1')
  .filterDate('2014-01-01',after_end)
  .sort('system:index',false)
  .select("LC_Type1")
  .first()
  .clip(aoi);

// Extract only cropland pixels using the classes cropland (>60%) and Cropland/Natural 
// Vegetation Mosaics: mosaics of small-scale cultivation 40-60% incl. natural vegetation
var cropmask = LC
  .eq(12)
  .or(LC.eq(14))
var cropland = LC
  .updateMask(cropmask)
  
// get MODIS projection
var MODISprojection = LC.projection();

// Reproject flood layer to MODIS scale
var flooded_res = flooded
    .reproject({
    crs: MODISprojection
  });

// Calculate affected cropland using the resampled flood layer
var cropland_affected = flooded_res
  .updateMask(cropland)

// get pixel area of affected cropland layer
var crop_pixelarea = cropland_affected
  .multiply(ee.Image.pixelArea()); //calcuate the area of each pixel 

// sum pixels of affected cropland layer
var crop_stats = crop_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(), //sum all pixels with area information                
  geometry: aoi,
  scale: 500,
  maxPixels: 1e9
  });
  
// convert area to hectares
var crop_area_ha = crop_stats
  .getNumber(polarization)
  .divide(10000)
  .round();

//-------------------------------- Affected urban area ------------------------------//

// Using the same MODIS Land Cover Product 
// Filter urban areas
var urbanmask = LC.eq(13)
var urban = LC
  .updateMask(urbanmask)

//Calculate affected urban areas using the resampled flood layer
var urban_affected = urban
  .mask(flooded_res)
  .updateMask(urban);

// get pixel area of affected urban layer
var urban_pixelarea = urban_affected
  .multiply(ee.Image.pixelArea()); //calcuate the area of each pixel 

// sum pixels of affected cropland layer
var urban_stats = urban_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(), //sum all pixels with area information                
  geometry: aoi,
  scale: 500,
  bestEffort: true,
  });

// convert area to hectares
var urban_area_ha = urban_stats
  .getNumber('LC_Type1')
  .divide(10000)
  .round();

//------------------------------  DISPLAY PRODUCTS  ----------------------------------//

// Before and after flood SAR mosaic
Map.centerObject(aoi,8);
Map.addLayer(before_filtered, {min:-25,max:0}, 'Before Flood',0);
Map.addLayer(after_filtered, {min:-25,max:0}, 'After Flood',1);

// Difference layer
Map.addLayer(difference,{min:0,max:2},"Difference Layer",0);

// Flooded areas
Map.addLayer(flooded,{palette:"0000FF"},'Flooded areas');

// Population Density
var populationCountVis = {
  min: 0,
  max: 200.0,
  palette: ['060606','337663','337663','ffffff'],
};
Map.addLayer(population_count, populationCountVis, 'Population Density',0);

// Exposed Population
var populationExposedVis = {
  min: 0,
  max: 200.0,
  palette: ['yellow', 'orange', 'red'],
};
Map.addLayer(population_exposed, populationExposedVis, 'Exposed Population');

// MODIS Land Cover
var LCVis = {
  min: 1.0,
  max: 17.0,
  palette: [
    '05450a', '086a10', '54a708', '78d203', '009900', 'c6b044', 'dcd159',
    'dade48', 'fbff13', 'b6ff05', '27ff87', 'c24f44', 'a5a5a5', 'ff6d4c',
    '69fff8', 'f9ffa4', '1c0dff'
  ],
};
Map.addLayer(LC, LCVis, 'Land Cover',0);

// Cropland
var croplandVis = {
  min: 0,
  max: 14.0,
  palette: ['30b21c'],
};
Map.addLayer(cropland, croplandVis, 'Cropland',0)

// Affected cropland
Map.addLayer(cropland_affected, croplandVis, 'Affected Cropland'); 

// Urban
var urbanVis = {
  min: 0,
  max: 13.0,
  palette: ['grey'],
};
Map.addLayer(urban, urbanVis, 'Urban',0)

// Affected urban
Map.addLayer(urban_affected, urbanVis, 'Affected Urban'); 


//------------------------------------- EXPORTS ------------------------------------//
// Export flooded area as TIFF file 
Export.image.toDrive({
  image: flooded, 
  description: 'Flood_extent_raster',
  fileNamePrefix: 'flooded',
  region: aoi, 
  maxPixels: 1e10
});

// Export flooded area as shapefile (for further analysis in e.g. QGIS)
// Convert flood raster to polygons
var flooded_vec = flooded.reduceToVectors({
  scale: 10,
  geometryType:'polygon',
  geometry: aoi,
  eightConnected: false,
  bestEffort:true,
  tileScale:2,
});

// Export flood polygons as shape-file
Export.table.toDrive({
  collection:flooded_vec,
  description:'Flood_extent_vector',
  fileFormat:'SHP',
  fileNamePrefix:'flooded_vec'
});

// Export auxcillary data as shp?
// Exposed population density
Export.image.toDrive({
  image:population_exposed,
  description:'Exposed_Populuation',
  scale: 250,
  fileNamePrefix:'population_exposed',
  region: aoi,
  maxPixels:1e10
});

//---------------------------------- MAP PRODUCTION --------------------------------//

//-------------------------- Display the results on the map -----------------------//

// set position of panel where the results will be displayed 
var results = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '350px'
  }
});

//Prepare the visualtization parameters of the labels 
var textVis = {
  'margin':'0px 8px 2px 0px',
  'fontWeight':'bold'
  };
var numberVIS = {
  'margin':'0px 0px 15px 0px', 
  'color':'bf0f19',
  'fontWeight':'bold'
  };
var subTextVis = {
  'margin':'0px 0px 2px 0px',
  'fontSize':'12px',
  'color':'grey'
  };

var titleTextVis = {
  'margin':'0px 0px 15px 0px',
  'fontSize': '18px', 
  'font-weight':'', 
  'color': '3333ff'
  };

// Create lables of the results 
// Titel and time period
var title = ui.Label('Results', titleTextVis);
var text1 = ui.Label('Flood status between:',textVis);
var number1 = ui.Label(after_start.concat(" and ",after_end),numberVIS);

// Alternatively, print dates of the selected tiles
//var number1 = ui.Label('Please wait...',numberVIS); 
//(after_collection).evaluate(function(val){number1.setValue(val)}),numberVIS;

// Estimated flood extent 
var text2 = ui.Label('Estimated flood extent:',textVis);
var text2_2 = ui.Label('Please wait...',subTextVis);
dates(after_collection).evaluate(function(val){text2_2.setValue('based on Senintel-1 imagery '+val)});
var number2 = ui.Label('Please wait...',numberVIS); 
flood_area_ha.evaluate(function(val){number2.setValue(val+' hectares')}),numberVIS;

// Estimated number of exposed people
var text3 = ui.Label('Estimated number of exposed people: ',textVis);
var text3_2 = ui.Label('based on GHSL 2015 (250m)',subTextVis);
var number3 = ui.Label('Please wait...',numberVIS);
number_pp_exposed.evaluate(function(val){number3.setValue(val)}),numberVIS;

// Estimated area of affected cropland 
var MODIS_date = ee.String(LC.get('system:index')).slice(0,4);
var text4 = ui.Label('Estimated affected cropland:',textVis);
var text4_2 = ui.Label('Please wait', subTextVis)
MODIS_date.evaluate(function(val){text4_2.setValue('based on MODIS Land Cover '+val +' (500m)')}), subTextVis;
var number4 = ui.Label('Please wait...',numberVIS);
crop_area_ha.evaluate(function(val){number4.setValue(val+' hectares')}),numberVIS;

// Estimated area of affected urban
var text5 = ui.Label('Estimated affected urban areas:',textVis);
var text5_2 = ui.Label('Please wait', subTextVis)
MODIS_date.evaluate(function(val){text5_2.setValue('based on MODIS Land Cover '+val +' (500m)')}), subTextVis;
var number5 = ui.Label('Please wait...',numberVIS);
urban_area_ha.evaluate(function(val){number5.setValue(val+' hectares')}),numberVIS;


// Add the labels to the panel 
results.add(ui.Panel([
        title,
        text1,
        number1,
        text2,
        text2_2,
        number2,
        text3,
        text3_2,
        number3,
        text4,
        text4_2,
        number4,
        text5,
        text5_2,
        number5,]
      ));

// Add the panel to the map 
Map.add(results);

//----------------------------- Display legend on the map --------------------------//

// Create legend (*credits to thisearthsite on Open Geo Blog: https://mygeoblog.com/2016/12/09/add-a-legend-to-to-your-gee-map/)
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
  }
});
 
// Create legend title
var legendTitle = ui.Label('Legend',titleTextVis);
 
// Add the title to the panel
legend.add(legendTitle);
 
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
 
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
 
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
 
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
 
//  Palette with the colors
var palette =['#0000FF', '#30b21c', 'grey'];
 
// name of the legend
var names = ['potentially flooded areas','affected cropland','affected urban'];
 
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  

// Create second legend title to display exposed population density
var legendTitle2 = ui.Label({
value: 'Exposed population density',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '10px 0 0 0',
padding: '0'
}
});

// Add second title to the panel
legend.add(legendTitle2);

// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((populationExposedVis.max-populationExposedVis.min)/100.0).add(populationExposedVis.min);
var legendImage = gradient.visualize(populationExposedVis);
 
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label('> '.concat(populationExposedVis['max']))
],
});
 
legend.add(panel);
 
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x50'},
style: {padding: '1px', position: 'bottom-center'}
});
 
// add the thumbnail to the legend
legend.add(thumbnail);
 
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(populationExposedVis['min'])
],
});
 
legend.add(panel);
 
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);

```

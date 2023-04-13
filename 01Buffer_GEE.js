var sawah = ee.Image("projects/mapbiomas-indonesia/CrossCutting_Col2/RiceField/Sawah_Ind"),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[93.72234168380334, 6.927607028062229],
          [93.72234168380334, -11.263446253941808],
          [141.88640418380334, -11.263446253941808],
          [141.88640418380334, 6.927607028062229]]], null, false);

          var sawah_new    = ee.Image(0).where(sawah.eq(0), 1).rename('sawah_kementan_2021').byte()

var buffer_sawah = sawah_new.focalMax(1000, 'circle', 'meters').rename('sawah_kementan_2021_buffer_1km').byte()


Map.addLayer(buffer_sawah.selfMask(), {palette: 'yellow'}, 'buffer sawah')
Map.addLayer(sawah_new.selfMask(), {palette: 'red'}, 'sawah')

Export.image.toAsset({
  image : sawah_new, 
  description : 'sawah_kemetan_2021', 
  assetId :'projects/mapbiomas-indonesia/CrossCutting_Col2/RiceField/MBI_C2_RiceField', 
  region : geometry, 
  scale : 30, 
  maxPixels: 1e13})

Export.image.toAsset({
  image : buffer_sawah, 
  description : 'sawah_kementan_2021_buffer_1km', 
  assetId :'projects/mapbiomas-indonesia/CrossCutting_Col2/RiceField/MBI_C2_RiceField_buffer_1km', 
  region : geometry, 
  scale : 30, 
  maxPixels: 1e13}) 
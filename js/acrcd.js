/*require(["esri/config", "esri/Map", "esri/views/MapView"], function (esriConfig, Map, MapView) {

    esriConfig.apiKey = "AAPKadea45ebeeeb4eb1a48b1f78adb1244boW47qDU4myD0NezZLsSvZ0ZiDKUu59_MDxyYKuNeJ7Af8fiDaD_8GffCzYXdokI4";

    const map = new Map({
        basemap: "arcgis-topographic" // Basemap layer service
    });

    const view = new MapView({
        map: map,
        center: [-118.805, 34.027], // Longitude, latitude
        zoom: 13, // Zoom level
        container: "viewDiv" // Div element
    });

});*/

$(document).ready(function () {
    $('.nav-link').on('click', function (event) {
        var selectedTabName = $(this)[0].id;
        if (selectedTabName != "hex-tab" && selectedTabName != "data-tab") {
            $('side').hide()
            $('top').hide()
            $('footer').hide()
            $('#page').css('grid-template-areas', '"header header" "tabs tabs" "main main" "main main" "main main"');
        } else {
            if (selectedTabName == "hex-tab") {
                $('#widget').show()
                $('#widget1').hide()
                $('#dropdownContainer').show()
                $('#sliderContainer').show()
                $('#fauxSliderContainer').show()
            } else {
                $('#widget').hide()
                $('#widget1').show()
                $('#dropdownContainer').hide()
                $('#sliderContainer').hide()
                $('#fauxSliderContainer').hide()
            }
            $('side').show()
            $('top').show()
            $('footer').show()
            $('#page').css('grid-template-areas', '"header header" "tabs tabs" "top main" "side main" "foot main"');
        }
        console.log(selectedTabName);
        // Do something with the selected tab name
    });

});

$("#scenDiv").hide();
var svBP = 1,
    svBZ = 1,
    svCC = 1,
    svCP = 1,
    svCL = 1,
    svCH = 1,
    svCG = 1,
    svFI = 1,
    svFM = 1,
    svGL = 1,
    svHL = 1,
    svLI = 1,
    svPG = 1,
    svPS = 1,
    svRC = 1,
    svSOI = 1,
    svSC = 1,
    svSR = 1,
    svTC = 1,
    svU2 = 1,
    svUA = 1,
    svWS = 1,
    svWL = 1,
    svWA = 1,
    sliderTotal = 24,
    expression,
    winnerArcade,
    strengthArcade,
    string,
    renderer,
    renderer2,
    sizeText = "acres < 1, 0, acres > 2000, 0, ",
    parcelArr = [],
    parcelAOI,
    parcelSQL,
    parcelMax,
    parselMax1,
    parcelMin,
    parcelDE = "",
    studyDE = "",
    deleteVal,
    topTen = [],
    queryString,
    topTenQuery,
    features,
    rankLayer,
    rankCount = 0,
    parcelQuery,
    parcelAcre,
    parcelRank,
    featureArr2,
    rankTotal,
    ckb = $("#top1").is(':checked'),
    map,
    view,
    savedExtent,
    savedExtent2,
    savedextent1,
    savedextent2

let db;
require([
    "esri/config", "esri/widgets/BasemapGallery", "esri/layers/GroupLayer", "esri/Map", "esri/views/MapView", "esri/widgets/Expand", "esri/request", "esri/layers/support/Field", "esri/Map", "esri/Graphic", "esri/views/MapView", "esri/WebMap", "esri/geometry/Extent", "esri/layers/FeatureLayer", "esri/layers/GraphicsLayer", "esri/layers/VectorTileLayer", "esri/layers/TileLayer", "esri/tasks/QueryTask", "esri/tasks/support/Query", "esri/tasks/IdentifyTask", "esri/tasks/support/IdentifyParameters", "esri/widgets/Legend", "esri/widgets/Search", "esri/widgets/LayerList", "esri/widgets/Home", "esri/layers/Layer", "esri/geometry/SpatialReference", "esri/core/Error", "esri/smartMapping/renderers/color","esri/PopupTemplate", "dojo/domReady!"
], function (esriConfig, BasemapGallery, GroupLayer, Map, MapView, Expand, request, Field, Map, Graphic, MapView, WebMap, Extent, FeatureLayer, GraphicsLayer, VectorTileLayer, TileLayer, QueryTask, Query, IdentifyTask, IdentifyParameters, Legend, Search, LayerList, Home, Layer, SpatialReference, Error, colorRendererCreator, PopupTemplate) {
    //Shapefile
    var portalUrl = "https://www.arcgis.com";

    document
        .getElementById("uploadForm")
        .addEventListener("change", function (event) {
            var fileName = event.target.value.toLowerCase();

            if (fileName.indexOf(".zip") !== -1) {
                //is file a zip - if not notify user
                generateFeatureCollection(fileName);
            } else {
                document.getElementById("upload-status").innerHTML =
                    '<p style="color:red">Add shapefile as .zip file</p>';
            }
        });

    document
        .getElementById("uploadForm2")
        .addEventListener("change", function (event) {
            var fileName2 = event.target.value.toLowerCase();

            if (fileName2.indexOf(".zip") !== -1) {
                //is file a zip - if not notify user
                generateFeatureCollection2(fileName2);
            } else {
                document.getElementById("upload-status2").innerHTML =
                    '<p style="color:red">Add shapefile as .zip file</p>';
            }
        });
    // shapefile end

    var identifyTask = new IdentifyTask(),
        params = new IdentifyParameters()
    /*let request = window.indexedDB.open('saveState', 1);
    request.onerror = function () {
        console.log('Database failed to open');
    };
    // onsuccess handler signifies that the database opened successfully
    request.onsuccess = function () {
        console.log('Database opened successfully');
        // Store the opened database object in the db variable. This is used a lot below
        db = request.result;
    };*/

    $.ajaxSetup({
        async: false
    });

    $.getJSON("https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/ACRCD_Hexagons_08022023/FeatureServer/0/query?where=1%3D1&outFields=*&returnExceededLimitFeatures=true&sqlFormat=none&f=pjson", function (data) {
        $.each(data.features, function (i, val) {
            parcelArr.push({
                BP: val.attributes.BasinPriority,
                BZ: val.attributes.BufferZone,
                CC: val.attributes.CCED,
                CP: val.attributes.CPAD,
                CL: val.attributes.CityLimits,
                CH: val.attributes.CriticalHabitat,
                CG: val.attributes.CropLand,
                FM: val.attributes.FarmMarkets,
                FI: val.attributes.FoodInsecurity,
                GL: val.attributes.GrazingLand,
                HL: val.attributes.HabitatLinkages,
                LI: val.attributes.LowIncome,
                PG: val.attributes.PBAGrowth,
                PS: val.attributes.PrimeSoil,
                RC: val.attributes.RangelandConservation,
                SOI: val.attributes.SOI,
                SC: val.attributes.SoilCarbon,
                SR: val.attributes.SpeciesRichness,
                TC: val.attributes.TerrestrialClimChange,
                U2: val.attributes.Urban2050,
                UA: val.attributes.UrbanAg,
                WS: val.attributes.WaterStorage,
                WL: val.attributes.Wetlands,
                WA: val.attributes.WilliamsonAct,
            })
        })
        parcelSlider();
    })

    Parcels = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/ACRCD_Hexagons_08022023/FeatureServer/",
        layerId: 0,
        blendMode: "multiply",
        title: "Planning Units",
        definitionExpression: "water = 0"
    });

    StudyArea = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/arcgis/rest/services/AlamedaCounty/FeatureServer/",
        layerId: 1,
        title: "Alameda County",
        listMode: "hide"
    });

    StudyArea1 = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/arcgis/rest/services/AlamedaCounty/FeatureServer/",
        layerId: 1,
        title: "County Boundary",
        //listMode: "hide",
        effect: "drop-shadow(3px, 3px, 2px)",
        blendMode: "destination-atop",
        opacity: .5
    });

    StudyArea.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [0, 0, 0, 0],
            outline: {
                width: 2,
                color: "#49722D"
            }
        }
    }

    StudyArea1.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: "#ffffff",
            opacity: 0,
            outline: {
                width: 2.25,
                color: "#000000"
            }
        }
    }

    const allData = new WebMap({
        portalItem: { // autocasts as new PortalItem()
            id: "849d0e2da59a495cb140d11472ed45c4"
        }
    });

    CCED1 = new FeatureLayer({
        portalItem: { // autocasts as new PortalItem()
            id: "ecd94e9ec4de44d680a8343ab467b119"
        },
        title: "Conservation Easements",
        visible: false,
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "#D7B890",
                opacity: 0.75,
                outline: {
                    width: 1,
                    color: "#D7B890"
                }
            }
        },
        popupTemplate: {
            title: "{sitename}",
            content: [{
              type: "fields", // Autocasts as new FieldsContent()
              // Autocasts as new FieldInfo[]
              fieldInfos: [{
                fieldName: "sitename",
                label: "Site Name",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "esmthldr",
                label: "Easement Holder",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "eholdtyp",
                label: "Easement Type",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "duration",
                label: "Duration",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "year_est",
                label: "Year Established",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false,
                  places: 0
                }
              },
              {
                fieldName: "gis_acres",
                label: "Acres",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: true,
                  places: 2
                }
              }]
            }]
          }
    });

    CPAD1 = new FeatureLayer({
        portalItem: { // autocasts as new PortalItem()
            id: "f4d112babc1a45a9b490f757420814d8"
        },
        title: "Parks and Other Protected Areas",
        visible: false,
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "#FFAA00",
                opacity: 0.75,
                outline: {
                    width: 1,
                    color: "#A87000"
                }
            }
        },
        popupTemplate: {
            title: "{UNIT_NAME}",
            content: [{
              type: "fields", // Autocasts as new FieldsContent()
              // Autocasts as new FieldInfo[]
              fieldInfos: [{
                fieldName: "UNIT_NAME",
                label: "Name",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "AGNCY_NAME",
                label: "Agency Name",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "CITY",
                label: "City",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "ACRES",
                label: "Acres",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: true,
                  places: 2
                }
              }]
            }]
          }
    });

    CityLimits1 = new FeatureLayer({
        portalItem: { // autocasts as new PortalItem()
            id: "55cf95d697344793a5c52d3e7d936209"
        },
        title: "City Limits",
        visible: false,
        renderer: {
            type: "unique-value", // autocasts as new UniqueValueRenderer()
            legendOptions: {
                title: ""
            },
            defaultSymbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "#85A439",
                opacity: 0.5,
                outline: {
                    width: 1,
                    color: "#267300"
                }
            },
            defaultLabel: "City Limits",
            field: "NAME",

            uniqueValueInfos: [
                {
                    value: "Alameda County", // code for interstates/freeways
                    type: "simple",
                    symbol: {
                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                        color: "#664015",
                        opacity: 0.65,
                        outline: {
                            width: 1,
                            color: "#999999"
                        }
                    },
                    label: "Unincorporated Area"
                }
            ]
        },
        popupTemplate: {
            title: "{NAME}",
            content: [{
              type: "fields", // Autocasts as new FieldsContent()
              // Autocasts as new FieldInfo[]
              fieldInfos: [{
                fieldName: "Acres",
                label: "Acres",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: true,
                  places: 2
                }
              }]
            }]
          }
    });

    BufferZones1 = new FeatureLayer({
        portalItem: { // autocasts as new PortalItem()
            id: "4f2e47273e7c455487a0716737dab153"
        },
        title: "Buffer Zones (outside city limits, inside SOI)",
        visible: false,
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "#87B2AB",
                opacity: 0.75,
                outline: {
                    width: 1,
                    color: "#48615D"
                }
            }
        },
        popupTemplate: {
            title: "{NAME_1}",
            content: [{
              type: "fields", // Autocasts as new FieldsContent()
              // Autocasts as new FieldInfo[]
              fieldInfos: [{
                fieldName: "NAME_1",
                label: "Name",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "Acres",
                label: "Acres",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: true,
                  places: 2
                }
              }]
            }]
          }
    });

    PBAGrowth1 = new FeatureLayer({
        portalItem: { // autocasts as new PortalItem()
            id: "d74d81cfce2a4bc9851858f087b78f49"
        },
        title: "Plan Bay Area 2050 Growth Geographies",
        visible: false,
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "#A900E6",
                opacity: 0.75,
                outline: {
                    width: 1,
                    color: "#8400A8"
                }
            }
        },
        popupTemplate: {
            title: "{area_name}",
            content: [{
              type: "fields", // Autocasts as new FieldsContent()
              // Autocasts as new FieldInfo[]
              fieldInfos: [{
                fieldName: "area_name",
                label: "Area Name",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "jurisdicti",
                label: "Jurisdiction",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "designatio",
                label: "PBA Designation",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              }]
            }]
          }
    });

    Williamson1 = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/ACRCD_Data/FeatureServer/",
        layerId: 0,
        title: "Alameda Williamson",
        visible: false,
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "#005CE6",
                opacity: 0.75,
                outline: {
                    width: 1,
                    color: "#002673"
                }
            }
        },
        popupTemplate: {
            title: "Williamson Act Alameda County Land"
          }
        //listMode: "hide"
    });

    UrbanAg1 = new FeatureLayer({
        portalItem: { // autocasts as new PortalItem()
            id: "77ee8e7c56214e31b0c8e9f2675a557a"
        },
        title: "Alameda County Urban Ag Sites",
        visible: false,
        renderer: {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                style: "circle",
                size: 6,
                color: "#85A439",
                outline: {  // autocasts as new SimpleLineSymbol()
                    color: "#267300",
                    width: "0.5px"
                }
            }
        },
        popupTemplate: {
            title: "{SITE_NAME}",
            content: [{
              type: "fields", // Autocasts as new FieldsContent()
              // Autocasts as new FieldInfo[]
              fieldInfos: [{
                fieldName: "ORG_NAME",
                label: "Organization Name",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "SITE_NAME",
                label: "Site Name",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "SITE_TYPE",
                label: "Site Type",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "SITE_SIZE",
                label: "Site Size",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: true,
                  places: 2
                }
              },
              {
                fieldName: "PRODUCE_GROWN",
                label: "Produce Grown",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "ADDRESS_FULL",
                label: "Address",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              },
              {
                fieldName: "ACTIVE_CONTACT_EMAIL",
                label: "Active Contact Email",
                // Autocasts as new FieldInfoFormat()
                format: {
                  digitSeparator: false
                }
              }]
            }]
          }
    });


    const BasicInfoGroupLayer = new GroupLayer({
        title: "Basic Info",
        visible: false,
        //visibilityMode: "exclusive",
        layers: [UrbanAg1, Williamson1, PBAGrowth1, BufferZones1, CityLimits1, CPAD1, CCED1, StudyArea1],
        opacity: 0.75
    });

    var startExtent = new Extent(-122.5177, 37.4323, -121.4326, 37.9301,
        new SpatialReference({
            wkid: 4326
        }));

    map = new Map({
        basemap: {
            baseLayers: [
                new TileLayer({
                    portalItem: {
                        id: "1b243539f4514b6ba35e7d995890db1d" // world hillshade
                    }
                }),
                new VectorTileLayer({
                    portalItem: {
                        id: "291da5eab3a0412593b66d384379f89f" // khaki vector tiles
                    },
                    blendMode: "multiply"
                })
            ]
        },
        layers: [Parcels, BasicInfoGroupLayer]//, StudyArea]
    });

    /* Creates a layer from a Portal layer item id
    Layer.fromPortalItem({
        portalItem: {
            id: "1768e8369a214dfab4e2167d5c5f2454",
            name: "Place Names"
        }
    }).then((layer) => {
        // Adds layer to the map
        layer.title = 'Place Names'
        map.add(layer);
    });
    Creates a layer from a Portal layer item id*/
    Layer.fromPortalItem({
        portalItem: {
            id: "30d6b8271e1849cd9c3042060001f425",
            name: "Places, Roads, and Highways"
        }
    }).then((layer) => {
        // Adds layer to the map
        layer.title = 'Places, Roads, and Highways'
        map.add(layer);
    });
    view = new MapView({
        container: "viewDiv",
        map: map,
        extent: startExtent,
        constraints: {
            snapToZoom: false
        }
    });

    const homeBtn = new Home({
        view: view
    });

    view.when(function () {
        var layerList = new LayerList({
            view: view,
            container: "widget",
            listItemCreatedFunction: (event) => {
                const item = event.item;
                if (item.layer.title != "Places, Roads, and Highways") {
                    item.panel = {
                        content: "legend",
                        open: false
                    };
                }
            }
        });

        /*var legend = new Legend({
            view: view,
            container: "widget",
        }); */
        view.ui.add(homeBtn, "top-left");

        setRenderer()
    });

    savedExtent = view.extent;

    view.watch("extent", function (newExtent) {
        savedExtent = newExtent;
        //console.log("Extent changed:", savedExtent);
    });

    // Create a BasemapGallery widget instance and set
    // its container to a div element

    const basemapGallery = new BasemapGallery({
        view: view,
        container: document.createElement("div")
    });

    // Create an Expand instance and set the content
    // property to the DOM node of the basemap gallery widget

    const bgExpand = new Expand({
        view: view,
        content: basemapGallery,
        expandTooltip: "Change Basemap"
    });

    // Add the expand instance to the ui

    view.ui.add(bgExpand, "top-left");

    // Shapefile
    var fileForm = document.getElementById("mainWindow");

    var expand = new Expand({
        expandIconClass: "esri-icon-upload",
        view: view,
        content: fileForm,
        expandTooltip: "Upload Shapefile",
        autoCollapse: true
    });

    view.ui.add(expand, "top-left");

    function generateFeatureCollection(fileName) {
        var name = fileName.split(".");
        // Chrome and IE add c:\fakepath to the value - we need to remove it
        // see this link for more info: http://davidwalsh.name/fakepath
        name = name[0].replace("c:\\fakepath\\", "");

        document.getElementById("upload-status").innerHTML =
            "<b>Loading </b>" + name;

        // define the input params for generate see the rest doc for details
        // https://developers.arcgis.com/rest/users-groups-and-items/generate.htm
        var params = {
            name: name,
            targetSR: view.spatialReference,
            maxRecordCount: 1000,
            enforceInputFileSizeLimit: true,
            enforceOutputJsonSizeLimit: true,
        };

        // generalize features to 10 meters for better performance
        params.generalize = true;
        params.maxAllowableOffset = 10;
        params.reducePrecision = true;
        params.numberOfDigitsAfterDecimal = 0;

        var myContent = {
            filetype: "shapefile",
            publishParameters: JSON.stringify(params),
            f: "json",
        };

        // use the REST generate operation to generate a feature collection from the zipped shapefile
        request(portalUrl + "/sharing/rest/content/features/generate", {
            query: myContent,
            body: document.getElementById("uploadForm"),
            responseType: "json",
        })
            .then(function (response) {
                var layerName =
                    response.data.featureCollection.layers[0].layerDefinition.name;
                document.getElementById("upload-status").innerHTML =
                    "<b>Loaded: </b>" + layerName;
                addShapefileToMap(response.data.featureCollection);
            })
            .catch(errorHandler);
    }

    function errorHandler(error) {
        document.getElementById("upload-status").innerHTML =
            "<p style='color:red;max-width: 500px;'>" + error.message + "</p>";
    }

    function addShapefileToMap(featureCollection) {
        // add the shapefile to the map and zoom to the feature collection extent
        // if you want to persist the feature collection when you reload browser, you could store the
        // collection in local storage by serializing the layer using featureLayer.toJson()
        // see the 'Feature Collection in Local Storage' sample for an example of how to work with local storage
        var sourceGraphics = [];

        var layers = featureCollection.layers.map(function (layer) {
            var graphics = layer.featureSet.features.map(function (feature) {
                return Graphic.fromJSON(feature);
            });
            sourceGraphics = sourceGraphics.concat(graphics);
            var featureLayer = new FeatureLayer({
                title: "Uploaded Shapefile",
                objectIdField: "FID",
                source: graphics,
                fields: layer.layerDefinition.fields.map(function (field) {
                    return Field.fromJSON(field);
                }),
                renderer: {
                    type: "simple",
                    symbol: {
                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                        color: "#85A439",
                        opacity: 0,
                        outline: {
                            width: 1,
                            color: "#267300"
                        }
                    }
                }
            });
            return featureLayer;
            // associate the feature with the popup on click to enable highlight and zoom to
        });
        map.addMany(layers);
        view.goTo(sourceGraphics).then(function () {
            view.zoom = view.zoom - 2;
        }).catch(function (error) {
            if (error.name != "AbortError") {
                console.error(error);
            }
        });

        document.getElementById("upload-status").innerHTML = "";
    }
    // End Shapefile

    view2 = new MapView({
        container: "viewDiv2",
        map: allData,
        extent: startExtent,
        constraints: {
            snapToZoom: false
        }
    });

    const homeBtn2 = new Home({
        view: view2
    });

    view2.when(function () {
        var layerList = new LayerList({
            view: view2,
            container: "widget1",
            listItemCreatedFunction: (event) => {
                const item = event.item;
                if (item.layer.title != "All Layers" && item.layer.title != "Basic Information" && item.layer.title != "SALC Acquisition Grants" &&
                    item.layer.title != "Wildlife Conservation Board Grants" && item.layer.title != "California Coastal Conservancy"
                    && item.layer.title != "NRCS - Agricultural Conservation Easement Program (ACEP)") {
                    item.panel = {
                        content: "legend",
                        open: false
                    };
                }
                if (item.layer.title == "Alameda County Boundary") {
                    item.layer.listMode = "hide"
                }
            }
        });

        setTimeout(function () {
            view2.layerViews.map(function (item) {
                item.watch('visible', function (visible) {
                    if (visible == true) {
                        titlevar = item.layer.title
                        changeSliders(item.layer.title, 'atlas')
                        $.each(view2.layerViews.items, function (index, element) {
                            if (element.layer.title != titlevar && element.layer.title != "Alameda County Boundary") {
                                element.layer.visible = false
                            }
                        });
                    }
                }, item.layer.title);

            });
        }, 500);

        //view2.ui.add(layerList, "top-right");
        view2.ui.add(homeBtn2, "top-left");
    });

    savedExtent2 = view2.extent;

    view2.watch("extent", function (newExtent) {
        savedExtent2 = newExtent;
        //console.log("Extent changed:", savedExtent2);
    });

    // Create a BasemapGallery widget instance and set
    // its container to a div element

    const basemapGallery2 = new BasemapGallery({
        view: view2,
        container: document.createElement("div")
    });

    // Create an Expand instance and set the content
    // property to the DOM node of the basemap gallery widget

    const bgExpand2 = new Expand({
        view: view2,
        content: basemapGallery2,
        expandTooltip: "Change Basemap"
    });

    // Add the expand instance to the ui

    view2.ui.add(bgExpand2, "top-left");

    // Shapefile
    var fileForm2 = document.getElementById("mainWindow2");

    var expand2 = new Expand({
        expandIconClass: "esri-icon-upload",
        view: view2,
        content: fileForm2,
        expandTooltip: "Upload Shapefile",
        autoCollapse: true
    });

    view2.ui.add(expand2, "top-left");

    function generateFeatureCollection2(fileName2) {
        var name = fileName2.split(".");
        // Chrome and IE add c:\fakepath to the value - we need to remove it
        // see this link for more info: http://davidwalsh.name/fakepath
        name = name[0].replace("c:\\fakepath\\", "");

        document.getElementById("upload-status2").innerHTML =
            "<b>Loading </b>" + name;

        // define the input params for generate see the rest doc for details
        // https://developers.arcgis.com/rest/users-groups-and-items/generate.htm
        var params = {
            name: name,
            targetSR: view2.spatialReference,
            maxRecordCount: 1000,
            enforceInputFileSizeLimit: true,
            enforceOutputJsonSizeLimit: true,
        };

        // generalize features to 10 meters for better performance
        params.generalize = true;
        params.maxAllowableOffset = 10;
        params.reducePrecision = true;
        params.numberOfDigitsAfterDecimal = 0;

        var myContent = {
            filetype: "shapefile",
            publishParameters: JSON.stringify(params),
            f: "json",
        };

        // use the REST generate operation to generate a feature collection from the zipped shapefile
        request(portalUrl + "/sharing/rest/content/features/generate", {
            query: myContent,
            body: document.getElementById("uploadForm2"),
            responseType: "json",
        })
            .then(function (response) {
                var layerName =
                    response.data.featureCollection.layers[0].layerDefinition.name;
                document.getElementById("upload-status2").innerHTML =
                    "<b>Loaded: </b>" + layerName;
                addShapefileToMap2(response.data.featureCollection);
            })
            .catch(errorHandler);
    }

    function errorHandler(error) {
        document.getElementById("upload-status2").innerHTML =
            "<p style='color:red;max-width: 500px;'>" + error.message + "</p>";
    }

    function addShapefileToMap2(featureCollection) {
        // add the shapefile to the map and zoom to the feature collection extent
        // if you want to persist the feature collection when you reload browser, you could store the
        // collection in local storage by serializing the layer using featureLayer.toJson()
        // see the 'Feature Collection in Local Storage' sample for an example of how to work with local storage
        var sourceGraphics = [];

        var layers2 = featureCollection.layers.map(function (layer) {
            var graphics = layer.featureSet.features.map(function (feature) {
                return Graphic.fromJSON(feature);
            });
            sourceGraphics = sourceGraphics.concat(graphics);
            var featureLayer = new FeatureLayer({
                title: "Uploaded Shapefile",
                objectIdField: "FID",
                source: graphics,
                fields: layer.layerDefinition.fields.map(function (field) {
                    return Field.fromJSON(field);
                }),
                renderer: {
                    type: "simple",
                    symbol: {
                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                        color: "#85A439",
                        opacity: 0,
                        outline: {
                            width: 1,
                            color: "#267300"
                        }
                    }
                }
            });
            return featureLayer;
            // associate the feature with the popup on click to enable highlight and zoom to
        });
        allData.addMany(layers2);
        view2.goTo(sourceGraphics).then(function () {
            view2.zoom = view2.zoom - 2;
        }).catch(function (error) {
            if (error.name != "AbortError") {
                console.error(error);
            }
        });

        document.getElementById("upload-status2").innerHTML = "";
    }
    // End Shapefile

    function parcelSlider(grantArray = []) {
        $("#loadBody").empty();
        $("#loadBody").append("Data ready");
        $("#loadClose").show();
        if (grantArray.length != 0) {
            expression = createExpressions(grantArray, 2)
            sql - expression[3]

            parcelSQL = alasql(sql, [parcelArr])
            parselMax1 = alasql("SELECT grp, MAX(test) as maxVal from ? GROUP BY grp", [parcelSQL])
            parcelMax = parselMax1[0].maxVal
        }
    }

    function setRenderer() {
        //grantArray = ["BP","BZ","CC","CP","CL","CH","CG","FM","GL","LI","PG","PS","RC","SOI","SC","SR","TC","U2","UA","WS","WL","WA"]
        //[fileList, string, stringRound, sql]
        parcelSlider(grantArray);

        expression = createExpressions(grantArray, 2)

        let arcadeExpressionInfos = [
            // Get Arcade expression returning the predominant demographic in the county:
            // Whether the majority of people are in the labor force or not
            {
                name: "hex_info",
                title: "Overall Weight",
                //expression: strengthArcade2(svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC, svSQ, svSR, svTC, svU2, svUA, svUC, svWS, svWL, svWA, 2)
                expression: expression[2]
            }
        ]

        var template = {
            // autocasts as new PopupTemplate()
            expressionInfos: arcadeExpressionInfos,
            title: "Grant Priority: {expression/hex_info}",
            content: [{
                // It is also possible to set the fieldInfos outside of the content
                // directly in the popupTemplate. If no fieldInfos is specifically set
                // in the content, it defaults to whatever may be set within the popupTemplate.
                type: "fields",
                fieldInfos: expression[0]
            }]
        };

        Parcels.popupTemplate = template;

        let labelClass = {
            // autocasts as new LabelClass()
            symbol: {
                type: "text", // autocasts as new TextSymbol()
                color: "#ffffff",
                yoffset: -2.5,
                font: {
                    size: 10,
                }
            },
            labelPlacement: "center-center",
            labelExpressionInfo: {
                //expression: strengthArcade2(svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC, svSQ, svSR, svTC, svU2, svUA, svUC, svWS, svWL, svWA, 2)
                expression: expression[2]
            },
            maxScale: 0,
            minScale: 85000,
        };

        var renderer2 = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-fill",
                color: [0, 0, 0, 0],
                outline: { // autocasts as new SimpleLineSymbol()
                    width: 0.25,
                    color: "#ffffff"
                }
            }, // autocasts as new SimpleFillSymbol()
            visualVariables: [
                {
                    type: "color",
                    //valueExpression: strengthArcade2(svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC, svSQ, svSR, svTC, svU2, svUA, svUC, svWS, svWL, svWA),
                    valueExpression: expression[1],
                    valueExpressionTitle: "Grant Priority",
                    stops: [
                        {
                            value: 0.2,
                            color: "#664015",
                            label: "< 0.2 (Low)"
                        }
                        , {
                            value: 0.4,
                            color: "#AC9A58",
                            label: "0.4"
                        }
                        , {
                            value: 0.6,
                            color: "#F0F2C6",
                            label: "0.6"
                        }
                        , {
                            value: 0.8,
                            color: "#BDCB76",
                            label: "0.8"
                        }, {
                            value: 0.8,
                            color: "#85A439",
                            label: "1.0 (High)"
                        }
                    ]
                }
            ]
        };
        Parcels.renderer = renderer2;
        Parcels.labelingInfo = [labelClass]
    }

    function createExpressions(grantArray = [], rnd = '') {
        fileList = []
        string = ""
        var factors = "[" + grantArray.toString() + "]"
        sql = "SELECT 1 as grp, "

        if (grantArray.includes('BP')) {
            string += "var BP = ($feature.BasinPriority * " + svBP + ");"
            sql += "(BP * " + svBP + ") + "
            fileList.push({
                fieldName: "BasinPriority",
                label: "Areas with sufficient water basins",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('BZ')) {
            string += "var BZ = ($feature.BufferZone * " + svBZ + ");"
            sql += "(BZ * " + svBZ + ") + "
            fileList.push({
                fieldName: "BufferZone",
                label: "Projected city spread",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('CC')) {
            string += "var CC = ($feature.CCED * " + svCC + ");"
            sql += "(CC * " + svCC + ") + "
            fileList.push({
                fieldName: "CCED",
                label: "Areas near conservation easements",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('CP')) {
            string += "var CP = ($feature.CPAD * " + svCP + ");"
            sql += "(CP * " + svCP + ") + "
            fileList.push({
                fieldName: "CPAD",
                label: "Areas near parks and other protected areas",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('CL')) {
            string += "var CL = ($feature.CityLimits * " + svCL + ");"
            sql += "(CL * " + svCL + ") + "
            fileList.push({
                fieldName: "CityLimits",
                label: "City Limits",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('CH')) {
            string += "var CH = ($feature.CriticalHabitat * " + svCH + ");"
            sql += "(CH * " + svCH + ") + "
            fileList.push({
                fieldName: "CriticalHabitat",
                label: "Critical wildlife habitat",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('CG')) {
            string += "var CG = ($feature.CropLand * " + svCG + ");"
            sql += "(CG * " + svCG + ") + "
            fileList.push({
                fieldName: "CropLand",
                label: "Areas with active farming",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('FI')) {
            string += "var FI = ($feature.FoodInsecurity * " + svFI + ");"
            sql += "(FI * " + svFI + ") + "
            fileList.push({
                fieldName: "FoodInsecurity",
                label: "Food Insecurity",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('FM')) {
            string += "var FM = ($feature.FarmMarkets * " + svFM + ");"
            sql += "(FM * " + svFM + ") + "
            fileList.push({
                fieldName: "FarmMarkets",
                label: "Areas within 2 miles of farmers markets",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('GL')) {
            string += "var GL = ($feature.GrazingLand * " + svGL + ");"
            sql += "(GL * " + svGL + ") + "
            fileList.push({
                fieldName: "GrazingLand",
                label: "Areas with active grazing",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('HL')) {
            string += "var HL = ($feature.HabitatLinkages * " + svHL + ");"
            sql += "(HL * " + svHL + ") + "
            fileList.push({
                fieldName: "HabitatLinkages",
                label: "Habitat Linkages",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('LI')) {
            string += "var LI = ($feature.LowIncome * " + svLI + ");"
            sql += "(LI * " + svLI + ") + "
            fileList.push({
                fieldName: "LowIncome",
                label: "Low Income",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('PG')) {
            string += "var PG = ($feature.PBAGrowth * " + svPG + ");"
            sql += "(PG * " + svPG + ") + "
            fileList.push({
                fieldName: "PBAGrowth",
                label: "Plan Bay Area growth geographies",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('PS')) {
            string += "var PS = ($feature.PrimeSoil * " + svPS + ");"
            sql += "(PS * " + svPS + ") + "
            fileList.push({
                fieldName: "PrimeSoil",
                label: "Prime Soils",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('RC')) {
            string += "var RC = ($feature.RangelandConservation * " + svRC + ");"
            sql += "(RC * " + svRC + ") + "
            fileList.push({
                fieldName: "RangelandConservation",
                label: "Rangeland priority conservation areas",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('SOI')) {
            string += "var SOI = ($feature.SOI * " + svSOI + ");"
            sql += "(SOI * " + svSOI + ") + "
            fileList.push({
                fieldName: "SOI",
                label: "Buffer zone: outside city limits and within sphere of influence",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('SC')) {
            string += "var SC = ($feature.SoilCarbon * " + svSC + ");"
            sql += "(SC * " + svSC + ") + "
            fileList.push({
                fieldName: "SoilCarbon",
                label: "Predicted soil carbon stocks",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('SR')) {
            string += "var SR = ($feature.SpeciesRichness * " + svSR + ");"
            sql += "(SR * " + svSR + ") + "
            fileList.push({
                fieldName: "SpeciesRichness",
                label: "Terrestrial native wildlife species richness",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('TC')) {
            string += "var TC = ($feature.TerrestrialClimChange * " + svTC + ");"
            sql += "(TC * " + svTC + ") + "
            fileList.push({
                fieldName: "TerrestrialClimChange",
                label: "Terrestrial Climate Change",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('U2')) {
            string += "var U2 = ($feature.Urban2050 * " + svU2 + ");"
            sql += "(U2 * " + svU2 + ") + "
            fileList.push({
                fieldName: "Urban2050",
                label: "Urban areas 2050",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('UA')) {
            string += "var UA = ($feature.UrbanAg * " + svUA + ");"
            sql += "(UA * " + svUA + ") + "
            fileList.push({
                fieldName: "UrbanAg",
                label: "Known urban ag sites within 2 miles",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('WS')) {
            string += "var WS = ($feature.WaterStorage * " + svWS + ");"
            sql += "(WS * " + svWS + ") + "
            fileList.push({
                fieldName: "WaterStorage",
                label: "Water storage capacity of soil",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('WL')) {
            string += "var WL = ($feature.Wetlands * " + svWL + ");"
            sql += "(WL * " + svWL + ") + "
            fileList.push({
                fieldName: "Wetlands",
                label: "Wetlands",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('WA')) {
            string += "var WA = ($feature.WilliamsonAct * " + svWA + ");"
            sql += "(WA * " + svWA + ") + "
            fileList.push({
                fieldName: "WilliamsonAct",
                label: "Williamson Act",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }

        sql = sql.substring(0, sql.length - 2);

        sql += "as test FROM ?"

        string += "var factors = " + factors + "; var total = Sum(factors); var max1 = " + parcelMax + ";"
        //if (rnd != '') {
        stringRound = string + "return round((total/max1),2);"
        //} else {
        string += "return (total/max1);"
        //}

        //return string;

        return [fileList, string, stringRound, sql]
    }

    function switchSliders(grantArray = [], name = '') {
        $("#sliders > li").hide()

        $('tbody tr').each(function () {
            $(this).hide()
        })

        $.each(grantArray, function (index, sliderName) {
            slider = $("#li" + sliderName).show()
            slider = $("#p" + sliderName).show()
        });
        if (name != '') {
            view2.layerViews.items[0].layer.visible = false
            view2.layerViews.items[1].layer.visible = false
            view2.layerViews.items[2].layer.visible = false
            view2.layerViews.items[3].layer.visible = false
            view2.layerViews.items[4].layer.visible = false
            view2.layerViews.items[5].layer.visible = false

            view2.layerViews.items[name].layer.visible = true
        }


    }

    function createSymbol(color) {
        return {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: color,
            outline: {
                width: 0,
                color: [0, 0, 0, 0.2]
            }
        };
    }

    function pad(n) {
        return (n < 10) ? ("0" + n) : n;
    }

    function sldReset(n) {
        $.each(sliderArr, function (index, sliderName) {
            $("#" + sliderName).val(n);
            $("#" + sliderName + "Val").html(n)
            eval("sv" + sliderName + " = " + n + ";")
            localStorage.setItem('slider' + sliderName, n);
            setRenderer();
        })
    }

    // Assuming you have an array of slider names
    var sliderArr = ['BP', 'BZ', 'CC', 'CP', 'CL', 'CH', 'CG', 'FI', 'FM', 'GL', 'HL', 'LI', 'PG', 'PS', 'RC', 'SOI', 'SC', 'SR', 'TC', 'U2', 'UA', 'WS', 'WL', 'WA']
    $.each(sliderArr, function (index, sliderName) {
        slider = $("#" + sliderName).val(eval('sv' + sliderName))
        $("#" + sliderName + "Val").html(slider[0].value)
        slider.on("mouseup", function () {
            $("#" + sliderName + "Val").html(this.value)
            eval("sv" + sliderName + " = " + this.value + ";")
            localStorage.setItem('slider' + sliderName, this.value);
            setRenderer();
        });
    });

    $(window).on("load", function () {
        $('#data-tab').tab('show');
        $('#loadModal').modal('show');
        $('#loadClose').hide();
        grantArray = ['BP', 'BZ', 'CC', 'CP', 'CL', 'CH', 'CG', 'FI', 'FM', 'GL', 'HL', 'LI', 'PG', 'PS', 'RC', 'SOI', 'SC', 'SR', 'TC', 'U2', 'UA', 'WS', 'WL', 'WA']
        // 
        //grantArray = ['BP','BZ','CC','CP','CL','CH','CG','FM','GL','LI','PG','PS','RC','SOI','SC','SR','TC','U2','UA','WS','WL','WA']
        //switchSliders(grantArray, 4)
        $('#sliders').show();
        //Shapefile upload
        $('#mainWindow').show();
        $('#mainWindow2').show();
        //End shapefile upload

        var tooltipTriggerList = [].slice.call(document.querySelectorAll('.dropdown-tooltip'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        /*setTimeout(function(){
            console.log("Executed after 1 second");
        }, 10000);*/
        //$('#hex-tab').tab('show');
    });

    /*$(document).on("click", function(event){
        alert(event.target.className);
    })*/

    $('esri-layer-list__item-container').on("click", function (event) {
        alert(event.target.className);
    })

    $('#loadClose').on('click', function () {
        $('#hex-tab').tab('show');
        introJs().setOptions({
            steps: [{
                element: document.querySelector('#hex-tab'),
                intro: 'This tab builds a model specified by the user for land planning purposes or for specific land acquisition grants and identifies high and low priority agricultural areas. '
            },
            {
                element: document.querySelector('#data-tab'),
                intro: 'A map that includes all the raw variables used to generate models available in the interactive web map tab. Variables can the turned on and off by pressing the eye icons next to the variable. The transparency of the layer can be adjusted with the slider when the layer is turned on.'
            },
            {
                element: document.querySelector('#docs-tab'),
                intro: 'The tab includes background information about the map use and grants, as well as specific information about each data layer.'
            },
            {
                element: document.querySelector('#feed-tab'),
                intro: "Please leave us feedback if anything isn't working as expected or if you have feedback or suggestions about functionality or data."
            },
            {
                element: document.querySelector('#widget'),
                intro: 'Here you can turn off the places, roads or highway names by clicking on the eye icon. Under the planning units section you can see the legend indicating high and low model priority.'
            },
            {
                element: document.querySelector('.dropdown'),
                intro: 'Using the caret, the user can navigate between different variable sets that were created based on grant RFPs or create their variable set using the "All Layers" tab.'
            },
            {
                element: document.querySelector('#zeroBtn'),
                intro: 'This button will turn off all variables in the set.'
            },
            {
                element: document.querySelector('#defaultBtn'),
                intro: 'This restores all variables in the model set to the default slider value of 1.'
            },
            {
                element: document.querySelector('.scrollbar'),
                intro: 'The relative importance of each variable in a variable set can be changed by the user. A "0" removes the variable from the model.'
            },
            {
                element: document.querySelector('.esri-icon-basemap'),
                intro: 'This button allows the user to change the basemap.'
            },
            {
                element: document.querySelector('.esri-icon-upload'),
                intro: 'This button allows the user to upload their own zipped shapefile. Also available on the Data Alas map. More information on how to upload can be found in the Documentation tab.'
            },
            {
                element: document.querySelector('.esri-icon-home'),
                intro: 'This button resets the map view to see all of Alameda County.'
            },
            {
                element: document.querySelector('#tutorialToggle'),
                intro: 'Relaunches this tutorial.'
            },
            {
                element: document.querySelector('#printToggle'),
                intro: 'Print this page'
            }
            ]
        }).start();
        $('#hex-tab').tab('show');
        switchSliders(grantArray, 4)
    })

    $('#tutorialToggle').on('click', function () {

        introJs().setOptions({
            steps: [{
                element: document.querySelector('#hex-tab'),
                intro: 'This tab builds a model specified by the user for land planning purposes or for specific land acquisition grants and identifies high and low priority agricultural areas. '
            },
            {
                element: document.querySelector('#data-tab'),
                intro: 'A map that includes all the raw variables used to generate models available in the interactive web map tab. Variables can the turned on and off by pressing the eye icons next to the variable. The transparency of the layer can be adjusted with the slider when the layer is turned on.'
            },
            {
                element: document.querySelector('#docs-tab'),
                intro: 'The tab includes background information about the map use and grants, as well as specific information about each data layer.'
            },
            {
                element: document.querySelector('#feed-tab'),
                intro: "Please leave us feedback if anything isn't working as expected or if you have feedback or suggestions about functionality or data."
            },
            {
                element: document.querySelector('#widget'),
                intro: 'Here you can turn off the places, roads or highway names by clicking on the eye icon. Under the planning units section you can see the legend indicating high and low model priority.'
            },
            {
                element: document.querySelector('.dropdown'),
                intro: 'Using the caret, the user can navigate between different variable sets that were created based on grant RFPs or create their variable set using the "All Layers" tab.'
            },
            {
                element: document.querySelector('#zeroBtn'),
                intro: 'This button will turn off all variables in the set.'
            },
            {
                element: document.querySelector('#defaultBtn'),
                intro: 'This restores all variables in the model set to the default slider value of 1.'
            },
            {
                element: document.querySelector('.scrollbar'),
                intro: 'The relative importance of each variable in a variable set can be changed by the user. A "0" removes the variable from the model.'
            },
            {
                element: document.querySelector('.esri-icon-basemap'),
                intro: 'This button allows the user to change the basemap.'
            },
            {
                element: document.querySelector('.esri-icon-upload'),
                intro: 'This button allows the user to upload their own zipped shapefile. Also available on the Data Alas map. More information on how to upload can be found in the Documentation tab.'
            },
            {
                element: document.querySelector('.esri-icon-home'),
                intro: 'This button resets the map view to see all of Alameda County.'
            },
            {
                element: document.querySelector('#tutorialToggle'),
                intro: 'Relaunches this tutorial.'
            },
            {
                element: document.querySelector('#printToggle'),
                intro: 'Print this page'
            }
            ]
        }).start();

        //$('#hex-tab').tab('show');
    })

    $('#zeroBtn').on('click', function () {
        sldReset(0);
    })

    $('#defaultBtn').on('click', function () {
        sldReset(1);
    })

    $('#printToggle').on('click', function () {
        showPrintDialogWithNewExtent()
        setTimeout(function () {window.print()},800)

    })


    $('.dropdown-menu').on('click', 'a', function () {
        var text = $(this).data('grant');
        changeSliders(text, 'dropdown')
    });

    function changeSliders(text, source) {
        //var text = $(this).html();
        //var text = $(this).data('grant');
        if (text != 'Basic Information') {
            var htmlText = '<span class="dropdown-tooltip" data-bs-toggle="tooltip"><i class="fas fa-info-circle me-2"></i><span class="tooltip-text">Use the dropdown to change the sliders used in the mapping application.</span></span>' + text + ' <span class="caret"></span>';
            //}
            //$(this).closest('.dropdown').find('.dropdown-toggle').html(htmlText);
            $('#dropdownTitle').html(text);
            $('#dropdownchoice').html(text);
        }

        /*if (text == 'Basic Information') {
            grantArray = ['CL', 'UA', 'SOI', 'WA', 'CP', 'CC', 'PG'] //['BP','BZ','CC','CP','CL','CH','CG','FM','GL','LI','PG','PS','RC','SOI','SC','SR','TC','U2','UA','WS','WL','WA']
            name = 4
        } else */if (text == 'SALC Acquisition Grants') {
            grantArray = ['FM', 'BZ', 'FI', 'LI', 'PS', 'CG', 'GL', 'WA', 'BP', 'RC', 'SC', 'WS', 'UA', 'SOI', 'CH', 'SR', 'TC', 'PG', 'U2']
            name = 3
        } else if (text == 'NRCS - Agricultural Conservation Easement Program (ACEP)') {
            grantArray = ['BZ', 'CH', 'CL', 'FM', 'GL', 'PS', 'RC', 'SC', 'SR', 'U2']
            name = 0
        } else if (text == 'All Layers') {
            grantArray = ['BP', 'BZ', 'CC', 'CP', 'CL', 'CH', 'CG', 'FI', 'FM', 'GL', 'HL', 'LI', 'PG', 'PS', 'RC', 'SOI', 'SC', 'SR', 'TC', 'U2', 'UA', 'WS', 'WL', 'WA']
            /*} else if (text == 'SALC, Support for infill / risk for conversion') {
                grantArray = ['BZ', 'RC']
            } else if (text == 'SALC, Other Program Goals') {
                grantArray = ['FM', 'SC']*/
            name = 5
        } else if (text == 'Wildlife Conservation Board Grants') {
            grantArray = ['SR', 'CH', 'HL', 'WS', 'WL', 'CG', 'GL']
            name = 2
        } else if (text == 'California Coastal Conservancy') {
            grantArray = ['RC', 'SR', 'HL', 'CH', 'WL', 'CG', 'GL']
            name = 1
        }

        if (source == 'dropdown') {
            switchSliders(grantArray, name)
        } else {
            switchSliders(grantArray)
        }
        setRenderer()
    }

    // Function to show browser's print dialog with updated extent
    function showPrintDialogWithNewExtent() {
        // Define the new extent using xmin, xmax, ymin, ymax coordinates
        savedextent1 = savedExtent
        savedextent2 = savedExtent2
        $("#viewDiv").css("width",$("#viewDiv").height())
        setTimeout(function () {view.goTo(savedextent1)}, 50)
        $("#viewDiv2").css("width",$("#viewDiv2").height())
        setTimeout(function () {view2.goTo(savedextent2)}, 50)
      }

      function closePrintDialogWithNewExtent() {
        // Define the new extent using xmin, xmax, ymin, ymax coordinates
        //savedextent1 = savedExtent
        $("#viewDiv").css("width","100%")
        setTimeout(function () {view.goTo(savedextent1)}, 50)
        $("#viewDiv2").css("width","100%")
        setTimeout(function () {view2.goTo(savedextent2)}, 50)
      }

      // Listen for the beforeprint event to trigger the custom function
      /* window.addEventListener("beforeprint", event => {
        
        showPrintDialogWithNewExtent();
      }); */
      window.addEventListener("afterprint", closePrintDialogWithNewExtent);


    /*$(document).on('change', 'input:radio[id^="grant"]', function (event) {
        if (event.target.id == 'grantSalc'){
            grantArray = ['PP', 'RC', 'SC', 'SQ', 'SR', 'TC', 'U2', 'UC', 'WS', 'WL', 'WA']
        } else if (event.target.id == 'grantOther'){
            grantArray = ['AB', 'BP', 'CC', 'CP', 'CH', 'CG', 'LI', 'PG', 'PP']
        }
        switchSliders(grantArray)
        setRenderer()
    });*/
})
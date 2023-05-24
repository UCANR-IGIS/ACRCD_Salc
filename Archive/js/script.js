$(document).ready(function () {

    /*$('#reportBtn').click(function () {
        aoiCounter = 1
        aoiBool = "&aoi="
        sliderBool = "?sld=" + svAB + "." + +svBP + "." + svBZ + "." + svCC + "." + svCP + "." + svCL + "." + svCH + "." + svCG + "." + svFM + "." + svLI + "." + svPG + "." + svPP + "." + svRC + "." + svSOI + "." + svSC + "." + svAB + "." + svHB + "." + svCN + "." + svRN + "." + svSV

        acreBool = "&acre=" + $("#minSize").val() + "." + $("#maxSize").val()

        topNBool = "&top=" + $("#topN").val()

        studyBool = "&stdy=" + $('input[name="sa"]:checked').attr('id')

        $('input[name="fm"]').each(function () {
            if (aoiCounter == 1) {
                if ($(this).is(":checked")) {
                    aoiBool += $(this).attr('id');
                    aoiCounter += 1;
                }
            } else {
                if ($(this).is(":checked")) {
                    aoiBool += "." + $(this).attr('id');
                }
            }
        })

        urlParams = sliderBool + acreBool + topNBool + studyBool + aoiBool

        url = "./report.html" + urlParams
        var win = window.open(url, '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
    })*/
});

$("#scenDiv").hide();
var svAB = 1,
    svBP = 1,
    svBZ = 1,
    svCC = 1,
    svCP = 1,
    svCL = 1,
    svCH = 1,
    svCG = 1,
    svFM = 1,
    svLI = 1,
    svPG = 1,
    svPP = 1,
    svRC = 1,
    svSOI = 1,
    svSC = 1,
    svSQ = 1,
    svSR = 1,
    svTC = 1,
    svU2 = 1,
    svUA = 1,
    svUC = 1,
    svWS = 1,
    svWL = 1,
    svWA = 1,
    svHB = 1,
    svCN = 1,
    svRN = 1,
    svSV = 1,
    sliderTotal = 24,
    winnerArcade,
    strengthArcade,
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
    view
let db;
require([
    "esri/Map"
    , "esri/Graphic"
    , "esri/views/MapView"
    , "esri/WebMap"
    , "esri/geometry/Extent"
    , "esri/layers/FeatureLayer"
    , "esri/layers/GraphicsLayer"
    , "esri/layers/VectorTileLayer"
    , "esri/layers/TileLayer"
    , "esri/tasks/QueryTask"
    , "esri/tasks/support/Query"
    , "esri/tasks/IdentifyTask"
    , "esri/tasks/support/IdentifyParameters"
    , "esri/widgets/Legend"
    , "esri/widgets/Search"
    , "esri/widgets/LayerList"
    ,"esri/widgets/Home"
    , "esri/layers/Layer"
    , "esri/geometry/SpatialReference"
    , "esri/core/Error"
    , "esri/smartMapping/renderers/color"
    , "dojo/domReady!"
], function (Map, Graphic, MapView, WebMap, Extent, FeatureLayer, GraphicsLayer, VectorTileLayer, TileLayer, QueryTask, Query, IdentifyTask, IdentifyParameters, Legend, Search, LayerList, Home, Layer, SpatialReference, Error, colorRendererCreator) {

    var identifyTask = new IdentifyTask(),
        params = new IdentifyParameters()
    let request = window.indexedDB.open('saveState', 1);
    request.onerror = function () {
        console.log('Database failed to open');
    };
    // onsuccess handler signifies that the database opened successfully
    request.onsuccess = function () {
        console.log('Database opened successfully');
        // Store the opened database object in the db variable. This is used a lot below
        db = request.result;
    };
    // Setup the database tables if this has not already been done
    request.onupgradeneeded = function (e) {
        // Grab a reference to the opened database
        let db = e.target.result;
        // Create an objectStore to store our notes in (basically like a single table)
        // including a auto-incrementing key
        let objectStore = db.createObjectStore('default', {
            keyPath: 'id',
            autoIncrement: true
        });
        // Define what data items the objectStore will contain
        //objectStore.createIndex('variable', 'variable', { unique: false });
        //objectStore.createIndex('value', 'value', { unique: false });
        objectStore.createIndex('scenario', 'scenario', {
            unique: false
        });
        objectStore.createIndex('svAB', 'svAB', {
            unique: false
        });
        objectStore.createIndex('svBP', 'svBP', {
            unique: false
        });
        objectStore.createIndex('svBZ', 'svBZ', {
            unique: false
        });
        objectStore.createIndex('svCC', 'svCC', {
            unique: false
        });
        objectStore.createIndex('svCP', 'svCP', {
            unique: false
        });
        objectStore.createIndex('svCL', 'svCL', {
            unique: false
        });
        objectStore.createIndex('svCH', 'svCH', {
            unique: false
        });
        objectStore.createIndex('svCG', 'svCG', {
            unique: false
        });
        objectStore.createIndex('svFM', 'svFM', {
            unique: false
        });
        objectStore.createIndex('svLI', 'svLI', {
            unique: false
        });
        objectStore.createIndex('svPG', 'svPG', {
            unique: false
        });
        objectStore.createIndex('svPP', 'svPP', {
            unique: false
        });
        objectStore.createIndex('svRC', 'svRC', {
            unique: false
        });
        objectStore.createIndex('svSOI', 'svSOI', {
            unique: false
        });
        objectStore.createIndex('svSC', 'svSC', {
            unique: false
        });
        objectStore.createIndex('svHB', 'svHB', {
            unique: false
        });
        objectStore.createIndex('svCN', 'svCN', {
            unique: false
        });
        objectStore.createIndex('svRN', 'svRN', {
            unique: false
        });
        objectStore.createIndex('svSV', 'svSV', {
            unique: false
        });
        /*objectStore.createIndex('minSize', 'minSize', {
            unique: false
        });
        objectStore.createIndex('maxSize', 'maxSize', {
            unique: false
        });*/
        console.log('Database setup complete');
    };
    //svues();

    $.ajaxSetup({
        async: false
      });

    $.getJSON("https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/ACRCD_Hexagons_Data/FeatureServer/0/query?where=1%3D1&outFields=*&returnExceededLimitFeatures=true&sqlFormat=none&f=pjson", function (data) {
        $.each(data.features, function (i, val) {
            parcelArr.push({
                AB: val.attributes.ABAGPDAS,
                BP: val.attributes.BasinPriority,
                BZ: 0, //val.attributes.BufferZones,
                CC: val.attributes.CCED,
                CP: val.attributes.CPAD,
                CL: 0, //val.attributes.CityLimits,
                CH: val.attributes.CriticalHabitat,
                CG: val.attributes.CropGrazing,
                FM: 0, //val.attributes.FarmMarket,
                HID: val.attributes.GRID_ID,
                LI: val.attributes.LowIncome,
                FID: val.attributes.OBJECTID,
                PG: val.attributes.PBAGrowth,
                PP: val.attributes.ProtectedParkland,
                RC: val.attributes.RangelandConservation,
                SOI: 0, //val.attributes.SOI,
                SA: val.attributes.Shape__Area,
                SL: val.attributes.Shape__Length,
                SC: val.attributes.SoilCarbon,
                SQ: val.attributes.SoilQuality,
                SR: val.attributes.SpeciesRichness,
                TC: val.attributes.TerrestrialClimChange,
                U2: val.attributes.Urban2050,
                UA: 0, //val.attributes.UrbanAg,
                UC: val.attributes.UrbanChange,
                WS: val.attributes.WaterStorage,
                WL: val.attributes.Wetlands,
                WA: val.attributes.WilliamsonAct,
            })
        })
        parcelSlider();
    })
    /*renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-fill",
            color: [255, 255, 255, 0],
            outline: { // autocasts as new SimpleLineSymbol()
                width: 0,
                color: "#464646"
            }
        }, // autocasts as new SimpleFillSymbol()
        /*visualVariables: [
            {
                type: "color",
                valueExpression: "var AB = $feature.ABAGPDAS; var BP = $feature.BasinPriority; var BZ = 0; var CC = $feature.CCED; var CP = $feature.CPAD; var CL = 0; var CH = $feature.CriticalHabitat; var CG = $feature.CropGrazing; var FM = 0; var HID = $feature.GRID_ID; var LI = $feature.LowIncome; var FID = $feature.OBJECTID; var PG = $feature.PBAGrowth; var PP = $feature.ProtectedParkland; var RC = $feature.RangelandConservation; var SOI = 0; var SA = $feature.Shape__Area; var SL = $feature.Shape__Length; var SC = $feature.SoilCarbon; var SQ = $feature.SoilQuality; var SR = $feature.SpeciesRichness; var TC = $feature.TerrestrialClimChange; var U2 = $feature.Urban2050; var UA = 0; var UC = $feature.UrbanChange; var WS = $feature.WaterStorage; var WL = $feature.Wetlands; var WA = $feature.WilliamsonAct;var factors = [AB, BP, BZ, CC, CP, CL, CH, CG, FM, LI, PG, PP, RC, SOI, SC, SQ, SR, TC, U2, UA, UC, WS, WL, WA]; var total = Sum(factors); var max1 = Max(factors); return (total / max1)",// + sliderTotal + ");",
                valueExpressionTitle: "Overall Score",
                stops: [
                    /*{
                        value: 0.1,
                        color: "#eae3d0",
                        label: "0.2"
                    }
                    , {
                        value: 0.2,
                        color: "#BDB89E",
                        label: "0.4"
                    }
                    , {
                        value: 0.4,
                        color: "#908E6D",
                        label: "0.6"
                    }
                    , {
                        value: 0.6,
                        color: "#63643C",
                        label: "0.8"
                    }
                    , {
                        value: 0.8,
                        color: "#373A0B",
                        label: "1.0"
                    }
                    {
                        value: 2.44,
                        color: "#eae3d0",
                        label: "2.44"
                    }
                    , {
                        value: 3.48,
                        color: "#BDB89E",
                        label: "3.48"
                    }
                    , {
                        value: 4.3,
                        color: "#908E6D",
                        label: "4.3"
                    }
                    , {
                        value: 5.19,
                        color: "#63643C",
                        label: "5.19"
                    }
                    , {
                        value: 10,
                        color: "#373A0B",
                        label: "7"
                    }
                ]
            }
            , {
                type: "opacity",
                valueExpression: "var AB = $feature.ABAGPDAS; var BP = $feature.BasinPriority; var BZ = $feature.BufferZones; var CC = $feature.CCED; var CP = $feature.CPAD; var CL = $feature.CityLimits; var CH = $feature.CriticalHabitat; var CG = $feature.CropGrazing; var FM = $feature.FarmMarket; var HID = $feature.GRID_ID; var LI = $feature.LowIncome; var FID = $feature.OBJECTID; var PG = $feature.PBAGrowth; var PP = $feature.ProtectedParkland; var RC = $feature.RangelandConservation; var SOI = $feature.SOI; var SA = $feature.Shape__Area; var SL = $feature.Shape__Length; var SC = $feature.SoilCarbon; var SQ = $feature.SoilQuality; var SR = $feature.SpeciesRichness; var TC = $feature.TerrestrialClimChange; var U2 = $feature.Urban2050; var UA = $feature.UrbanAg; var UC = $feature.UrbanChange; var WS = $feature.WaterStorage; var WL = $feature.Wetlands; var WA = $feature.WilliamsonAct;var factors = When(SA > 0, 0, [AB, BP, BZ, CC, CP, CL, CH, CG, FM, LI, PG, PP, RC, SOI, SC, SQ, SR, TC, U2, UA, UC, WS, WL, WA, SA]); var total = Sum(factors); var max1 = Max(factors); return (total / max1);",// + sliderTotal + ");",
                valueExpressionTitle: "Share of registered voters comprising the dominant party",
                legendOptions: {
                    showLegend: false
                },
                stops: [
                    {
                        value: 0,
                        opacity: 0,
                        label: "< 33%"
                    }
                    , {
                        value: 0.0001,
                        opacity: 1,
                        label: "< 33%"
                    }
                ]
            }
        ]
    };*/

    /*let labelClass = {
        // autocasts as new LabelClass()
        symbol: {
          type: "text", // autocasts as new TextSymbol()
          color: "#eae3d0",
          //backgroundColor: [213, 184, 255, 0.75],
          //borderLineColor: "green",
          //borderLineSize: 1,
          yoffset: -2.5,
          font: {
            // autocast as new Font()
            //amily: "Playfair Display",
            size: 10,
            //weight: "bold"
          }
        },
        labelPlacement: "center-center",
        labelExpressionInfo: {
          expression: strengthArcade2(svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC, svSQ, svSR, svTC, svU2, svUA, svUC, svWS, svWL, svWA, 2)
        },
        maxScale: 0,
        minScale: 85000,
      };*/
    
    Parcels = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/arcgis/rest/services/ACRCD_Hexagons_NoData/FeatureServer",
        layerId: 0,
        blendMode: "multiply",
        title: "Hexagons",
        //labelingInfo: [labelClass]
    });

    /*let arcadeExpressionInfos = [
        // Get Arcade expression returning the predominant demographic in the county:
        // Whether the majority of people are in the labor force or not
        {
          name: "hex_info",
          title: "Overall Weight",
          expression: strengthArcade2(svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC, svSQ, svSR, svTC, svU2, svUA, svUC, svWS, svWL, svWA, 2)
        }
    ]

    var template = {
        // autocasts as new PopupTemplate()
        expressionInfos: arcadeExpressionInfos,
        title: "Hexagon ID: {GRID_ID}, Overall Weight: {expression/hex_info}",
        content: [
            {
                // It is also possible to set the fieldInfos outside of the content
                // directly in the popupTemplate. If no fieldInfos is specifically set
                // in the content, it defaults to whatever may be set within the popupTemplate.
                type: "fields",
                fieldInfos: [
                     {
                        fieldName: "CityLimits",
                        label: "City Limits",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "UrbanAg",
                        label: "Urban Agriculture",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "SOI",
                        label: "Sphere of Infuence",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "BufferZones",
                        label: "Buffer Zones",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "LowIncome",
                        label: "Low Income",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "ABAGPDAS",
                        label: "ABAG PDAS",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "SoilQuality",
                        label: "Soil Quality",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "CropGrazing",
                        label: "Crop Grazing",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "WilliamsonAct",
                        label: "Williamson Act Lands",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "ProtectedParkland",
                        label: "Protected Parkland",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Wetlands",
                        label: "Wetlands",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "WaterStorage",
                        label: "Water Storage",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "CriticalHabitat",
                        label: "Critical Habitat",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }                    , {
                        fieldName: "SoilCarbon",
                        label: "Soil Carbon",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "SpeciesRichness",
                        label: "Species Richness",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "UrbanChange",
                        label: "Urban Change",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "PBAGrowth",
                        label: "PBA Growth",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }                    , {
                        fieldName: "CCED",
                        label: "CCED",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "CPAD",
                        label: "CPAD",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "RangelandConservation",
                        label: "Rangeland Conservation",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "BasinPriority",
                        label: "Basin Priority",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }, {
                        fieldName: "Urban2050",
                        label: "Urban 2050",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "TerrestrialClimChange",
                        label: "Terrestrial Climate Change",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                ]
            }
        ]
    };
    Parcels.popupTemplate = template;*/
    

    StudyArea = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/arcgis/rest/services/AlamedaCounty/FeatureServer/",
        layerId: 1,
        title: "Alameda County",
        listMode: "hide"
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
    
    const allData = new WebMap({
        portalItem: { // autocasts as new PortalItem()
            id: "b80857ac0ba64e978396ff480261c457"
        }
    });
    
    //Parcels.renderer = renderer;

    var startExtent = new Extent(-122.5177, 37.4323, -121.4326, 37.9301,
        new SpatialReference({ wkid:4326 }) );

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
        //layers: [Parcels, ProtArea, ConsEase, StudyArea, Boundaries]
        layers: [Parcels, StudyArea]
    });

    // Creates a layer from a Portal layer item id
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

    view = new MapView({
        container: "viewDiv",
        map: map,
        //center: [-121.624697, 37.626261],
        extent: startExtent,
        constraints: {
            snapToZoom: false
        }
        //zoom: 11
    });

    const homeBtn = new Home({
        view: view
      });

    view2 = new MapView({
        container: "viewDiv2",
        map: allData,
        extent: startExtent,
        constraints: {
            snapToZoom: false
        }
        //center: [-121.624697, 37.626261],
        //zoom: 11
    });

    /*view3 = new MapView({
        container: "viewDiv3",
        map: map,
        popup: {
            dockEnabled: true,
            dockOptions: {
                // Disables the dock button from the popup
                buttonEnabled: false,
                breakpoint: false,
                position: "top-right"
            }
        },
        extent: startExtent
        //center: [-121.624697, 37.626261],
        //zoom: 11
    });

    view4 = new MapView({
        container: "viewDiv4",
        map: map,
        popup: {
            dockEnabled: true,
            dockOptions: {
                // Disables the dock button from the popup
                buttonEnabled: false,
                breakpoint: false,
                position: "top-left"
            }
        },
        extent: startExtent
        //center: [-121.624697, 37.626261],
        //zoom: 11
    });*/

    /*view3.popup.watch("selectedFeature", function (graphic) {
        if (graphic) {
            view3.goTo(graphic)
        }
    });

    view4.popup.watch("selectedFeature", function (graphic) {
        if (graphic) {
            view4.goTo(graphic)
        }
    });*/


    /*var searchWidget = new Search({
        view: view,
        allPlaceholder: "Search Address or APN (xxx-xxx-xxx)",
        sources: [
            {
                layer: Parcels,
                searchFields: ["APN"],
                displayField: "APN",
                exactMatch: false,
                outFields: ["APN"],
                name: "Parcels",
                placeholder: "example: 139-100-014"
            }
        ]
    });

    var searchWidget2 = new Search({
        view: view3,
        allPlaceholder: "Search Address or APN (xxx-xxx-xxx)",
        sources: [
            {
                layer: Parcels,
                searchFields: ["APN"],
                displayField: "APN",
                exactMatch: false,
                outFields: ["APN"],
                name: "Parcels",
                placeholder: "example: 139-100-014"
            }
        ]
    });

    var searchWidget3 = new Search({
        view: view4,
        allPlaceholder: "Search Address or APN (xxx-xxx-xxx)",
        sources: [
            {
                layer: Parcels,
                searchFields: ["APN"],
                displayField: "APN",
                exactMatch: false,
                outFields: ["APN"],
                name: "Parcels",
                placeholder: "example: 139-100-014"
            }
        ]
    });*/


    view.when(function () {
        var layerList = new LayerList({
            view: view,
            container: "widget",
        });
        var legend = new Legend({
            view: view,
            container: "widget",
        });
        view.ui.add(homeBtn, "top-left");
        //view.ui.add(legend, "top-right");
        //view.ui.add(layerList, "top-right");
        /*view.ui.add(searchWidget, {
            position: "top-left",
            index: 0
        });*/
        setRenderer()
    });

    view2.when(function () {
        var layerList = new LayerList({
            view: view2
        });

        view2.ui.add(layerList, "top-right");
    });



    /*view3.when(function () {
        view3.ui.add(searchWidget2, {
            position: "top-left",
            index: 0
        });
    });

    view4.when(function () {
        view4.ui.add(searchWidget3, {
            position: "top-right",
            index: 0
        });
    });*/

    /*function rank(array, att) {
        var parcelCheck = 0;
        var rankCheck = 0;
        $.each(map.layers.items, function (key, val) {
            console.log(val.title)
            if (val.title == "Parcel Ranks") {
                parcelCheck = 1;

            }
            if (val.title.match(/Top/g)) {
                rankCheck = 1;

            }
        })

        if (parcelCheck == 1) {
            map.remove(parcelRank);
        }
        if (rankCheck == 1) {
            map.remove(rankLayer);
        }

        queryString = "";
        var arrCount = 1;
        array.sort(function (a, b) {
            return b[att] - a[att];
        })
        var rank = 1;
        var n = 1;
        for (var i = 0; i < array.length; i++) {
            if (i > 0 && array[i][att] < array[i - 1][att] && n == 1) {
                rank++;
            } else if (i > 0 && array[i][att] == array[i - 1][att]) {
                n++;
            } else if (i > 0 && array[i][att] < array[i - 1][att] && n > 1) {
                rank += n;
                n = 1;
            }
            array[i].rank = rank;
        }

        topTen = array.slice(0, $('#topN').val());

        for (var i = 0; i < topTen.length; i++) {
            if (arrCount == 1) {
                queryString += "APN = '" + topTen[i].APN + "'";
                arrCount += 1;
            } else {
                queryString += " OR APN = '" + topTen[i].APN + "'";
            }

        }

        // added
        ckb = true
        if (ckb) {
            //queryParcelRanks();
        } else {
            //queryTopTen();
        }
    }

    function queryParcelRanks() {
        parcelQuery = Parcels.createQuery();
        parcelQuery.where = "1=1";
        parcelQuery.outFields = ["*"];
        parcelQuery.returnGeometry = true;

        Parcels.queryFeatures(parcelQuery)
            .then(function (response) {
            featureArr2 = []
            features = response.features;
            $.each(features, function (key, val) {
                $.each(parcelSQL, function (i, v) {
                    if (v.APN == val.attributes.APN) {
                        val.attributes.rank = v.rank
                    }
                })
                //alert(val)

                featureArr2.push({
                    geometry: val.geometry,
                    attributes: val.attributes
                })

                rankTotal = featureArr2.length
            })
            var classBreak = rankTotal / 6
            var rankRenderer = {
                type: "simple", // autocasts as new SimpleRenderer()
                symbol: {
                    type: "simple-fill",
                    color: [255, 255, 255, 0],
                    outline: { // autocasts as new SimpleLineSymbol()
                        width: 0.5,
                        color: "#2a2d0d"
                    }
                }, // autocasts as new SimpleFillSymbol()
                visualVariables: [
                    {
                        type: "color",
                        field: "rank",
                        stops: [
                            {
                                value: rankTotal - (5.5 * classBreak),
                                color: "#373A0B",
                                label: rankTotal - (5.5 * classBreak)
                            }
                            , {
                                value: rankTotal - (4 * classBreak),
                                color: "#63643C",
                                label: rankTotal - (4 * classBreak)
                            }
                            , {
                                value: rankTotal - (3 * classBreak),
                                color: "#908E6D",
                                label: rankTotal - (3 * classBreak)
                            }
                            , {
                                value: rankTotal - (2 * classBreak),
                                color: "#BDB89E",
                                label: rankTotal - (2 * classBreak)
                            }
                            , {
                                value: rankTotal - classBreak,
                                color: "#eae3d0",
                                label: rankTotal - classBreak
                            }
                        ]
                    }
                ]
            };

            parcelRank = new FeatureLayer({
                source: featureArr2, // autocast as a Collection of new Graphic()
                objectIdField: "ObjectID",
                fields: [{
                    name: "ObjectID",
                    alias: "ObjectID",
                    type: "oid"
                }, {
                    name: "rank",
                    alias: "rank",
                    type: "integer"
                }],
                title: "Parcel Ranks",
                blendMode: "multiply"

            })
            var colorParams = {
                        layer: parcelRank,
                        view: view,
                        field: "rank",
                        theme: "above-and-below",
                        colorScheme: {
                            id: "above-and-below/gray/div-blue-red",
                            colors: ["#373A0B","#63643C","#908E6D","#BDB89E","#eae3d0"],
                            noDataColor: [0,0,0],
                            colorsForClassBreaks: [
                                {
                                    colors: ["#373A0B","#63643C","#908E6D","#BDB89E","#eae3d0"],
                                    numClasses: 5
                                }
                            ],
                            outline: {
                                color: {r: 153, g: 153, b: 153, a: 0.25},
                                width: "0.5px"
                            },
                            opacity: 0.8
                        }
                    };

                    // when the promise resolves, apply the renderer to the layer
                    colorRendererCreator.createContinuousRenderer(colorParams)
                        .then(function(response){
                        parcelRank.renderer = response.renderer;
                    });
            parcelRank.renderer = rankRenderer
            map.add(parcelRank)
            //queryTopTen();
        })
    }

    function queryTopTen() {
        topTenQuery = Parcels.createQuery();
        topTenQuery.where = queryString;
        topTenQuery.outFields = ["*"];
        topTenQuery.returnGeometry = true;

        Parcels.queryFeatures(topTenQuery)
            .then(function (response) {
            featureArr = []
            features = response.features;
            $.each(features, function (key, val) {
                $.each(topTen, function (i, v) {
                    if (v.APN == val.attributes.APN) {
                        val.attributes.rank = v.rank
                    }
                })
                //alert(val)

                featureArr.push({
                    geometry: val.geometry,
                    attributes: val.attributes
                })
            })


            const labelClass = {
                // autocasts as new LabelClass()
                symbol: {
                    type: "text", // autocasts as new TextSymbol()
                    color: "black",
                    haloColor: "white",
                    haloSize: "1px",
                    font: { // autocast as new Font()
                        family: "Arial",
                        size: 12,
                        weight: "bold"
                    }
                },
                labelPlacement: "above-center",
                labelExpressionInfo: {
                    expression: "$feature.rank"
                }
            }

            var rankFound = 0;
            var rankRenderer = {
                type: "simple", // autocasts as new SimpleRenderer()
                symbol: {
                    type: "simple-fill",
                    style: "none",
                    outline: { // autocasts as new SimpleLineSymbol()
                        width: 1.5,
                        color: "#EF8A1E"
                    }
                }
            }


            rankLayer = new FeatureLayer({
                source: featureArr, // autocast as a Collection of new Graphic()
                objectIdField: "ObjectID",
                fields: [{
                    name: "ObjectID",
                    alias: "ObjectID",
                    type: "oid"
                }, {
                    name: "rank",
                    alias: "rank",
                    type: "integer"
                }],
                title: "Top " + $('#topN').val() + " Parcels",
                labelingInfo: [labelClass]

            })

            rankLayer.renderer = rankRenderer
            map.add(rankLayer)
            if (parcelDE != "") {
                if (rankLayer.source.items.length > 0) {
                    rankLayer.queryExtent().then(function (response) {
                        // go to the extent of all the graphics in the layer view
                        view.goTo(response.extent);
                    });
                }
            } else {
                view.extent = startExtent
                //view.center = [-121.624697, 37.626261]
                //view.zoom = 11
            }
        });
    }*/


    function parcelSlider() {
        $("#loadBody").empty();
        $("#loadBody").append("Data ready");
        $("#loadClose").show();
        //parcelSQL = alasql('SELECT SA_80_20, APN, Acres, (((WL * ' + svBP + ') * ' + svHB + ') + ((BA * ' + svAB + ') * ' + svHB + ') + ((TS * ' + svBZ + ') * ' + svHB + ') + ((RF * ' + svCC + ') * ' + svHB + ') +  ((WS * ' + svCP + ') * ' + svHB + ') + ((DS * ' + svCL + ') * ' + svHB + ') + ((FS * ' + svCH + ') * ' + svHB + ') + ((CL * ' + svCG + ') * ' + svCN + ') + ((IC * ' + svFM + ') * ' + svCN + ') + ((DC * ' + svLI + ') * ' + svCN + ') + ((CC * ' + svPG + ') * ' + svCN + ') + ((PL * ' + svPP + ') * ' + svRN + ') + ((VS * ' + svRC + ') * ' + svSV + ') + ((VB * ' + svSOI + ') * ' + svSV + ') + ((VL * ' + svSC + ') * ' + svSV + '))/ ' + sliderTotal + ' as Score FROM ? WHERE Acres > ' + $("#minSize").val() + ' AND Acres < ' + $("#maxSize").val() + ' AND PA < 0.9', [parcelArr])
        //parcelSQL = alasql("SELECT *, (((AB * " + svAB + ") * " + svHB + ") + ((BP * " + svBP + ") * " + svHB + ") + ((BZ * " + svBZ + ") * " + svHB + ") + ((CC * " + svCC + ") * " + svHB + ") + ((CP * " + svCP + ") * " + svHB + ") + ((CL * " + svCL + ") * " + svHB + ") + ((CH * " + svCH + ") * " + svHB + ") + ((CG * " + svCG + ") * " + svCN + ") + ((FM * " + svFM + ") * " + svCN + ") + ((LI * " + svLI + ") * " + svCN + ") + ((PG * " + svPG + ") * " + svCN + ") + ((PP * " + svPP + ") * " + svRN + ") + ((RC * " + svRC + ") * " + svSV + ") + ((SOI * " + svSOI + ") * " + svSV + ") + ((SC * " + svSC + ") * " + svSV + ") + ((SQ * " + svSQ + ") * " + svSV + ") + ((SR * " + svSR + ") * " + svSV + ") + ((TC * " + svTC + ") * " + svSV + ") + ((U2 * " + svU2 + ") * " + svSV + ") + ((UA * " + svUA + ") * " + svSV + ") + ((UC * " + svUC + ") * " + svSV + ") + ((WS * " + svWS + ") * " + svSV + ") + ((WL * " + svWL + ") * " + svSV + ") + ((WA * " + svWA + ") * " + svSV + " as Score FROM ?", [parcelArr])
        parcelSQL = alasql("SELECT 1 as grp, ((AB * " + svAB + ") * " + svHB + ") + ((BP * " + svBP + ") * " + svHB + ") + ((BZ * " + svBZ + ") * " + svHB + ") + ((CC * " + svCC + ") * " + svHB + ") + ((CP * " + svCP + ") * " + svHB + ") + ((CL * " + svCL + ") * " + svHB + ") + ((CH * " + svCH + ") * " + svHB + ") + ((CG * " + svCG + ") * " + svCN + ") + ((FM * " + svFM + ") * " + svCN + ") + ((LI * " + svLI + ") * " + svCN + ") + ((PG * " + svPG + ") * " + svCN + ") + ((PP * " + svPP + ") * " + svRN + ") + ((RC * " + svRC + ") * " + svSV + ") + ((SOI * " + svSOI + ") * " + svSV + ") + ((SC * " + svSC + ") * " + svSV + ") + ((SQ * " + svSQ + ") * " + svSV + ") + ((SR * " + svSR + ") * " + svSV + ") + ((TC * " + svTC + ") * " + svSV + ") + ((U2 * " + svU2 + ") * " + svSV + ") + ((UA * " + svUA + ") * " + svSV + ") + ((UC * " + svUC + ") * " + svSV + ") + ((WS * " + svWS + ") * " + svSV + ") + ((WL * " + svWL + ") * " + svSV + ") + ((WA * " + svWA + ") * " + svSV + ") as test FROM ?", [parcelArr])
        parselMax1 = alasql("SELECT grp, MAX(test) as maxVal from ? GROUP BY grp", [parcelSQL])
        parcelMax = parselMax1[0].maxVal

        /*parcelMax = Math.max.apply(null, parcelSQL.map(function (o) {
            return o.Score;
        }))
        parcelMin = Math.min.apply(null, parcelSQL.map(function (o) {
            return o.Score;
        }))
        rank(parcelSQL, "Score")*/
    }

    function popDropdown() {
        $("#scenarios").empty();
        results = db.transaction('default').objectStore('default').getAll();
        results.onsuccess = function () {
            if (results.result.length > 0) {
                $.each(results.result, function () {
                    var appendText = "<li class='main_flex'><nav>" + this.scenario + "</nav><article><i data-id='" + this.scenario + "' class='fa fa-upload'></i></article><aside><i data-id='" + this.id + "' class='fa fa-trash-alt' data-toggle='modal' data-target='#deleteModal'></i></aside></li>"
                    $("#scenarios").append(appendText);
                });
                $("#scenDiv").show();
            }
        }
    }
    // Define the addData() function
    function addData() {
        // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
        let newItem = {
            scenario: $("#scenarioName").val(),
            svAB: svAB,
            svBP: svBP,
            svBZ: svBZ,
            svCC: svCC,
            svCP: svCP,
            svCL: svCL,
            svCH: svCH,
            svCG: svCG,
            svFM: svFM,
            svLI: svLI,
            svPG: svPG,
            svPP: svPP,
            svRC: svRC,
            svSOI: svSOI,
            svSC: svSC,
            svSQ: svSQ,
            svSR: svSR,
            svTC: svTC,
            svU2: svU2,
            svUA: svUA,
            svUC: svUC,
            svWS: svWS,
            svWL: svWL,
            svWA: svWA,
            svHB: svHB,
            svCN: svCN,
            svRN: svRN,
            svSV: svSV,
            /*minSize: $("#minSize").val(),
            maxSize: $("#maxSize").val()*/
        };
        // open a read/write db transaction, ready for adding the data
        let transaction = db.transaction(['default'], 'readwrite');
        // call an object store that's already been added to the database
        let objectStore = transaction.objectStore('default');
        // Make a request to add our newItem object to the object store
        let request = objectStore.add(newItem);
        // Report on the success of the transaction completing, when everything is done
        transaction.oncomplete = function () {
            console.log('Transaction completed: database modification finished.');
            transaction.onerror = function () {
                console.log('Transaction not opened due to error');
            };
        }
        popDropdown();
    }

    function deleteData() {
        let transaction = db.transaction(['default'], 'readwrite');
        let objectStore = transaction.objectStore('default');
        let objectStoreRequest = objectStore.delete(parseInt(deleteVal));
        transaction.oncomplete = function () {
            console.log('Item Deleted');
        }
        popDropdown();
    }

    function createPopup(grantArray) {
        fileList = []

        if (grantArray.includes('AB')) {
            fileList.push({
                    fieldName: "ABAGPDAS",
                    label: "ABAG PDAS",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('BP')) {
            fileList.push({
                    fieldName: "BasinPriority",
                    label: "Basin Priority",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('BZ')) {
            fileList.push({
                    fieldName: "BufferZones",
                    label: "Buffer Zones",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('CC')) {
            fileList.push({
                    fieldName: "CCED",
                    label: "CCED",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('CL')) {
            fileList.push({
                fieldName: "CityLimits",
                label: "City Limits",
                format: {
                    places: 2,
                    digitSeparator: true
                }
                })
        }
        if (grantArray.includes('CP')) {
            fileList.push({
                    fieldName: "CPAD",
                    label: "CPAD",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('CG')) {
            fileList.push({
                    fieldName: "CropGrazing",
                    label: "Crop Grazing",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('CH')) {
            fileList.push({
                    fieldName: "CriticalHabitat",
                    label: "Critical Habitat",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('LI')) {
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
            fileList.push({
                    fieldName: "PBAGrowth",
                    label: "PBA Growth",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('PP')) {
            fileList.push({
                    fieldName: "ProtectedParkland",
                    label: "Protected Parkland",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('RC')) {
            fileList.push({
                    fieldName: "RangelandConservation",
                    label: "Rangeland Conservation",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('SC')) {
            fileList.push({
                    fieldName: "SoilCarbon",
                    label: "Soil Carbon",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('SQ')) {
            fileList.push({
                    fieldName: "SoilQuality",
                    label: "Soil Quality",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('SOI')) {
            fileList.push({
                fieldName: "SOI",
                label: "Sphere of Infuence",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('SR')) {
            fileList.push({
                    fieldName: "SpeciesRichness",
                    label: "Species Richness",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('TC')) {
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
            fileList.push({
                    fieldName: "Urban2050",
                    label: "Urban 2050",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('UC')) {
            fileList.push({
                    fieldName: "UrbanChange",
                    label: "Urban Change",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('WL')) {
            fileList.push({
                    fieldName: "Wetlands",
                    label: "Wetlands",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('WS')) {
            fileList.push({
                    fieldName: "WaterStorage",
                    label: "Water Storage",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }
        if (grantArray.includes('WA')) {
            fileList.push({
                    fieldName: "WilliamsonAct",
                    label: "Williamson Act Lands",
                    format: {
                        places: 2,
                        digitSeparator: true
                    }
                })
        }

        return fileList
    }

    function setRenderer() {
        parcelSlider();

        //grantArray = ['HB', 'CN', 'RN', 'SV', 'AB', 'BP', 'BZ', 'CC', 'CP', 'CL', 'CH', 'CG', 'FM', 'LI', 'PG', 'PP', 'RC', 'SOI', 'SC', 'SQ', 'SR', 'TC', 'U2', 'UA', 'UC', 'WS', 'WL', 'WA']

        let arcadeExpressionInfos = [
            // Get Arcade expression returning the predominant demographic in the county:
            // Whether the majority of people are in the labor force or not
            {
              name: "hex_info",
              title: "Overall Weight",
              expression: strengthArcade2(svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC, svSQ, svSR, svTC, svU2, svUA, svUC, svWS, svWL, svWA, 2)
            }
        ]
    
        var template = {
            // autocasts as new PopupTemplate()
            expressionInfos: arcadeExpressionInfos,
            title: "Hexagon ID: {GRID_ID}, Overall Weight: {expression/hex_info}",
            content: [
                {
                    // It is also possible to set the fieldInfos outside of the content
                    // directly in the popupTemplate. If no fieldInfos is specifically set
                    // in the content, it defaults to whatever may be set within the popupTemplate.
                    type: "fields",
                    fieldInfos: createPopup(grantArray) /*[
                         {
                            fieldName: "CityLimits",
                            label: "City Limits",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "UrbanAg",
                            label: "Urban Agriculture",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "SOI",
                            label: "Sphere of Infuence",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "BufferZones",
                            label: "Buffer Zones",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "LowIncome",
                            label: "Low Income",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "ABAGPDAS",
                            label: "ABAG PDAS",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "SoilQuality",
                            label: "Soil Quality",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "CropGrazing",
                            label: "Crop Grazing",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "WilliamsonAct",
                            label: "Williamson Act Lands",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "ProtectedParkland",
                            label: "Protected Parkland",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "Wetlands",
                            label: "Wetlands",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "WaterStorage",
                            label: "Water Storage",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "CriticalHabitat",
                            label: "Critical Habitat",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }                    , {
                            fieldName: "SoilCarbon",
                            label: "Soil Carbon",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "SpeciesRichness",
                            label: "Species Richness",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "UrbanChange",
                            label: "Urban Change",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "PBAGrowth",
                            label: "PBA Growth",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }                    , {
                            fieldName: "CCED",
                            label: "CCED",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "CPAD",
                            label: "CPAD",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "RangelandConservation",
                            label: "Rangeland Conservation",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "BasinPriority",
                            label: "Basin Priority",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }, {
                            fieldName: "Urban2050",
                            label: "Urban 2050",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                        , {
                            fieldName: "TerrestrialClimChange",
                            label: "Terrestrial Climate Change",
                            format: {
                                places: 2,
                                digitSeparator: true
                            }
                        }
                    ]*/
                }
            ]
        };

        Parcels.popupTemplate = template;

        let labelClass = {
            // autocasts as new LabelClass()
            symbol: {
              type: "text", // autocasts as new TextSymbol()
              color: "#eae3d0",
              //backgroundColor: [213, 184, 255, 0.75],
              //borderLineColor: "green",
              //borderLineSize: 1,
              yoffset: -2.5,
              font: {
                // autocast as new Font()
                //amily: "Playfair Display",
                size: 10,
                //weight: "bold"
              }
            },
            labelPlacement: "center-center",
            labelExpressionInfo: {
              expression: strengthArcade2(svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC, svSQ, svSR, svTC, svU2, svUA, svUC, svWS, svWL, svWA, 2)
            },
            maxScale: 0,
            minScale: 85000,
          };

        var renderer2 = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-fill",
                color: [255, 255, 255, 0],
                outline: { // autocasts as new SimpleLineSymbol()
                    width: 0.01,
                    color: "#eae3d0"
                }
            }, // autocasts as new SimpleFillSymbol()
            visualVariables: [
                {
                    type: "color",
                    valueExpression: strengthArcade2(svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC, svSQ, svSR, svTC, svU2, svUA, svUC, svWS, svWL, svWA),
                    valueExpressionTitle: "Overall Score",
                    stops: [
                        {
                            value: 0.2,
                            color: "#eae3d0",
                            label: "< 0.2"
                        }
                        , {
                            value: 0.4,
                            color: "#BDB89E",
                            label: "0.4"
                        }
                        , {
                            value: 0.6,
                            color: "#908E6D",
                            label: "0.6"
                        }
                        , {
                            value: 0.8,
                            color: "#63643C",
                            label: "> 0.8"
                        }
                        /*{
                            value: 2.44,
                            color: "#eae3d0",
                            label: "2.44"
                        }
                        , {
                            value: 3.48,
                            color: "#BDB89E",
                            label: "3.48"
                        }
                        , {
                            value: 4.3,
                            color: "#908E6D",
                            label: "4.3"
                        }
                        , {
                            value: 5.19,
                            color: "#63643C",
                            label: "5.19"
                        }
                        , {
                            value: 10,
                            color: "#373A0B",
                            label: "7"
                        }*/
                    ]
                }
                /*, {
                    type: "opacity",
                    valueExpression: strengthArcade2(svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC, svSQ, svSR, svTC, svU2, svUA, svUC, svWS, svWL, svWA),
                    valueExpressionTitle: "Share of registered voters comprising the dominant party",
                    legendOptions: {
                        showLegend: false
                    },
                    stops: [
                        {
                            value: 0,
                            opacity: 0,
                            label: "< 33%"
                        }
                        , {
                            value: 0.0001,
                            opacity: 1,
                            label: "< 33%"
                        }
                    ]
                }*/
            ]
        };
        Parcels.renderer = renderer2;
        Parcels.labelingInfo = [labelClass]
    }

    /*function winnerArcade2(svD, svR, svI, svE, svB, svA, svC, svF, svG, svH, svJ, svK, svL, svM, svN) {
        var string = "var WL = ($feature.Wetland * " + svR + ") * " + svHB + ";\n      var BA = ($feature.Bird_Areas * " + svD + ") * " + svHB + ";\n      var TS = ($feature.Tiger_Salamander * " + svI + ") * " + svHB + ";\n   var RF = ($feature.Red_Legged_Frog * " + svE + ") * " + svHB + ";\n   var WS = ($feature.Whipsnake * " + svB + ") * " + svHB + ";\n var DS = ($feature.Delta_Smelt * " + svA + ") * " + svHB + ";\n var FS = ($feature.Longhorn_Fairy_Shrimp * " + svC + ") * " + svHB + ";\n var CL = ($feature.Critical_Link * " + svF + ") * " + svCN + "; var IC = ($feature.Intensified_Connectivity * " + svG + ") * " + svCN + "; var DC = ($feature.Diffuse_Connectivity * " + svH + ") * " + svCN + "; var CC = ($feature.Channelized_Connectivity * " + svJ + ") * " + svCN + "; var PL = ($feature.Recreation_Value * " + svK + ") * " + svRN + "; var VS = ($feature.Viewshed_All_Roads * " + svL + ") * " + svSV + "; var VB = ($feature.Visibility_Max * " + svM + ") * " + svSV + "; var VL = ($feature.Visibility_Min * " + svN + ") * " + svSV + ";  var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When(" + sizeText + "pa > 0.9, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS, VB, VL]); return Decode( Max(factors), WL, 'WL', BA, 'BA', TS, 'TS', RF, 'RF', WS, 'WS', DS, 'DS', FS, 'FS', CL, 'CL', IC, 'IC', DC, 'DC', CC, 'CC', PL, 'PL', VS, 'VS', VB, 'VB', VL, 'VL', 'n/a' );"
        return string;
    }*/

    function strengthArcade2(svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC, svSQ, svSR, svTC, svU2, svUA, svUC, svWS, svWL, svWA, rnd="") {
        var string = "var AB = ($feature.ABAGPDAS * " + svAB + ") * " + svHB + "; var BP = ($feature.BasinPriority * " + svBP + ") * " + svHB
        + "; var BZ = 0; var CC = ($feature.CCED * " + svCC + ") * " + svHB + "; var CP = ($feature.CPAD * " + svCP + ") * " + svHB 
        + "; var CL = 0; var CH = ($feature.CriticalHabitat * " + svCH + ") * " + svHB + "; var CG = ($feature.CropGrazing * " + svCG + ") * " + svCN
        + "; var FM = 0; var HID = ($feature.GRID_ID); var LI = ($feature.LowIncome * " + svLI + ") * " + svCN 
        + "; var FID = ($feature.OBJECTID); var PG = ($feature.PBAGrowth * " + svPG + ") * " + svCN + "; var PP = ($feature.ProtectedParkland * " + svPP 
        + ") * " + svRN + "; var RC = ($feature.RangelandConservation * " + svRC + ") * " + svSV 
        + "; var SOI = 0; var SA = ($feature.Shape__Area); var SL = ($feature.Shape__Length); var SC = ($feature.SoilCarbon * " + svSC + ") * " + svSV 
        + "; var SQ = ($feature.SoilQuality * " + svSQ + ") * " + svSV + ";var SR = ($feature.SpeciesRichness * " + svSR + ") * " + svSV 
        + "; var TC = ($feature.TerrestrialClimChange * " + svTC + ") * " + svSV + "; var U2 = ($feature.Urban2050 * " + svU2 + ") * " + svSV 
        + "; var UA = 0; var UC = ($feature.UrbanChange * " + svUC + ") * " + svSV + "; var WS = ($feature.WaterStorage * " + svWS + ") * " + svSV 
        + "; var WL = ($feature.Wetlands * " + svWL + ") * " + svSV + "; var WA = ($feature.WilliamsonAct * " + svWA + ") * " + svSV 
        + "; var factors = [AB, BP, BZ, CC, CP, CL, CH, CG, FM, LI, PG, PP, RC, SOI, SC, SQ, SR, TC, U2, UA, UC, WS, WL, WA]; var total = Sum(factors); var max1 = " + parcelMax + ";"
        if (rnd != '') {
            string += "return round((total/max1),2);"
        } else {
            string += "return (total/max1);"
        }

        return string;
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

    /*function exportCSV() {

        if (parcelDE != "" || studyDE != "") {
            var csv = JSON2CSV(JSON.stringify(parcelAOI));
        } else {
            var csv = JSON2CSV(JSON.stringify(parcelSQL));
        }
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        newdate = year + "/" + month + "/" + day;

        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);

        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, "ranked_parcels_" + newdate + ".csv")
        } else {
            var url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = "ranked_parcels_" + newdate + ".csv";

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }

    function JSON2CSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

        var str = '';
        var line = '';

        var head = array[0];
        for (var index in array[0]) {
            var value = index + "";
            line += '"' + value.replace(/"/g, '""') + '",';
        }

        line = line.slice(0, -1);
        str += line + '\r\n';

        for (var i = 0; i < array.length; i++) {
            var line = '';

            for (var index in array[i]) {
                var value = array[i][index] + "";
                if ([index] == "time") {
                    value = convertTime(parseInt(value));
                }
                line += '"' + value.replace(/"/g, '""') + '",';
            }

            line = line.slice(0, -1);
            str += line + '\r\n';
        }
        return str;

    }

    function convertTime(timestamp) {
        var date = new Date(timestamp);
        var offsetms = date.getTimezoneOffset();
        var datelocal = new Date(date - offsetms),
            datestring =
            (datelocal.getMonth() + 1) + "/" +
            (datelocal.getDate()) + "/" +
            (datelocal.getFullYear()) + " " +
            (datelocal.getHours()) + ":" +
            (datelocal.getMinutes()) + ":" +
            pad((datelocal.getSeconds()));
        return datestring
    }*/

    function pad(n) {
        return (n < 10) ? ("0" + n) : n;
    }
    
    // Assuming you have an array of slider names
    var sliderArr = ['HB', 'CN', 'RN', 'SV', 'AB', 'BP', 'BZ', 'CC', 'CP', 'CL', 'CH', 'CG', 'FM', 'LI', 'PG', 'PP', 'RC', 'SOI', 'SC', 'SQ', 'SR', 'TC', 'U2', 'UA', 'UC', 'WS', 'WL', 'WA']
    $.each(sliderArr, function(index, sliderName) {
        slider = $("#" + sliderName).val(eval('sv'+ sliderName))
        $("#" + sliderName + "Val").html(slider[0].value)
        slider.on("mouseup", function() {
            $("#" + sliderName + "Val").html(this.value)
            eval("sv" + sliderName + " = " + this.value + ";")
            localStorage.setItem('slider' + sliderName, this.value);
            //svues();
            setRenderer();
        });
    });

    /*function svues() {
        var sliderArr = [svHB,svCN,svRN,svSV,svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC, svSQ, svSR, svTC, svU2, svUA, svUC, svWS, svWL, svWA];
        sliderTotal = 0;

        var habTotal = 0;
        if (svHB != 0) {
            habTotal = (parseInt(svAB) + parseInt(svBP) + parseInt(svBZ) + parseInt(svCC) + parseInt(svCP) + parseInt(svCL) + parseInt(svCH)) * parseInt(svHB);
        }
        var conTotal = 0;
        if (svCN != 0) {
            conTotal = (parseInt(svCG) + parseInt(svFM) + parseInt(svLI) + parseInt(svPG)) * parseInt(svCN);
        }
        var recTotal = 0;
        if (svRN != 0) {
            recTotal = parseInt(svPP) * parseInt(svRN);
        }
        var viewTotal = 0;
        if (svSV != 0) {
            viewTotal = (parseInt(svRC) + parseInt(svSOI) + parseInt(svSC)) * parseInt(svSV);
        }
        sliderTotal = habTotal + conTotal + recTotal + viewTotal;
    }*/

    $('#loadClose').click(function () {
        popDropdown();
        //setRenderer();
    })
    $('#saveState').click(function () {
        addData();
    })
    $('#CSVBtn').click(function () {
        exportCSV();
    })
    $('li').on("click", "i.fa.fa-trash-alt", function (event) {
        deleteVal = $(this).data("id");
        $('#deleteModal').modal('show');
    })
    $('a').on("click", "i.fa.fa-save", function (event) {
        $('#saveModal').modal('show');
    })
    /*$('a').on("click", "i.fas.fa-file-export", function (event) {
        $('#exportModal').modal('show');
    })*/

    $('#saveBtn').on("click", function (event) {
        $('#saveModal').modal('show');
    })

    /*$('#exportBtn').on("click", function (event) {
        $('#exportModal').modal('show');
    })*/

    $('#deleteState').click(function () {
        deleteData();
    })
    $('li').on("click", "i.fa.fa-upload", function (event) {
        let transaction = db.transaction(['default'], 'readonly');
        let objectStore = transaction.objectStore('default');
        let cursorRequest = objectStore.openCursor();
        cursorRequest.onsuccess = e => {
            const cursor = e.target.result;
            if (cursor) {
                if (cursor.value.scenario === $(this).data("id")) {
                    console.log(cursor.value.scenario)
                    svHB = cursor.value.svHB;
                    svCN = cursor.value.svCN;
                    svRN = cursor.value.svRN;
                    svSV = cursor.value.svSV;
                    svAB = cursor.value.svAB;
                    svBP = cursor.value.svBP;
                    svBZ = cursor.value.svBZ;
                    svCC = cursor.value.svCC;
                    svCP = cursor.value.svCP;
                    svCL = cursor.value.svCL;
                    svCH = cursor.value.svCH;
                    svCG = cursor.value.svCG;
                    svFM = cursor.value.svFM;
                    svLI = cursor.value.svLI;
                    svPG = cursor.value.svPG;
                    svPP = cursor.value.svPP;
                    svRC = cursor.value.svRC;
                    svSOI = cursor.value.svSOI;
                    svSC = cursor.value.svSC;
                    svHB = cursor.value.svHB;
                    svCN = cursor.value.svCN;
                    svRN = cursor.value.svRN;
                    svSV = cursor.value.svSV;
                    //sizeText = "acres < " + cursor.value.minSize + ", 0, acres > " + cursor.value.maxSize + ", 0, ";
                    //Boundaries.definitionExpression = "Acres > " + cursor.value.minSize + " AND Acres < " + cursor.value.maxSize + " AND Protected_Areas < 0.9"
                    //$('#minSize').val(cursor.value.minSize);
                    //$('#maxSize').val(cursor.value.maxSize);
                    $('#HB').val(cursor.value.svHB);
                    $('#HBVal').text(cursor.value.svHB);
                    $('#CN').val(cursor.value.svCN);
                    $('#CNVal').text(cursor.value.svCN);
                    $('#RN').val(cursor.value.svRN);
                    $('#RNVal').text(cursor.value.svRN);
                    $('#SV').val(cursor.value.svSV);
                    $('#SVVal').text(cursor.value.svSV);
                    $('#AB').val(cursor.value.svAB);
                    $('#ABVal').text(cursor.value.svAB);
                    $('#BP').val(cursor.value.svBP);
                    $('#BPVal').text(cursor.value.svBP);
                    $('#BZ').val(cursor.value.svBZ);
                    $('#BZVal').text(cursor.value.svBZ);
                    $('#CC').val(cursor.value.svCC);
                    $('#CCVal').text(cursor.value.svCC);
                    $('#CP').val(cursor.value.svCP);
                    $('#CPVal').text(cursor.value.svCP);
                    $('#CL').val(cursor.value.svCL);
                    $('#CLVal').text(cursor.value.svCL);
                    $('#CH').val(cursor.value.svCH);
                    $('#CHVal').text(cursor.value.svCH);
                    $('#CG').val(cursor.value.svCG);
                    $('#CGVal').text(cursor.value.svCG);
                    $('#FM').val(cursor.value.svFM);
                    $('#FMVal').text(cursor.value.svFM);
                    $('#LI').val(cursor.value.svLI);
                    $('#LIVal').text(cursor.value.svLI);
                    $('#PG').val(cursor.value.svPG);
                    $('#PGVal').text(cursor.value.svPG);
                    $('#PP').val(cursor.value.svPP);
                    $('#PPVal').text(cursor.value.svPP);
                    $('#RC').val(cursor.value.svRC);
                    $('#RCVal').text(cursor.value.svRC);
                    $('#SOI').val(cursor.value.svSOI);
                    $('#SOIVal').text(cursor.value.svSOI);
                    $('#SC').val(cursor.value.svSC);
                    $('#SCVal').text(cursor.value.svSC);
                    $('#SQ').val(cursor.value.svSQ);
                    $('#SQVal').text(cursor.value.svSQ)
                    $('#SR').val(cursor.value.svSR);
                    $('#SRVal').text(cursor.value.svSR)
                    $('#TC').val(cursor.value.svTC);
                    $('#TCVal').text(cursor.value.svTC)
                    $('#U2').val(cursor.value.svU2);
                    $('#U2Val').text(cursor.value.svU2)
                    $('#UA').val(cursor.value.svUA);
                    $('#UAVal').text(cursor.value.svUA)
                    $('#UC').val(cursor.value.svUC);
                    $('#UCVal').text(cursor.value.svUC)
                    $('#WS').val(cursor.value.svWS);
                    $('#WSVal').text(cursor.value.svWS)
                    $('#WL').val(cursor.value.svWL);
                    $('#WLVal').text(cursor.value.svWL)
                    $('#WA').val(cursor.value.svWA);
                    $('#WAVal').text(cursor.value.svWA)
                    //svues();
                    setRenderer();
                }

                cursor.continue();
            }

        }
        console.log("Success!")

    })
    /*$("input[name='size']").change(function () {
        Boundaries.definitionExpression = "Acres > " + $("#minSize").val() + " AND Acres < " + $("#maxSize").val() + " AND Protected_Areas < 0.9";
        sizeText = "acres < " + $("#minSize").val() + ", 0, acres > " + $("#maxSize").val() + ", 0, ";
        setRenderer();
    })
    $("input[name='top']").change(function () {
        if (parcelDE != "") {
            parcelAOI = alasql('SELECT * FROM ? WHERE ' + parcelDE, [parcelSQL])
            rank(parcelAOI, "Score")
        } else {
            rank(parcelSQL, "Score")
        }
    })
    $('input[name="top"]').click(function () {
        if ($(this).is(":checked")) {
            queryParcelRanks();
        } else {
            map.remove(parcelRank);
        }
    })
    $('input[name="fm"]').click(function () {
        $("#sa3").prop("checked", true);
        parcelDE = "";
        layerCounter = 1;
        $('input[name="fm"]').each(function () {
            if (layerCounter == 1) {
                if ($(this).is(":checked")) {
                    parcelDE += $(this).val();
                    layerCounter += 1;
                }
            } else {
                if ($(this).is(":checked")) {
                    parcelDE += " OR " + $(this).val();
                }
            }
        })
        if (parcelDE != "") {
            parcelAOI = alasql('SELECT * FROM ? WHERE ' + parcelDE, [parcelSQL])
            rank(parcelAOI, "Score")
        } else {
            rank(parcelSQL, "Score")
        }
        Parcels.definitionExpression = parcelDE;
        if (parcelDE.length == 0) {
            Boundaries.definitionExpression = "Acres > " + $("#minSize").val() + " AND Acres < " + $("#maxSize").val() + " AND Protected_Areas < 0.9"
        } else {
            Boundaries.definitionExpression = "Acres > " + $("#minSize").val() + " AND Acres < " + $("#maxSize").val() + " AND Protected_Areas < 0.9 AND (" + parcelDE + ")";
        }
    });

    $('input[name="sa"]').click(function () {
        $('input[name="fm"]').prop("checked", false);
        $('input[name="sa"]').each(function () {

            if ($(this).is(":checked")) {
                studyDE = $(this).val();
            }


        })
        if (studyDE != "") {
            parcelAOI = alasql('SELECT * FROM ? WHERE ' + studyDE, [parcelSQL])
            rank(parcelAOI, "Score")
        } else {
            rank(parcelSQL, "Score")
        }
        Parcels.definitionExpression = studyDE;
        if (studyDE.length == 0) {
            Boundaries.definitionExpression = "Acres > " + $("#minSize").val() + " AND Acres < " + $("#maxSize").val() + " AND Protected_Areas < 0.9"
        } else {
            Boundaries.definitionExpression = "Acres > " + $("#minSize").val() + " AND Acres < " + $("#maxSize").val() + " AND Protected_Areas < 0.9 AND (" + studyDE + ")";
        }
    });*/

    $(window).on("load", function () {
        $('#loadModal').modal('show');
        $('#loadClose').hide();
    });
})
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
        if (selectedTabName != "hex-tab") {
            $('side').hide()
            $('top').hide()
            $('footer').hide()
            $('#page').css('grid-template-areas', '"head head" "tabs tabs" "main main" "main main" "main main"');
        } else {
            $('side').show()
            $('top').show()
            $('footer').show()
            $('#page').css('grid-template-areas', '"head head" "tabs tabs" "top main" "nav main" "foot main"');
        }
        console.log(selectedTabName);
        // Do something with the selected tab name
    });
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
    , "esri/widgets/Home"
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
        console.log('Database setup complete');
    };

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

    Parcels = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/arcgis/rest/services/ACRCD_Hexagons_NoData/FeatureServer",
        layerId: 0,
        blendMode: "multiply",
        title: "Hexagons",
    });

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

    var startExtent = new Extent(-122.5177, 37.4323, -121.4326, 37.9301,
        new SpatialReference({ wkid: 4326 }));

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
        extent: startExtent,
        constraints: {
            snapToZoom: false
        }
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
    });

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

        setRenderer()
    });

    view2.when(function () {
        var layerList = new LayerList({
            view: view2
        });

        view2.ui.add(layerList, "top-right");
    });

    function parcelSlider(grantArray=[]) {
        $("#loadBody").empty();
        $("#loadBody").append("Data ready");
        $("#loadClose").show();
        if (grantArray.length != 0) {
            expression = createExpressions(grantArray,2)
            sql - expression[3]
            
            parcelSQL = alasql(sql, [parcelArr])
            parselMax1 = alasql("SELECT grp, MAX(test) as maxVal from ? GROUP BY grp", [parcelSQL])
            parcelMax = parselMax1[0].maxVal
        }
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

    
    function setRenderer() {
        //grantArray = ['PP', 'RC', 'SC', 'SQ', 'SR', 'TC', 'U2', 'UC', 'WS', 'WL', 'WA']
        //[fileList, string, stringRound, sql]
        parcelSlider(grantArray);
        
        expression = createExpressions(grantArray,2)
        
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
            title: "Appropriateness for agriculture: {expression/hex_info}",
            content: [
                {
                    // It is also possible to set the fieldInfos outside of the content
                    // directly in the popupTemplate. If no fieldInfos is specifically set
                    // in the content, it defaults to whatever may be set within the popupTemplate.
                    type: "fields",
                    fieldInfos: expression[0]
                }
            ]
        };

        Parcels.popupTemplate = template;

        let labelClass = {
            // autocasts as new LabelClass()
            symbol: {
                type: "text", // autocasts as new TextSymbol()
                color: "#eae3d0",
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
                color: [255, 255, 255, 0],
                outline: { // autocasts as new SimpleLineSymbol()
                    width: 0.01,
                    color: "#eae3d0"
                }
            }, // autocasts as new SimpleFillSymbol()
            visualVariables: [
                {
                    type: "color",
                    //valueExpression: strengthArcade2(svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC, svSQ, svSR, svTC, svU2, svUA, svUC, svWS, svWL, svWA),
                    valueExpression: expression[1],
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
                    ]
                }
            ]
        };
        Parcels.renderer = renderer2;
        Parcels.labelingInfo = [labelClass]
    }
    function createExpressions(grantArray=[], rnd='') {
        fileList = []
        string = ""
        var factors = "[" + grantArray.toString() + "]"
        sql = "SELECT 1 as grp, "

        if (grantArray.includes('AB')) {
            string += "var AB = ($feature.ABAGPDAS * " + svAB + ");"
            sql += "(AB * " + svAB + ") + "
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
            string += "var BP = ($feature.BasinPriority * " + svBP + ");"
            sql += "(BP * " + svBP + ") + "
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
            string += "var BZ = ($feature.BufferZones * " + svBZ + ");"
            sql += "(BZ * " + svBZ + ") + "
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
            string += "var CC = ($feature.CCED * " + svCC + ");"
            sql += "(CC * " + svCC + ") + "
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
        if (grantArray.includes('CP')) {
            string += "var CP = ($feature.CPAD * " + svCP + ");"
            sql += "(CP * " + svCP + ") + "
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
            string += "var CG = ($feature.CropGrazing * " + svCG + ");"
            sql += "(CG * " + svCG + ") + "
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
            string += "var CH = ($feature.CriticalHabitat * " + svCH + ");"
            sql += "(CH * " + svCH + ") + "
            fileList.push({
                fieldName: "CriticalHabitat",
                label: "Critical Habitat",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('FM')) {
            string += "var FM = ($feature.FarmMarket * " + svFM + ");"
            sql += "(FM * " + svFM + ") + "
            fileList.push({
                fieldName: "FarmMarket",
                label: "Farmers Markets",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('LI')) {
            string += "var LI = ($feature.LowIncome * " + svLI + ");"
            sql += "(LI * " + svAB + ") + "
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
                label: "PBA Growth",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('PP')) {
            string += "var PP = ($feature.ProtectedParkland * " + svPP + ");"
            sql += "(PP * " + svPP + ") + "
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
            string += "var RC = ($feature.RangelandConservation * " + svRC + ");"
            sql += "(RC * " + svRC + ") + "
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
            string += "var SC = ($feature.SoilCarbon * " + svSC + ");"
            sql += "(SC * " + svSC + ") + "
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
            string += "var SQ = ($feature.SoilQuality * " + svSQ + ");"
            sql += "(SQ * " + svSQ + ") + "
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
            string += "var SOI = ($feature.SOI * " + svSOI + ");"
            sql += "(SOI * " + svSOI + ") + "
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
            string += "var SR = ($feature.SpeciesRichness * " + svSR + ");"
            sql += "(SR * " + svSR + ") + "
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
                label: "Urban 2050",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('UA')) {
            string += "var UA = ($feature.UrbanChange * " + svUA + ");"
            sql += "(UA * " + svUA + ") + "
            fileList.push({
                fieldName: "UrbanAg",
                label: "Urban Agriculture",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }
        if (grantArray.includes('UC')) {
            string += "var UC = ($feature.UrbanChange * " + svUC + ");"
            sql += "(UC * " + svUC + ") + "
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
        if (grantArray.includes('WS')) {
            string += "var WS = ($feature.WaterStorage * " + svWS + ");"
            sql += "(WS * " + svWS + ") + "
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
            string += "var WA = ($feature.WilliamsonAct * " + svWA + ");"
            sql += "(WA * " + svWA + ") + "
            fileList.push({
                fieldName: "WilliamsonAct",
                label: "Williamson Act Lands",
                format: {
                    places: 2,
                    digitSeparator: true
                }
            })
        }

        sql = sql.substring(0, sql.length - 2);

        sql +=  "as test FROM ?"

        string += "var factors = " + factors + "; var total = Sum(factors); var max1 = " + parcelMax + ";"
        //if (rnd != '') {
            stringRound = string + "return round((total/max1),2);"
        //} else {
            string += "return (total/max1);"
        //}

        //return string;

        return [fileList, string, stringRound, sql]
    }

    function switchSliders(grantArray=[]) {
        $("#sliders > li").hide()

        $.each(grantArray, function (index, sliderName) {
            slider = $("#li" + sliderName).show()
        });
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

    // Assuming you have an array of slider names
    var sliderArr = ['AB', 'BP', 'BZ', 'CC', 'CP', 'CL', 'CH', 'CG', 'FM', 'LI', 'PG', 'PP', 'RC', 'SOI', 'SC', 'SQ', 'SR', 'TC', 'U2', 'UA', 'UC', 'WS', 'WL', 'WA']
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

    $('#loadClose').click(function () {
        popDropdown();
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

    $('#saveBtn').on("click", function (event) {
        $('#saveModal').modal('show');
    })

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
                    /*svHB = cursor.value.svHB;
                    svCN = cursor.value.svCN;
                    svRN = cursor.value.svRN;
                    svSV = cursor.value.svSV;
                    $('#HB').val(cursor.value.svHB);
                    $('#HBVal').text(cursor.value.svHB);
                    $('#CN').val(cursor.value.svCN);
                    $('#CNVal').text(cursor.value.svCN);
                    $('#RN').val(cursor.value.svRN);
                    $('#RNVal').text(cursor.value.svRN);
                    $('#SV').val(cursor.value.svSV);
                    $('#SVVal').text(cursor.value.svSV);*/
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
                    setRenderer();
                }
                cursor.continue();
            }
        }
        console.log("Success!")
    })

    $(window).on("load", function () {
        $('#loadModal').modal('show');
        $('#loadClose').hide();
        grantArray = ['AB','WA','CP','CC','PG']//['CL','UA','SOI','AB','WA','CP','CC','PG']
        switchSliders(grantArray)
        $('#sliders').show();
    });

    $('.dropdown-menu').on( 'click', 'a', function() {
        var text = $(this).html();
        var htmlText = text + ' <span class="caret"></span>';
        $(this).closest('.dropdown').find('.dropdown-toggle').html(htmlText);

        if (text == 'Basic Info'){
            grantArray = ['AB','WA','CP','CC','PG']//['CL','UA','SOI','AB','WA','CP','CC','PG']
        } else if (text == 'SALC'){
            grantArray = ['LI','SQ','CG','WA','BP','RC','SC','WS']//['FM','BZ','LI','SQ','CG','WA','BP','RC','SC','WS']
        } else if (text == 'SALC, Agricultural Use'){
            grantArray = ['SQ','CG','WA','BP','WS']
        } else if (text == 'SALC, Equity'){
            grantArray = ['LI']
        } else if (text == 'SALC, Support for infill / risk for conversion'){
            grantArray = ['RC']//['BZ','RC']
        } else if (text == 'SALC, Other Program Goals'){
            grantArray = ['SC']//['FM','SC']
        } else if (text == 'WCB'){
            grantArray = ['SR','CH','WS','WL']
        } else if (text == 'CC'){
            grantArray = ['RC','SR','CH','WL']
        }
        switchSliders(grantArray)
        setRenderer()
    });
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
var svAB,
    svBP,
    svBZ,
    svCC,
    svCP,
    svCL,
    svCH,
    svCG,
    svFM,
    svLI,
    svPG,
    svPP,
    svRC,
    svSOI,
    svSC,
    svHB,
    svCN,
    svRN,
    svSV,
    sliderTotal,
    winnerArcade, strengthArcade, renderer, renderer2, sizeText,
    parcelArr = [],
    parcelAOI,
    parcelSQL, parcelMax, parcelMin, parcelDE = "", studyDE = "",
    deleteVal, topTen = [],
    queryString, topTenQuery, features, rankLayer, rankCount = 0, aoiCounter = 1,
    map, view, sld, acre, minAcre, maxAcre, study, aoi, tableHTML, tableHTML2, metricHTML
let db;
require([
    "esri/Map"
    , "esri/Graphic"
    , "esri/views/MapView"
    , "esri/WebMap"
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
    , "esri/core/Error"
    , "dojo/domReady!"
], function (Map, Graphic, MapView, WebMap, FeatureLayer, GraphicsLayer, VectorTileLayer, TileLayer, QueryTask, Query, IdentifyTask, IdentifyParameters, Legend, Search, LayerList, Error) {

    const paramString = window.location.search;
    const urlParams = new URLSearchParams(paramString);

    sld = urlParams.getAll('sld')
    sld = sld[0].split(".")
    svAB = sld[0]
    svBP = sld[1]
    svBZ = sld[2]
    svCC = sld[3]
    svCP = sld[4]
    svCL = sld[5]
    svCH = sld[6]
    svCG = sld[7]
    svFM = sld[8]
    svLI = sld[9]
    svPG = sld[10]
    svPP = sld[11]
    svRC = sld[12]
    svSOI = sld[13]
    svSC = sld[14]
    svHB = sld[15]
    svCN = sld[16]
    svRN = sld[17]
    svSV = sld[18]

    acre = urlParams.getAll('acre')
    acre = acre[0].split(".")
    minAcre = acre[0]
    maxAcre = acre[1]

    topN = urlParams.getAll('top')
    study = urlParams.getAll('stdy')
    study = study[0]

    aoi = urlParams.getAll('aoi')
    aoi = aoi[0].split(".")

    $.each(aoi, function(key, val) {
        if (aoiCounter == 1) {
            if (val == "fm1") {
                parcelDE += "APN = '99A-2130-1-2' OR APN = '99A-2150-1-2' OR APN = '99A-2150-2-1' OR APN = '99A-2150-2-2' OR APN = '99A-2160-1-3' OR APN = '99A-2160-1-4' OR APN = '99A-2170-1-5' OR APN = '99A-2170-2-9' OR APN = '99A-2170-2-10' OR APN = '99A-2170-2-11' OR APN = '99A-2200-1-36' OR APN = '99A-2200-4' OR APN = '99A-2200-5' OR APN = '99A-2220-1-19' OR APN = '99A-2220-2' OR APN = '99A-2540-3'";
                aoiCounter += 1;
            }
            if (val == "fm2") {
                parcelDE += "APN = '99A-2600-1-2' OR APN = '99A-2600-12-4' OR APN = '99A-2630-1' OR APN = '99A-2630-3' OR APN = '99A-2630-4' OR APN = '99A-2630-5' OR APN = '99A-2630-6-1' OR APN = '99A-2630-6-2' OR APN = '99A-2630-7' OR APN = '99A-2630-8' OR APN = '99A-2630-10'";
                aoiCounter += 1;
            }
            if (val == "fm3") {
                parcelDE += "APN = '99A-2610-27' OR APN = '99A-2610-28' OR APN = '99A-2610-36' OR APN = '99A-2610-37' OR APN = '99A-2610-40' OR APN = '99A-2610-44' OR APN = '99A-2610-45' OR APN = '99A-2680-2' OR APN = '99A-2680-3' OR APN = '99A-2680-10' OR APN = '99A-2680-11' OR APN = '99A-2680-18' OR APN = '99A-2680-20' OR APN = '99A-2720-10' OR APN = '99A-2720-11' OR APN = '99A-2720-12' OR APN = '99A-2720-13' OR APN = '99A-2720-15' OR APN = '99A-2720-17' OR APN = '99A-2720-18' OR APN = '99A-2730-9' OR APN = '99A-2800-2' OR APN = '99A-2800-3' OR APN = '99A-2800-4' OR APN = '99A-2800-5-1' OR APN = '99A-2800-6' OR APN = '99A-2800-7' OR APN = '99A-2800-8-1' OR APN = '99A-2800-9-1' OR APN = '99A-2800-11' OR APN = '99A-2800-13' OR APN = '99A-2810-1' OR APN = '99A-2810-3' OR APN = '99A-2810-4' OR APN = '99A-2810-5' OR APN = '99A-2810-6' OR APN = '99A-2810-7' OR APN = '99A-2810-8' OR APN = '99A-2810-9' OR APN = '99A-2810-12' OR APN = '99A-2810-13' OR APN = '99A-2810-14' OR APN = '99A-2810-15' OR APN = '99A-2810-16' OR APN = '99A-2810-18' OR APN = '99A-2850-5' OR APN = '99A-2850-6' OR APN = '99A-2850-8' OR APN = '99A-2850-9' OR APN = '99A-2850-10' OR APN = '99A-2850-11'";
                aoiCounter += 1;
            }
        } else {
            if (val == "fm1") {
                parcelDE += " OR APN = '99A-2130-1-2' OR APN = '99A-2150-1-2' OR APN = '99A-2150-2-1' OR APN = '99A-2150-2-2' OR APN = '99A-2160-1-3' OR APN = '99A-2160-1-4' OR APN = '99A-2170-1-5' OR APN = '99A-2170-2-9' OR APN = '99A-2170-2-10' OR APN = '99A-2170-2-11' OR APN = '99A-2200-1-36' OR APN = '99A-2200-4' OR APN = '99A-2200-5' OR APN = '99A-2220-1-19' OR APN = '99A-2220-2' OR APN = '99A-2540-3'";
            }
            if (val == "fm2") {
                parcelDE += " OR APN = '99A-2600-1-2' OR APN = '99A-2600-12-4' OR APN = '99A-2630-1' OR APN = '99A-2630-3' OR APN = '99A-2630-4' OR APN = '99A-2630-5' OR APN = '99A-2630-6-1' OR APN = '99A-2630-6-2' OR APN = '99A-2630-7' OR APN = '99A-2630-8' OR APN = '99A-2630-10'";
            }
            if (val == "fm3") {
                parcelDE += " OR APN = '99A-2610-27' OR APN = '99A-2610-28' OR APN = '99A-2610-36' OR APN = '99A-2610-37' OR APN = '99A-2610-40' OR APN = '99A-2610-44' OR APN = '99A-2610-45' OR APN = '99A-2680-2' OR APN = '99A-2680-3' OR APN = '99A-2680-10' OR APN = '99A-2680-11' OR APN = '99A-2680-18' OR APN = '99A-2680-20' OR APN = '99A-2720-10' OR APN = '99A-2720-11' OR APN = '99A-2720-12' OR APN = '99A-2720-13' OR APN = '99A-2720-15' OR APN = '99A-2720-17' OR APN = '99A-2720-18' OR APN = '99A-2730-9' OR APN = '99A-2800-2' OR APN = '99A-2800-3' OR APN = '99A-2800-4' OR APN = '99A-2800-5-1' OR APN = '99A-2800-6' OR APN = '99A-2800-7' OR APN = '99A-2800-8-1' OR APN = '99A-2800-9-1' OR APN = '99A-2800-11' OR APN = '99A-2800-13' OR APN = '99A-2810-1' OR APN = '99A-2810-3' OR APN = '99A-2810-4' OR APN = '99A-2810-5' OR APN = '99A-2810-6' OR APN = '99A-2810-7' OR APN = '99A-2810-8' OR APN = '99A-2810-9' OR APN = '99A-2810-12' OR APN = '99A-2810-13' OR APN = '99A-2810-14' OR APN = '99A-2810-15' OR APN = '99A-2810-16' OR APN = '99A-2810-18' OR APN = '99A-2850-5' OR APN = '99A-2850-6' OR APN = '99A-2850-8' OR APN = '99A-2850-9' OR APN = '99A-2850-10' OR APN = '99A-2850-11'";
            }
        }
    })

    metricHTML = "<div class='fakeColumn'><div class=''><span class='overall'>Habitat Overall</span> " + svHB + "</div><div class='indent'><span class='key'>Bird Areas</span> " + svAB + "</div><div class='indent'><span class='key'>Wetland</span> " + svBP + "</div><div class='indent'><span class='key'>Whipsnake</span> " + svBZ + "</div><div class='indent'><span class='key'>Red Legged Frog</span> " + svCC + "</div><div class='indent'><span class='key'>Tiger Salamander</span> " + svCP + "</div><div class='indent'><span class='key'>Delta Smelt</span> " + svCL + "</div><div class='indent'><span class='key'>Fairy Shrimp</span> " + svCH + "</div></div><div class='fakeColumn columnBreak'><div class=''><span class='overall'>Connectivity Overall</span> " + svCN + "</div><div class='indent'><span class='key'>Critical Link</span> " + svCG + "</div><div class='indent'><span class='key'>Intensified Connectivity</span> " + svFM + "</div><div class='indent'><span class='key'>Diffuse Connectivity</span> " + svLI + "</div><div class='indent'><span class='key'>Channelized Connectivity</span> " + svPG + "</div><div class=''><span class='overall'>Recreation Overall</span> " + svRN + "</div><div class='indent'><span class='key'>Recreation</span> " + svPP + "</div></div><div class='fakeColumn columnBreak'><div class=''><span class='overall'>Scenic Views Overall</span> " + svSV + "</div><div class='indent'><span class='key'>View from Roads</span> " + svRC + "</div><div class='indent'><span class='key'>High Visibilty</span> " + svSOI + "</div><div class='indent'><span class='key'>Low Visibilty</span> " + svSC + "</div></div>"

    sizeText = "acres < " + minAcre + ", 0, acres > " + maxAcre + ", 0, "

    $("#metrics").append(metricHTML)

    var identifyTask = new IdentifyTask(),
        params = new IdentifyParameters()
    svues();
    $.getJSON("https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/4/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=", function (data) {
        $.each(data.features, function (i, val) {
            parcelArr.push({
                SA_80_20: val.attributes.SA_80_20,
                APN: val.attributes.APN,
                Acres: val.attributes.Acres,
                WL: val.attributes.Wetland,
                BA: val.attributes.Bird_Areas,
                TS: val.attributes.Tiger_Salamander,
                RF: val.attributes.Red_Legged_Frog,
                WS: val.attributes.Whipsnake,
                DS: val.attributes.Delta_Smelt,
                FS: val.attributes.Longhorn_Fairy_Shrimp,
                CL: val.attributes.Critical_Link,
                IC: val.attributes.Intensified_Connectivity,
                DC: val.attributes.Diffuse_Connectivity,
                CC: val.attributes.Channelized_Connectivity,
                PL: val.attributes.Recreation_Value,
                VS: val.attributes.ViewShed_All_Roads,
                VB: val.attributes.Visibility_Max,
                VL: val.attributes.Visibility_Min,
                PA: val.attributes.Protected_Areas
            })
        })
        parcelSlider();
    })
    renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-fill",
            color: [255, 255, 255, 0],
            outline: { // autocasts as new SimpleLineSymbol()
                width: 0,
                color: "#464646"
            }
        }, // autocasts as new SimpleFillSymbol()
        visualVariables: [
            {
                type: "color",
                valueExpression: "var WL = $feature.Wetland; var BA = $feature.Bird_Areas; var TS = $feature.Tiger_Salamander; var RF = $feature.Red_Legged_Frog; var WS = $feature.Whipsnake; var DS = $feature.Delta_Smelt; var FS = $feature.Longhorn_Fairy_Shrimp; var CL = $feature.Critical_Link; var IC = $feature.Intensified_Connectivity; var DC = $feature.Diffuse_Connectivity; var CC = $feature.Channelized_Connectivity; var PL = $feature.Recreation_Value; var VS = $feature.Viewshed_All_Roads; var VB = $feature.Visibility_Max; var VL = $feature.Visibility_Min; var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When(acres < 1, 0, pa > 0.9, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS, VB, VL]); var total = Sum(factors); var max = Max(factors); return (total / " + sliderTotal + ");",
                valueExpressionTitle: "Overall Score",
                stops: [
                    {
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
                ]
            }
            , {
                type: "opacity",
                valueExpression: "var WL = $feature.Wetland; var BA = $feature.Bird_Areas; var TS = $feature.Tiger_Salamander; var RF = $feature.Red_Legged_Frog; var WS = $feature.Whipsnake; var DS = $feature.Delta_Smelt; var FS = $feature.Longhorn_Fairy_Shrimp; var CL = $feature.Critical_Link; var IC = $feature.Intensified_Connectivity; var DC = $feature.Diffuse_Connectivity; var CC = $feature.Channelized_Connectivity; var PL = $feature.Recreation_Value; var VS = $feature.Viewshed_All_Roads; var VB = $feature.Visibility_Max; var VL = $feature.Visibility_Min; var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When(acres < 1, 0, pa > 0.9, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS, VB, VL]); var total = Sum(factors); var max = Max(factors); return (total / " + sliderTotal + ");",
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
    };
    Parcels = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 4,
        blendMode: "multiply",
        title: "Parcels",
        listMode: "hide"
    });

    var template = {
        // autocasts as new PopupTemplate()
        title: "APN: {APN}",
        content: [
            {
                // It is also possible to set the fieldInfos outside of the content
                // directly in the popupTemplate. If no fieldInfos is specifically set
                // in the content, it defaults to whatever may be set within the popupTemplate.
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "Acres",
                        label: "Acres",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Bird_Areas",
                        label: "Bird Areas",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Wetland",
                        label: "Wetland",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Whipsnake",
                        label: "Whipsnake",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Red_Legged_Frog",
                        label: "Red Legged Frog",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Tiger_Salamander",
                        label: "Tiger Salamander",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Delta_Smelt",
                        label: "Delta Smelt",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Longhorn_Fairy_Shrimp",
                        label: "Fairy Shrimp",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Critical_Link",
                        label: "Critical Link",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Intensified_Connectivity",
                        label: "Intensified Connectivity",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Diffuse_Connectivity",
                        label: "Diffuse Connectivity",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Channelized_Connectivity",
                        label: "Channelized Connectivity",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Recreation_Value",
                        label: "Recreation",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                    , {
                        fieldName: "Viewshed_All_Roads",
                        label: "Viewshed",
                        format: {
                            places: 2,
                            digitSeparator: true
                        }
                    }
                ]
            }
        ]
    };
    Parcels.popupTemplate = template;
    Boundaries = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 4,
        title: "Parcel Boundaries",
        definitionExpression: "Acres > 1 AND Protected_Areas < 0.9"
    });
    ProtArea = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 16,
        blendMode: "multiply",
        title: "Protected Areas"
    });
    StudyArea = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 0,
        title: "20-80 Study Area",
        listMode: "hide"
    });
    ConsEase = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 10,
        blendMode: "multiply",
        title: "Conservation Easements"
    });
    AlkSoil = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 5,
        title: "Alkaline Soils"
    });
    SerpSoil = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 19,
        title: "Serpentine Soils"
    });
    MajorRoads = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 2,
        legendEnabled: false,
        title: "Major Roads"
    })
    LocalRoads = new FeatureLayer({
        url: "https://services.arcgis.com/0xnwbwUttaTjns4i/ArcGIS/rest/services/RevisedData_Vectors/FeatureServer/",
        layerId: 3,
        legendEnabled: false,
        minScale: 80000,
        title: "Local Roads"
    })

    const allData = new WebMap({
        portalItem: { // autocasts as new PortalItem()
            id: "d61b0c9cfc5f480d813602488636abf5"
        }
    });
    LocalRoads.renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
            type: "simple-line", // autocasts as new SimpleFillSymbol()
            color: "grey",
            width: 1
        }
    }
    Boundaries.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [50, 50, 50, 0],
            outline: {
                width: 0.5,
                color: "#2a2d0d"
            }
        }
    }
    ProtArea.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            //color: "#7A6D4A",
            color: "#60563a",
            outline: {
                width: 0,
                color: [0, 0, 0, 0.6]
            }
        }
    }
    ConsEase.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: "#0D5643",
            outline: {
                width: 0,
                color: [0, 0, 0, 0.6]
            }
        }
    }
    AlkSoil.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [0, 0, 200, 0],
            outline: {
                width: 1,
                color: [100, 0, 100, 0.9]
            }
        }
    }
    SerpSoil.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [0, 0, 200, 0],
            outline: {
                width: 1,
                color: [0, 150, 0, 0.9]
            }
        }
    }
    StudyArea.renderer = {
        type: "simple",
        symbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [0, 0, 0, 0],
            outline: {
                width: 2,
                color: "#B66611"
            }
        }
    }
    StudyArea
        .when(function () {
        return StudyArea.queryExtent();
    })
        .then(function (response) {
        view.goTo(response.extent);
    });
    Parcels.renderer = renderer;
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
                        id: "c3bbfd64cb6a4718a85c1072063824e1" // khaki vector tiles
                    },
                    blendMode: "multiply"
                })
            ]
        },
        layers: [Parcels, StudyArea, Boundaries]
    });
    view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-121.624697, 37.626261],
        zoom: 10,
        ui: {
            components: ["attribution"]
        }
    });

    view2 = new MapView({
        container: "viewDiv2",
        map: allData,
        center: [-121.624697, 37.626261],
        zoom: 11
    });

    view3 = new MapView({
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
        center: [-121.624697, 37.626261],
        zoom: 11
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
        center: [-121.624697, 37.626261],
        zoom: 11
    });

    view3.popup.watch("selectedFeature", function (graphic) {
        if (graphic) {
            view3.goTo(graphic)
        }
    });

    view4.popup.watch("selectedFeature", function (graphic) {
        if (graphic) {
            view4.goTo(graphic)
        }
    });


    var searchWidget = new Search({
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
    });


    view.when(function () {
        var layerList = new LayerList({
            view: view
        });
        var legend = new Legend({
            view: view
        });

    });

    view2.when(function () {
        var layerList = new LayerList({
            view: view2
        });

        view2.ui.add(layerList, "top-right");
    });



    view3.when(function () {
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
    });

    function rank(array, att) {
        queryString = "";
        var arrCount = 1;
        array.sort(function (a, b) {
            return b[att] - a[att];
        })
        var rank = 1;
        for (var i = 0; i < array.length; i++) {
            if (i > 0 && array[i][att] < array[i - 1][att]) {
                rank++;
            }
            array[i].rank = rank;
        }
        topTen = array.slice(0, topN);

        for (var i = 0; i < topTen.length; i++) {
            if (arrCount == 1) {
                queryString += "APN = '" + topTen[i].APN + "'";
                tableHTML = "<tr><td>" + topTen[i].rank + "</td><td>" + topTen[i].APN + "</td><td>" + topTen[i].Acres.toFixed(2) + "</td><td>" + topTen[i].Score.toFixed(2) + "</td></tr>"
                arrCount += 1;
            } else {
                queryString += " OR APN = '" + topTen[i].APN + "'";
                tableHTML += "<tr><td>" + topTen[i].rank + "</td><td>" + topTen[i].APN + "</td><td>" + topTen[i].Acres.toFixed(2) + "</td><td>" + topTen[i].Score.toFixed(2) + "</td></tr>"
            }

        }
        tableHTML2 = "<tr><td>Habitat Overall</td><td>" + svHB + "</td></tr><tr><td>Bird Areas</td><td>" + svAB + "</td></tr><tr><td>Wetland</td><td>" + svBP + "</td></tr><tr><td>Whipsnake</td><td>" + svBZ + "</td></tr><tr><td>Red Legged Frog</td><td>" + svCC + "</td></tr><tr><td>Tiger Salamander</td><td>" + svCP + "</td></tr><tr><td>Delta Smelt</td><td>" + svCL + "</td></tr><tr><td>Fairy Shrimp</td><td>" + svCH + "</td></tr><tr><td>Connectivity Overall</td><td>" + svCN + "</td></tr><tr><td>Critical Link</td><td>" + svCG + "</td></tr><tr><td>Intensified Connectivity</td><td>" + svFM + "</td></tr><tr><td>Diffuse Connectivity</td><td>" + svLI + "</td></tr><tr><td>Channelized Connectivity</td><td>" + svPG + "</td></tr><tr><td>Recreation Overall</td><td>" + svRN + "</td></tr><tr><td>Recreation</td><td>" + svPP + "</td></tr><tr><td>Scenic Views Overall</td><td>" + svSV + "</td></tr><tr><td>View from Roads</td><td>" + svRC + "</td></tr><tr><td>High Visibilty</td><td>" + svSOI + "</td></tr><tr><td>Low Visibilty</td><td>" + svSC + "</td></tr>"
        $('#dataTable tbody').append(tableHTML);
        $('#dataTable2 tbody').append(tableHTML2);
        //queryTopTen();

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

            $.each(map.layers.items, function (key, val) {
                if (val.title == "Ranks") {
                    rankFound = 1;
                    map.remove(rankLayer);

                }
            })

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
                title: "Ranks",
                labelingInfo: [labelClass]

            })
            rankLayer.renderer = rankRenderer
            map.add(rankLayer)
            /*if (parcelDE != "") {
    view.whenLayerView(rankLayer).then(function (layerView) {
        layerView.watch("updating", function (val) {
            // wait for the layer view to finish updating
            if (!val) {
                layerView.queryExtent().then(function (response) {
                    // go to the extent of all the graphics in the layer view
                    //view.goTo(response.extent);
                });
            }
        });
    });
} else {
    view.center = [-121.624697, 37.626261]
    view.zoom = 11
}*/
        });
    }


    function parcelSlider() {
        if (study == "sa1") {
            studyDE = "SA_80_20 IS NOT NULL"
        } else if (study == "sa2") {
            studyDE = "SA_80_20 IS NULL"
        } else {
            studyDE = ""
        }
        
        if (studyDE.length == 0 & parcelDE.length == 0) {
            Boundaries.definitionExpression = "Acres > " + minAcre + " AND Acres < " + maxAcre + " AND Protected_Areas < 0.9"
        } else if (studyDE.length > 0 & parcelDE.length == 0) {
            Parcels.definitionExpression = studyDE;
            Boundaries.definitionExpression = "Acres > " + minAcre + " AND Acres < " + maxAcre + " AND Protected_Areas < 0.9 AND " + studyDE;
        } else {
            Parcels.definitionExpression = parcelDE;
            Boundaries.definitionExpression = "Acres > " + minAcre + " AND Acres < " + maxAcre + " AND Protected_Areas < 0.9 AND " + parcelDE;
        }
        $("#loadBody").empty();
        $("#loadBody").append("Data ready");
        $("#loadClose").show();
        /*parcelSQL = alasql('SELECT APN, ((WL * ' + svBP + ') * ' + svHB + ') as WL, ((BA * ' + svAB + ') * ' + svHB + ') as BA, ((TS * ' + svBZ + ') * ' + svHB + ') as TS, ((RF * ' + svCC + ') * ' + svHB + ') as RF,  ((WS * ' + svCP + ') * ' + svHB + ') as WS, ((DS * ' + svCL + ') * ' + svHB + ') as DS, ((FS * ' + svCH + ') * ' + svHB + ') as FS, ((CL * ' + svCG + ') * ' + svCN + ') as CL, ((IC * ' + svFM + ') * ' + svCN + ') as IC, ((DC * ' + svLI + ') * ' + svCN + ') as DC, ((CC * ' + svPG + ') * ' + svCN + ') as CC, ((PL * ' + svPP + ') * ' + svRN + ') as PL, ((VS * ' + svRC + ') * ' + svSV + ') as VS FROM ?', [parcelArr])*/
        if (studyDE == "" & parcelDE == ""){
            parcelSQL = alasql('SELECT SA_20_80, APN, Acres, (((WL * ' + svBP + ') * ' + svHB + ') + ((BA * ' + svAB + ') * ' + svHB + ') + ((TS * ' + svBZ + ') * ' + svHB + ') + ((RF * ' + svCC + ') * ' + svHB + ') +  ((WS * ' + svCP + ') * ' + svHB + ') + ((DS * ' + svCL + ') * ' + svHB + ') + ((FS * ' + svCH + ') * ' + svHB + ') + ((CL * ' + svCG + ') * ' + svCN + ') + ((IC * ' + svFM + ') * ' + svCN + ') + ((DC * ' + svLI + ') * ' + svCN + ') + ((CC * ' + svPG + ') * ' + svCN + ') + ((PL * ' + svPP + ') * ' + svRN + ') + ((VS * ' + svRC + ') * ' + svSV + ') + ((VB * ' + svSOI + ') * ' + svSV + ') + ((VL * ' + svSC + ') * ' + svSV + '))/ ' + sliderTotal + ' as Score FROM ? WHERE Acres > ' + minAcre + ' AND Acres < ' + maxAcre + ' AND PA < 0.9', [parcelArr])
        } else if (studyDE != "" & parcelDE == "") {
            parcelSQL = alasql('SELECT SA_20_80, APN, Acres, (((WL * ' + svBP + ') * ' + svHB + ') + ((BA * ' + svAB + ') * ' + svHB + ') + ((TS * ' + svBZ + ') * ' + svHB + ') + ((RF * ' + svCC + ') * ' + svHB + ') +  ((WS * ' + svCP + ') * ' + svHB + ') + ((DS * ' + svCL + ') * ' + svHB + ') + ((FS * ' + svCH + ') * ' + svHB + ') + ((CL * ' + svCG + ') * ' + svCN + ') + ((IC * ' + svFM + ') * ' + svCN + ') + ((DC * ' + svLI + ') * ' + svCN + ') + ((CC * ' + svPG + ') * ' + svCN + ') + ((PL * ' + svPP + ') * ' + svRN + ') + ((VS * ' + svRC + ') * ' + svSV + ') + ((VB * ' + svSOI + ') * ' + svSV + ') + ((VL * ' + svSC + ') * ' + svSV + '))/ ' + sliderTotal + ' as Score FROM ? WHERE ' + studyDE + ' AND Acres > ' + minAcre + ' AND Acres < ' + maxAcre + ' AND PA < 0.9', [parcelArr])
        } else {
            parcelSQL = alasql('SELECT SA_20_80, APN, Acres, (((WL * ' + svBP + ') * ' + svHB + ') + ((BA * ' + svAB + ') * ' + svHB + ') + ((TS * ' + svBZ + ') * ' + svHB + ') + ((RF * ' + svCC + ') * ' + svHB + ') +  ((WS * ' + svCP + ') * ' + svHB + ') + ((DS * ' + svCL + ') * ' + svHB + ') + ((FS * ' + svCH + ') * ' + svHB + ') + ((CL * ' + svCG + ') * ' + svCN + ') + ((IC * ' + svFM + ') * ' + svCN + ') + ((DC * ' + svLI + ') * ' + svCN + ') + ((CC * ' + svPG + ') * ' + svCN + ') + ((PL * ' + svPP + ') * ' + svRN + ') + ((VS * ' + svRC + ') * ' + svSV + ') + ((VB * ' + svSOI + ') * ' + svSV + ') + ((VL * ' + svSC + ') * ' + svSV + '))/ ' + sliderTotal + ' as Score FROM ? WHERE ' + parcelDE + ' AND Acres > ' + minAcre + ' AND Acres < ' + maxAcre + ' AND PA < 0.9', [parcelArr])
        }
        parcelMax = Math.max.apply(null, parcelSQL.map(function (o) {
            return o.Score;
        }))
        parcelMin = Math.min.apply(null, parcelSQL.map(function (o) {
            return o.Score;
        }))
        rank(parcelSQL, "Score");
        setRenderer();
    }

    function setRenderer() {
        var renderer2 = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-fill",
                color: [255, 255, 255, 0],
                outline: { // autocasts as new SimpleLineSymbol()
                    width: 0,
                    color: "white"
                }
            }, // autocasts as new SimpleFillSymbol()
            visualVariables: [
                {
                    type: "color",
                    valueExpression: strengthArcade2(svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC),
                    valueExpressionTitle: "Overall Score",
                    stops: [
                        {
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
                    ]
                }
                , {
                    type: "opacity",
                    valueExpression: strengthArcade2(svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC),
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
        };
        Parcels.renderer = renderer2;
    }

    function winnerArcade2(svD, svR, svI, svE, svB, svA, svC, svF, svG, svH, svJ, svK, svL, svM, svN) {
        var string = "var WL = ($feature.Wetland * " + svR + ") * " + svHB + ";\n      var BA = ($feature.Bird_Areas * " + svD + ") * " + svHB + ";\n      var TS = ($feature.Tiger_Salamander * " + svI + ") * " + svHB + ";\n   var RF = ($feature.Red_Legged_Frog * " + svE + ") * " + svHB + ";\n   var WS = ($feature.Whipsnake * " + svB + ") * " + svHB + ";\n var DS = ($feature.Delta_Smelt * " + svA + ") * " + svHB + ";\n var FS = ($feature.Longhorn_Fairy_Shrimp * " + svC + ") * " + svHB + ";\n var CL = ($feature.Critical_Link * " + svF + ") * " + svCN + "; var IC = ($feature.Intensified_Connectivity * " + svG + ") * " + svCN + "; var DC = ($feature.Diffuse_Connectivity * " + svH + ") * " + svCN + "; var CC = ($feature.Channelized_Connectivity * " + svJ + ") * " + svCN + "; var PL = ($feature.Recreation_Value * " + svK + ") * " + svRN + "; var VS = ($feature.Viewshed_All_Roads * " + svL + ") * " + svSV + "; var VB = ($feature.Visibility_Max * " + svM + ") * " + svSV + "; var VL = ($feature.Visibility_Min * " + svN + ") * " + svSV + ";  var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When(" + sizeText + "pa > 0.9, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS, VB, VL]); return Decode( Max(factors), WL, 'WL', BA, 'BA', TS, 'TS', RF, 'RF', WS, 'WS', DS, 'DS', FS, 'FS', CL, 'CL', IC, 'IC', DC, 'DC', CC, 'CC', PL, 'PL', VS, 'VS', VB, 'VB', VL, 'VL', 'n/a' );"
        return string;
    }

    function strengthArcade2(svD, svR, svI, svE, svB, svA, svC, svF, svG, svH, svJ, svK, svL, svM, svN) {
        var string = "var WL = ($feature.Wetland * " + svR + ") * " + svHB + ";\n      var BA = ($feature.Bird_Areas * " + svD + ") * " + svHB + ";\n      var TS = ($feature.Tiger_Salamander * " + svI + ") * " + svHB + ";\n   var RF = ($feature.Red_Legged_Frog * " + svE + ") * " + svHB + ";\n   var WS = ($feature.Whipsnake * " + svB + ") * " + svHB + ";\n var DS = ($feature.Delta_Smelt * " + svA + ") * " + svHB + ";\n var FS = ($feature.Longhorn_Fairy_Shrimp * " + svC + ") * " + svHB + ";\n var CL = ($feature.Critical_Link * " + svF + ") * " + svCN + "; var IC = ($feature.Intensified_Connectivity * " + svG + ") * " + svCN + "; var DC = ($feature.Diffuse_Connectivity * " + svH + ") * " + svCN + "; var CC = ($feature.Channelized_Connectivity * " + svJ + ") * " + svCN + "; var PL = ($feature.Recreation_Value * " + svK + ") * " + svRN + "; var VS = ($feature.Viewshed_All_Roads * " + svL + ") * " + svSV + "; var VB = ($feature.Visibility_Max * " + svM + ") * " + svSV + "; var VL = ($feature.Visibility_Min * " + svN + ") * " + svSV + "; var pa = $feature.Protected_Areas; var acres = $feature.Acres; var factors = When(" + sizeText + "pa > 0.9, 0, [WL, BA, TS, RF, WS, DS, FS, CL, IC, DC, CC, PL, VS, VB, VL]);\
var total = Sum(factors);\
var max = Max(factors);\
return (((total / " + sliderTotal + ") - (" + parcelMin + "))/(" + parcelMax + " - " + parcelMin + "));"
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


    function svues() {
        var sliderArr = [svAB, svBP, svBZ, svCC, svCP, svCL, svCH, svCG, svFM, svLI, svPG, svPP, svRC, svSOI, svSC];
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
    }
})

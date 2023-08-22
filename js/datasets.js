var dataArray = [{
    id: "liBP",
    title: "Sustainable Groundwater Management Act (SGMA) Water Basin Priority",
    sourceURL:"https://gis.water.ca.gov/app/bp-dashboard/final/",
    year: 2019,
    grants:"SALC, NRCS-ACEP",
    description: "A layer published by the California Department of Water Resources (CDWR) detailing basin prioritization throughout the State of California required by the Sustainable Groundwater Management Act (SGMA) of 2019. 517 groundwater basins and subbasins are categorized as being either high, medium, low, or very low priority based on present population overlying the basin, the number of wells that draw from the basin, documented impacts on the groundwater within the basin, the irrigated acreage overlying the basin, among other considerations."
}, {
    id: "liBZ",
    title: "Sphere of Influence (SOI) for each jurisdiction",
    sourceURL:"https://alamedalafco.org/sphere-of-influence/",
    year: 2020,
    grants:"SALC, NRCS-ACEP",
    description: "A layer created by the Alameda Local Agency Formation Commission (LAFCO) that details spheres of influence for cities and special jurisdictions within Alameda County. Spheres of Influence are tools for planning that include the municipal boundaries and service areas of local agencies."
}, {
    id: "liCC",
    title: "Conservation Easements",
    sourceURL:"https://data.cnra.ca.gov/dataset/california-conservation-easement-database",
    year: 2022,
    grants:"Basic Info",
    description: "A layer published by GreenInfo Network as part of their California Conservation Easement Database (CCED). The database contains all lands in California that are protected under conservation easements."
}, {
    id: "liCP",
    title: "Parks and other Protected Areas",
    sourceURL:"https://www.calands.org/cpad/",
    year: 2022,
    grants:"Basic Info",
    description: "A layer published by GreenInfo Network as part of their California Protected Areas Database (CPAD). The database contains 15,000 parks and preserves in California protected as permanent open space."
}, {
    id: "liCL",
    title: "City Limits",
    sourceURL:"https://data.acgov.org/datasets/f42e1e37bd20495d94100d6153c929a9_0/about",
    year: 2022,
    grants:"NRCS-AEP, Basic Info",
    description: "A layer of Alameda County incorporated city limits maintained by the Alameda County Information Technology Department."
}, {
    id: "liCH",
    title: "Critical Wildlife Habitat",
    sourceURL:"https://data.cnra.ca.gov/dataset/fws-critical-habitat-for-threatened-and-endangered-species-dataset",
    year: 2023,
    grants:"All",
    description: "A layer published by the United States Fish and Wildlife Service detailing geographic areas that include characteristics necessary to conserve threatened and endangered species and that may need extra management and protection. Critical wildlife habitat can include areas not currently inhabited by the species of interest, but will likely need them for recovery."
}, {
    id: "liCG",
    title: "Areas with Active Farming",
    sourceURL:"https://www.landiq.com/land-use-mapping",
    year: 2022,
    grants:"All",
    description: "A layer categorizing land-cover types in California, created by LandIQ in conjunction with the California Department of Water Resources."
}, {
    id: "liFI",
    title: "Greatest Need to Address Food Insecurity",
    sourceURL:"https://www.healthyalamedacounty.org/indexsuite/index/view?alias=foodinsecurity&localeType=4&parentLocale=238&locale=47811",
    year: 2022,
    grants:"SALC",
    description: "A layer using data from Healthy Alameda County’s Food Insecurity Index. The index grades each zip code or census tract based on the amount of need necessary to address food insecurity. A score of 1 corresponds to least food insecure areas (and less need) and a score of 5 corresponds to most food insecure areas (and more need). The index uses data from 2022."
}, {
    id: "liFM",
    title: "Farmers Markets Locations",
    sourceURL:"https://ecologycenter.org/fmfinder/",
    year: 2022,
    grants:"All",
    description: "A map and data layer published by the Alameda County Community Development Agency and maintained by the Ecology Center showcasing certified farmers market locations in Alameda County and the San Francisco Bay Area at large."
}, {
    id: "liGL",
    title: "Areas with Active Grazing",
    sourceURL:"https://www.landiq.com/land-use-mapping",
    year: 2022,
    grants:"All",
    description: "A layer categorizing land-cover types in California, created by LandIQ in conjunction with the California Department of Water Resources."
}, {
    id: "liHL",
    title: "Bay Area Habitat and Wildlife Linkages",
    sourceURL:"http://www.scwildlands.org/",
    year: 2014,
    grants:"WCB, CCC",
    description: "A layer published by Science & Collaboration for Connected Wildlands that identifies lands that are deemed essential to promote functional connectivity among wildlands and their associated species and ecological processes. The “landscape blocks”, as they are referred to in the layer’s metadata, are landscapes of significant ecological importance that form crucial wildlife movement connections."
}, {
    id: "liLI",
    title: "Census Tracts with Households Making Below 80% of Median Household Income",
    sourceURL:"https://data.cnra.ca.gov/dataset/low-income-or-disadvantaged-communities-designated-by-california",
    year: 2023,
    grants:"SALC",
    description: "A layer published by the California Energy Commission detailing census tracts where median household incomes are at or below 80% of the statewide median income. According to the Department of Housing and Community Development, census tracts where median household incomes are at or below 80% of the statewide median income are designated as low-income."
}, {
    id: "liPG",
    title: "Plan Bay Area 2050 Growth Geographies ",
    sourceURL:"https://www.arcgis.com/sharing/rest/content/items/d74d81cfce2a4bc9851858f087b78f49/info/metadata/metadata.xml?format=default&output=html",
    year: 2021,
    grants:"SALC, Basic Info",
    description: "A layer published by MTC and the ABAG Executive Board detailing Priority Development Areas, Priority Production Areas, Transit Rich Areas, and High Resource Areas as part of Plan Bay Area 2050 (PBA). These areas were designated in 2020 as priorities for new housing and hobs in the PBA and are largely selected by local jurisdictions."
}, {
    id: "liPS",
    title: "Prime Soil for Crop Agriculture",
    sourceURL:"https://databasin.org/datasets/899148f7939b40d2bbac3b1647dd9de5/",
    year: 2022,
    grants:"SALC, NRCS-AEP",
    description: "A layer published by the USDA and NRCS as part of the Soil Survey Geographic Database (SSURGO). This layer details numerical and categorical suitability for agricultural soil based on factors such as soil texture, depth, subsoil properties and surface relief. This dataset specifically covers the entirety of California, but SSURGO layers can be found for each state in the U.S."
}, {
    id: "liRC",
    title: "Rangeland Priority Conservation Areas",
    sourceURL:"https://map.dfg.ca.gov/metadata/ds0553.html",
    year: 2007,
    grants:"SALC, CCC, NRCS-AEP",
    description: "A layer published by the California Rangeland Conservation Coalition that identifies rangelands in California that are of conservation concern based on vegetation data, stakeholder input, and ongoing conservation efforts. The priority tiers (critical or important priority) in the layer were determined based on the number of times a planning unit was selected as relevant given the inputs listed above."
}, {
    id: "liSOI",
    title: "Buffer Zone: Outside City Limits and inside Sphere of Influence",
    sourceURL:"https://services.arcgis.com/0xnwbwUttaTjns4i/arcgis/rest/services/ACRCD_Data/FeatureServer/3",
    year: 2022,
    grants:"SALC, Basic Info",
    description: "A layer created by IGIS depicting the areas outside of Alameda County limits but within each city’s Sphere of Influence"
}, {
    id: "liSC",
    title: "Soil Organic Carbon",
    sourceURL:"https://www.fs.usda.gov/ccrc/tool/usgs-landcarbon-visualization-tools",
    year: 2018,
    grants:"SALC, NRCS-AEP",
    description: "A data layer published by the United States Geological Survey (USGS) and UC Berkeley’s Geospatial Innovation Facility (GIF) detailing predicted organic soil carbon stocks for the year 2023. The predictions (ranging from 2006-2050) were based on carbon and land-use data at a 1km scale collected by USGS between 1992 and 2005. The units for these predictions are tons per hectare (T ha-1). "
}, {
    id: "liSR",
    title: "Terrestrial Native Wildlife Species Wildlife Richness",
    sourceURL:"https://www.californianature.ca.gov/datasets/64677b4c8d9841028c88d33c7b92c91b_0/about",
    year: 2021,
    grants:"All",
    description: "A layer, published by the California Department of Fish and Wildlife through their Areas of Conservation Emphasis Project (ACE). It details terrestrial native species richness summarized by hexagonal land units, similar to those in our web app. In this layer, native species richness describes a tally of the aggregate number of native terrestrial species thought to be present in each hexagonal unit based on species range and distribution information. Hexagons were then given a score, ranging from 1 to 5, based on these total counts."
}, {
    id: "liTC",
    title: "Terrestrial Climate Change Resilience",
    sourceURL:"https://www.californianature.ca.gov/datasets/CAnature::terrestrial-climate-change-resilience-ace/about",
    year: 2021,
    grants:"SALC",
    description: "A layer, published by the California Department of Fish and Wildlife through their Areas of Conservation Emphasis Project (ACE). It details the probability that an area within California may serve as refugia from climate change, summarized by hexagonal land units, similar to those in our web app. According to CDFW, these refugia are buffered from the effects of climate change, have conditions that may stay suitable for plants and wildlife, and possess the potential to keep ecological processes relatively intact. Hexagons were then given a score, ranging from 1 to 5 (and 0 for areas with no data), based on the level of resiliency determined in their analysis."
}, {
    id: "liU2",
    title: "California Urban Growth Scenarios for 2050",
    sourceURL:"https://databasin.org/datasets/d60bac1c6fe94c7b9f85b3623481c8d3/",
    year: 2015,
    grants:"SALC, NRCS-AEP",
    description: "A layer published by Landis and the California Resources Agency presenting the results of a series of baseline population and urban growth projections for California's 38 urban counties through the year 2050. Updated in 2015, these projections are based on extrapolations of current population trends and recent urban development trends."
}, {
    id: "liUA",
    title: "Urban Agriculture Sites in UCANR Database",
    sourceURL:"https://ucanr.maps.arcgis.com/apps/Shortlist/index.html?appid=ef68873e3906426c81a8cb6f1a0b9f1a",
    year: 2020,
    grants:"SALC, Basic Info",
    description: "A map and data layer published by UC Agriculture and Natural Resources showcasing urban agriculture sites in the San Francisco Bay Area, including urban farms, and school and community gardens."
}, {
    id: "liWL",
    title: "Soil Survey Geographic database (SSURGO) Available Water Storage",
    sourceURL:"https://www.nrcs.usda.gov/resources/data-and-reports/soil-survey-geographic-database-ssurgo",
    year: 2023,
    grants:"SALC, WCB",
    description: "A data layer published by the Natural Resources Conservation Service displaying the amount of water the top 150 cm of soil can store and become available to plants. In this layer, available water storage (AWS) was calculated from the difference between soil water content at field capacity and the stable wilting point adjusted for fragments and salinity. This dataset, which has AWS information for the entire United States, was developed to create water budgets, protect water resources, assess a soil’s capacity to support crops, among many other uses."
}, {
    id: "liWS",
    title: "San Francisco Estuary Institute (SFEI) Wetlands",
    sourceURL:"https://www.sfei.org/cari",
    year: 2023,
    grants:"WCB, CCC",
    description: "A data layer published by the San Francisco Estuary Institute cataloging surface waters and their riparian areas across California that are standardized to a common wetland classification system. The CARI dataset combines wetland information from a variety of sources, including the National Wetlands Inventory, the National Hydrography Dataset and the State Wetland and Riparian Area Monitoring Plan. The dataset was created to assist with landscape-level analyses of surface waters and their riparian areas on wide-ranging scales."
}, {
    id: "liWA",
    title: "Williamson Act Parcels",
    sourceURL:"https://www.conservation.ca.gov/dlrp/wa",
    year: 2023,
    grants:"SALC, Basic Info",
    description: "A layer published by the California Department of Conservation detailing lands protected by the California Land Conservation Act of 1965, otherwise known as the Williamson Act. The Act allows private landowners and municipal governments to form contractual partnerships for the purpose of restricting specific land parcels to agricultural or public open space use. This data layer summarizes and reflects recent data submitted to the California Department of Conservation by local planning agencies and/or assessor offices throughout the state."
}]
        let mainBottom = document.querySelector(".main-bottom");
        let startY;
        let mainBottomHeight;

        mainBottom.addEventListener("mousedown", function (event) {
            startY = event.clientY;
            mainBottomHeight = mainBottom.offsetHeight;
            document.addEventListener("mouseup", mouseUp);
            document.addEventListener("mousemove", mouseMove);
        });

        function mouseUp() {
            document.removeEventListener("mouseup", mouseUp);
            document.removeEventListener("mousemove", mouseMove);
        }

        function mouseMove(event) {
            mainBottom.style.height = mainBottomHeight - (event.clientY - startY) + "px";
        }

        require(["esri/config", "esri/Map", "esri/views/MapView"], function (esriConfig, Map, MapView) {

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

        });

        const element = document.getElementById("navbar_menu");

        function moveDiv() {
            if (window.innerWidth <= 767) {
                const parent = document.getElementById("navbarTogglerDemo01");
                parent.insertBefore(element, parent.firstChild);
            } else {
                const parent = document.getElementById("sidebar-top");
                parent.insertBefore(element, parent.firstChild);
            }
        }

        window.addEventListener("resize", moveDiv);

        $(document).ready(function () {
            moveDiv()
        });

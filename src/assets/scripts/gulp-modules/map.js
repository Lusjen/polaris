
(function ($) {
    
    // Создаём пустые масивы в которых будет храниться дальшейшая информация о маркерах
    var gmarkers1 = [];
    var markers1 = [];

        // настройка для смены языка проверяет адресную строку и в зависимости от выбраного языка подставляет нужный массив с данными
        var uri = window.location.href;
        var searchIndex = uri.search('/ru/');
    //new
    markers1 = [
                    ['0', '', 50.517735, 30.468779, 'main', './assets/images/infrastructure/map/marker.svg', 'ЖК Polaris<br>  вул. Сім’ї Кульженків, 22', '30', '40'],
                    ['1', '', 50.517735, 30.469979, 'shop', './assets/images/infrastructure/map/shop.svg', 'Супермаркет', '25', '30'], 
                ];
    markers2 = [
                    ['0', '', 50.517735, 30.468779, 'main', './assets/images/infrastructure/map/marker.svg', 'ЖК Polaris вул. Сім’ї Кульженків, 22', '30', '40'],
                    ['1', '', 50.517735, 30.469979, 'shop', './assets/images/infrastructure/map/shop.svg', 'Супермаркет', '25', '30'],
                ];

    var infowindow = new google.maps.InfoWindow({
        content: '',
        maxWidth: 200
    });


    // Фильтрация, функция принимает в параметр  категорию из дата атрибута и сравнивает, используя метод гугл API setMap скрывает и показывает 
    filterMarkers = function (category) {
        for (i = 0; i < markers1.length; i++) {
            marker = gmarkers1[i];
            if (marker.category == category || category == 'main' || marker.category  == 'main') {
                marker.setMap(map);
                // marker.setAnimation(google.maps.Animation.DROP);
            } else {
                marker.setMap(null)
            }
        }
    }

    // функция вешает обработчик клика на все элементы списка и вызывает функцию filterMarkers передавая в нее значение дата атрибута
    var markItems = document.querySelectorAll('.js-mark-item');

    for (var i = 0; i < markItems.length; i++) {
        markItems[i].addEventListener('click', function () {
            markItems.forEach(function (item, i) {
                if (item.classList.contains('mark-map--active')) {
                    item.classList.remove('mark-map--active');
                }
            });

            this.classList.add('mark-map--active');
            var category = this.dataset.category;
            filterMarkers(category);
        });
    }


    // Функция добавления маркеров, берёт значение из масива вносит их в переменные и используя метод гугл API new google.maps.Marker клепает маркера
    function addMarker(marker) {
        var category = marker[4];
        var title = marker[1];
        var pos = new google.maps.LatLng(marker[2], marker[3]);
        var content = "<p class='content'>" + marker[6] + "</p>";
        var markerIcon = {
            url: marker[5]
        };
        marker1 = new google.maps.Marker({
            title: title,
            position: pos,
            category: category,
            map: map,
            icon: markerIcon,
            // animation: google.maps.Animation.DROP,
        });
        gmarkers1.push(marker1);
        // Marker click listener
        google.maps.event.addListener(marker1, 'click', (function (marker1, content) {
            return function () {
                infowindow.setContent(content); // установка нужного контента в всплывайку
                infowindow.open(map, marker1); // открытие нужного окна
                map.panTo(this.getPosition()); // установка центра карты в координатах кликнутой иконки
            }
        })(marker1, content));
    }

    var styleMap = [
        {
            "featureType": "all",
            "stylers": [{
                "saturation": 0
            }, {
                "hue": "#e7ecf0"
            }]
        },
        {
            "featureType": "road",
            "stylers": [{
                "saturation": -70
            }]
        }, {
            "featureType": "transit",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "saturation": -60
            }]
        }
    ]

    // init карты
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 50.515241,
            lng: 30.468318
        },
        zoom: 15,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    map.setOptions({
        styles: styleMap
    });


    if (searchIndex > -1) {
        for (i = 0; i < markers2.length; i++) {
            addMarker(markers2[i]);
        }
    } else {
        for (i = 0; i < markers1.length; i++) {
            addMarker(markers1[i]);
        }
    }


})(jQuery);


(function ($) {
// Общий Object в котором указаны все параметры фильтра по которым идёт выборка квартир     
        var filter = {
            val_square: {
                min: '',
                max: ''
            },
            val_squareLiv: {
                min: '',
                max: ''
            },
            val_floor: {
                min: '',
                max: ''
            },
            rooms: [],
            build: [],
        };

// Ф-я которая записывает общие данные из slider(при инициализации) в глобальный Object
        function setFilter(ionRange, range) {
            filter[range.id].min = Number(ionRange.from);
            filter[range.id].max = Number(ionRange.to);
        };

// Ф-я которая устанавливает начальные значения из дата атрибутов в slider
        function setValue(el, val) {
            $('.js_' + el.id + '_min').val(val.from);
            $('.js_' + el.id + '_max').val(val.to);
        }

        var ranges = document.querySelectorAll('.range-init');
        var sliders = [];

//Init всех Sliders с классом .range-init
        ranges.forEach(function(range) {
            $(range).ionRangeSlider({
                type: "double",
                grid: true,
                values_separator: '-',
                min: range.value.split(';')[0],
                max: range.value.split(';')[1],
                from: range.value.split(';')[0],
                to: range.value.split(';')[1],
                // hide_min_max: true,
                // hide_from_to: true,
                grid: false,
                onStart: function(ionRange) {
                    setFilter(ionRange, range);
                    //console.log(range, '-----');
                    
                },
                onChange: function(ionRange) {
                    setFilter(ionRange, range);
                    setValue(range, ionRange);
                },
                onFinish(){
                    searchFunction();
                }
            })
            sliders.push($(range).data("ionRangeSlider"));
            $('.slider__currentMin').on('change', function() {
                searchFunction();
            });
            $('.slider__currentMax').on('change', function() {
                searchFunction();
            });
        });
        
        // addEventCheckbox(checkboxesConainerRoom, checkboxesRoom, filter.rooms)
        // addEventCheckbox(checkboxesConainerBuild, checkboxesBuild, filter.build)
var checkboxesConainer = document.querySelector('.js_checkboxes__rooms'); // wrap checkboxs
var checkboxes = document.querySelectorAll('.js_checkboxes__rooms .checkbox__room'); // label


    checkboxes_rooms()
    

checkboxesConainer.addEventListener('change', function () {
    
    checkboxes_rooms();
    searchFunction();
});

function checkboxes_rooms(){
    
    filter.rooms = [];
    checkboxes.forEach(function (checkbox) {
        
        
        if (checkbox.checked) {
            
            
            filter.rooms.push(parseInt(checkbox.value));
        }
    })
}

var checkboxesConainerBuild = document.querySelector('.js_checkboxes__build'); // wrap checkboxs
var checkboxesBuild = document.querySelectorAll('.js_checkboxes__build .checkbox__room'); // label


    checkboxes_build()
    

checkboxesConainerBuild.addEventListener('change', function () {
    
    checkboxes_build();
    searchFunction();
});

function checkboxes_build(){
    
    filter.build = [];
    checkboxesBuild.forEach(function (checkbox) {
        
        
        if (checkbox.checked) {
            
            
            filter.build.push(parseInt(checkbox.value));
        }
    })
}


// Ф-я конструктор котрая создаёт отдельный Object на каждую квартиру, берёт данные из дата атрибута и записывает 
        var rows = document.querySelectorAll('.js-result__item'); // все карточки с квартирами li 

        function Appartment(app) {
            
            
            
            this.selector = app;
            this.val_entrance = parseInt(app.dataset.build);
            this.val_square = parseInt(app.dataset.area);
            this.val_squareLiv = parseInt(app.dataset.larea);
            this.val_floor = parseInt(app.dataset.floor);
            this.rooms = parseInt(app.dataset.rooms);
            this.build = parseInt(app.dataset.build);
        }
// Записывает все квартиры в отдельный массив
        var appartments = [];
        rows.forEach(function(row){
            appartments.push(new Appartment(row))
        });
        
        
    filter_flat();

// выборка кнопок и установка значения общего к-ва квартир
        var searchBtn = document.querySelector('.js-button_search');
        var resetBtn = document.querySelector('.js-reset_button');
        var yetBtn = document.querySelector('.filter-see-more');


    //  document.querySelector(".number_flats").innerHTML = appartments.length;
        //document.querySelector(".count_filter").innerHTML = appartments.length;

// Обработчик на кнопку поиска
        var searchFunction = function() {
            var totalAppartments = appartments.length;
            console.log(totalAppartments);
            var totalAppartments2 = totalAppartments/2;
            var i = 0;
            // Проход по массиву и сверка ключей и данных
            appartments.forEach(function(appartment){
                appartment.selector.style.display = 'flex';
    
                for(var key in filter) {
                    if(key === 'rooms' && filter[key].length > 0) {
                        if(!filter[key].includes(appartment[key])) {
                            appartment.selector.style.display = 'none';
                            i++;
                            break;
                        }
                    }
                    if(key === 'build' && filter[key].length > 0) {
                        if(!filter[key].includes(appartment[key])) {
                            appartment.selector.style.display = 'none';
                            i++;
                            break;
                        }
                    }

                    if(filter[key].min > appartment[key] || filter[key].max < appartment[key]) {
                        appartment.selector.style.display = 'none';
                        i++;
                        break;
                    }
                }
            });
            var flats  = totalAppartments - i <= 0 ? 0 : totalAppartments - i;
            document.querySelector(".number_flats").innerHTML = flats/2;
            $('.filter-see-more').fadeOut();
        };
        
        
        // searchBtn.addEventListener('click', function() {
            
        //     searchFunction();
        // });
        
        
        function filter_flat(){
            
            var totalAppartments = appartments.length;
            console.log(totalAppartments);
            var totalAppartments2 = totalAppartments/2;
            var i = 0;
            // Проход по массиву и сверка ключей и данных
            appartments.forEach(function(appartment){
                
                for(var key in filter) {
                    if(key === 'rooms' && filter[key].length > 0) {
                        if(!filter[key].includes(appartment[key])) {
                             appartment.selector.style.display = 'none';
                            i++;
                            break;
                        }
                    }
                    if(key === 'build' && filter[key].length > 0) {
                        if(!filter[key].includes(appartment[key])) {
                            appartment.selector.style.display = 'none';
                            i++;
                            break;
                        }
                    }
                    
                    if(filter[key].min > appartment[key] || filter[key].max < appartment[key]) {
                        appartment.selector.style.display = 'none';
                        i++;
                        break;
                    }
                }
            });
           var flats  = totalAppartments - i <= 0 ? 0 : totalAppartments - i;
           document.querySelector(".number_flats").innerHTML = flats/2;
        }
        
 if ($(window).width() < 767) {
// Кнопка показать ещё
        yetBtn.addEventListener('click', function() {
            paginationRow();
        });
        
        
//Пагинация
        function paginationRow(){
        
            var pag_row = document.querySelectorAll('.pagination-filter');
            var pagination = document.querySelectorAll('.filter-pagination')[0].dataset.pagination; 
            var t = 0; 
            
            console.log(pagination);

            pag_row.forEach(function(appartment){
                t++;
                
                if (t>pagination) {
                    appartment.style.display = 'block';
                } else {
                    appartment.classList.remove("pagination-filter");
                }
            });
            
            if ((pag_row.length-pagination)<1) {
                
                $('.filter-see-more').fadeOut();
            } else {
                
                $('.filter-see-more').fadeIn();
            }
        }
        
}
// Обнуление данных методы плагина 
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sliders.forEach(function(slider) {
                slider.update({
                    from: slider.options.min,
                    to: slider.options.max
                });
                setFilter({from: slider.old_from, to: slider.old_to}, slider.input);
                setValue(slider.input, {from: slider.old_from, to: slider.old_to});
            });
            checkboxes.forEach(function(checkbox) {
                checkbox.checked = false;
            });
            checkboxesBuild.forEach(function(checkbox) {
                checkbox.checked = false;
            });

            filter.rooms = [];
            filter.build = [];
            
            searchFunction();
        });


// установка и обработка значений ввидённых с клавиатуру в поля инпутов минимальных и максимальных значений

    var minInputs = document.querySelectorAll('.slider__currentMin');
    var maxInputs = document.querySelectorAll('.slider__currentMax');

    minInputs.forEach(function (input) {
        input.addEventListener('keyup', function (e) {
            var parent = $(this).parents()[2];
            setMinSliderFromInput($(parent).find(".range-init")[0].id, e.target.value, sliders);
            //console.log(filter);
            
        });
    });

    maxInputs.forEach(function (input) {
        input.addEventListener('keyup', function (e) {
            
            var parent = $(this).parents()[2];
            setMaxSliderFromInput($(parent).find(".range-init")[0].id, e.target.value, sliders);        
        });
    });


    function setMinSliderFromInput(id, val, arrSliders) {
        arrSliders.forEach(function (item) {
            if (item.input.id === id) {
                if (item.options.min <= Number(val) && item.options.max >= Number(val)) {
                    item.update({ from: val, to: item.old_to });
                    setFilter(item.result, item.input)
                } else {
                    item.update({ from: item.options.min, to: item.old_to });
                    setFilter(item.result, item.input)
                }
            }
        });
    };

    function setMaxSliderFromInput(id, val, arrSliders) {
        arrSliders.forEach(function (item) {
            if (item.input.id === id) {
                if (item.options.max >= Number(val) && item.options.min <= Number(val)) {
                    item.update({ from: item.old_from, to: val });
                    setFilter(item.result, item.input)
                } else {
                    item.update({ from: item.old_from, to: item.options.max });
                    setFilter(item.result, item.input)
                }
            }
        });
    };


    // reset value if inputs have biggest num
    $("body").on("focusout", ".input-filter-js", inputMaxReset);

    function inputMaxReset() {
        var value = Number($(this).val()),
            min = Number($(this)[0].min),
            max = Number($(this)[0].max),
            mainParentId = $(this).closest('.range-item').find('.range-init')[0],
            parent = $(this).closest('.range-item'),
            maxOld = parent.find(".range-init").data("ionRangeSlider").old_to,
            minOld = parent.find(".range-init").data("ionRangeSlider").old_from,
            thisRange = parent.find(".range-init").data("ionRangeSlider");

        if ($(this).hasClass('slider__currentMax')) {
            if (value > max) {
                $(this).val(max);
                thisRange.update({
                    to: max
                });
                setFilter(thisRange.result, mainParentId);
                
            } else if (value < minOld) {
                $(this).val(minOld);
                thisRange.update({
                    to: minOld
                });
                setFilter(thisRange.result, mainParentId);
            }
        }


        if ($(this).hasClass('slider__currentMin')) {
            if (value < thisRange.options.min) {
                $(this).val(min)
                thisRange.update({
                    from: thisRange.options.min
                })
                setFilter(thisRange.result, mainParentId);
            } else if (value >= maxOld) {
                $(this).val(maxOld)
                thisRange.update({
                    from: maxOld
                })
                setFilter(thisRange.result, mainParentId);
            }
            else {
                thisRange.update({
                    from: value
                })
                setFilter(thisRange.result, mainParentId);
            }
        }
    }

    const resTypeButtons = document.querySelectorAll('.result-type-link');

    resTypeButtons.forEach(resButton => {
        document.querySelector('.filter-box').classList.add(resTypeButtons[1].dataset.name);
        resTypeButtons[1].classList.add('color-link');
        resButton.addEventListener('click', (e) => {
            document.querySelector('.filter-box').classList.remove('cards');
            document.querySelector('.filter-box').classList.remove('list');
            resTypeButtons.forEach(res => {
                res.classList.remove('color-link');
            });
            e.target.classList.add('color-link');
            document.querySelector('.filter-box').classList.add(e.target.dataset.name);
        })
    });
    let filterResults = document.querySelector('.filter-box');
    let filterListResults = filterResults.querySelectorAll('.filter-results-list__flat');
    let imgListHover = document.createElement('img');
    let mapLegend = document.querySelector('.filter-parametres-js');
    imgListHover.classList.add('list-hover-image');
    filterListResults.forEach(listItem => {
            listItem.onmouseenter = () => {
                imgListHover.src = listItem.dataset.image;
                imgListHover.style.opacity = '1';
                mapLegend.append(imgListHover);
            };
            listItem.onmouseleave = () => {
                imgListHover.style.opacity = `0`;
            }
        })
})(jQuery);

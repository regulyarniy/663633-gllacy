//Функция включения в обработку по TAB
function removeTabIndex(elementsArray) {
  for (var i = 0; i < elementsArray.length; i++) {
    elementsArray[i].setAttribute('tabindex', '0');
  };
};
//Функция выключения из обработки по TAB
function addTabIndex(elementsArray) {
  for (var i = 0; i < elementsArray.length; i++) {
    elementsArray[i].setAttribute('tabindex', '-1');
  };
};
//Функция добавления класса к NodeList
function addClassToNodes(elementsArray, addedClass) {
  for (var i = 0; i < elementsArray.length; i++) {
    elementsArray[i].classList.add(addedClass);
  };
};
//Функция удаления класса с NodeList
function removeClassFromNodes(elementsArray, removedClass) {
  for (var i = 0; i < elementsArray.length; i++) {
    elementsArray[i].classList.remove(removedClass);
  };
};
//Функция добавления классов с суффиксом(начиная с 0) к элементу
function addClassToElement(element, count, classPostfix) {
  for (var i = 0; i < count; i++) {
    element.classList.add(classPostfix + i);
  };
};
//Функция удаления классов с суффиксом(начиная с 0) с элемента
function removeClassFromElement(element, count, classPrefix) {
  for (var i = 0; i < count; i++) {
    element.classList.remove(classPrefix + i);
  };
};
//Функция добавления класса к выборке элементов по селекторам с суффиксом
function addClassToSelectorSuffix(element, count, classPrefix, addedClass) {
  for (var i = 0; i < count; i++) {
    element.querySelector(classPrefix + i).classList.add(addedClass);
  };
};
//Функция удаления класса из выборки элементов по селекторам с суффиксом
function removeClassFromSelectorSuffix(element, count, classPrefix, addedClass) {
  for (var i = 0; i < count; i++) {
    element.querySelector(classPrefix + i).classList.remove(addedClass);
  };
};
// Слайдер
var sliderBody = document.querySelector('.general-body');
var sliderBack = document.querySelector('.general-body__sliderbg');
var sliderControl = document.querySelector('.slider-control');
var sliderContent = document.querySelector('.general-slider');

if (sliderBody && sliderBack && sliderControl && sliderContent) {
  var sliderControlButton = sliderControl.querySelectorAll('.button--slider');
  //Добавляем событие по клику для всех кнопок
  [].forEach.call(sliderControlButton, function(e) {
    e.addEventListener('click',
      function(evt) {
        evt.preventDefault();
        //Переназначаем классы кнопкам
        removeClassFromNodes(sliderControlButton, 'button--slider-active');
        this.classList.add('button--slider-active');
        // Получаем номер кнопки
        var buttonNumber = Array.from(this.parentNode.children).indexOf(this);
        //Получаем количество кнопок
        var buttonCount = sliderControlButton.length;
        //Меняем цвет фона
        removeClassFromElement(sliderBody, buttonCount, 'general-body--bg')
        sliderBody.classList.add('general-body--bg' + buttonNumber);
        // Меняем картинку
        removeClassFromElement(sliderBack, buttonCount, 'general-body__sliderbg--');
        sliderBack.classList.add('general-body__sliderbg--' + buttonNumber);
        // Меняем контент
        addClassToSelectorSuffix(sliderContent, buttonCount, '.general-slider__item--', 'visually-hidden');
        sliderContent.querySelector('.general-slider__item--' + buttonNumber).classList.remove('visually-hidden');
        // Меняем tabindex
        addTabIndex(sliderContent.querySelectorAll('.button'));
        sliderContent.querySelector('.general-slider__item--' + buttonNumber + ' .button').setAttribute('tabindex', '0');
      });
  });
};

// Модальное окно
var modal = document.querySelector('.modal');
var modalToggle = document.querySelectorAll('.modal-toggle');

if (modal && modalToggle) {
  var modalForm = modal.querySelector('.feedback-form');
  var modalName = modal.querySelector('#name-input');
  var modalEmail = modal.querySelector('#feedback-email-input');
  var modalText = modal.querySelector('#feedback-text-input');
  var modalClose = modal.querySelector('.button--modal-close');
  var modalInputs = [modalName, modalEmail, modalText, modalClose];
  // Открытие/закрытие по кнопкам
  for (i = 0; i < modalToggle.length; i++) {
    modalToggle[i].addEventListener('click', function(evt) {
      evt.preventDefault();
      modal.classList.toggle('visually-hidden');
      // Фокус на имени при всплытии и tabindex в 0
      if (!modal.classList.contains('visually-hidden')) {
        removeTabIndex(modalInputs);
        modal.classList.add('modal--animated');
        modal.classList.remove('modal--error');
        modalName.focus();
      } else {
        // tabindex в -1 при закрытии формы
        addTabIndex(modalInputs);
        modal.classList.remove('modal--animated');
        modal.classList.remove('modal--error');
      };
    });
  }
  // Закрытие по щелчку вне формы
  window.onclick = function(evt) {
    if (evt.target == modal && !modal.classList.contains('visually-hidden')) {
      addTabIndex(modalInputs);
      modal.classList.remove('modal--animated');
      modal.classList.remove('modal--error');
      modal.classList.add('visually-hidden');
    }
  }
  // Закрытие по ESC
  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27 && !modal.classList.contains('visually-hidden')) {
      evt.preventDefault();
      addTabIndex(modalInputs);
      modal.classList.remove('modal--animated');
      modal.classList.remove('modal--error');
      modal.classList.add('visually-hidden');
    };
  });
  // Проверка на отсутствие введенных данных
  modalForm.addEventListener('submit', function(evt) {
    if (!modalName.value || !modalEmail.value || !modalText.value) {
      evt.preventDefault();
      modal.classList.remove('modal--error');
      modal.offsetWidth = modal.offsetWidth;
      modal.classList.add('modal--error');
    };
  });
};

// Проверяем нужна ли карта на странице и добавляем скрипты API Google Maps
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelectorAll('#map').length > 0) {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'en';

    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&signed_in=true&key=AIzaSyAMUMuva5VkEeo4WbgbTcL5d-xxoTI54Ig&language=' + lang;
    document.getElementsByTagName('head')[0].appendChild(js_file);
  };
});
// Добавляем карту
if (document.querySelectorAll('#map').length > 0) {
  function initMap() {
    var gllacy = {
      lat: 59.938733,
      lng: 30.323054
    };

    var viewpoint = {
      lat: 59.939674,
      lng: 30.325976
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: viewpoint,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      mapTypeId: 'roadmap',
      styles: [{
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#747474"
            },
            {
              "lightness": "23"
            }
          ]
        },
        {
          "featureType": "poi.attraction",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#f38eb0"
          }]
        },
        {
          "featureType": "poi.government",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#ced7db"
          }]
        },
        {
          "featureType": "poi.medical",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#ffa5a8"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#c7e5c8"
          }]
        },
        {
          "featureType": "poi.place_of_worship",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#d6cbc7"
          }]
        },
        {
          "featureType": "poi.school",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#c4c9e8"
          }]
        },
        {
          "featureType": "poi.sports_complex",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#b1eaf1"
          }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "lightness": "100"
          }]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [{
              "visibility": "off"
            },
            {
              "lightness": "100"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#ffd4a5"
          }]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#ffe9d2"
          }]
        },
        {
          "featureType": "road.local",
          "elementType": "all",
          "stylers": [{
            "visibility": "simplified"
          }]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [{
            "weight": "3.00"
          }]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [{
            "weight": "0.30"
          }]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text",
          "stylers": [{
            "visibility": "on"
          }]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#747474"
            },
            {
              "lightness": "36"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.stroke",
          "stylers": [{
              "color": "#e9e5dc"
            },
            {
              "lightness": "30"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [{
              "visibility": "on"
            },
            {
              "lightness": "100"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [{
            "color": "#d2e7f7"
          }]
        }
      ]
    });

    var marker = new google.maps.Marker({
      position: gllacy,
      map: map,
      icon: 'img/map-pin.png'
    });
  };
};

//Ползунок цены в каталоге
var rangeStartDisplay = document.querySelector('#filter-range-start-counter');
var rangeEndDisplay = document.querySelector('#filter-range-end-counter');
var rangeStart = document.querySelector('#filter-range-start');
var rangeEnd = document.querySelector('#filter-range-end');
var rangeStartControl = document.querySelector('#filter-range-start-control');
var rangeEndControl = document.querySelector('#filter-range-end-control');
var rangeRuler = document.querySelector('.filter__range-ruler');
var rangeRulerActive = document.querySelector('.filter__range-ruler-active');

//Функция перемещения по оси Y
//На основе туториала: https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt, min, max, ruler) {
  var pos1 = 0,
    pos2 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos2 = e.clientX;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    var offsetX;
    var rulerWidth;
    var resultStart;
    var resultEnd;
    e = e || window.event;
    e.preventDefault();
    elmnt.focus();
    // calculate the new cursor position:
    pos1 = pos2 - e.clientX;
    pos2 = e.clientX;
    // set the element's new position:
    offsetX = elmnt.offsetLeft - pos1;
    if (typeof min === 'object') {
      if (offsetX >= min.offsetLeft && offsetX <= max) {
        //Перемещаем правый ползунок
        elmnt.style.left = offsetX + 'px';
        rulerWidth = Math.abs(rangeStartControl.offsetLeft - rangeEndControl.offsetLeft) + "px";
      }
    } else if (typeof max === 'object') {
      if (offsetX >= min && offsetX <= max.offsetLeft) {
        //Перемещаем левый ползунок
        elmnt.style.left = offsetX + 'px';
        rangeRulerActive.style.left = elmnt.style.left;
        rulerWidth = Math.abs(rangeStartControl.offsetLeft - rangeEndControl.offsetLeft) + "px";
      }
    }
    //Меняем подписи и значения в полях
    resultStart = Math.round((rangeStartControl.offsetLeft - minX) * scaledInput);
    resultEnd = Math.round((rangeEndControl.offsetLeft - minX) * scaledInput);
    rangeStartDisplay.innerHTML = resultStart;
    rangeEndDisplay.innerHTML = resultEnd;
    rangeStart.value = resultStart;
    rangeEnd.value = resultEnd;
    // Меняем длину активной линейки
    rangeRulerActive.style.width = rulerWidth;
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

if (rangeStartDisplay && rangeEndDisplay && rangeStart && rangeEnd && rangeStartControl && rangeEndControl && rangeRuler && rangeRulerActive) {
  var minX = rangeRuler.offsetLeft - rangeStartControl.offsetWidth / 2;
  var maxX = rangeRuler.offsetWidth + rangeStartControl.offsetWidth / 2;
  var maxInput = rangeEnd.getAttribute('max');
  var scaledInput = maxInput / (maxX - minX);
  // Прячем поля ввода и tabindex если JS загрузился
  rangeStart.classList.add('visually-hidden');
  rangeEnd.classList.add('visually-hidden');
  addTabIndex([rangeStart, rangeEnd]);
  // Устанавливаем значения подписей согласно value
  rangeStartDisplay.innerHTML = rangeStart.value;
  rangeEndDisplay.innerHTML = rangeEnd.value;
  //Вызываем функции перетаскивания
  dragElement(rangeStartControl, minX, rangeEndControl);
  dragElement(rangeEndControl, rangeStartControl, maxX);
}
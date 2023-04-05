//language
let lang = document.querySelector('.lang');
let langCurrent = document.querySelector('.lang .lang__current span');
let langOpt = document.querySelector('.lang .lang__option');
let langItems = document.querySelectorAll('.lang .lang__option a');
lang.addEventListener('click', function (e) {
    e.stopPropagation();
    lang.classList.toggle('active');
})

langItems.forEach(function (item) {
    console.log(item);
    item.addEventListener('click', function () {
        console.log(this.textContent);
        let langText = this.textContent;
        let langCurrentSpan = langCurrent.textContent;
        langCurrent.innerHTML = langText;
        this.innerHTML = langCurrentSpan;
    })
})

document.addEventListener('click', function () {
    lang.classList.remove('active');
})

let header = document.querySelector('header');
let slider = document.querySelector('.slider');
let heightSlider = slider.clientHeight;
let heightHeader = header.clientHeight;

function changeBgHeader() {
    let scrollY = window.pageYOffset;
    if (scrollY > heightSlider - heightHeader) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
}

/*let backtotop = document.querySelector('.totop');
let getHeightWindow = window.innerHeight;
function showBackToTop() {
    let scrollY = window.pageYOffset;
    if (scrollY > getHeightWindow) {
        backtotop.classList.add('active');
    } else {
        backtotop.classList.remove('active');
    }
} */

let backtotop = document.querySelector('.backtotop');
backtotop.addEventListener('click', function () {
    window.scrollTo({
        top: 0
    })
})

document.addEventListener('scroll', function () {
    changeBgHeader();
    //showBackToTop();
});

// let preBtn = document.querySelector('.--prev');
// let nextBtn = document.querySelector('.--next');
// function preSlider(n) {
//     console.log('preSlider ' + n);
// }
// function nextSlider(n) {
//     console.log('nextSlider');
// }
// preBtn.addEventListener('click', (n) => preSlider(10)); //tham so dau vao 

// nextBtn.onclick = nextSlider;



//MENU

let btnMenu = document.querySelector('.btnmenu');
let nav = document.querySelector('.nav');
btnMenu.addEventListener('click', function () {
    console.log('show menu');
    this.classList.toggle('active');
    nav.classList.toggle('active');
})


if (nav.classList.contains('active')) {
    console.log('yes');
} else {
    console.log('no');
}

// /*Sliders
let listItemSlider = document.querySelectorAll('.slider__item-wrap .slider__item');
let number = document.querySelector('.paging .paging__number');
let dots = document.querySelectorAll('.paging .paging__dotted li');
let currentSlider = 0;
listItemSlider.forEach(function (itemSlider, index) {
    if (itemSlider.classList.contains('active'))
        currentSlider = index;
});
function showNumber(index) {
    number.innerHTML = (index).toString().padStart(2, '0');
}
showNumber(currentSlider + 1);
dots[currentSlider].classList.add('is-selected');

let btnnext = document.querySelector('.--next');
let btnprev = document.querySelector('.--prev');

//cur = 0;
btnnext.addEventListener('click', function () {
    if (currentSlider < listItemSlider.length - 1) { // chưa phải cuối cùng
        goTo(currentSlider + 1);
    } else {
        goTo(0);
    }
});
btnprev.addEventListener('click', function () {
    if (currentSlider > 0) { // nếu như có slide phía trước
        goTo(currentSlider - 1);
    } else {
        goTo(listItemSlider.length - 1);
    }
});

function goTo(index) {
    listItemSlider[currentSlider].classList.remove('active');
    listItemSlider[index].classList.add('active');
    dots[currentSlider].classList.remove('is-selected');
    dots[index].classList.add('is-selected');
    currentSlider = index;
    showNumber(currentSlider + 1);
}

dots.forEach(function (li, index) {
    li.addEventListener('click', function () {
        if (index !== currentSlider) {
            goTo(index);
        }
    })
})


// MENU scroll to content
let menus = document.querySelectorAll('header .menu a')
let heightOfHeader = document.querySelector('header').offsetHeight;
let sections = [];
function removeAtiveMenu() {
    menus.forEach(function (menu_element, menu_index) {
        menu_element.classList.remove('active');
    });
}
menus.forEach(function (element, index) {
    let className = element.getAttribute('href').replace('#', '');
    let section = document.querySelector('.' + className);
    sections.push(section);
    element.addEventListener('click', function (e) {
        e.preventDefault();
        console.log(section.offsetTop);
        window.scrollTo({
            top: section.offsetTop - heightOfHeader,
            behavior: 'smooth'
        })
        removeAtiveMenu();
        element.classList.add('active');
    });
});
window.addEventListener('scroll', function () {
    let positionScroll = window.pageYOffset;
    sections.forEach(function (section, index) {
        if (positionScroll > section.offsetTop - heightOfHeader && positionScroll < section.offsetTop + section.offsetHeight) {
            removeAtiveMenu();
            menus[index].classList.add('active');
        } else {
            menus[index].classList.remove('active');
        }
    });
});


//POPUP VIDEOS
let button_video = document.querySelectorAll('.video__item-img');
let popup_video = document.querySelector('.popup-video')
let close_popup_video = document.querySelector('.popup-video .close')
let iframe = document.querySelector('.popup-video iframe');
button_video.forEach(function (button) {
    button.addEventListener('click', function () {
        let video_id = button.getAttribute('data-video-id');
        iframe.setAttribute('src', 'https://www.youtube.com/embed/' + video_id + '?autoplay=1')
        popup_video.style.display = 'flex';

    })
})

close_popup_video.addEventListener('click', function () {
    iframe.setAttribute('src', '');
    popup_video.style.display = 'none';
})

document.querySelector('.popup-video').addEventListener('click', function (e) {
    iframe.setAttribute('src', '');
    popup_video.style.display = 'none';
})

//TAB NEWS
let tagText = document.querySelectorAll('.news__tags .tag');
let tagList = document.querySelectorAll('.news__list');
tagText.forEach(function(item, index) {
    item.addEventListener('click', function() {
        let tagID = index + 1;
        console.log(tagID);
        tagText.forEach(function(tag) {
            tag.classList.remove('active');
        });
        tagList.forEach(function(tags){
            tags.classList.remove('active');
        });
        item.classList.add('active');
        document.querySelector('.news__list-' + tagID).classList.add('active');
    })
})
 //TAB FQA

let fqas = document.getElementsByClassName("fqa");
let i;

for (i = 0; i < fqas.length; i++) {
    fqas[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let answer = this.nextElementSibling;
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
    } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
}
$(document).ready(function () {

    //1. MENU
    let btnMenu = $('.btnmenu');
    let nav = $('.nav');
    btnMenu.click(function () {
        nav.toggleClass('active');
        btnMenu.toggleClass('active');
    })
    $(window).resize(function () {
        let widthWindow = $(window).width();
        if (widthWindow > 767) {
            nav.removeClass('active');
            btnMenu.removeClass('active');
        }
    })

    //2. SCROLL MENU
    let header = $('header');
    let slider = $('.slider');
    let heightSlider = slider.innerHeight();
    let heightHeader = header.innerHeight();

    $(document).on('scroll', function () {
        let scrollY = $(window).scrollTop();
        if (scrollY >= (heightSlider - heightHeader)) {
            header.addClass('active')
        } else {
            header.removeClass('active')
        }
    });

    let menus = $('header .menu a');
    let headerDeduct = $('header').outerHeight(true);
    let sections = [];

    function removeActiveMenu() {
        menus.each(function () {
            $(this).removeClass('active');
        })
    }

    menus.each(function () {
        let className = $(this).attr('href').replace('#', '');
        let section = $('.' + className);
        sections.push(section);

        $(this).on('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: section.offset().top - headerDeduct + 1,
                behavior: 'smooth',
            });
            removeActiveMenu();
            $(this).addClass('active');
        });
    });

    window.addEventListener('scroll', function (e) {
        let positionScroll = window.pageYOffset;
        sections.forEach(function (section, index) {
            if (positionScroll > section.offset().top - headerDeduct && positionScroll < section.offset().top + section.outerHeight(true)) {
                removeActiveMenu();
                $(menus[index]).addClass('active');
            } else {
                $(menus[index]).removeClass('active');
            }
        })
    })

    //3. LANG
    let lang = $('.lang');
    let langCurrent = $('.lang .lang__current span');
    let langOpt = $('lang .lang__option');
    let langItems = $('.lang .lang__option a');
    lang.click(function (e) {
        e.stopPropagation();
        lang.toggleClass('active');
    })
    langItems.click(function () {
        let langText = $(this).text();
        let langCurrentEn = langCurrent.text();
        langCurrent.html(langText);
        $(this).html(langCurrentEn);
    });

    $(document).on('click', function () {
        lang.removeClass('active');
    })
    // 4. BACK TO TOP
    let backtotop = $('.backtotop');
    backtotop.on("click", function () {
        $("html, body").animate({
            scrollTop: 0
        }, 200);
    });

    //5. TAB NEWS
    let tagText = $('.news__tags .tag');
    let tagList = $('.news__list');
    tagText.click(function (item, index) {
        let tagID = index + 1;
        console.log(tagID);
        tagText.toggleClass('active');
        tagList.toggleClass('active');
        $("item").addClass('active');
        $('document').click('.news__list-' + tagID).addClass('active');
    })

    //6. FAQ
    let acc = $('.question .accordion');
    acc.on('click', function () {
    acc.next().slideUp(200);
    acc.removeClass('active');
    if ($(this).next().css('display') == 'none') {
        $(this).addClass('active');
    }
    $(this).next().stop().slideToggle(200);
    })
    

    
    
    //8. POPUP VIDEOS
    
    let video = $('.video__item-wrap .video__item-img');
    let closeModalVideo = $('.popup-video .close');
    let popup_video = $('.popup-video');
    let iframe_video = $('.popup-video iframe');
    video.on('click', function (e) {
        e.stopPropagation();
        let video_id = $(this).data('video-id'),
            iframe_src = `https://www.youtube.com/embed/${video_id}?autoplay=1`;
        iframe_video.attr('src', iframe_src);
        popup_video.addClass('active');
    });
    function hideModal() {
        iframe_video.attr('src', '');
        popup_video.removeClass('active');
    }
    closeModalVideo.click(function () {
        hideModal();
    });
    iframe_video.click(function (e) {
        e.stopPropagation();
    })
    $(document).on('click', function () {
        hideModal();
    }) 

//FLICKITY
    

    let $carousel = $('.slider__item-wrap');
    $carousel.flickity({
        cellAlign: 'left',
        contain: true,
        wrapAround: true,
        prevNextButtons: false,
        on: {
            ready: function () {
                let dotted = $('.flickity-page-dots');
                paging = $('.paging .paging__dotted');
                dotted.appendTo(paging);
            },
            change: function (index) {
                let number = $('.paging .paging__number');
                let indexPage = index +1;
                number.text(indexPage.toString().padStart(2, 0))    
            }
        }
    });

//pre-button
    $('.control .control__btn.--prev').on('click', function(){
        $carousel.flickity('previous');
    });
    $('.control .control__btn.--next').on('click', function(){
        $carousel.flickity('next');
    });
// PHOTO Flickity
    let $photo = $('.photos');
    $photo.flickity( {
        cellAlign: 'left',
        contain: true,
        freeScroll: true,
        wrapAround: true,
        prevNextButtons: false
    });


//PHOTOSwipe GALLERY
    var initPhotoSwipeFromDOM = function(gallerySelector) {
        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;
            for(var i = 0; i < numNodes; i++) {
                figureEl = thumbElements[i]; // <figure> element
                if(figureEl.nodeType !== 1) {
                    continue;
                }
                linkEl = figureEl.children[0]; // <a> element
                size = linkEl.getAttribute('data-size').split('x');
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };
                if(figureEl.children.length > 1) {
                    item.title = figureEl.children[1].innerHTML; 
                }
                if(linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                } 
                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }
            return items;
        };
        var closest = function closest(el, fn) {
            return el && ( fn(el) ? el : closest(el.parentNode, fn) );
        };
        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            var eTarget = e.target || e.srcElement;
            var clickedListItem = closest(eTarget, function(el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });
            if(!clickedListItem) {
                return;
            }
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;
            for (var i = 0; i < numChildNodes; i++) {
                if(childNodes[i].nodeType !== 1) { 
                    continue; 
                }
                if(childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }
            if(index >= 0) {
                openPhotoSwipe( index, clickedGallery );
            }
            return false;
        };
        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
            params = {};
            if(hash.length < 5) {
                return params;
            }
            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');  
                if(pair.length < 2) {
                    continue;
                }           
                params[pair[0]] = pair[1];
            }
            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }
            return params;
        };
        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;
            items = parseThumbnailElements(galleryElement);
            options = {
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function(index) {
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect(); 

                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                },
                showAnimationDuration : 0,
                hideAnimationDuration : 0
            };
            if(fromURL) {
                if(options.galleryPIDs) {
                    for(var j = 0; j < items.length; j++) {
                        if(items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }
            if( isNaN(options.index) ) {
                return;
            }
            if(disableAnimation) {
                options.showAnimationDuration = 0;
            }
            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };
        var galleryElements = document.querySelectorAll( gallerySelector );
        for(var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }
        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
        }
    };
    initPhotoSwipeFromDOM('.carousel-img');
});

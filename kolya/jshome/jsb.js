// (function () {
    //     var addBtn = document.getElementById('add'),
    //         removeBtn = document.getElementById('remove');
    
    //         addBtn.addEventListener('click', function() {
    //             console.log(slide1(document.getElementById('collection').value));
    //         });
    
    //         removableBtn.addEventListener('click', function() {
    //             console.log(slide1(document.getElementById('collection').value));
    //         });
    
    //         console.log(addBtn, removeBtn);
    //     function slider(idWrapper) {
    //         var collection = [],
    //             galleryWrapper = idWrapper ? document.getElementById(idWrapper) : false;
    //             function gettAttributes (attr) {
    //                 return attr.split(',').map(function (item) {
    //                     return item.split(':');
    //                 });
    //             }
    //                 function createImg(item) {
    //                     var img = document.createElement('img');
    
    //                     img.setAttribute('src', item.src);
    
    //                     for (var key in item.attributes) {
    //                         img.setAttribute(key, item.attributes[key]);
    //                     }
    
    //                     return img;
    //                 }
        
    
    
    //         return function (options) {
    //             if (!options) {
    //                 console.log(' Yo did not get options');
    //                 return false;
    //             }
    
    //             options = options.split('|');
    //             var src = options[0],
    //                 attributes = gettAttributes(options[1]),
    //                 removable = (options[2] !== undefined) ? (options[2]=== 'true') : false,
    //                 status = src !== '' && attributes.alt !== undefined;
    
    //                 if (status && !removable) {
    //                     var newObj = {};
    //                         newObj.src = src;
    //                         newObj.attributes = attributes;
    //                         collection.push(newObj);
                        
                        
    //                 } else if (!status && !removable) {
    //                     console.log('Вы не указали обязательный параметр' + ((src === '') ? 'src' : 'alt'));
    //                 }
    //                 if (removable) {
    //                     collection.collection.filter(function (item) {
    //                         return item.src !== src;
    //                     });
    //                 }
    
    //                 if (galleryWrapper) {
    //                     galleryWrapper.innerHTML = '';
    //                     collection.forEach(function(item) {
    //                         galleryWrapper.append(createImg(item));
    //                     });
    //                 }
    
    //                 return collection;
                
                
    //         };
    //     }
    
    //     var slide1 = slider('gallery1');
    // })();
    
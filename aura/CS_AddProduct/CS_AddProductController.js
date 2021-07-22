({
    dropHandler: function (component, event, helper) {
      // Preventent default behavior (Prevent file from being opened)
      event.preventDefault();
      let image = component.get("v.images");
      var images = JSON.parse(JSON.stringify(image));
      console.log(images)
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < event.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (event.dataTransfer.items[i].kind === 'file') {
                var file = event.dataTransfer.items[i].getAsFile();
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                var base64String = reader.result;
                images.push(base64String);
                component.set("v.images", images);
             }
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (var i = 0; i < event.dataTransfer.files.length; i++) {
          console.log('... file[' + i + '].name = ' + event.dataTransfer.files[i].text());
        }
      }
    },

    dragOverHandler: function (component, event, helper) {
      event.preventDefault();
    },
    onAddProduct: function(component, event, helper) {
       helper.addProduct(component);
    }
})
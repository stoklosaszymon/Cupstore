({
    addProduct: function(component) {
        let action = component.get("c.addProduct");
        this.reorderFiles(component);
        component.set("v.loading", true);
        action.setParams({
            "name": component.get("v.productName"),
            "description": component.get("v.description"),
            "price": component.get("v.price"),
            "images": component.get("v.addedFiles").map( img => img.source)
        });
       action.setCallback(this, function(response) {
          let state = response.getState();
          if (state == 'SUCCESS') {
              this.handleMessage(
                  $A.get("$Label.c.Success"),
                  $A.get("$Label.c.Add_New_Product"),
                  "success"
              );
              component.set("v.loading", false);
          } else {
              this.handleErrors(
                  response.getError()
              );
              component.set("v.loading", false);
          }
       });
       $A.enqueueAction(action);
    },

    getUserProducts: function(component) {
        let action = component.get("c.getUserProducts");
        action.setCallback(this, function(response) {
           let state = response.getState();
           if (state == 'SUCCESS') {
                component.set("v.products", response.getReturnValue());
           } else {
                this.handleErrors(
                    response.getError()
                );
           }
        });
        $A.enqueueAction(action);
    },

    processFiles: function(component, event) {
      let images = JSON.parse(JSON.stringify(component.get("v.addedFiles")));
      let files = event.getSource().get("v.files");
      [ ...files].forEach( (file) => {
             let reader = new FileReader();
             reader.readAsDataURL(file);
             let fileName = file.name;
             reader.onloadend = function () {
               let base64String = reader.result.split(',').pop();
               images.push({name: file.name, source: base64String, isSelected: false});
               component.set("v.addedFiles", images);
               component.set("v.images", images.map(img => img.source));
          }
      });
    },

    reorderFiles: function(component) {
        let images = JSON.parse(JSON.stringify(component.get("v.addedFiles")));
        let foundImg = images.find( img => img.isSelected === true);
        let removed = images.splice(images.indexOf(foundImg), 1)[0];
        images.unshift(removed);
        component.set("v.addedFiles", images);
    },

    setDefaultImage: function(component, event) {
        let img = component.find("img");
        let index = event.currentTarget.dataset.id;


        img.forEach( image => {
           $A.util.removeClass(image, "selectedImg")
        })

        $A.util.addClass(img[index], "selectedImg");
        this.changeDefaultImage(component, event);
    },

    changeDefaultImage: function(component, event) {
        let images = component.get("v.addedFiles");
        let index = event.currentTarget.dataset.id;
        images.forEach( img => {
            img.isSelected = false;
        })
        images[index].isSelected = !images[index].isSelected;
        component.set("v.addedFiles", images);
    }
})
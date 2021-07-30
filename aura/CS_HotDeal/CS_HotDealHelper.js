({
   processTime: function(component) {
       setInterval( () => {
           let seconds = component.get("v.hotDeal.timeLeft");
           let time = new Date(seconds * 1000).toISOString().substr(11, 8);
           component.set("v.time", time);
           component.set("v.hotDeal.timeLeft", seconds - 1)
       }, 1000);
   }
})
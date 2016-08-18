$(document).ready(function () {
  getAnimals();
  $('#animal-submit').on('click', postAnimal);
});

function getAnimals() {
 $.ajax({
   type: 'GET',
   url: '/animals',
   success: function (animals) {
     console.log('GET /animals returns:', animals);
     animals.forEach(function (animal) {
       var $el = $('<div class="animal"><span class="name">' + animal.animal + ' </span><span class = "count">' + animal.number_animals + '</span></div>' );
      $('#animal-list').append($el);

       $el.data('animalID', animal.id);
       $('#animal-list').append($el);
     });
   },

   error: function (response) {
     console.log('GET /animals fail. No animals could be retrieved!');
   },
 });
}

function postAnimal() {
 event.preventDefault();

 var animal = {};

 $.each($('#animal-form').serializeArray(), function (i, field) {
   animal[field.name] = field.value;
 });

 $.ajax({
   type: 'POST',
   url: '/animals',
   data: animal,
   success: function () {
     console.log('POST /animals works!');
     $('#animal-list').empty();
     getAnimals();
   },
   error: function (response) {
     console.log('POST /animals does not work...');
   },
 });
}

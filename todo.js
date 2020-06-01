window.onload = function() {
    let noteArr = [];
    let addNotes;
    let takeNotes;
    
    function init() {
      if (localStorage.getItem('key') !== null) {
        takeLocal();
        create();
      }
    
      $('.add-todo').on('click', () => {
        console.log("+");
        addNote();
        init();
      });
    
      $('.clean-value').on('click', () => {
        $(".field-todo").val("");
        console.log("del");
      });
    
      $('.clean-item').on('click', (event) => {
        removeNotes();
      });
    
      $('.check-item').on('click', (event) => {
        checkNotes();
      });
    }
    
    function checkNotes() {
      let target = $(event.target);
      let classNotes = target.attr('class');
      let numEl = parseInt(classNotes.match(/\d+/));
      if (noteArr[numEl].check == 0) {
        noteArr[numEl].check = 1;
      } else {
        noteArr[numEl].check = 0;
      }
      console.log(noteArr[numEl]);
      addLocal();
      takeLocal();
      create();
      init();
    }
    
    function removeNotes() {
      let target = $(event.target);
      let classNotes = target.attr('class');
      let numEl = parseInt(classNotes.match(/\d+/));
      noteArr.splice(numEl, 1);
      addLocal();
      takeLocal();
      create();
      init();
    }
    
    function addNote() {
      let noteVal = $(".field-todo").val();
      if (noteVal != "") {
        noteArr.unshift({
          note: noteVal,
          check: 0
        });
        addLocal();
        takeLocal();
        create();
      }
      $(".field-todo").val("");
    }
    
    function addLocal() {
      let addNotes = JSON.stringify(noteArr);
      localStorage.setItem('key', addNotes);
    }
    
    function takeLocal() {
      let takeNotes = localStorage.getItem('key');
      noteArr = JSON.parse(takeNotes);
    }
    
    function create() {
      $('.todo').empty();
      noteArr.forEach((item, i) => {
        const colorCheck = getColorByCheck(item.check);
        const liClass = `li-${i}`;
        const removeClass = `remove-${i}`;
        const faClass = `fa-${i}`;
        const checkWrap = `check-${i}`;
        const checkClass = `check-${i}`;
        $('.todo').append($(`<li class='${liClass} ${colorCheck}'></li>`));
        console.log(item.note);
        $(`.${liClass}`).html(item.note);
        $(`.${liClass}`).append($(`<a href="#" class='clean-item ${removeClass}'>
        </a>`));
        $(`.${removeClass}`).append($(`<i class="fa fa-trash removal-corf ${faClass}" aria-hidden="true"></i>`));
        $(`.${liClass}`).append($(`<a href="#" class='check-item ${checkWrap}'></a>`));
        $(`.${checkWrap}`).append($(`<i class="fa fa-check check ${checkClass}" aria-hidden="true"></i>`));
      });
    }
    
    function getColorByCheck(check) {
      let colorClass = 'colorDefault';
      switch (check) {
        case 0:
          {
            colorClass = 'colorDefault';
            break;
          }
        case 1:
          {
            colorClass = 'green';
            break;
          }
        default:
      }
      return colorClass;
    }
    
    init();
    
};
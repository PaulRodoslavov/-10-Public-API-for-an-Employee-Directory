//-------Function to make first letter upper-case----------//

function captLetr(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//-------Function to make first letter upper-case in sentense----------//

function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

//---------------------AJAX request to get data--------------------//

fetch('https://randomuser.me/api/?results=12&nat=us,ca,gb')
  .then(response => response.json())
  .then(data => {

    //----get data and create blocks----//

    let infoUsers = data.results;
    for (let i = 0; i < infoUsers.length; i++) {
      let image = infoUsers[i].picture.large;
      let name = captLetr(infoUsers[i].name.first) + " " + captLetr(infoUsers[i].name.last);
      let email = infoUsers[i].email;
      let city = captLetr(infoUsers[i].location.city);
      container.innerHTML += `
    <div class="blockUser">
      <img src = '${image}' class="photo">
      <div class="textInfo">
        <div class="nameMain">${name}</div>
        <div class="email">${email}</div>
        <div class="city">${city}</div>
      </div>
    </div>
    `;
    }

    let arrBlocks = document.getElementsByClassName('blockUser');
    let wrapModalUser = document.getElementById('wrapModalUser');
    let currenrIndex;


    //----create modal window using loop----//

    for (let i = 0; i < arrBlocks.length; i++) {
      arrBlocks[i].addEventListener('click', (el) => {
        createModal(infoUsers[i]);
      });
    }

    //----function for creating modal window----//

    function createModal(element) {
      let image = element.picture.large;
      let name = captLetr(element.name.first) + " " + captLetr(element.name.last);
      let email = element.email;
      let city = captLetr(element.location.city);
      let cell = element.cell;
      let street = titleCase(element.location.street);
      let state = titleCase(element.location.state);
      let postcode = element.location.postcode;
      let birthday = '05/13/1990';

      wrapModalUser.style.display = "flex";
      wrapModalUser.innerHTML = `
       <div class="modalUser">
         <img src = 'img/cross.png' class="imgCross" >
         <img src = 'img/right.png' class="imgRigth" id="nextBtn">
         <img src = 'img/right.png' class="imgLeft" id="prevBtn">
         <img src = '${image}' class="photoModal" >
         <div class="name">${name}</div>
         <div class="email">${email}</div>
         <div class="city">${city}</div>
         <div class='border'>
          <div class="cell">${cell}</div>
           <span class="street">${street}</span>
           <span class="state">${state}</span>
           <span class="postcode">${postcode}</span>
         </div>
         <div class="birthday">${birthday}</div>
       </div>
       `;
      currenrIndex = infoUsers.indexOf(element);

      //----function to go to the next modal----//

      function nextBtn(element) {
        document.getElementById('nextBtn').onclick = function() {
          if ((infoUsers[currenrIndex + 1])) {
            createModal(infoUsers[currenrIndex + 1]);
          } else createModal(infoUsers[0]);
        };
      }
      //----function to go to previous modal----//

      function prevBtn(element) {
        document.getElementById('prevBtn').onclick = function() {
          if (infoUsers[currenrIndex - 1]) {
            createModal(infoUsers[currenrIndex - 1]);
          } else createModal(infoUsers[infoUsers.length - 1]);
        };
      }
      prevBtn();
      nextBtn();

    } //--function end--//

    //----close pop up----//

    wrapModalUser.onclick = (el) => {
      if (el.target.className == 'imgCross' || el.target.className == 'wrapModalUser') {
        wrapModalUser.style.display = "none";
      }
    };

    //---------------------filter users by name--------------------//

    document.getElementById('search').addEventListener('keyup', function(event) {
      let searchInput = document.getElementById('search').value;
      let name = document.querySelectorAll('.nameMain');

      for (let j = 0; j < name.length; j++) {
        if (name[j].innerHTML.toUpperCase().includes(searchInput.toUpperCase())) {
          name[j].parentNode.parentNode.style.display = "flex";
          console.log(name[j].parentNode.parentNode);
        } else name[j].parentNode.parentNode.style.display = "none";
      }
    });

  }); //--End AJAX request--//

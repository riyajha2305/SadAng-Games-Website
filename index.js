    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBU5k4vRh9Y008P2lGTC9e9WHLuI4sXoIg",
        authDomain: "final-sadang.firebaseapp.com",
        projectId: "final-sadang",
        storageBucket: "final-sadang.appspot.com",
        messagingSenderId: "859514664414",
        appId: "1:859514664414:web:e42005e2265bbbba99194f"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  function signUp(){

    var email = document.getElementById("email");
    var password = document.getElementById("password");
const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
promise.catch(e => alert(e.message));

alert("Signed Up");

  }

  function signIn(){

    var email = document.getElementById("email");
    var password = document.getElementById("password");
const promise = auth.signInWithEmailAndPassword(email.value, password.value);
promise.catch(e => alert(e.message));


//Take user to a different or home page


  }

  function signOut(){

auth.signOut();
alert("Signed Out");

  }

  firebase.auth().onAuthStateChanged(function(user){
    
    
      if(user){
        
        var email = user.email;
        alert("Active user " + email);
        window.location.assign("welcome page.html");
    
        
        //is signed in
       
        
      }else{
     
    alert("No Active User");
    //no user is signed in
   
      
}
      });















// Back to top button

const backToTopButton = document.querySelector("#back-to-top-btn");
window.addEventListener("scroll", () => {
    if(window.pageYOffset > 500) { //make the button visible
        backToTopButton.style.display = "block";
    }
    else { // hide the button
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo(0,0);
});




//--------contact us----------//

(function() {
  // get all data in form and return object
  function getFormData(form) {
      var elements = form.elements;
      var honeypot;

      var fields = Object.keys(elements).filter(function(k) {
          if (elements[k].name === "honeypot") {
              honeypot = elements[k].value;
              return false;
          }
          return true;
      }).map(function(k) {
          if(elements[k].name !== undefined) {
              return elements[k].name;
              // special case for Edge's html collection
          }else if(elements[k].length > 0){
              return elements[k].item(0).name;
          }
      }).filter(function(item, pos, self) {
          return self.indexOf(item) == pos && item;
      });

      var formData = {};
      fields.forEach(function(name){
          var element = elements[name];

          // singular form elements just have one value
          formData[name] = element.value;

          // when our element has multiple items, get their values
          if (element.length) {
              var data = [];
              for (var i = 0; i < element.length; i++) {
                  var item = element.item(i);
                  if (item.checked || item.selected) {
                      data.push(item.value);
                  }
              }
              formData[name] = data.join(', ');
          }
      });

      // add form-specific values into the data
      formData.formDataNameOrder = JSON.stringify(fields);
      formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
      formData.formGoogleSendEmail
          = form.dataset.email || ""; // no email by default

      return {data: formData, honeypot: honeypot};
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
      event.preventDefault();           // we are submitting via xhr below
      var form = event.target;
      var formData = getFormData(form);
      var data = formData.data;

      // If a honeypot field is filled, assume it was done so by a spam bot.
      if (formData.honeypot) {
          return false;
      }

      disableAllButtons(form);
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      // xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              form.reset();
              var formElements = form.querySelector(".form-elements")
              if (formElements) {
                  formElements.style.display = "none"; // hide form
              }
              var thankYouMessage = form.querySelector(".thankyou_message");
              if (thankYouMessage) {
                  thankYouMessage.style.display = "block";
              }
          }
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
  }

  function loaded() {
      // bind to the submit event of our form
      var forms = document.querySelectorAll("form.gform");//Get all the forms having class="gform" in the form tag
      for (var i = 0; i < forms.length; i++) {
          forms[i].addEventListener("submit", handleFormSubmit, false);
      }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
      var buttons = form.querySelectorAll("button");
      for (var i = 0; i < buttons.length; i++) {
          buttons[i].disabled = true;
      }
  }
})();

//content creator function

function content_creator(cont,tag){
    var firebaseref=firebase.database().ref("GameBase");
    firebaseref.on("value",(snapshot)=>{
        var data=snapshot.val();
        var x=0;
        for (let i in data){
            if (data[i]["Tag"]==tag && x<10){
                let elements=`<div class="card unselectebal" id="card-${data[i]['Name']}"> 
                <div class="image_con unselectebal">
                <img src="${data[i]['image_link']}" alt="IMAGE NOT FOUND">
                <div>${data[i]['Tag']}</div>
                </div>
                <div class="game_con unselectebal">
                ${data[i]['Name']}
                <div class="game_name unselectebal">
                ${data[i]['Name']}
                <div class="admin_edit" id="admin_edit">
                <img src="images/edit icon.png" alt="" class="image_edit ${i}" onclick="edit(this.id)" id="only_admin_icon-${i}">
                <img src="images/delete icon.png" alt="" class="image_edit ${i}" onclick="delet(this.id)" id="only_admin_icon_${i}">
                </div>
                </div>
                <div class="game_info unselectebal">
                <div class="rate unselectebal">${data[i]['Rate']} rating</div>
                <div class="views unselectebal" style="color: #9d9d9d; "><span style="color: #4025FB; font-weight:600;">${data[i]['Views']}</span> Views </div>
                </div>
                <div class="imp_btn unselectebal">
                <a href="game_page.html?game_id=${i}" class="play_now">Play Now</a>
                <a href="review.html?game_id=${i}">Review</a>
                </div>
                </div>
                </div>`
                const main_c=document.getElementById(cont);
                var div=document.createElement("div");
                div.className="tilt";
                div.innerHTML=element;
                main_c.appendChild(div);
                x+=1
            }
        }
    })
}
content_creator("main_container_new","NEW")
content_creator("main_container_trend", "TRENDING")
                








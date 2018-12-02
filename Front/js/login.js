var teamId= $('sifraTima').val();
var form = document.getElementById("forma");
var ceo_tim = {};
var photo_url="";
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nazivPolje = $('#sifraTima').val();
    if(sifraTima == nazivPolje){
        return;
    }
    else
    {
         var prikazDiv = document.getElementById("prikaz");
         while (prikazDiv.firstChild) {
              prikazDiv.removeChild(prikazDiv.firstChild);
         }
        sifraTima=nazivPolje;
    }
    console.log(nazivPolje);
    //var sifraPolje = window.localStorage.getItem(nazivPolje);

    var requestURL = "http://localhost:5000/teams/";

    var request = new XMLHttpRequest();

    request.open('GET', requestURL + nazivPolje);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var tim = request.response;
        try{
        photo_url=tim['photo_url'];
        console.log(tim);
        ceo_tim=tim;
        //samo prikaz u konzoli zbog demonstracije
        var div = document.getElementById('prikaz');
        var myH1 = document.createElement('label');
        var label = document.createElement('p');
        label.classList.add('label');
        label.textContent = 'Ime tima';
        div.appendChild(label);
        myH1.textContent = tim['name'];
        myH1.classList.add('timPodaci');
        div.appendChild(myH1);
        var myPar = document.createElement('label');
        myPar.textContent = tim['description'];
        myPar.id='opis_tima';
        myPar.classList.add('timPodaci');
        var label2 = document.createElement('p');
        label2.textContent = 'Opis tima';
        label2.classList.add('label');
        div.appendChild(label2);
        div.appendChild(myPar);

        var clanovi = tim['team_members'];
        //var clanovi_tima= tim['team_members'];
        ispisiClanove(clanovi, div);
        }
    catch
    {
        var lbl1=document.createElement('label');
        lbl1.textContent="Nema tima.";
        ;while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        div.appendChild(lbl1);
    }

    }

}, false);

function ispisiClanove(clanovi, div) {

    for (var j = 0; j < clanovi.length; j++) {
        var myArticle = document.createElement('article');
        myArticle.setAttribute("id",clanovi[j].id);
        var ime = document.createElement('p');
        var prezime = document.createElement('p');
        var email = document.createElement('p');
        var brojTelefona = document.createElement('p');
        var skola = document.createElement('p');
        var mestoSkole = document.createElement('p');
        ime.textContent = clanovi[j].first_name;
        prezime.textContent = clanovi[j].last_name;
        email.textContent = clanovi[j].email;
        brojTelefona.textContent = clanovi[j].phone_number;
        skola.textContent = clanovi[j].school;
        mestoSkole.textContent = clanovi[j].city;
        var lblIme= document.createElement('label');
        var lblPrezime= document.createElement('label');
        var lblEmail= document.createElement('label');
        var lblTelefon= document.createElement('label');
        var lblSkola= document.createElement('label');
        var lblMesto= document.createElement('label');
        lblIme.textContent= 'Ime:';
        lblIme.classList.add('artikl-poz');
        ime.classList.add('artikl-poz');
        myArticle.appendChild(lblIme);
        myArticle.appendChild(ime);
       // myArticle.appendChild(document.createElement('br'));
       // myArticle.appendChild(document.createElement('br'));
        lblPrezime.textContent= 'Prezime:';
        lblPrezime.classList.add('artikl-poz');
        prezime.classList.add('artikl-poz');
        myArticle.appendChild(lblPrezime);
        myArticle.appendChild(prezime);
       // myArticle.appendChild(document.createElement('br'));
      //  myArticle.appendChild(document.createElement('br'));
        lblEmail.classList.add('artikl-poz');
        email.classList.add('artikl-poz');
        lblEmail.textContent= 'Email:';
        myArticle.appendChild(lblEmail);
        myArticle.appendChild(email);
       // myArticle.appendChild(document.createElement('br'));
       // myArticle.appendChild(document.createElement('br'));
        lblTelefon.textContent= 'Broj:';
        lblTelefon.classList.add('artikl-poz');
        brojTelefona.classList.add('artikl-poz');
        myArticle.appendChild(lblTelefon);
        myArticle.appendChild(brojTelefona);
        myArticle.appendChild(document.createElement('br'));
        //myArticle.appendChild(document.createElement('br'));
        lblSkola.textContent= 'Skola:';
        lblSkola.classList.add('artikl-poz');
        skola.classList.add('artikl-poz');
        myArticle.appendChild(lblSkola);
        myArticle.appendChild(skola);
       // myArticle.appendChild(document.createElement('br'));
       // myArticle.appendChild(document.createElement('br'));
        lblMesto.textContent= 'Mesto:';
        lblMesto.classList.add('artikl-poz');
        mestoSkole.classList.add('artikl-poz');
        myArticle.appendChild(lblMesto);
        myArticle.appendChild(mestoSkole);
        //myArticle.appendChild(document.createElement('br'));
        var aj_di= document.createElement('label');
        aj_di.textContent= 'Id: '+ clanovi[j].id;
        aj_di.classList.add('idClana');
        myArticle.appendChild(aj_di);
        myArticle.classList.add('clanoviTimaLogin');

        div.appendChild(myArticle);

    }
    var dugme = document.createElement('input');
    dugme.classList.add('btn');
    dugme.setAttribute('type', 'submit');
    dugme.value='Obrisi';
    dugme.onclick= function(){
        var team_id=$('#sifraTima').val();
        var rUrl = "http://localhost:5000/teams/";
        var r = new XMLHttpRequest();
        console.log(ceo_tim);
        r.open('DELETE', `${rUrl}${team_id}`);
        console.log(`${team_id}`);
        r.responseType = 'json';
        r.send();
        window.location.href=window.location.href;
    }
    div.appendChild(dugme);

}
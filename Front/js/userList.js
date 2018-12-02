var form = document.getElementById("forma");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var sifraPolje = $('#sifraUsera').val();
    var timski_id=$('#sifraTima').val();
    var requestURL = "http://localhost:5000/teams/";
    var request = new XMLHttpRequest();
    console.log(timski_id);
    request.open('GET', requestURL +`${timski_id}?${sifraPolje}`);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        var tim = request.response;
        var user={};
        users=tim['team_members'];
        for(var k=0;k<users.length;k++){
            if(users[k].id==sifraPolje) user=users[k];
        }
        var div = document.getElementById('prikaz');
        var ime = document.createElement('input');
        var prezime = document.createElement('input');
        var email = document.createElement('input');
        var brojTelefona = document.createElement('input');
        var skola = document.createElement('input');
        var mestoSkole = document.createElement('input');
        ime.value = user['first_name'];
        prezime.value = user['last_name'];
        email.value = user['email'];
        brojTelefona.value = user['phone_number'];
        skola.value =user['school'];
        mestoSkole.value = user['city'];
        var lblIme= document.createElement('label');
        var lblPrezime= document.createElement('label');
        var lblEmail= document.createElement('label');
        var lblTelefon= document.createElement('label');
        var lblSkola= document.createElement('label');
        var lblMesto= document.createElement('label');
        lblIme.textContent='Ime:';
        div.appendChild(lblIme);
        div.appendChild(ime);
        lblPrezime.textContent='Prezime:';
        div.appendChild(lblPrezime);
        div.appendChild(prezime);
        lblEmail.textContent='Email:';
        div.appendChild(lblEmail);
        div.appendChild(email);
        lblTelefon.textContent='Telefon:';
        div.appendChild(lblTelefon);
        div.appendChild(brojTelefona);
        lblSkola.textContent='Skola:';
        div.appendChild(lblSkola);
        div.appendChild(skola);
        lblMesto.textContent='Mesto:';
        div.appendChild(lblMesto);
        div.appendChild(mestoSkole);
        var btn=document.createElement('button');
        btn.setAttribute('type','submit');
        btn.classList.add('dugmeUpdate');
        btn.innerHTML='Azuriraj';
        btn.onclick= function(){
            var inputi= $("#prikaz :input");
            console.log(inputi);
            user['first_name']=inputi[0].value;
            user['last_name']=inputi[1].value;
            user['email']=inputi[2].value;
            user['phone_number']=inputi[3].value;
            user['school']=inputi[4].value;
            user['city']=inputi[5].value;
            console.log(user);
            var rUrl = "http://localhost:5000/teams/";
            var r = new XMLHttpRequest();
            r.body=JSON.stringify(user);
            var aj_di =$('#sifraUsera').val();
            var team_uuid=$('#sifraTima').val();
            r.open('PUT', rUrl +`${team_uuid}:${aj_di}`);
            r.responseType = 'json';
            r.send();
            //window.location.href=window.location.href;
        }
        div.appendChild(btn);
    }

}, false);
(function () {
    function toJSONString(form) {
        var objekatTim = {};
        var prviClan = {};
        var drugiClan = {};
        var treciClan = {};
        var cetvrtiClan = {};
        var nizClanova = [];

        var informOTimu = $(".opsteInformacije, :input");
        var clanoviTima = $(".clanTima, :input");
        for (var i = 0; i < informOTimu.length; ++i) {
            var element = informOTimu[i];
            var kljucTim = element.name;
            var vrednostTima = element.value;

            if (kljucTim == "name" || kljucTim == "description" || kljucTim == "photo_url") {
                objekatTim[kljucTim] = vrednostTima;
            }

        }

        for (var y = 0; y < clanoviTima.length; ++y) {
            var clan = clanoviTima[y];
            var kljucClan = clan.name;
            var vrednostClan = clan.value;
            var clanId = clan.id;

            console.log(clanoviTima[0]);

            if (clanId == "first_name1" || clanId == "last_name1" || clanId == "email1" || clanId == "phone_number1" || clanId == "school1" || clanId == "city1") {
                prviClan[kljucClan] = vrednostClan;
                nizClanova[0] = prviClan;
            }

            if (clanId == "first_name2" || clanId == "last_name2" || clanId == "email2" || clanId == "phone_number2" || clanId == "school2" || clanId == "city2") {
                drugiClan[kljucClan] = vrednostClan;
                nizClanova[1] = drugiClan;
            }

            if (clanId == "first_name3" || clanId == "last_name3" || clanId == "email3" || clanId == "phone_number3" || clanId == "school3" || clanId == "city3") {
                treciClan[kljucClan] = vrednostClan;
                nizClanova[2] = treciClan;
            }
            if (clanId == "first_name4" || clanId == "last_name4" || clanId == "email4" || clanId == "phone_number4" || clanId == "school4" || clanId == "cit4") {
                treciClan[kljucClan] = vrednostClan;
                nizClanova[3] = treciClan;
            }

            nizClanova[0] = prviClan;
            nizClanova[1] = drugiClan;
            nizClanova[2] = treciClan;
            nizClanova[3]= cetvrtiClan;
            objekatTim["clanovi"] = nizClanova;

        }

        return JSON.stringify(objekatTim);
    }

    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("forma");
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var json = toJSONString(this);
            console.log(json)
            posaljiNaServer(json);
        }, false);

    });

})();

function posaljiNaServer(json) {
    var req = new XMLHttpRequest();
    var base = "http://localhost:5000/teams/"
    req.open('POST', base, true)
    req.body= JSON.stringify(json);
    req.setRequestHeader('Content-Type', 'application/json')

    req.onload = function (e) {
        if (req.readyState === 4) {
            if (req.status === 201) {
                console.log(req.responseText);
            } else {
                console.error(req.statusText);
            }
        }
    };

    req.send(JSON.stringify(json));
}

function hajlajt(){
    var dugme=document.getElementById('btnSend');
    dugme.style.backgroundColor="rgb(196, 196, 196)";
}
function vratiNaStaro(){
    var dugme= document.getElementById('btnSend');
    dugme.style.backgroundColor= 'rgb(56, 56, 56)';
}
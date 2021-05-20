var SparshaFRCheck = {};
SparshaFRCheck.SDK = "7.0.2";
SparshaFRCheck.AuthBasic = "6.0.2";
SparshaFRCheck.AuthPro = "3.0.2";
SparshaFRCheck.AuthProMob = "2.0.1";
SparshaFRCheck.RDBasic = "6.0.0";
SparshaFRCheck.RDPro = "3.0.0";
SparshaFRCheck.Storage = "2.0.0";

SparshaFRCheck.isOutdated = false;
SparshaFRCheck.inText = "";

SparshaFRCheck.versionStringCompare = function(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        } else if (v1parts[i] > v2parts[i]) {
            return 1;
        } else {
            return -1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}
SparshaFRCheck.compareActions = function(check, version, text) {
    console.log(version)
    if (version != undefined && SparshaFRCheck.versionStringCompare(check, version) === 1) {
        SparshaFRCheck.inText += "Firebase " + text + ": " + version + " ➜ " + check + "<br>";
        SparshaFRCheck.isOutdated = true;
    }
}

SparshaFRCheck.compareActions(SparshaFRCheck.SDK, SparshaFRVersion.SDK, "SDK");
SparshaFRCheck.compareActions(SparshaFRCheck.AuthBasic, SparshaFRVersion.AuthBasic, "Auth-Basic");
SparshaFRCheck.compareActions(SparshaFRCheck.AuthPro, SparshaFRVersion.AuthPro, "Auth-Pro");
SparshaFRCheck.compareActions(SparshaFRCheck.AuthProMob, SparshaFRVersion.AuthProMob, "Auth-Pro Mobile");
SparshaFRCheck.compareActions(SparshaFRCheck.RDBasic, SparshaFRVersion.RDBasic, "RD-Basic");
SparshaFRCheck.compareActions(SparshaFRCheck.RDPro, SparshaFRVersion.RDPro, "RD-Pro");
SparshaFRCheck.compareActions(SparshaFRCheck.Storage, SparshaFRVersion.Storage, "Storage");

if (SparshaFRCheck.isOutdated) {
    var $sliderParent = document.createElement("sliderParent");
    document.getElementsByTagName("body")[0].appendChild($sliderParent);

    $sliderParent.innerHTML = `
<div id="slider" class="slide-in">
    
        <h3>NEW UPDATES AVAILABLE</h3>` + SparshaFRCheck.inText + `<br>
        <i><b>This note is only shown in preview.construct.net</b></i><br><br>
        <a href="https://www.constructfirebase.com/releases" target="_blank"><h4>View Release Notes</h4></a>
        
    
</div>
<style>
#slider h3{
    margin:0;
    margin-bottom:8px
}
#slider h4{
    margin:0;
}
#slider {
    color:black;
    font-size:12px;
    font-family: sans-serif;
    position: absolute;
    left:0px;
    top:8px;
    padding:16px;
    padding-right:36px;
    background: #FFD54F;
    -moz-user-select: none;  
    -webkit-user-select: none;  
    -ms-user-select: none;  
    -o-user-select: none;  
    user-select: none;
    transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
}

.slide-in {
    animation: slide-in 1s forwards;
    -webkit-animation: slide-in 1s forwards;
}

.slide-out {
    animation: slide-out 2s forwards;
    -webkit-animation: slide-out 2s forwards;
}

@keyframes slide-in {
    100% {
        transform: translateX(0%);
    }
}

@-webkit-keyframes slide-in {
    100% {
        -webkit-transform: translateX(0%);
    }
}

@keyframes slide-out {
    0% {
        transform: translateX(0%);
    }

    100% {
        transform: translateX(-100%);
    }
}

@-webkit-keyframes slide-out {
    0% {
        -webkit-transform: translateX(0%);
    }

    100% {
        -webkit-transform: translateX(calc(-100%+8px));
    }
}
<//style>
`;

    var $slider = document.getElementById('slider');
    $slider.addEventListener('click', function() {
        var isOpen = $slider.classList.contains('slide-in');

        $slider.setAttribute('class', isOpen ? 'slide-out' : 'slide-in');
    });
    setTimeout(function() { $slider.setAttribute('class', 'slide-out') }, 4000);
}
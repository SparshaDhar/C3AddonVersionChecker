/*The C3AddonVersion_Set function sets current versions of plugin and loads the online file- version-checker.js*/

//C3AddonVersion_Set("YOUR_GROUP_NAME", "YOUR_ADDON_NAME", "ADDON_VERSION");

/*DO NOT EDIT THE CODE BELOW*/
function C3AddonVersion_Set(group, name, version) {
    var storageItem = localStorage.getItem("C3AddonVersionCheck");
    if (window.location.hostname === "preview.construct.net" && (storageItem === null || storageItem === "Y" || (Date.now() - storageItem) > 86400000)) {
        var fileref = document.createElement('script');
        fileref.type = "application/javascript";
        fileref.setAttribute("src", "https://cdn.jsdelivr.net/gh/SparshaDhar/C3AddonVersionChecker/version-checker.js");
        if (window.C3AddonVersion_Current === undefined) {
            window.C3AddonVersion_Current = {};
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
        if (window.C3AddonVersion_Current[group] === undefined) window.C3AddonVersion_Current[group] = {};
        window.C3AddonVersion_Current[group][name] = version;
    }
}

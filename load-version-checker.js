function C3AddonVersion_Load(group, name, version) {
    if (window.location.hostname === "preview.construct.net" && (C3AddonVersion_Obj.storage === null || C3AddonVersion_Obj.storage === "Y" || (Date.now() - C3AddonVersion_Obj.storage) > 86400000)) {
        var fileref = document.createElement('script');
        fileref.type = "application/javascript";
        fileref.setAttribute("src", "https://cdn.jsdelivr.net/gh/SparshaDhar/C3AddonVersionChecker/latestVersions.min.js");
        if (window.C3AddonVersion_Current === undefined) {
            window.C3AddonVersion_Current = {};
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
        if (window.C3AddonVersion_Current[group] === undefined) window.C3AddonVersion_Current[group] = {};
        window.C3AddonVersion_Current[group][name] = version;
    }
}

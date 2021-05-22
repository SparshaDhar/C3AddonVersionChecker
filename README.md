# Addon Version Checker for Construct 3 Preview
Compare versions and Notify client if installed addon version is older than the latest addon version available (works only in Construct 3 Preview).

## Features
- Group Addons into `<div>`.
- Optional Release Notes and Download Link
- Only lists all uptates available for addons included in current C3 Project.
- Features Shadow dom element so that it cannot be accessed directly from `document` and global styles won't affect it.
- Loads version-checker.js only if in Construct preview. Disables itself in Export.
- Smoothly slides in and slides out of the viewport.
- Auto-destroys itself when out of viewport.
- Snooze notification for 1 day option in client side

![Screenshot](https://user-images.githubusercontent.com/42723600/119241172-341e5100-bb72-11eb-8929-2d24adc2b3cf.png)

## Documentation

### Inside Addon

All Addon Version Checker Codes must be included the `"external-script"` type (also known as DOM side) script of the addon.

For each of your plugin, create a domSide.js external-script. And then include the following code

```js
C3AddonVersion_Set("YOUR_GROUP_NAME", "YOUR_ADDON_NAME", "ADDON_VERSION");

//DO NOT EDIT THE CODE BELOW
function C3AddonVersion_Set(group, name, version) {
    var storageItem = localStorage.getItem("C3AddonVersionCheck");
    if (window.location.hostname === "preview.construct.net" && (storageItem === null || storageItem === "Y" || (Date.now() - storageItem) > 86400000)) {
        var fileref = document.createElement('script');
        fileref.type = "application/javascript";
        fileref.setAttribute("src", "https://cdn.jsdelivr.net/gh/SparshaDhar/C3AddonVersionChecker@latest/version-checker.min.js");
        if (window.C3AddonVersion_Current === undefined) {
            window.C3AddonVersion_Current = {};
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
        if (window.C3AddonVersion_Current[group] === undefined) window.C3AddonVersion_Current[group] = {};
        window.C3AddonVersion_Current[group][name] = version;
    }
}
```

<br>

### Online CDN File- version-checker.js

Variable `C3AddonVersion_Latest` contains a JSON data of addon names and their latest versions.

Format:

```js
var C3AddonVersion_Latest = {
  "GROUP_NAME 1": {
    "ADDON_NAME 1": "x.x.x.x",
    "ADDON_NAME 2": "x.x.x.x",
    "ADDON_NAME n": "x.x.x.x",
    $releaseNotes: "https://....",
    $downloadLink: "https://....",
    },
}
```

<br>

### Requesting for Including New Update Records in version-checker.js

#### Method 1: Become a contributor for updating your own Addon versions
Answer all qustions in this interview to become a contributor. [Click here](https://github.com/SparshaDhar/C3AddonVersionChecker/issues/new?assignees=&labels=interview&template=contributor-interview.md&title=Contributor+Interview)

#### Method 2: Request version updates
Enter all the Required fields to get your request accepted. [Click here](https://github.com/SparshaDhar/C3AddonVersionChecker/issues/new?assignees=&labels=version+update&template=request-version-include-update.md&title=Update+Versions)


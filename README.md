# Addon Version Checker for Construct 3 Preview
Compare versions and Notify client if installed addon version is older than the latest addon version available (works only in Construct 3 Preview).

It checks for all addons,  included in a C3 project and presents the notification in a list when in preview. Addons are grouped on request of the addon author. (How to request your addon is mentioned below).

## Features
- Group specific Addons into `<div>`.
- Optional Release Notes and Download Link
- Only lists all uptates available for addons included in current C3 Project.
- Features Shadow dom element so that it cannot be accessed directly from `document` and global styles won't affect it.
- Loads version-checker.js only if in Construct preview. Disables itself in Export.
- Smoothly slides in and slides out of the viewport.
- Auto-destroys itself when out of viewport.
- Snooze notification for 1 day option in client side

![Screenshot](https://user-images.githubusercontent.com/42723600/119241172-341e5100-bb72-11eb-8929-2d24adc2b3cf.png)

## Documentation

### Inside Addon (Client-side): load-version-checker.js
The "load-version-checker.js" is responsible for loading the server-side script, "version-checker.js", and sending the current addon version info to the server-side.

All Addon Version Checker Codes must be included in an `"external-script"` (also known as DOM side) script of the addon.

For each of your addon, create a domSide.js external-script. And then include the following code

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

### Online file (Server-side): version-checker.js
The "version-checker.js" is the online file stored in this github page which contains all the latest information of the addons. It is responsible for comparing the version data fetched from the client-side with the data stored in this server-side file, and creating/managing the HTML elements for the notification if the latest version available is greater than the user's installed addon.

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

#### Method 1: Become a collaborator for updating your own Addon versions
Answer all qustions in this interview to become a contributor. [Click here](https://github.com/SparshaDhar/C3AddonVersionChecker/issues/new?assignees=&labels=interview&template=contributor-interview.md&title=Contributor+Interview)

#### Method 2: Request version updates
Enter all the Required fields to get your request accepted. [Click here](https://github.com/SparshaDhar/C3AddonVersionChecker/issues/new?assignees=&labels=version+update&template=request-version-include-update.md&title=Update+Versions)

<br><br>
------

[![twitter](https://media.discordapp.net/attachments/710473860687855676/845914202765000715/Twitter_social_icons_-_circle_-_blue.png?width=32&height=32)](https://twitter.com/SparshaDhar)
[![itch](https://media.discordapp.net/attachments/710473860687855676/845914204757032960/itch_icon_146025.png?width=32&height=32)](https://sparsha-dhar.itch.io/)
[![patreon](https://media.discordapp.net/attachments/710473860687855676/845914207115673650/Untitled.png?width=32&height=32)](https://www.patreon.com/sparsha)

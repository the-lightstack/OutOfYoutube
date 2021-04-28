# OutOfYoutube
An open source firefox add-on that let's you only watch youtube in a certain time frame

## How to build it

`zip -r -FS ./buildExtension.xpi * --exclude 'extension.xpi'` <br>
buildExtension.xpi will be the file that contains the entire plugin and can be loaded into Firefox via about:debugging -> load Temporary extension (select buildExtension.xpi)

The Extension can also be found on AMO [here](https://addons.mozilla.org/en-US/firefox/addon/outofyoutube/)

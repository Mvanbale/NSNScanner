var App = angular.module("app", ["ionic"]);

angular.element(document).ready(function () {

    var isCordovaApp = !!window.cordova;

    if (isCordovaApp) {
        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            if (navigator.camera != undefined) {
                App.factory('nsnCamera', nsnPhoneCamera);
            } else {
                App.factory('nsnCamera', nsnMockCamera);
            }

            startApp();
        }
    } else {
        App.factory('nsnCamera', nsnMockCamera);
        startApp();
    }
});

//initialize angular, and load in the GUI, if there wasn't here you would see the ugly non-angular version of the site while it's loading.
function startApp() {
    angular.bootstrap(document, ["app"]);
    
    Loading(false);
    

}


function Loading(loadingBool) {
    var documentMain = document.getElementsByTagName("MAIN")[0];
    var loadingImage = document.getElementById("loadingImage");

    if (loadingBool) {
        documentMain.style.display = "none";
        loadingImage.style.display = "block";
    } else {
        documentMain.style.display = "block";
        loadingImage.style.display = "none";
    }
    


}


App.controller("AppController", ["$scope", "$log", "nsnCamera", AppCtrl]);

function AppCtrl($scope, $log, nsnCamera) {

    $scope.EncodedImage;


    $scope.search = {
        NatoStockNumber: ''
    };




    $scope.takePicture = function takePicture() {
        Loading(true);
        $scope.getJsonData();
        nsnCamera.getPictureImageURL(handlePictureTaken);




        function handlePictureTaken(pictureURI) {
            $scope.EncodedImage = pictureURI;
            $scope.readImage($scope.EncodedImage);
        }


        //TODO: Add HandlePictureError function

    }

    //
    $scope.readImage = function readImage(image) {


        convertDataURLToImageData(
            image,
            function (imageData) {
                foundText = OCRAD(imageData);
                $scope.search.NatoStockNumber = parseInt(foundText);
                document.getElementById("outputdiv").style.display = "block";
                Loading(false);

            }
        )

    }

    $scope.items;
    
    $scope.getJsonData = function getJsonData() {
        return loadJSON(function (response) {
            // Parse JSON string into object
            $scope.items = JSON.parse(response);
            $scope.$apply();
        });

    }

}


function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}



//needed to feed OCRAD 
function convertDataURLToImageData(dataURL, callback) {
    if (dataURL !== undefined && dataURL !== null) {
        var canvas, context, image;
        canvas = document.createElement('canvas');
        canvas.width = 470;
        canvas.height = 470;
        context = canvas.getContext('2d');
        image = new Image();
        image.addEventListener('load', function () {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            callback(context.getImageData(0, 0, canvas.width, canvas.height));
        }, false);
        image.src = dataURL;
    }
}

//Method that actually takes a picture while on a phone, only used if phone camera is available.
function nsnPhoneCamera() {
    return {
        getPictureImageURL: function getPictureImageURL(handlePictureTaken) {

            navigator.camera.getPicture(function (imageURI) {
                console.log("Success");

                console.log(imageURI);

                handlePictureTaken(imageURI);

            }, function (err) {
                console.log("fail")
                    //TOD CALLBACK USER CANCELLED OUT OF PHOTO APP

            }, {
                saveToPhotoAlbum: false
            });
        }
    }
}

//Method that is used when there is no cordova or camera available. At the moment it returns a standard mock NSN for testing purposes found in the www/img folder.
function nsnMockCamera() {
    return {
        getPictureImageURL: function getPictureImageURL(handlePictureTaken) {
            handlePictureTaken("/www/img/MockNSN.jpg");
        }
    }
}
function InsertContact(contactPoint,contactName) {

    var str = reverse(contactPoint);

    contactPoint = contactPoint + "aT" + "nspa" + "DoTnato";

    var encodedLink = "";

    contactPoint = contactPoint +".int";

    contactPoint = contactPoint.replace("aT", "@").replace("DoT", ".");
    
    encodedLink = UrlEncode(contactPoint);

    var host = "tni" + "DoTotan" + ".apsn";    
    host = host.replace("DoT", ".");

    var link;

    if (contactName === undefined) {
        link = host + "@" + str;
        link = SimpleEncode(link);
    }
    else {
        link = reverse(contactName);
    }

    var displayStr = "<span style='direction:rtl; unicode-bidi:bidi-override'>" + link + "</span>"


    var fullStr = "<a href='mailto:" + encodedLink + "'>" + displayStr + "</a>"    
    document.write(fullStr);
}

function reverse(s){ 
    return s.split("").reverse().join("");
}

function UrlEncode(s) {
    var HEX = "0123456789ABCDEF";
    var encoded = "";
    for (var i = 0; i < s.length; i++) {
          if (Math.random() < 0.5) {
            var charCode = s.charCodeAt(i);
            encoded += "%";
            encoded += HEX.charAt((charCode >> 4) & 0xF);
            encoded += HEX.charAt(charCode & 0xF);
        } else {
        if (Math.random() < 0.5) {            
            encoded += "&#" + s.charCodeAt(i) + ";";
        } else {
            encoded += s.charAt(i);
        }
            
        }
    } // for
    return encoded;
}

function SimpleEncode(s) {
    var se ="";
    for (i = 0; i < s.length; i++) {
       se += "&#" + s.charCodeAt(i) + ";";
   }
    return se;
}
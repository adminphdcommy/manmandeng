firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        setVisit(user)
    }
});

firebase.auth().signInAnonymously()
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error)
    // ...
  });


async function setVisit(user) {
    try {


        let client = await getClientInfo()
        let pushed = await firebase.database().ref("activities").push({
            dtcreate: firebase.database.ServerValue.TIMESTAMP,
            uid: user.uid,
            email: user.email,
            ...client,
            counted: false,
            host: location.host,
            path: location.pathname
        })


        let snap = await firebase.database().ref("sites").orderByChild("name").equalTo(location.host).once("value")
        let sites = []
        snap.forEach(e => {
            let site = e.val()
            sites.push({ id: e.key, ...site })
        })
        console.log(sites)
        let site = sites[0]
        if(site){
            site.count++
            let updatedSiteCount = await firebase.database().ref("sites").child(site.id).update({ count: site.count, aid: pushed.key })
            let updatedActivitiesCounted = await firebase.database().ref("activities").child(pushed.key).update({ counted: true })
    
        }
    } catch (error) {
        console.log(error)
    }
}



function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}





function getClientInfo() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://ipapi.co/json/",
            method: "GET",
            success: function (ajaxData) {
                resolve(ajaxData)
            },
            error: function (ajaxError) {
                console.log(ajaxError)
                reject(ajaxError.responseJSON)
            }
        })
    })
}
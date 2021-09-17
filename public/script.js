(async function () {
    let colors = ["#f6bd60", "#f7ede2", "#f5cac3", "#84a59d", "#f28482", "#e4572e", "#f0f66e", "#f0f8ea", "#a8c686", "#9d9c62"]

    await wait(1000)

    /**
     * @type {String}
     */
    let askedBy = util.url.get("askedBy")
    if (askedBy) {
        askedBy = askedBy.toUpperCase()
        $("#askedBy").html(askedBy)
        $("#askedBy").show()
        let a = shuffle(colors)
        a.forEach(async (e, i) => {
            await wait(i * 150)
            $("#askedBy").css("border-color", e)
        })
        await wait(1000)
        $("#askedBy").html("叫你")
        await wait(1000)
        $("#askedBy").hide()

    }

    $("#deng4 span").each(async (i, e) => {
        await wait(i * 150)
        $(e).show()
    })
    await wait(1200)
    $("#manmandeng .cn").show()
    await wait(500)
    $("#manmandeng .en").show()
    await wait(100)

    let c = shuffle(colors)
    for (var i = 0; i < c.length; i++) {
        $("body").css("background-color", c[i])
        await wait(150)
    }
})()

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}

/**
 * 
 * @param {any[]} array 
 * @returns {any[]}
 */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

$("#showNickNameCheckbox").on("change", e => {
    console.log(e)
    if ($(e.target).is(':checked')) {
        $("#showNickNameInput").show()
    } else {
        $("#showNickNameInput").hide()
    }
})

let hostname = window.location.origin
hostname.replace("xn--wiua700r","慢慢等")

$("#url-to-share").val(window.location.origin)

$("#showNickNameInput").on("keyup", e => {
    $("#url-to-share").val(window.location.origin + "?askedBy=" + $("#showNickNameInput").val())
})

$("#copyUrlBtn").on("click", e => {
    copyUrl()
})

function copyUrl() {
    try {
        /* Get the text field */
        var copyText = document.getElementById("url-to-share");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);

        /* Alert the copied text */
        $("#copyResult").show()
    } catch (error) {
        $("#copyResult").html("Unable to copy, pleae copy it manually")
        $("#copyResult").removeClass("text-success")
        $("#copyResult").addClass("text-danger")
        $("#copyResult").show()
        $("#url-to-share").prop("disabled",false)
        var copyText = document.getElementById("url-to-share");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
    }

}

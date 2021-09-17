(async function() {
    await wait(1000)

    $("#deng4 span").each(async (i, e) => {
        await wait(i * 200)
        $(e).show()
    })
    await wait(1200)
    $("#manmandeng .cn").show()
    await wait(500)
    $("#manmandeng .en").show()
})()

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}
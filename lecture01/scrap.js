const x = (a, b) => {
    console.log(`value of a is ${a}`)
    if( a > 10) {
        b()
    }
    console.log("done")
}

x(100, () => {
    console.log("hello from b")
})
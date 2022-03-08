function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function curte_posts() {

    let post_count = 0;
    let li = document.getElementsByTagName("li")

    for(let i=0; i< li.length; i++){
        if(li[i].innerText.includes(' publicações')){
            post_count = Number(li[i].innerText.replace(' publicações',''))	
        }
    }

    console.log("Curtindo " + post_count + " posts...");

    let a = document.getElementsByTagName("a")
    let first_post = null;

    for(let i=0; i< a.length; i++){

        if(a[i].innerHTML.includes("img alt") && a[i].innerHTML.includes("srcset")){
            first_post = a[i];
            break;
        }
    }

    first_post.click();

    await sleep(2000);

    for(let count=0; count < post_count; count++){

        console.log("Curtindo foto " + (count+1) + " de " + post_count + "...");
        let y = document.getElementsByTagName("button")

        let like_button = null;
        let advance_button = null;

        for(let i=0; i<y.length; i++){
            if(y[i].outerHTML.includes('svg aria-label="Avançar"')){
                advance_button = y[i];	
            } else if(y[i].outerHTML.includes('svg aria-label="Curtir"')){

                var extract = y[i].outerHTML.match(/width=(.*)/).pop();
                var width = extract.split(">")[0].replace(/\D+/g, '');
                
                if(width > 12){
                    like_button = y[i];
                }
            }
        }

        if(like_button != null){
            like_button.click();
            await sleep(1000);
            if(advance_button != null){
                advance_button.click();
                await sleep(1000);
            }
        } else if(advance_button != null){
            advance_button.click();
            await sleep(1000);
        }
    }
}

curte_posts();
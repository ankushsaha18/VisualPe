

var pin=0
$(()=>{  
    new PincodeInput('#pin', {
    count: 4,
    secure: true,
    previewDuration: 500,
    onInput: (value) => {
        pin=value
        terms()
    }
    })
})
   
const terms=()=> $("#btn").get(0).disabled=!$("#tc").get(0).checked | pin.length!=4 | $("#phn").get(0).value >1e10 | $("#phn").get(0).value <1e9
const login = () => {
    $("#sub").get(0).innerHTML = `<img src="assets/images/Pendulum.gif"><h3>loading ...</h3>`;
    fetch(`https://bridge-test-api.herokuapp.com/consent/${$("#phn").get(0).value}`, {
        method: 'post',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({"pin": pin})
    })
    .then((resp) => resp.json())
    .then((resp) => {
        localStorage.setItem("jwt", resp.token);
        window.location.href = resp.url;
    })
    .catch(() => { 
        window.location.href = "index.html";
    });
}

// Make functions available globally if needed
window.login = login;
window.terms = terms;


var jwt=localStorage.getItem("jwt")
fetch(`https://bridge-test-api.herokuapp.com/checklogin`,
    {
        method:'get',
        mode:'cors',
        credentials: 'same-origin',
        headers: {"Content-type": "application/json; charset=UTF-8","x-access-token":jwt},
    }
    ).then((resp)=>resp.json())
    .then((resp)=>{
            {
               console.log(resp)
               if(resp.wait==true)
               window.location.href="https://ankushsaha18.github.io/VisualPe/index.html"
               if(resp.auth==true)
               window.location.href="https://ankushsaha18.github.io/VisualPe/index.html"
            }
        })
    .catch(()=>{ 
        window.location.href="https://ankushsaha18.github.io/VisualPe/index.html"
    })

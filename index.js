$(() => {
    // Send Data to ExpressJS Server
    $(".dns").submit(async (e) => {
        e.preventDefault();
        const formData = {
            A: $(".A").val(),
            AAAA: $(".AAAA").val(),
            CNAME: $(".CNAME").val(),
            MX: $(".MX").val(),
            NS: $(".NS").val(),
            PTR: $(".PTR").val(),
            SOA: $(".SOA").val(),
            SRV: $(".SRV").val(),
            TXT: $(".TXT").val(),
        }
        const settings = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        };
        try {
            const fetchResponse = await fetch(`http://localhost:3000/api/dns/senddata`, settings);
            const data = await fetchResponse.json();
            if(data.statusCode !== 200) {
                var f = '', s = '';
                for(var i in data.message.errors){
                    f = i;
                    s = data.message.errors[i][0];
                    break;
                 }
                swal({ title: data.status, text: `Input ${ f }: ${ s }`, icon: "error", button: "Close" });
                
            } else {
                swal({ title: data.status, text: data.message, icon: "success", button: "Close" });
                console.log(data.message);
            }
        } catch (err) {
           console.log(err.message);
        } 
    })
});
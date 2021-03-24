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
                swal({ title: "Status", text: "Data are not sent Successfully", icon: "error", button: "Close" });
            } else {
                swal({ title: "Status", text: "Data Sent Successfully", icon: "success", button: "Close" });
            }
        } catch (err) {
           console.log(err.message);
        } 
    })
});
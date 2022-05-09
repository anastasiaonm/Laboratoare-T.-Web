$(function() {

    let formData;

    //SELECTORS
    let name = $(".name");
    let email = $(".email");
    let phone = $(".phone");
    let address = $(".address");
    let profession = $(".profession");

    let section2 = $(".sectiunea2");
    let section3 = $(".sectiunea3");
    let section4 = $(".sectiunea4");

    function putSection1() {
        name.append(formData.section1.lastName + " " + formData.section1.firstName);
        email.append(formData.section1.email);
        phone.append(formData.section1.phone);
        address.append(formData.section1.address);
        profession.append(formData.section1.profession);
    }

    function pickLogo(link) {
        return "<a href="+ link +">" + link + "</a>";
    }

    function putSection2() {
        formData.section2.map((link) => {
            section2.append(pickLogo(link));
        });
    }

    function putSection3() {
        formData.section3.map((educationData, index) => {
            section3.append(
                "<div class='educationDataContainer'>" +
                "<div class='enumerator'>" + (index + 1) +"</div>" +
                "<div style='display: flex; flex-direction: column '><h5>" + educationData.educationTitle + "</h5>" +
                "<h5>" + educationData.educationType + " / " +educationData.graduationDate + "</h5></div>" +
                "</div>"
            );
        })
    }

    function putSection4() {
        formData.section4.map((jobsData, index) => {
            section4.append(
                "<div class='jobDataContainer'>" +
                    "<div class='enumerator'>" + (index + 1) +"</div>" +
                    "<div style='display: flex; flex-direction: column '><h5>" + jobsData.jobName + " at " + jobsData.companyName + " in "+ jobsData.city +"</h5>" +
                    "<h5>" + "From " + jobsData.startDate + " to " + jobsData.endDate + "</h5></div>" +
                    "</div>");
        });
    }
    $.ajax({
        async:false,
        url: "http://localhost:3000/form-data",
        success: function(data) {
            formData = data;
            putSection1();
            putSection2();
            putSection3();
            putSection4();
        },
        error: (err) => console.log(err)
    });

});


$(function() {

    //GET requests
    let professions;
    let educationTypes;
    let jobs;
    let fdata;

    $.ajax({
        async:false,
        url: "http://localhost:3000/professions/14",
        success: function(data) {
            professions = data;
        }
    });

    $.ajax({
        async:false,
        url: "http://localhost:3000/education-type/14",
        success: function(data) {
            educationTypes = data;
        }
    });

    $.ajax({
        async:false,
        url: "http://localhost:3000/job-name/14",
        success: function(data) {
            jobs = data;
        }
    });

    $.ajax({
        async:false,
        url: "http://localhost:3000/form-data",
        success: function(data) {
            console.log(data);
        }
    });

    loadProfessions();
    //SECTION1

    $("#firstNameError").hide();
    $("#lastNameError").hide();
    $("#emailError").hide();
    $("#phoneError").hide();
    $("#addressError").hide();
    $("#professionError").hide();

    let error_fname = false;
    let error_lname = false;
    let error_email = false;
    let error_phone = false;
    let error_address = false;

    $("#firstName").focusout(function(){
        check_fname();
    });
    $("#lastName").focusout(function() {
        check_lname();
    });
    $("#email").focusout(function() {
        check_email();
    });
    $("#phone").focusout(function() {
        check_phone();
    });
    $("#address").focusout(function() {
        check_address();
    });

    function check_fname() {
        let pattern = /^[a-zA-Z]*$/;
        let fname = $("#firstName").val();
        if (pattern.test(fname) && fname === '') {
            $("#firstNameError").html("Name Required");
            $("#firstNameError").show();
        } else {
            $("#firstNameError").html("Should contain only Letters");
            $("#firstNameError").show();
            $("#firstName").css("border","2px solid #F90A0A");
            error_fname = false;
        }
        if (pattern.test(fname) && fname !== '') {
            $("#firstNameError").hide();
            $("#firstName").css("border","2px solid gray");
            error_fname = true;
        }
    }

    function check_lname() {
        let pattern = /^[a-zA-Z]*$/;
        let lname = $("#lastName").val()
        if (pattern.test(lname) && lname === '') {
            $("#lastNameError").html("Surname Required");
            $("#lastNameError").show();
        } else {
            $("#lastNameError").html("Should contain only Letters");
            $("#lastNameError").show();
            $("#lastName").css("border","2px solid #F90A0A");
            error_lname = false;
        }
        if (pattern.test(lname) && lname !== '') {
            $("#lastNameError").hide();
            $("#lastName").css("border","2px solid gray");
            error_lname = true;
        }
    }

    function check_email() {
        let pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        let email = $("#email").val();
        if (pattern.test(email) && email === '') {
            $("#emailError").html("Email is Required");
            $("#emailError").show();
        } else {
            $("#emailError").html("Email must contain \"@\" and \".\"");
            $("#emailError").show();
            $("#email").css("border","2px solid #F90A0A");
            error_email = false;
        }
        if (pattern.test(email) && email !== '') {
            $("#emailError").hide();
            $("#email").css("border", "2px solid gray");
            error_email = true;
        }
    }

    function check_phone() {
        let phone = $("#phone").val();
        let phone_length = $("#phone").val().length;
        let phone_error = $("#phoneError");

        if (phone === '') {
            phone_error.html("Phone is Required");
            phone_error.show();
            error_phone = false;
        } else {
            error_phone = false;
            if (phone.includes("+373") && phone_length !== 12) {
                phone_error.html("Phone should start with +373 and have 12 characters");
                phone_error.show();
                return;
            }
            if (phone[0] === "0" && phone_length !== 9) {
                phone_error.html("Phone should start with 0 and have 9 characters");
                phone_error.show();
                return;
            }
            phone_error.hide();
            $("#phone").css("border", "2px solid gray");
            error_phone = true;
        }

    }

    function check_address() {
        let address = $("#address").val();
        if (address === '') {
            $("#addressError").html("Address is Required");
            $("#addressError").show();
            $("#address").css("border","2px solid #F90A0A");
            error_address = false;
        } else {
            $("#addressError").hide();
            $("#address").css("border","2px solid gray");
            error_address = true;
        }
    }

    function loadProfessions() {
        professions.map((profession) => {
            $("#professionSelect").append("<option value=" + profession.label +">" + profession.label + "</option>");
        })
    }


    //SECTION 2
    let addLinkButton = $("#addLinkButton");
    let links = [];

    function checkLink(e) {
        let link = e.target.value;
        let logo;
        links.push(link);

        if(e.target.classList[1] === "focus")
            return

        e.target.classList.toggle("focus");

        if(link.includes("facebook"))
            logo = "<a class='linkLogo'><img src='../images/facebook.png' style='margin: 10px; width: 40px'><img></a>";
        else if(link.includes("instagram"))
            logo = "<a class='linkLogo'><img src='../images/instagram.png' style='margin: 10px; width: 40px'><img></a>";
        else if(link.includes("linkedin"))
            logo = "<a class='linkLogo'><img src='../images/linkedin.png' style='margin: 10px; width: 40px'><img></a>";
        else $(".logosContainer").append("<h5 style='color: red'>Incorrect URL</h5>");

        $(".linkInput").remove();
        $(".logosContainer").append(logo);
        $(".linkLogo").attr("href",link);
        document.querySelector("#addLinkButton").classList.toggle("focus");

    }

    function addSocialLink(e) {

        if(e.target.classList[1] === "focus")
            return;

        e.target.classList.toggle("focus");

        $(".logosContainer > h5").remove();
        let input = "<input class='linkInput' type='text' placeholder='Link'></input>"

        $(".sectiunea2").append(input);
        $(".linkInput").focusout((e) => checkLink(e));
    }


    addLinkButton.click((e) => addSocialLink(e));


    // SECTION 3

    let addEducationButton = $("#addEducationButton");
    let educationList = [];

    function checkEducation(e) {

        if ($(".educationTitleInput").val() === "") {
            $(".educationTitleInput").css("border","2px solid #F90A0A");
            $(".educationTitleInput").attr("placeholder", "Education title required");
            $(".educationTitleInput").addClass("customPlaceholder");
            return;
        } else {
            $(".educationTitleInput").attr("placeholder", "Education title");
            $(".educationTitleInput").css("border","2px solid gray");
            $(".educationTitleInput").removeClass("customPlaceholder");
        }

        if($(".graduationInput").val() === "") {
            $(".graduationInput").css("border","2px solid #F90A0A");
            return;
        } else {
            $(".graduationInput").css("border","2px solid gray");
        }

        educationList.push({
            educationTitle: $(".educationTitleInput").val(),
            educationType: $(".educationTypeSelect").find(":selected").text(),
            graduationDate: $(".graduationInput").val()});

        let educationData;

        $(".educationDataContainer").remove();
        educationList.map((data ,i) => {
            educationData = "<div class='educationDataContainer'>" +
                "<div class='enumerator'>" + (i + 1) +"</div>" +
                "<h5>" + data.educationTitle + "</h5>" +
                "<h5>" + data.educationType +"</h5>" +
                "<h5 style='margin-left: 50px'>" + data.graduationDate +"</h5>" +
                "</div>";

            $(".sectiunea3").append(educationData);
        });

        $(".addEducationContainer").remove();
        document.querySelector("#addEducationButton").classList.toggle("focus");
    }

    function addEducation(e) {

        if(e.target.classList[1] === "focus")
            return

        e.target.classList.toggle("focus");

        let input = "<div class='addEducationContainer'>" +
            "<input class='educationTitleInput' type='text' placeholder='Education Title' >" +
            "<input class='graduationInput' type='date' placeholder='Graduation Date'>" +
            "<select class='educationTypeSelect' name='Education Type'>" +
            "</select>" +
            "<button class='submitEducation'>Add Education</button>" +
            "</div>";
        $(".sectiunea3").append(input);
        $(".educationTypeSelect").append(educationTypes.map((type) => {return "<option value=" + type.education + ">" + type.education + "</option>"}));
        $(".submitEducation").click((e) => checkEducation(e));
    }

    addEducationButton.click((e) => addEducation(e));

    // SECTION 4
    let addJobsButton = $("#addJobButton");
    let jobsList = [];
    let jobData;

    function checkJob() {
        if ($(".citySelect").val() === "") {
            $(".citySelect").css("border","2px solid #F90A0A");
            $(".citySelect").attr("placeholder", "City required");
            $(".citySelect").addClass("customPlaceholder");
            return;
        } else {
            $(".citySelect").attr("placeholder", "City");
            $(".citySelect").css("border","2px solid gray");
            $(".citySelect").removeClass("customPlaceholder");
        }

        if ($(".companyNameInput").val() === "") {
            $(".companyNameInput").css("border","2px solid #F90A0A");
            $(".companyNameInput").attr("placeholder", "Company required");
            $(".companyNameInput").addClass("customPlaceholder");
            return;
        } else {
            $(".companyNameInput").attr("placeholder", "Company");
            $(".companyNameInput").css("border","2px solid gray");
            $(".companyNameInput").removeClass("customPlaceholder");
        }

        if($(".startDate").val() === "") {
            $(".startDate").css("border","2px solid #F90A0A");
            return;
        } else {
            $(".startDate").css("border","2px solid gray");
        }

        if($(".endDate").val() === "" && !$(".present").is(':checked')) {
            $(".endDate").css("border","2px solid #F90A0A");
            return;
        } else {
            $(".endDate").css("border","2px solid gray");
        }

        jobsList.push({
            jobName: $(".jobNameSelect").find(":selected").text(),
            startDate: $(".startDate").val(),
            endDate: ($(".endDate").val()) ? $(".endDate").val() : "Present",
            city: $(".citySelect").val(),
            companyName: $(".companyNameInput").val()
        });

        $(".jobDataContainer").remove();
        jobsList.map((data ,i) => {
            jobData = "<div class='jobDataContainer'>" +
                "<div class='enumerator'>" + (i + 1) +"</div>" +
                "<h5>" + data.jobName + " at " + data.companyName + " in "+ data.city +"</h5>" +
                "<h5 style='margin-left: 50px'>" + "From " + data.startDate + " to " + data.endDate + "</h5>" +
                "</div>";

            $(".sectiunea4").append(jobData);
        });

        $(".addJobContainer").remove();
        document.querySelector("#addJobButton").classList.toggle("focus");
    }

    function addJob(e) {
        if(e.target.classList[1] === "focus")
            return

        e.target.classList.toggle("focus");

        let input = "<div class='addJobContainer'>" +
            "<select class='jobNameSelect' name='jobName'>" +
            "</select>" +
            "<label for='startDate' style='margin-left: 10px'>Start Date</label><input class='startDate' type='date' placeholder='Start Date' id='startDate'><label style='margin-left: 10px'>End Date</label>" +
            "<div style='display: flex; align-items: center; justify-content: flex-start; width: 100%'><input class='endDate' type='date' placeholder='End Date'>" +
            "<input class='present' type='checkbox' placeholder='In present'><span style='margin-left: 10px'>In present</span></div>" +
            "<input type='text' class='citySelect' name='City' placeholder='City'>" +
            "<input class='companyNameInput' type='text' placeholder='Company' >" +
            "<button class='submitJob'>Add Job</button>" +
            "</div>";

        $(".sectiunea4").append(input);
        $(".jobNameSelect").append(jobs.map((job) => {return "<option value=" + job.name + ">" + job.name + "</option>"}));
        $(".submitJob").click((e) => checkJob(e));
    }
    addJobsButton.click((e) => addJob(e));

    //SUBMIT
    let formData = {};

    function postData() {
        $.ajax({
            async:false,
            type: "POST",
            headers: {'Content-Type': 'application/json'},
            url: "http://localhost:3000/form-data",
            data: JSON.stringify(formData),
            success: (res) => {
                console.log(res);
            },
            error: (err) => console.log(err)
        });
    }

    function getAllData() {
        if(error_phone && error_address && error_email && error_lname && error_fname) {
            formData.section1 = {
                firstName: $("#firstName").val(),
                lastName: $("#lastName").val(),
                email: $("#email").val(),
                phone: $("#phone").val(),
                address: $("#address").val(),
                profession: $("#professionSelect").find(":selected").text()
            };
            formData.section2 = links;
            formData.section3 = educationList;
            formData.section4 = jobsList;
            postData();
            location.href = "lab4_2.html";
        } else {
            alert("Form not completed");
        }
    }

    let saveProfileButton = $(".saveProfileButton");
    saveProfileButton.click(() => getAllData());
});
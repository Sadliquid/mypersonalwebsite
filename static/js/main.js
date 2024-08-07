(function ($) {
    "use strict";

    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);

    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });


    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });


    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });



    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

})(jQuery);

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');

    emailInput.addEventListener('keydown', handleEnterPress);
    passwordInput.addEventListener('keydown', handleEnterPress);

    function handleEnterPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            loginButton.click();
        }
    }

    function login() {
        const loginEmail = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;
    
        if (loginEmail == "") {
            alert("Please enter a valid email");
            return;
        }
        if (loginPassword == "") {
            alert("Please enter a valid password");
            return;
        }
    
        axios({
            method: 'post',
            url: `login`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "loginEmail": loginEmail,
                "loginPassword": loginPassword
            }
        })
        .then(function (response) {
            if (response.data.startsWith("ERROR:")) {
                console.log(response.data)
                alert("An error occured while logging you in. Please try again.")
                return;
            }
            else if (response.data.startsWith("UERROR:")) {
                console.log(response.data)
                alert(response.data.substring("UERROR: ".length))
                return;
            }
            console.log(response.data)
            document.getElementById("loginButton").innerHTML = "Logging you in..."
            setTimeout(function () {
                window.location.href = "/editor";
            }, 2000);
        })
        .catch(function (error) {
            console.error('Error logging in:', error);
        });
    }
    loginButton.addEventListener('click', login);
});

function logout(){
    axios({
        method: 'post',
        url: `logout`,
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(function () {
            document.getElementById("logoutButton").innerHTML = "Logging out..."
            setTimeout(function () {
                window.location.href = "/admin";
            }, 2000);
        })
        .catch(function (error) {
            console.error('Error logging out:', error);
        });
}

var PostIDtoEdit = null
function setPostIDtoEdit(PostID){
    PostIDtoEdit = PostID
}

var AwardIDtoEdit = null
function setAwardIDtoEdit(awardID){
    AwardIDtoEdit = awardID
}

var SkillIDtoEdit = null
function setSkillIDtoEdit(skillID){
    SkillIDtoEdit = skillID
}

function submitEdits(index){
    const editedTitle = document.getElementById('editTitle' + index).value;
    const editedDescription = document.getElementById('editDescription' + index).value;

    if (editedTitle == ""){
        alert("Title cannot be empty!");
        return;
    }
    if (editedDescription == ""){
        alert("Description cannot be empty!");
        return;
    }

    axios({
        method: 'post',
        url: `editPost`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "editedTitle": editedTitle,
            "editedDescription": editedDescription,
            "editPostID": PostIDtoEdit
        }
    })
        .then(function (response) {
            if (response.data.startsWith("ERROR:")) {
                console.log(response.data)
                alert("An error occured while editing post. Please try again.")
                return;
            }
            else if (response.data.startsWith("UERROR:")) {
                console.log(response.data)
                alert(response.data.substring("UERROR: ".length))
                return;
            }
            console.log(response.data)
            window.location.reload();
        })
        .catch(function (error) {
            console.error('Error editing post:', error);
        });
}

function deletePost(postIDtoDelete){
    axios({
        method: 'post',
        url: `deletePost`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "postID": postIDtoDelete
        }
    })
        .then(function (response) {
            if (response.data.startsWith("ERROR:")) {
                console.log(response.data)
                alert("An error occured while deleting post. Please try again.")
                return;
            }
            else if (response.data.startsWith("UERROR:")) {
                console.log(response.data)
                alert(response.data.substring("UERROR: ".length))
                return;
            }
            console.log(response.data)
            window.location.reload();
        })
        .catch(function (error) {
            console.error('Error deleting post:', error);
        });
}

function submitPost(){
    const postTitle = document.getElementById("postTitle").value;
    const postDescription = document.getElementById("postDescription").value;

    if (postTitle == ""){
        alert("Title cannot be empty!");
        return;
    }
    if (postDescription == ""){
        alert("Description cannot be empty!");
        return;
    }

    axios({
        method: 'post',
        url: `submitPost`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "postTitle": postTitle,
            "postDescription": postDescription
        }
    })
        .then(function (response) {
            if (response.data.startsWith("ERROR:")) {
                console.log(response.data)
                alert("An error occured while submitting post. Please try again.")
                return;
            }
            else if (response.data.startsWith("UERROR:")) {
                console.log(response.data)
                alert(response.data.substring("UERROR: ".length))
                return;
            }
            console.log(response.data)
            window.location.reload();
        })
        .catch(function (error) {
            console.error('Error submitting post:', error);
        });
}

var ProjectIDtoEdit = null
function setProjectIDtoEdit(ProjectID){
    ProjectIDtoEdit = ProjectID
}

function submitProjectEdits(index){
    const editedProjectTitle = document.getElementById('editProjectTitle' + index).value;
    const editedProjectDescription = document.getElementById('editProjectDescription' + index).value;

    if (editedProjectTitle == ""){
        alert("Title cannot be empty!");
        return;
    }
    if (editedProjectDescription == ""){
        alert("Description cannot be empty!");
        return;
    }

    axios({
        method: 'post',
        url: `editProject`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "editedProjectTitle": editedProjectTitle,
            "editedProjectDescription": editedProjectDescription,
            "editProjectID": ProjectIDtoEdit
        }
    })
        .then(function (response) {
            if (response.data.startsWith("ERROR:")) {
                console.log(response.data)
                alert("An error occured while editing project. Please try again.")
                return;
            }
            else if (response.data.startsWith("UERROR:")) {
                console.log(response.data)
                alert(response.data.substring("UERROR: ".length))
                return;
            }
            console.log(response.data)
            window.location.reload();
        })
        .catch(function (error) {
            console.error('Error editing project:', error);
        });
}

function deleteProject(projectIDtoDelete){
    axios({
        method: 'post',
        url: `deleteProject`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "projectIDtoDelete": projectIDtoDelete
        }
    })
        .then(function (response) {
            if (response.data.startsWith("ERROR:")) {
                console.log(response.data)
                alert("An error occured while deleting project. Please try again.")
                return;
            }
            else if (response.data.startsWith("UERROR:")) {
                console.log(response.data)
                alert(response.data.substring("UERROR: ".length))
                return;
            }
            console.log(response.data)
            window.location.reload();
        })
        .catch(function (error) {
            console.error('Error deleting project:', error);
        });
}

function submitProject(){
    const projectTitle = document.getElementById("projectTitle").value;
    const projectDescription = document.getElementById("projectDescription").value;

    if (projectTitle == ""){
        alert("Title cannot be empty!");
        return;
    }
    if (projectDescription == ""){
        alert("Description cannot be empty!");
        return;
    }

    axios({
        method: 'post',
        url: `submitProject`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "projectTitle": projectTitle,
            "projectDescription": projectDescription
        }
    })
        .then(function (response) {
            if (response.data.startsWith("ERROR:")) {
                console.log(response.data)
                alert("An error occured while uploading project. Please try again.")
                return;
            }
            else if (response.data.startsWith("UERROR:")) {
                console.log(response.data)
                alert(response.data.substring("UERROR: ".length))
                return;
            }
            console.log(response.data)
            window.location.reload();
        })
        .catch(function (error) {
            console.error('Error uploading project:', error);
        });
}

function submitContactForm(){
    const nameOfUser = document.getElementById("nameOfUser").value
    const emailOfUser = document.getElementById("emailOfUser").value
    const messageOfUser = document.getElementById("messageOfUser").value

    if (nameOfUser == ""){
        alert("Name cannot be empty!")
        return;
    }
    if (emailOfUser == ""){
        alert("Email cannot be empty!")
        return;
    }
    if (messageOfUser == ""){
        alert("Message field cannot be empty!")
        return;
    }

    axios({
        method: 'post',
        url: `submitContactForm`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "nameOfUser": nameOfUser,
            "emailOfUser": emailOfUser,
            "messageOfUser": messageOfUser
        }
    })
        .then(function (response) {
            if (response.data.startsWith("ERROR:")) {
                console.log(response.data)
                alert("An error occured while submitting contact form. Please try again.")
                return;
            }
            else if (response.data.startsWith("UERROR:")) {
                console.log(response.data)
                alert(response.data.substring("UERROR: ".length))
                return;
            }
            emailjs.init("zZxzJCMMWqeIU9Cg8");
            emailjs.send("service_ljwbop6","template_zj51pfk",{
                from_name: nameOfUser,
                message: messageOfUser + ", please email me at " + emailOfUser,
                });
            console.log(response.data)
            alert("Contact Form submitted!")
            window.location.reload();
        })
        .catch(function (error) {
            console.error('Error submitting contact form:', error);
        });
}

function deleteContact(contactFormID){
    axios({
        method: 'post',
        url: `deleteContact`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "contactFormID": contactFormID
        }
    })
        .then(function (response) {
            if (response.data.startsWith("ERROR:")) {
                console.log(response.data)
                alert("An error occured while deleting contact form. Please try again.")
                return;
            }
            else if (response.data.startsWith("UERROR:")) {
                console.log(response.data)
                alert(response.data.substring("UERROR: ".length))
                return;
            }
            console.log(response.data)
            window.location.reload();
        })
        .catch(function (error) {
            console.error('Error deleting contact form:', error);
        });
}

function editAward(index){
    const editedAwardTitle = document.getElementById('editAwardTitle' + index).value;
    const editedAwardDescription = document.getElementById('editAwardDescription' + index).value;

    if (editedAwardTitle == ""){
        alert("Award title cannot be empty!");
        return;
    }
    if (editedAwardDescription == ""){
        alert("Award description cannot be empty!");
        return;
    }

    axios({
        method: 'post',
        url: `editAward`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "editedAwardTitle": editedAwardTitle,
            "editedAwardDescription": editedAwardDescription,
            "editAwardID": AwardIDtoEdit
        }
    })
        .then(function (response) {
            if (response.data.startsWith("ERROR:")) {
                console.log(response.data)
                alert("An error occured while editing award. Please try again.")
                return;
            }
            else if (response.data.startsWith("UERROR:")) {
                console.log(response.data)
                alert(response.data.substring("UERROR: ".length))
                return;
            }
            console.log(response.data)
            window.location.reload();
        })
        .catch(function (error) {
            console.error('Error editing award:', error);
        });
}

function addAward(){
    const awardTitle = document.getElementById("awardTitle").value
    const awardDescription = document.getElementById("awardDescription").value
    const awardImage = document.getElementById("awardImage").files[0];

    if (awardTitle == ""){
        alert("Title cannot be empty!");
        return;
    }
    if (awardDescription == ""){
        alert("Description cannot be empty!");
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(awardImage);
    reader.onload = function () {
        const imageData = reader.result.split(',')[1];
        const requestData = {
            awardTitle: awardTitle,
            awardDescription: awardDescription,
            awardImage: imageData
        };

        axios.post('addAward', requestData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            if (response.data.startsWith("ERROR:")) {
                console.log(response.data)
                alert("An error occured while adding award. Please try again.")
                return;
            }
            else if (response.data.startsWith("UERROR:")) {
                console.log(response.data)
                alert(response.data.substring("UERROR: ".length))
                return;
            }
            console.log(response.data)
            window.location.reload();
        })
        .catch(function (error) {
            console.error('Error adding award:', error);
        });
    };
}

function deleteAward(awardID){
    axios({
        method: 'post',
        url: `deleteAward`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "awardID": awardID
        }
    })
        .then(function (response) {
            if (response.data.startsWith("ERROR:")) {
                console.log(response.data)
                alert("An error occured while deleting award. Please try again.")
                return;
            }
            else if (response.data.startsWith("UERROR:")) {
                console.log(response.data)
                alert(response.data.substring("UERROR: ".length))
                return;
            }
            console.log(response.data)
            window.location.reload();
        })
        .catch(function (error) {
            console.error('Error deleting award:', error);
        });
}

function handleTypewriterEffect(resultDiv, generatedText, maxLength) {
    console.log(generatedText)
    const characters = generatedText.split('');
    let i = 0;

    const intervalId = setInterval(() => {
        resultDiv.innerHTML += characters[i];
        i++;

        if (i === characters.length || i === maxLength) {
            clearInterval(intervalId);
        }
    }, 5); 
}

function submitPrompt() {
    document.getElementById('response').innerHTML = "Hold tight! ChatNinja is thinking..."
    const prompt = document.getElementById("prompt");

    if (prompt.value !== "") {
        const resultDiv = document.getElementById('response');
        
        axios({
            method: 'post',
            url: `processPromptWithGPT`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "prompt": prompt.value
            }
        })
        .then(function (response) {
            if (response.status == 200) {
                if (typeof response.data != "string") {
                    const maxLength = 1800;
                    resultDiv.innerHTML = '';
                    handleTypewriterEffect(resultDiv, response.data.generated_text, maxLength);
                    return;
                } else {
                    if (response.data.startsWith("ERROR")) {
                        resultDiv.innerText = "An error occurred. Please try again later."
                        console.log("Error occured while trying to use ChatNinja: " + response.data)
                        return
                    } else if (response.data.startsWith("UERROR")) {
                        resultDiv.innerText = response.data.substring("UERROR: ".length)
                        console.log("User error occured while trying to use ChatNinja: " + response.data)
                        return
                    } else {
                        resultDiv.innerText = "An error occurred. Please try again later."
                        console.log("Unknown response received from server while trying to use ChatNinja: " + response.data)
                        return
                    }
                }
            } else {
                resultDiv.innerText = "An error occurred. Please try again later."
                console.log("An unfiltered error has occured while communicating with the server: " + response.data)
                return
            }
        })
        .catch(function (error) {
            console.error('Error generating text completion:', error);
        });
    } else {
        document.getElementById('response').innerHTML = ""
        alert("Please enter a valid prompt.");
        return;
    }
}

function submitSkillEdits(index) {
    const editedSkillName = document.getElementById('editSkillName' + index).value;
    const editedSkillDescription = document.getElementById('editSkillDescription' + index).value;

    if (editedSkillName == "") {
        alert("Skill name cannot be empty!");
        return;
    }
    if (editedSkillDescription == "") {
        alert("Skill description cannot be empty!");
        return;
    }

    axios({
        method: 'post',
        url: `editSkill`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "editedSkillName": editedSkillName,
            "editedSkillDescription": editedSkillDescription,
            "editSkillID": SkillIDtoEdit
        }
    })
    .then(function (response) {
        if (response.data.startsWith("ERROR:")) {
            console.log(response.data)
            alert("An error occured while editing skill. Please try again.")
            return;
        }
        else if (response.data.startsWith("UERROR:")) {
            console.log(response.data)
            alert(response.data.substring("UERROR: ".length))
            return;
        }
        console.log(response.data)
        window.location.reload();
    })
    .catch(function (error) {
        console.error('Error editing skill:', error);
    });
}

function deleteSkill(skillID) {
    axios({
        method: 'post',
        url: `deleteSkill`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "skillID": skillID
        }
    })
    .then(function (response) {
        if (response.data.startsWith("ERROR:")) {
            console.log(response.data)
            alert("An error occured while deleting skill. Please try again.")
            return;
        }
        else if (response.data.startsWith("UERROR:")) {
            console.log(response.data)
            alert(response.data.substring("UERROR: ".length))
            return;
        }
        console.log(response.data)
        window.location.reload();
    })
    .catch(function (error) {
        console.error('Error deleting skill:', error);
    });
}

function addSkill() {
    const skillName = document.getElementById("skillName").value
    const skillDescription = document.getElementById("skillDescription").value

    if (skillName == "") {
        alert("Skill name cannot be empty!");
        return;
    }
    if (skillDescription == "") {
        alert("Skill description cannot be empty!");
        return;
    }

    axios({
        method: 'post',
        url: `addSkill`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            "skillName": skillName,
            "skillDescription": skillDescription
        }
    })
    .then(function (response) {
        if (response.data.startsWith("ERROR:")) {
            console.log(response.data)
            alert("An error occured while adding skill. Please try again.")
            return;
        }
        else if (response.data.startsWith("UERROR:")) {
            console.log(response.data)
            alert(response.data.substring("UERROR: ".length))
            return;
        }
        console.log(response.data)
        window.location.reload();
    })
    .catch(function (error) {
        console.error('Error adding skill:', error);
    });
}

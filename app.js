

class Link {
    constructor(title, url, author) {
        this.title = title;
        this.author = author;
        this.url = url;
    }
    // Describe the link as a string
    toString() {
        return `${this.title} (${this.url}). Author: ${this.author}`;
    }
}




let links = [];
let count = 0; // Are multiple counts necessary? 
let tableCount = 0;
let endCount = 0;
let temp = "";
let newURL = "";
let removeStatement = "You have removed the list!";
const scrollToBottom = document.querySelector("#scroll-to-bottom"); // Is this used?
const pageBottom = document.querySelector("#page-bottom"); // Is this used?
const scrollHeight = document.body.scrollHeight;
const btn1 = document.getElementById("btn1");
let h2 = document.createElement("h2");


// variables for timer start after the goodbye message is displayed - then the message is cleared after certain time
const suggestionsElement = document.getElementsByClassName('search__suggestions__list')[0];
function checkURL() {
    if (!temp.includes("https://www.") || (!temp.includes("http://www."))) {
        newURL = `href="https://www.` + temp + `"`;

    }

    newURL.split(" ").join("")

    return newURL;
}
// Clear elements & empty list helper functions - Can these be more concise / refactored? 
function clear() {
    document.querySelectorAll('.link-items').forEach(function (a) {
        a.remove();
    })
}
function emptyList() {
    links = [];
}
function remove() {
    let table1 = document.getElementById("t1");
    table1.parentNode.removeChild(table1);
    setTimeout(function () {
        let show = document.getElementById("show");
        show.style.opacity = 0;
        message.parentNode.removeChild(message);
        let search = document.getElementById("links");
        let line = document.getElementById("hr");
        search.style.opacity = 0;
    }, 2000);
}

// Primary function when user clicks menu button
function options() {
    suggestionsElement.innerHTML = ("");
    if (endCount >= 1) {
        setTimeout(function () {
            h2.textContent = "";
            console.log(endCount);
            endCount = 0;

        }, 1000);
    }
    let text;
    if (count >= 1) {
        clear();
    }
    let num = prompt("Choose an option: \n1: Show links \n2: Add a link \n3: Remove a link \n0: Quit");
    switch (num) {
        case "1":

            document.getElementById("show").style.opacity = 1;

            if (count >= 1) {
                clear();
            }

            if (links.length > 0) {
                suggestionsElement.innerHTML += ('<div class="tableWrapper"><table id="t1"><tr class="row"><th class="tHeader">Title</th><th class="tHeader">URL</th><th class="tHeader">Author</th></table></div>');
                tableCount++;

                for (let i = 0; i < links.length; i++) {
                    temp = links[i].url;
                    let updatedURL = checkURL();
                    let aTag = '<p><a ' + updatedURL + ' target = "_blank">' + links[i].title + '</a></p>';
                    let insertRow = document.getElementById("t1");
                    let newRow = ('<tr class="row"><td>' + links[i].title + '</td> <td class="tag">' + aTag + '</td><td class="author">' + links[i].author + '</td></tr>');
                    insertRow.innerHTML += newRow;
                    /*    if (tableCount > 1) { */
                    /*      let insert = document.getElementById("author");
                         let newRow = ('<br><tr class="row"><th class="tHeader">Title</th><th class="tHeader">URL</th><th class="tHeader">Author</th></tr><tr class="link-items"><td class="title">' + links[i].title + '</td> <td class="tag">' + aTag + '</td><td class="author">' + links[i].author + '</td></tr>');
                         insert.appendChild(newRow); */
                    /*      } */
                    /*  suggestionsElement.innerHTML += ('<li class="link-items">'/* [i+1] +". "*//*  + links[i] + '</li>'); */

                    /*  suggestionsElement.innerHTML += ('<br><div class="tableWrapper"><table id="t1"><tr class="row"><th class="tHeader">Title</th><th class="tHeader">URL</th><th class="tHeader">Author</th></tr><tr class="link-items title"><td>' + links[i].title + '</td> <td class="tag">' + aTag + '</td><td class="author">' + links[i].author + "</td></tr></table></div>"); */

                }
            } else {
                suggestionsElement.innerHTML = ("No links to display!");
            }
            /*  const table = document.getElementById("t1"); */
            text = "Current links:"
            document.getElementById("links").style.opacity = 1;
            document.getElementById("btn1").style.opacity = 1;
            btn1.addEventListener("click", function () {
                clear();
                emptyList();
                remove();
                let message = document.createElement("h2");
                message.id = "message";
                message.appendChild(document.createTextNode(removeStatement));
                document.getElementById("links").appendChild(message);
            })
            /*    console.log(url[1]); */
            let search = document.getElementById("links");
            search.style.opacity = 1;
            count++;
            break;

        case "2":
            document.getElementById("btn1").style.opacity = 0;
            document.getElementById("show").style.opacity = 1;
            /*     document.getElementById("hr").style.opacity = 1; */
            let title = prompt("Add a title for the link: ");
            let input = prompt("Add a link: ");
            let author = prompt("Add an author of this link: ");
            let result = "";
            let link1 = [];
            count++;
            if (!input.endsWith(".com") || !input.endsWith(".org") || !input.endsWith(".edu") || !input.endsWith(".mil") || !input.endsWith(".net") || !input.endsWith(".int") || !input.endsWith(".gov")) {
                text = 'Please include a top-level domain at the end of your link. Example: (.com, .org, .net, etc.) see:<a href="https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains"';
            }
            if (!input.startsWith("http://") || !input.startsWith("https://")) {
                result = "http://" + input;
                link1.push(title, " " + result, " " + author);
                text = "You have added: " + link1;

            }
            else {
                link1.push(title, input, author);
            }

            links.push(new Link(title, input, author));
            text = "You have added: " + link1;
            if (links.length == 0) {
                let search = document.getElementById("links");
                search.style.opacity = 0;
            }
            else {
                let search = document.getElementById("links");
                search.style.opacity = 1;
            }
            if (count != -1) {
                let showDiv = document.getElementById("links");
                showDiv.style.opacity = 0;
            }
            break;

        case "3":
            let len = (links.length - 1);
            document.getElementById("show").style.opacity = 1;
            document.getElementById("btn1").style.opacity = 0;
            if (links.length === 0) {
                text = "There are no links to be removed! Add some if you like :D";
                break;
            }
            if (links.length == 1) {
                let val = prompt("There is currently only one link in the array, type 0 to remove it.")
                text = "You have removed (" + links[val] + ") from the links array.";
                links.splice(val, 1);
                let showDiv = document.getElementById("links");
                showDiv.style.opacity = 0;
                break;
            }
            else {

                let val = prompt("Enter the index of the link to be removed (between 0 and " + len + ")");
                text = "You have removed (" + links[val] + ") from the links array.";
                links.splice(val, 1);
            }
            break;

        case "0":
            document.getElementById("btn1").style.opacity = 0;
            links = [];
            count = 0;
            endCount++;

            h2.classList.add("bye");
            h2.id = "#page-bottom";
            let content = document.createTextNode("Goodbye friend! ^_^");
            if (endCount > 1) {
                document.getElementById("show").style.opacity = 0;
                /*   pageBottom.scrollIntoView(); */
                window.scrollTo(0, scrollHeight);
                break;
            }
            else {
                h2.appendChild(content);
                document.body.appendChild(h2);
            }
            text = "";
            document.getElementById("show").style.opacity = 0;
            /*   pageBottom.scrollIntoView(); */
            window.scrollTo(0, scrollHeight);
            break;

        default:
            document.getElementById("btn1").style.opacity = 0;
            text = "Invalid input, please select an option by typing a number from (0-3)";
    }
    document.getElementById("show").innerHTML = text;
}


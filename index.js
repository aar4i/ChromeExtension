let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")




// Check if there are any saved leads in local storage.
if (leadsFromLocalStorage) {
    //If there are saved leads, assign them to the myLeads array.
    myLeads = leadsFromLocalStorage
    // Render the leads in the UI.
    render(myLeads)
}
// add event listener to Save Tab / use Chrome API.
tabBtn.addEventListener("click", function(){    
    //  Query the Chrome API for the active tab in the current window.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})
// add render function and loop through elements inside list
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    // Set the inner HTML of the unordered list to display all leads.
    ulEl.innerHTML = listItems
}
// delete button.
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
// Input button.
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})
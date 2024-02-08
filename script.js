function setThemePreference() {
    var d = new Date();
    /*
    * The getHours() method returns the hour (from 0 to 23) of the specified date and time.
    * Early mornig = 0 - 6
    * Morning = 6 - 12
    * Evening = 12 - 18
    * Night = 18 - 23
    */
    var currentHour = d.getHours();  
    
    if(currentHour >= 19 || currentHour <= 6) {
      document.body.setAttribute("data-theme", "dark_theme") 
    }else {
      document.body.setAttribute("data-theme", "light_theme") 
    }
  }
  
  window.onload = setThemePreference;
  window.addEventListener("load",()=>{
    const loader =document.querySelector(".loader");
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitioned",()=>{
        document.body.removeChild("loader");
    })
});
function downloadFile() {
    
    const fileUrl = "EMMANUEL_OUKO_Owuor_CV.pdf";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
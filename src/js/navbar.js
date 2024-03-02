let nav = document.querySelector("#navbar-custom");

nav.innerHTML = `

<nav class="navbar navbar-expand-lg " style="background-color: black;">
<a class="navbar-brand" href="/">
  <img src="./img/eci2.png" width="150px" height="30px" loading="lazy" style="background-color: white;" />
</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav ml-auto">
    <li class="nav-item">
      <a class="nav-link" href="./index.html" style="color:white;" onMouseOver="this.style.color='red'" onMouseOut="this.style.color='white'">Home <span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="./how-it-works.html" style="color:white;" onMouseOver="this.style.color='red'" onMouseOut="this.style.color='white'">How it Works</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="http://localhost:3002/register" style="color:white;" onMouseOver="this.style.color='red'" onMouseOut="this.style.color='white'">Create Acount</a>
    </li>
    
    <li class="nav-item">
      <a class="nav-link" href="http://localhost:3002/login" style="color:white;" onMouseOver="this.style.color='red'" onMouseOut="this.style.color='white'">Login User</a>
    </li>
    
    <li class="nav-item">
      <a class="nav-link" href="http://localhost:3002/admin/" style="color:white;" onMouseOver="this.style.color='red'" onMouseOut="this.style.color='white'">Login Admin</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="http://localhost:3002/about" style="color:white;" onMouseOver="this.style.color='red'" onMouseOut="this.style.color='white'">About Us</a>
    </li>

  </ul>
</div>
</nav>`

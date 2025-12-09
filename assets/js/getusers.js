function Loadusers() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.github.com/users", true);
  xhr.onload = function () {
    if (this.status == 200) {
      var users = JSON.parse(this.responseText);
      var limitedUsers = users.slice(0, 8);
      
      // ایجاد پاپ‌آپ مادر (یک بار برای کل صفحه)
      const popup = document.createElement('div');
      popup.className = 'follow-popup';
      popup.innerHTML = `
        <div class="popup-content">
          <i class="fas fa-check-circle z-index"></i>
          <span>با موفقیت دنبال شد!</span>
        </div>
      `;
      document.body.appendChild(popup);
      
      for (var i in limitedUsers) {
        var p = document.createElement("p");
        p.className = "box list-user-item flex-c bg-btn bord-blue waves-effect Waves-light";
        
        var img = document.createElement("img");
        img.className = "img-cricle";
        img.setAttribute("src", limitedUsers[i].avatar_url);
        p.append(img);
        
        var h5 = document.createElement("h5");
        var a = document.createElement("a");
        a.innerText = limitedUsers[i].login;
        h5.append(a);
        
        var followButton = document.createElement('button');
        followButton.className = "follow-btn";
        followButton.innerHTML = `
          <i class="fas fa-user-plus"></i>
          <span>دنبال کردن</span>
        `;
        
        img.after(h5);
        h5.after(followButton);
        document.querySelector(".flex-wrap").append(p);
        
        followButton.addEventListener('click', function() {
          const icon = this.querySelector('i');
          const text = this.querySelector('span');
          
          if (text.textContent === 'دنبال کردن') {
            icon.className = 'fas fa-user-check';
            text.textContent = 'دنبال شده';
            this.classList.add('followed');
            
            // نمایش پاپ‌آپ
            popup.style.display = 'flex';
            setTimeout(() => {
              popup.style.opacity = '1';
              popup.style.transform = 'translateY(0)';
            }, 10);
            
            setTimeout(() => {
              popup.style.opacity = '0';
              popup.style.transform = 'translateY(20px)';
              setTimeout(() => popup.style.display = 'none', 300);
            }, 2000);
          } else {
            icon.className = 'fas fa-user-plus';
            text.textContent = 'دنبال کردن';
            this.classList.remove('followed');
          }
        });
      }
    }
  };
  xhr.send();
}
Loadusers();

const night = document.getElementById("night");
night.addEventListener("click", () => {
  document.querySelector(".bg-white").classList.add("dark-background");
  document.querySelector(".shab").classList.add("dis-none");
  document.querySelector(".day").classList.remove("dis-none");
});
const light = document.getElementById("light");
light.addEventListener("click", () => {
  document.querySelector(".bg-white").classList.remove("dark-background");
  document.querySelector(".shab").classList.remove("dis-none");
  document.querySelector(".day").classList.add("dis-none");
});

const listopen = document.getElementById("listopen");
listopen.addEventListener("click", () => {
  document.querySelector(".openlist").classList.add("dis-none");
  document.querySelector('.closelist').classList.remove('dis-none')
 
});
const close = document.getElementById("listclose");
close.addEventListener("click", () => {
  document.querySelector(".closelist").classList.add("dis-none");
  document.querySelector('.openlist').classList.remove('dis-none')
 
});

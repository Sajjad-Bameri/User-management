document.addEventListener("alpine:init", () => {
  Alpine.data("usersData", function () {
    return {
      mainUsers: [],
      users: [],
      pageUsers: [],
      isload: false,
      isloadd: false,
      log: false,
      addshowmodal: false,
      adduser: false,
      pageCount: 1,
      itemsCount: 4,
      currentPage: 1,
      searchChar: "",

      newaddusers: {
        username: "",
        email: "",
        pass: "",
      },
      useridToedit : null,

      login() {
        (this.isloadd = true),
          setTimeout(() => {
            (this.isloadd = false), (this.log = true);
          }, 1000);
        this.log = false;
      },

      getUsers() {
        this.isload = true;
        axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then((res) => {
            console.log(res);
            this.mainUsers = res.data;
            this.users = res.data;
            this.pagination();
          })
          .finally(() => {
            this.isload = false;
          });
      },

      pagination() {
        this.pageCount = Math.ceil(this.users.length / this.itemsCount); //10/4=3
        let start = this.currentPage * this.itemsCount - this.itemsCount; //0
        let end = this.currentPage * this.itemsCount; //4
        this.pageUsers = this.users.slice(start, end);
        // console.log(this.pageUsers);
      },
      nextpage() {
        this.currentPage++;
        if (this.currentPage > this.pageCount)
          this.currentPage = this.pageCount;
        this.pagination();
      },
      backpage() {
        this.currentPage--;
        if (this.currentPage < 1) this.currentPage = 1;
        this.pagination();
      },
      handelChengItemCount(value) {
        this.currentPage = 1;
        if (value < 1) this.itemsCount = 1;
        if (value > this.users.length) this.itemsCount = this.users.length;
      },
      handleSearch(value) {
        this.users = this.mainUsers.filter(
          (user) => user.username.includes(value) || user.email.includes(value)
        );
        this.currentPage = 1;
        this.pagination();
      },
      handleSubmit() {
        // اعتبارسنجی فیلدهای اجباری
        if (
          !this.newaddusers.username?.trim() ||
          !this.newaddusers.email?.trim() ||
          !this.newaddusers.pass?.trim()
        ) {
          M.toast({
            html: "لطفاً همه فیلدهای ضروری را پر کنید!",
            classes: "red rounded",
          });
          return; // توقف اجرای متد
        }

        this.isloadd = true;

        axios
          .post("https://jsonplaceholder.typicode.com/users", this.newaddusers)
          .then((res) => {
            if (res.status === 201) {
              // توجه: == باید باشد نه =
              this.mainUsers.push(res.data);
              this.adduser = false;
              this.addshowmodal = false;
              this.handleResetForm();
              this.pagination();
              M.toast({
                html: "حساب کاربری با موفقیت ایجاد شد!",
                classes: "green rounded",
              });
            }
          })
          .catch((error) => {
            console.error("خطا در ارسال:", error);
            M.toast({
              html: "خطا در ایجاد حساب کاربری!",
              classes: "red rounded",
            });
          })
          .finally(() => {
            this.isloadd = false;
          });
      },
      handleResetForm() {
        this.newaddusers = {
          username: "",
          email: "",
          pass: "",
        };
      },
      handleDeleteUsers(userid) {
        var toastHTML =
          "<span>🟥آیا شما مطمین هستید!(" +
          userid +
          ')</span><button class="btn-flat toast-action " x-on:click="handleConfigurDelete(' +
          userid +
          ')">حذف شود</button>';
        M.toast({ html: toastHTML, classes: "red rounded" });
      },
      handleConfigurDelete(userid) {
        this.isloadd = true;
        axios
          .delete("https://jsonplaceholder.typicode.com/users/"+userid)
          .then((res) => {
            if ((res.status = 200)) {
              this.mainUsers = this.mainUsers.filter(
                (user) => user.id != userid);
              this.users = this.users.filter((user) => user.id != userid);
              this.pagination();
              M.toast({ html: "کاربر با موفقیت حذف شد ✅", classes: "green rounded" });
            }
          })
          .finally(() => {
            this.isloadd = false;
          });
      },
      handleupdareusers(user){
        axios
        .get("https://jsonplaceholder.typicode.com/users/"+user.id)
        .then((res) => {
          if ((res.status = 200)) {
            this.newaddusers = {
              username:res.data.username,
              email: res.data.email,
              pass:res.data.pass,
            }
            this.useridToedit=res.data.id
          }
        })
     
       this.adduser=true
      }
    };
  });
});

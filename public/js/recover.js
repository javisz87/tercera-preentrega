const formRecover = document.querySelector("#formRecover");

if (formRecover instanceof HTMLFormElement) {
  formRecover.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input_password = document.querySelector("#newpassword");
    const input_repeat = document.querySelector("#reppassword");
    const input_token = document.querySelector("#token");

    if (
      input_password instanceof HTMLInputElement &&
      input_repeat instanceof HTMLInputElement &&
      input_token instanceof HTMLInputElement &&
      input_password.value === input_repeat.value
    ) {
      const dtoUsuario = {
        password: input_password.value,
        token: input_token.value,
      };

      const { status } = await fetch("/api/users/recover", {
        method: "POST",
        body: JSON.stringify(dtoUsuario),
        headers: { "Content-Type": "application/json" },
      });

      if (status === 201) {
        // @ts-ignore
        await Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `SUCCES NEW PASSWORD`,
          icon: "success",
          background: "#600252",
          color: "#fff",
          confirmButtonColor: "#01657ed1",
        });
        window.location.href = "/login";
      } else {
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `New Password Failed`,
          icon: "error",
          background: "#600252",
          color: "#fff",
          confirmButtonColor: "#01657ed1",
        });
        // winLogger.error("[Recover] estado inesperado: " + status);
      }
    } else {
      // @ts-ignore
      Swal.fire({
        toast: true,
        showConfirmButton: true,
        title: `Passwords must be the same`,
        icon: "error",
        background: "#600252",
        color: "#fff",
        confirmButtonColor: "#01657ed1",
      });
    }
  });
}

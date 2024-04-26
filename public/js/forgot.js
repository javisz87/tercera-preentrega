const formForgot = document.querySelector("#formForgot");

if (formForgot instanceof HTMLFormElement) {
  formForgot.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input_email = document.querySelector("#email");

    if (input_email instanceof HTMLInputElement) {
      const dtoUsuario = {
        email: input_email.value,
      };

      console.log(dtoUsuario);

      const { status } = await fetch("/api/users/forgot", {
        method: "POST",
        body: JSON.stringify(dtoUsuario),
        headers: { "Content-Type": "application/json" },
      });

      if (status === 201) {
        // @ts-ignore
        await Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `Recovery e-mail sent`,
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
          title: `Authentication Failed`,
          icon: "error",
          background: "#600252",
          color: "#fff",
          confirmButtonColor: "#01657ed1",
        });
        // winLogger.error("[Recover] estado inesperado: " + status);
      }
    }
  });
}

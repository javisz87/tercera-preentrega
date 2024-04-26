// import { winLogger } from "../../src/utils/logger";

const formLogin = document.getElementById("formLogin");

if (formLogin instanceof HTMLFormElement) {
  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input_email = document.querySelector("#email");
    const input_password = document.querySelector("#pass");

    if (
      input_email instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {
      const dtoUsuario = {
        email: input_email.value,
        password: input_password.value,
      };
      const { status } = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dtoUsuario),
      });

      if (status === 201) {
        window.location.href = "/products?limit=10&page=1";
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `Welcome`,
          icon: "success"
        });
      } else {
        // winLogger.info("[login] estado inesperado: " + status);
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `Authentication Failed`,
          icon: "error",
        });
      }
    }
  });
}

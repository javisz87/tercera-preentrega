//DOM

// import { winLogger } from "../../src/utils/logger";

const formCargaProducts = document.querySelector("#product-form");
const inputId = document.querySelector("#id-data");
const inputCode = document.querySelector("#code-input");
const inputTitle = document.querySelector("#title-input");
const inputDescription = document.querySelector("#description-input");
const selectCategory = document.querySelector("#category-select");
const inputStock = document.querySelector("#stock-input");
const inputPrice = document.querySelector("#price-input");
const inputThumbnail = document.querySelector("#thumbnail-input");
const btnSerch = document.querySelector("#sercher-btn");
const btnDelete = document.querySelector("#deleter-btn");
const btnEdit = document.querySelector("#updater-btn");
const btnSave = document.querySelector("#save");
const backWind = document.querySelector("#back-to-products");
const profile = document.querySelector("#owner");

//FORM
if (
  formCargaProducts instanceof HTMLFormElement &&
  inputId instanceof HTMLInputElement &&
  inputCode instanceof HTMLInputElement &&
  inputTitle instanceof HTMLInputElement &&
  inputDescription instanceof HTMLInputElement &&
  selectCategory instanceof HTMLSelectElement &&
  inputStock instanceof HTMLInputElement &&
  inputPrice instanceof HTMLInputElement &&
  inputThumbnail instanceof HTMLInputElement &&
  profile instanceof HTMLInputElement
) {
  formCargaProducts.addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log(profile.value);

    const data = {
      code: inputCode.value,
      title: inputTitle.value,
      description: inputDescription.value,
      category: selectCategory.value,
      stock: inputStock.value,
      price: inputPrice.value,
      thumbnail: inputThumbnail.value,
      owner: profile.value,
    };

    // winLogger.info(data);
    if (!inputId.value) {
      const { status } = await fetch("api/products", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (status === 200) {
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `Added product`,
          icon: "success",
        });
        window.location.href = `/newproducts?profile=${profile.value}`;
      } else {
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `Create Failed`,
          icon: "error",
        });
        // winLogger.info("Created Fail" + status);
      }
    } else {
      const { status } = await fetch(`api/products/${inputId.value}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (status === 200) {
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `Added product`,
          icon: "success",
        });
        window.location.href = `/newproducts?profile=${profile.value}`;
      } else {
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `Create Failed`,
          icon: "error",
        });
        // winLogger.info("Created Fail" + status);
      }
    }
  });
}

//SERCH
async function SerchProduct(code, owner) {
  event?.preventDefault;
  const FETCH_URL = `http://localhost:8080/api/products/code/${code}?owner=${owner}`;
  await fetch(FETCH_URL, {
    method: "GET",
    // body: JSON.stringify({ owner: owner }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return null;
    })
    .then((producto) => {
      // winLogger.info(producto);
      if (!producto) {
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `No Products Matched`,
          icon: "error",
          background: "#600252",
          color: "#fff",
          confirmButtonColor: "#01657ed1",
        });
      } else {
        if (
          inputId instanceof HTMLInputElement &&
          inputCode instanceof HTMLInputElement &&
          inputTitle instanceof HTMLInputElement &&
          inputDescription instanceof HTMLInputElement &&
          selectCategory instanceof HTMLSelectElement &&
          inputStock instanceof HTMLInputElement &&
          inputPrice instanceof HTMLInputElement &&
          inputThumbnail instanceof HTMLInputElement &&
          btnDelete instanceof HTMLButtonElement &&
          btnEdit instanceof HTMLButtonElement &&
          btnSave instanceof HTMLButtonElement &&
          btnSerch instanceof HTMLButtonElement &&
          backWind instanceof HTMLAnchorElement
        ) {
          inputId.value = producto.id;
          inputTitle.value = producto.title;
          inputDescription.value = producto.description;
          selectCategory.value = producto.category;
          inputStock.value = producto.stock;
          inputPrice.value = producto.price;
          inputThumbnail.value = producto.thumbnail[0];
          inputId.disabled = true;
          inputCode.disabled = true;
          inputTitle.disabled = true;
          inputDescription.disabled = true;
          selectCategory.disabled = true;
          inputStock.disabled = true;
          inputPrice.disabled = true;
          inputThumbnail.disabled = true;
          btnSerch.disabled = true;
          btnDelete.disabled = false;
          btnEdit.disabled = false;
          btnSave.disabled = true;
          backWind.setAttribute("href", `/newproducts?profile=${owner}`);
        }
      }
    });
}

//DELETE
async function delProduct(id, owner) {
  event?.preventDefault;
  const FETCH_URL = `http://localhost:8080/api/products/${id}`;
  const { status } = await fetch(FETCH_URL, { method: "DELETE" });
  if (status === 204) {
    // @ts-ignore
    Swal.fire({
      toast: true,
      showConfirmButton: true,
      title: `Deleted product`,
      icon: "success",
      background: "#bd9cfa",
      color: "#fff",
      confirmButtonColor: "#01657ed1",
    });
    window.location.href = `/newproducts?profile=${owner}`;
  } else {
    // @ts-ignore
    Swal.fire({
      toast: true,
      showConfirmButton: true,
      title: `Delete Failed`,
      icon: "error",
      background: "#600252",
      color: "#fff",
      confirmButtonColor: "#01657ed1",
    });
    // winLogger.info("Deleted Fail" + status);
  }
}

//UPDATE
async function updProduct(owner) {
  event?.preventDefault;
  if (
    inputId instanceof HTMLInputElement &&
    inputCode instanceof HTMLInputElement &&
    inputTitle instanceof HTMLInputElement &&
    inputDescription instanceof HTMLInputElement &&
    selectCategory instanceof HTMLSelectElement &&
    inputStock instanceof HTMLInputElement &&
    inputPrice instanceof HTMLInputElement &&
    inputThumbnail instanceof HTMLInputElement &&
    btnDelete instanceof HTMLButtonElement &&
    btnEdit instanceof HTMLButtonElement &&
    btnSave instanceof HTMLButtonElement &&
    btnSerch instanceof HTMLButtonElement &&
    backWind instanceof HTMLAnchorElement
  ) {
    inputCode.disabled = true;
    inputTitle.disabled = false;
    inputDescription.disabled = false;
    selectCategory.disabled = false;
    inputStock.disabled = false;
    inputPrice.disabled = false;
    inputThumbnail.disabled = false;
    btnSerch.disabled = true;
    btnDelete.disabled = true;
    btnEdit.disabled = true;
    btnSave.disabled = false;
    backWind.setAttribute("href", `/newproducts?profile=${owner}`);
  }
}

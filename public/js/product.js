// import { winLogger } from "../../src/utils/logger";

async function addProductQuantityToCart(cid, pid, quantity) {
  const cidarr = cid.split("carts/");
  const cidt = cidarr[1];
  const FETCH_URL = `http://localhost:8080/api/carts/${cidt}/product/${pid}?quantity=${quantity}`;
  const { status } = await fetch(FETCH_URL, { method: "POST" });
  // winLogger.info(status);

  if (status === 201) {
    // @ts-ignore
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: true,
      title: `Added product`,
      icon: "success"
    });
  } else {
    //  winLogger.info("Excedeed Quantity: " + status)
    // @ts-ignore
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: true,
      title: `Not Enough Stock`,
      icon: "info"
    });
  }
}

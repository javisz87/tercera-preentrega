import { mmg } from "../../dao/mongoose/messages.dao.mg.js";
import { ticketsRepository } from "../../repositories/ticket.repository.js";
import { productsRepository } from "../../repositories/product.repositorie.js";
import { cartRepository } from "../../repositories/cart.repositrie.js";
import Handlebars from "handlebars";
import jwt from "jsonwebtoken";

import {
  PATH_NEW_PRODUCT,
  PATH_PRODUCT,
  PATH_CARTS,
  PATH_LOGIN,
  PATH_REGIS,
  PATH_CHAT,
  PATH_TICKET,
  PATH_FORGOT,
  PATH_RECOVER,
  JWT_PRIVATE_KEY,
} from "../../config/config.js";

//helper generado
Handlebars.registerHelper("multiply", function (num1, num2) {
  return num1 * num2;
});

export async function newProductView(req, res, next) {
  try {
    res.render(PATH_NEW_PRODUCT, {
      profile: req.query.profile,
      style: "style-newprod",
      faviconTitle: "Add Products",
      Head: "New Product",
    });
  } catch (error) {
    req.logger.error(`new product error ${error.message}`);
    return next(error.message);
  }
}

export async function productView(req, res, next) {
  try {
    const urlsrt = `http://localhost:8080${req.originalUrl}`;
    const products = await productsRepository.getPaginatedElements(
      req.query,
      urlsrt
    );
    let cartid;
    let usrrole;
    let usremail;
    if (req.session.passport) {
      cartid = req.session.passport.user.cart;
      usrrole = req.session.passport.user.role;
      usremail = req.session.passport.user.email;
    } else {
      cartid = req.user.cart;
      usrrole = req.user.role;
      usremail = req.user.email;
    }

    if (usrrole === "super-admin") {
      usremail = "super-admin";
    }

    const validrole = usrrole === "admin" || usrrole === "super-admin" ? 1 : 0;
    const validchat = usrrole === "user" ? 1 : 0;
    res.render(PATH_PRODUCT, {
      profile: usremail,
      role: validrole,
      chat: validchat,
      cart: cartid,
      faviconTitle: "Home",
      list: products,
      listExist: products.payload.length > 0,
    });
  } catch (error) {
    req.logger.error(`products can't be load ${error.message}`);
    return next(error);
  }
}

export async function cartView(req, res, next) {
  try {
    const products = await cartRepository.getProductsInCartById(req.params.cid);
    res.render(PATH_CARTS, {
      faviconTitle: "Cart",
      Head: "Cart",
      list: products,
      listExist: products.length > 0,
      cid: req.params.cid,
    });
  } catch (error) {
    req.logger.error(`invalid cart view${error.message}`);
    return next(error);
  }
}

export async function ticketView(req, res, next) {
  try {
    const ticket = await ticketsRepository.findOne({ code: req.params.tid });
    const products = await cartRepository.getProductsInCartById(req.query.cart);
    await cartRepository.delAllProductsInCart(req.query.cart);
    res.render(PATH_TICKET, {
      style: "style-ticket",
      faviconTitle: "Ticket",
      // Head: "Order Success",
      Head: "Ticketttt",
      list: products,
      ticket: ticket,
    });
  } catch (error) {
    req.logger.error(`invalid ticket view${error.message}`);
    next(error);
  }
}

export async function loginView(req, res) {
  res.render(PATH_LOGIN, {
    faviconTitle: "Login",
  });
}

export async function regisView(req, res) {
  res.render(PATH_REGIS, {
    faviconTitle: "Regis",
  });
}

export async function chatView(req, res) {
  const mensajes = await mmg.findMsg();
  res.render(PATH_CHAT, {
    faviconTitle: "Chat",
    Head: "Chat",
  });
}

export async function forgotView(req, res) {
  res.render(PATH_FORGOT, {
    style: "style-forgot",
    faviconTitle: "Forgotten password",
  });
}

export async function recoverView(req, res) {
  // Verifica el token
  jwt.verify(req.query.token, JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      req.logger.info(err);
      res.redirect("/login");
    } else {
      res.render(PATH_RECOVER, {
        token: req.query.token,
        style: "style-recover",
        faviconTitle: "Forgotten password",
      });
    }
  });
}



// export async function cartView(req, res) {
//   const products = await cmg.getProductsInCartById(req.params.cid);
//   res.render(PATH_CARTS, {
//     faviconTitle: "Cart",
//     Head: "Cart",
//     list: products,
//     listExist: products.length > 0,
//     cid: req.params.cid,
//   });
// }

// export async function ticketView(req, res) {
//   let user;
//   if (req.session.passport) {
//     user = req.session.passport.user;
//   } else {
//     user = req.user;
//   }

//   const purchaser = user.email
//   // const products = await cmg.getProductsInCartById(req.params.cid)
//   const products = await cmg.getProductsInCartById(req.params.cid)
//   const amount = products.reduce((total, product) => {
//     // @ts-ignore
//     const productPrice = product.product.price;
//     const productQuantity = product.quantity;
//     // @ts-ignore
//     return total + (productPrice * productQuantity);
//   }, 0);

//   // crear el ticket
//   const newTicket = new Ticket({amount, purchaser}) // esto puede ir a un service
//   await ticketsRepository.add(newTicket.dto())
  
//   // TODO: vaciar el cart y
//   // TODO: eliminar los productos de la db ?

//   res.render(PATH_TICKETS, {
//     faviconTitle: "Ticket",
//     Head: "Ticket",
//     cid: req.params.cid,
//     listExist: products.length > 0,
//     list: products,
//     ticket: newTicket.dto()
//   })
// }
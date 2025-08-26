module.exports = {
  routes: [
    {
      method: "POST",
      path: "/sales", // The URL your frontend will call
      handler: "sale.create", // Points to the 'create' function in the controller
    },
  ],
};

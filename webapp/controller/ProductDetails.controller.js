sap.ui.define([
	"opensap/manageproducts/ManageProducts/controller/BaseController",
	"sap/m/MessageToast"
], function (BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("opensap.manageproducts.ManageProducts.controller.ProductDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf opensap.manageproducts.ManageProducts.view.ProductDetails
		 */
		onInit: function () {

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf opensap.manageproducts.ManageProducts.view.ProductDetails
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf opensap.manageproducts.ManageProducts.view.ProductDetails
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf opensap.manageproducts.ManageProducts.view.ProductDetails
		 */
		//	onExit: function() {
		//
		//	}
		
		onRatingChanged: function (oEvent) {
			var iValue = oEvent.getParameter("value"),
				sMessage =
				this.getResourceBundle().getText("productRatingSuccess", [iValue]);
				MessageToast.show(sMessage);
		}
	});

});